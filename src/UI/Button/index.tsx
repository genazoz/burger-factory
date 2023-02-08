import React, { ReactNode } from "react";

import { StageSpinner } from "react-spinners-kit";
import styled from "styled-components/macro";
import { commonTheme } from "@/app/styles/themes";

type ThemesType = "outline";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: ThemesType;
  icon?: ReactNode;
  color?: string;
  textColor?: string;
  loading?: boolean;
};

const Button = ({ loading = false, icon, ...rest }: ButtonProps) => {
  return (
    <ButtonEl {...rest} isIcon={!!icon} disabled={loading || rest.disabled}>
      {loading ? (
        <div className={"button__loader"}>
          <StageSpinner size={30} />
        </div>
      ) : (
        <>
          {icon}
          {rest.children}
        </>
      )}
    </ButtonEl>
  );
};

export default Button;

const ButtonEl = styled.button<{
  theme?: ThemesType;
  isIcon?: boolean;
  color?: string;
  textColor?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  gap: 8px;
  padding: 4px 20px;

  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.006em;
  color: #ffffff;

  cursor: pointer;
  background:  ${commonTheme.colors.pink};
  border-radius: 6px;

  transition: 0.07s all;

  svg {
    ${(props) =>
      props.theme === "outline" &&
      `
      stroke: ${props.color || commonTheme.colors.pink};`}
    transition: 0.07s all;
  }

  ${(props) =>
    props.isIcon &&
    `
      padding: 4px 15px 4px 12px;
  `}
  ${(props) =>
    props.theme === "outline" &&
    `
      padding-top: 3px;
      padding-bottom: 3px;
  
      color: ${props.textColor || commonTheme.colors.pink};
      
      background: transparent;
      border: 1px solid ${props.color || commonTheme.colors.pink};
  
      &:hover {
        color: #ffffff;

        background: ${props.color || commonTheme.colors.pink};
        
        svg {
          fill: #ffffff;
          stroke: #ffffff;
        }
      }
      
  `}
`;
