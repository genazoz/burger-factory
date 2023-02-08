import React, { FC, useState } from "react";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";

import { ReactComponent as ArrowDown } from "@/app/assets/arrow-down.svg";
import {commonTheme} from "@/app/styles/themes";

type DropdownListType = {
  children?: React.ReactNode;
  title: string;
  list?: {
    text: string;
    link: string;
    active?: boolean;
  }[];
  isShowedDefault?: boolean;
};

const DropdownList: FC<DropdownListType> = ({
  children,
  title,
  list,
  isShowedDefault = false,
  ...rest
}) => {
  const navigate = useNavigate();
  const [isShowed, setIsShowed] = useState(isShowedDefault);

  return (
    <DropdownListEl>
      <Header onClick={() => setIsShowed(!isShowed)}>
        <ArrowWrapper active={isShowed}>
          <ArrowDown />
        </ArrowWrapper>
        {title}
      </Header>
      {isShowed &&
        (list ? (
          <Content>
            {list.map((item, idx: number) => (
              <LinkLi
                key={idx}
                active={!!item.active}
                onClick={() => navigate(item.link)}
              >
                {item.text}
              </LinkLi>
            ))}
          </Content>
        ) : (
          <Content>{children}</Content>
        ))}
    </DropdownListEl>
  );
};

export default DropdownList;

const DropdownListEl = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;

  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.006em;
  color: ${commonTheme.colors.blueGray};

  cursor: pointer;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
const ArrowWrapper = styled.div<{ active: boolean }>`
  display: flex;

  stroke: ${commonTheme.colors.blueGray};

  transition: 0.12s all;

  ${(props) =>
    props.active &&
    `
    transform: rotate(180deg);
    stroke: #9AA6AC;
  `}
`;
const LinkLi = styled.div<{ active: boolean }>`
  overflow: hidden;
  padding: 4px 12px 4px 44px;
  
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.006em;
  color: ${commonTheme.colors.blueGray};

  cursor: pointer;
  border-radius: 6px;

  transition: 0.1s background-color;

  &:hover {
    background: #eef0f2;
  }

  ${(props) =>
    props.active &&
    `
    background: #eef0f2;
  `}
`;
