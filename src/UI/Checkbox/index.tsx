import React, { FC, useEffect, useState } from "react";
import styled from "styled-components/macro";

interface ICheckboxProps {
  disabled?: boolean;
  onChange?: (value: boolean) => void;
  checked?: boolean;
}

const Checkbox: FC<ICheckboxProps> = ({
  disabled,
  checked = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <CheckboxWrapper>
      <CheckboxEl
        type="checkbox"
        disabled={disabled}
        checked={isChecked}
        onChange={(e) => {
          onChange && onChange(e.target.checked);
        }}
        onClick={() => setIsChecked(!isChecked)}
      />
    </CheckboxWrapper>
  );
};

export default Checkbox;

const CheckboxWrapper = styled.label`
  cursor: pointer;
`;

const CheckboxEl = styled.input`
  --active-background: transparent;
  --active-border: #b0babf;
  --border: #b0babf;
  --border-hover: #adb5bd;
  --background: #f6f8f9;
  --disabled: red;
  --disabled-inner: transparent;

  position: relative;

  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin: 0;

  cursor: pointer;
  outline: none;
  box-shadow: none;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: var(--background);
  appearance: none;
  pointer-events: none;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none"> <path d="M1.5 4L4.5 6.5L8.5 1" stroke="black" stroke-width="2"/> </svg>');
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: -2px 0 0;

    opacity: 0;
  }

  &:hover {
    border: 1px solid var(--border-hover);
  }

  &:checked {
    background: var(--active-background);
    border-color: var(--active-border);

    &:after {
      transition: opacity 0.1s ease,
        transform 0.6s cubic-bezier(0.175, 0.88, 0.32, 1.2);
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    background: var(--disabled);

    &:checked {
      background: var(--active-background);
      border-color: var(--active-border);

      &:after {
        transition: opacity 0.1s ease,
          transform 0.6s cubic-bezier(0.175, 0.88, 0.32, 1.2);
      }
    }
  }

  &:not(.switch) {
    &:after {
      opacity: 0;
    }

    &:checked:after {
      opacity: 0.8;
    }
  }
`;
