import React, { useState } from "react";
import styled from "styled-components/macro";
import {commonTheme} from "@/app/styles/themes";

function Input({
  value,
  onBlur,
  ...rest
}: {
  align?: "center";
  value?: string | number;
  type?: string;
  onBlur?: (value: string) => void;
}) {
  const [inputValue, setInputValue] = useState(value || "");

  const handleKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.target.blur();
    }
  };

  return (
    <InputEl
      {...rest}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      isEmpty={!inputValue}
      onBlur={(e) => onBlur && onBlur(e.target.value)}
      onKeyUp={(e) => handleKeyUp(e)}
    />
  );
}

export default Input;

const InputEl = styled.input<{ isEmpty: boolean; align?: "center" }>`
  width: 100%;
  padding: 5px 6px;

  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: ${commonTheme.colors.black};

  border: 1px solid transparent;
  border-radius: 4px;

  transition: 0.05s all;

  ${(props) =>
    props.isEmpty &&
    `
      border: 1px solid rgba(60, 60, 60, .07);
  `}
  &:hover {
    border: 1px solid rgba(60, 60, 60, 0.2);
  }

  &:focus {
    border: 1px solid #779dff;
  }

  ::selection {
    color: black;
    text-shadow: none;

    background: #c0d2ff;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  ${(props) =>
    props.align &&
    `
    text-align: center;
  `}
`;
