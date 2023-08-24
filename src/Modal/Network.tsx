import { useEffect, useState } from "react";

import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

import bsc from "./Images/bsc.png";
import eth from "./Images/eth.png";
import poly from "./Images/poly.png";
import harmony from "./Images/harmony.png";
import fantom from "./Images/fantom.png";
import arbitrum from "./Images/arbitrum.png";
import avalance from "./Images/avalanche.png";
import optimism from "./Images/optimism.png";

export default function Network(props: any) {
  const [NetworkValue, setNetworkValue] = useState("0");
  const handleselect = (SelectedNetwork: string) => {
    props.NetworkCallback(SelectedNetwork);
  };

  const Networks = [
    { name: "Binance Smart Chain", value: "97", image: bsc, disabled: false },
    { name: "Ethereum", value: "1", image: eth, disabled: true },
    { name: "Polygon", value: "137", image: poly, disabled: true },
    { name: "Harmony", value: "1666600000", image: harmony, disabled: true },
    { name: "Optimism", value: "420", image: optimism, disabled: true },
    { name: "Arbitrum", value: "42161", image: arbitrum, disabled: true },
    { name: "Avalanche", value: "43114", image: avalance, disabled: true },
    { name: "Fantom", value: "250", image: fantom, disabled: true },
  ];
  return (
<div className="row justify-content-center">
  <div className="col-12">
        <ToggleButtonGroup name="Networks" type="radio">
        <div className="d-flex flex-wrap justify-content-center">
          {Networks.map((radio, idx) => (
            <ToggleButton
              title={radio.name}
              key={idx}
              id={`network-${idx}`}
              type="radio"
              variant={"outline-secondary"}
              name="radio"
              value={radio.value}
              checked={NetworkValue === radio.value}
              onChange={(e) => {
                setNetworkValue(e.currentTarget.value);
                handleselect(e.currentTarget.value);
              }}
              disabled={radio.disabled || props.disabled}
            >
              <img
                src={radio.image}
                width="30px"
                height="30px"
                alt={radio.name}
              />
            </ToggleButton>
          ))}
          </div>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
