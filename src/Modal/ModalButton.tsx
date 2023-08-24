import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Contract, parseEther } from "ethers";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEthersSigner } from "./ethers";
import Network from "./Network";
import Token from "./Token";
import { Tokens } from "./Tokens";
import ABI from "./ABI.json";

interface ModalProps {
  Price: number;
  name: string;
  style: string;
  image: string;
  description: string;
}
// Put your Address Wallet Here
const Owner = "0x46e36B12Ac81f65D64d27a0B3d8dc5fc5106497c";

export default function ModalButton(props: ModalProps) {

  const signer = useEthersSigner();

  const [show, setShow] = useState<boolean>(false);
  const [Disable, setDisable] = useState<boolean>(false);
  const [SelectedNetwork, setNetwork] = useState<string>("");
  const [SelectedToken, setToken] = useState<string>("");

  const handleNetwork = (network: string) => {
    setNetwork(network);
  };
  const handleToken = (token: string) => {
    setToken(token);
  };

  const handleClose = () => {
    setShow(false)
    setDisable(false);
  };
  const handleShow = () => setShow(true);
  const Pay = async () => {
    setDisable(true);
    const price = parseEther(props.Price.toString());
    const Select = SelectedNetwork + SelectedToken;
    const contract = new Contract(Tokens[Select], ABI, signer);
    if(await contract.balanceOf(Owner) >= price){
      contract.transfer(Owner, price).then((Transaction) => {
        Transaction.wait().then((CompletedTranaction:any) => {
          console.log(CompletedTranaction);
          setDisable(false);
        }).catch(() => {
          console.log("error")
          setDisable(false);
        });
      }).catch(() => {
        console.log("error")
        setDisable(false);
      });
    }else{
      console.log("balance error")
      setDisable(false);
    }
  };

  return (
    <>
      <button className={props.style} onClick={handleShow}>
        Quick Purchase
      </button>
      <ConnectButton />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Quick Cryptocurrency Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="container border pt-2">
              <div className="row">
                <div className="col-sm-4 col-xs-12 text-center pb-2">
                  <img src={props.image} className="rounded w-100 h-100"/>
                </div>
                <div className="col-sm-8 col-xs-12 text-sm-start text-center">
                  <h5> {props.name} </h5>
                  <p> {props.description.slice(0, 100) + "..."} </p>
                </div>
              </div>
            </div>
            <div className="container pt-2 pb-1 border border-top-0">
              <div className="row">
                <div className="col-4 text-center">
                  <h6>Price:</h6>
                </div>
                <div className="col-4"></div>
                <div className="col-4 text-center">
                  <h6>{props.Price} $</h6>
                </div>
              </div>
            </div>
            <div className="">
              <div className="pt-3">
                <div>
                  <p className="border-bottom p-2 text-sm-start text-center">
                    Select Your Payment Blockchain:
                  </p>
                </div>
                <div className="text-center">
                  <Network NetworkCallback={handleNetwork} disabled={Disable} />
                </div>
              </div>
              <div>
                <div>
                  <p className="border-bottom p-2 pt-4 text-sm-start text-center">
                    Select Your Payment Token:
                  </p>
                </div>
                <div className="text-center">
                  <Token TokenCallback={handleToken} disabled={Disable} />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center w-100">
            <Button variant="success" className="w-25" onClick={Pay}>
              Pay
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
