import { useEffect, useState } from "react";

import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

import usdc from "./Images/usdc.png";
import busd from "./Images/busd.png";
import usdt from "./Images/usdt.png";
import dai from "./Images/dai.png";

export default function Token(props: any) {
  const [TokenValue, setTokenValue] = useState("1");

  const handleSelect = (SelectedToken: string) => {
    props.TokenCallback(SelectedToken);
  };

  const Tokens = [
    { name: "BUSD", value: "0", image: busd, disabled: false },
    { name: "USDT", value: "1", image: usdt, disabled: false },
    { name: "USDC", value: "2", image: usdc, disabled: false },
    { name: "DAI", value: "3", image: dai, disabled: false },
  ];

  return (
        <ToggleButtonGroup name="Tokens" type="radio">
          {Tokens.map((radio, idx) => (
            <ToggleButton
              title={radio.name}
              key={idx}
              id={`token-${idx}`}
              type="radio"
              variant={"outline-secondary"}
              name="radio"
              value={radio.value}
              checked={TokenValue === radio.value}
              onChange={(e) => {
                setTokenValue(e.currentTarget.value);
                handleSelect(e.currentTarget.value);
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
        </ToggleButtonGroup>
  );
}
