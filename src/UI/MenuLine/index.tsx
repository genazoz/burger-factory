import React, { FC, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";
import {commonTheme} from "@/app/styles/themes";

type ThemeType = "pink" | "default";

export interface ILink {
  text: string;
  link?: string;
  active?: boolean;
}

type LineMenuPropsType = {
  links?: ILink[];
  onClick?: (idx: number) => void;
  theme?: ThemeType;
};

const LineMenu: FC<LineMenuPropsType> = ({
  links,
  theme = "default",
  onClick,
  ...rest
}) => {
  const navigate = useNavigate();
  const [items, setItems] = useState(links || []);

  useEffect(() => {
    setItems((prevState) => (links ? links : prevState));
  }, [links]);

  const onClickLi = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    idx: number,
    item: ILink
  ) => {
    e.preventDefault();

    if (item.link) {
      navigate(item.link);
    } else if (onClick) {
      setItems((prevState) =>
        prevState.map((obj) => {
          return { ...obj, active: obj.text === item.text };
        })
      );
      onClick(idx);
    }
  };

  return (
    <LineMenuEl theme={theme}>
      {items && (
        <>
          {items.map((item, idx: number) => (
            <LinkWrapper key={idx} isActive={!!item.active} theme={theme}>
              <LinkLi
                theme={theme}
                isActive={!!item.active}
                onClick={(e) => onClickLi(e, idx, item)}
              >
                {item.text}
              </LinkLi>
            </LinkWrapper>
          ))}
        </>
      )}
    </LineMenuEl>
  );
};

export default LineMenu;

const LineMenuEl = styled.div<{ theme: ThemeType }>`
  display: flex;
  width: 100%;
  gap: 40px;
  padding: 20px 25px;

  background: #ffffff;
  border-radius: 4px;

  ${(props) =>
    props.theme === "pink" &&
    `
      gap: 0;
      padding: 0;
      
      background:  ${commonTheme.colors.pink};   
  `}
`;
const LinkWrapper = styled.div<{ isActive: boolean; theme: ThemeType }>`
  position: relative;

  &::before {
    content: "";

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    width: calc(100% - 21px * 2);
    height: 0px;
    margin: auto;

    background: #ffffff;
    border-radius: 4px 4px 0px 0px;

    transition: 0.15s all;

    ${(props) =>
      props.isActive &&
      props.theme === "pink" &&
      `
        height: 4px;
        `}
  }

  ${(props) =>
    props.isActive &&
    props.theme === "default" &&
    `
      a {
        font-weight: 700;
      }         
  `}
`;
const LinkLi = styled.a<{ isActive: boolean; theme: ThemeType }>`
  display: flex;

  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.006em;
  color: ${commonTheme.colors.blueGray};

  cursor: pointer;

  transition: 0.1s opacity;

  &:hover {
    opacity: 0.7;
  }

  ${(props) =>
    props.theme === "pink" &&
    `
        padding: 10px 24px;
        
        font-weight: 400;
        font-size: 13px;
        line-height: 16px;
        color: #FFFFFF;
  `}
  ${(props) =>
    props.isActive &&
    props.theme === "pink" &&
    `
          &:hover {
            opacity: 1;
         }
        `}
`;
