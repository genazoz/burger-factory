import React, { FC } from "react";
import styled from "styled-components/macro";

import { commonTheme } from "@/app/styles/themes";
import { ReactComponent as Logo } from "@/app/assets/logo-icon.svg";

type SidebarPropsType = {
  children?: React.ReactNode;
  showLogo?: boolean;
};

const Sidebar: FC<SidebarPropsType> = ({ children, ...rest }) => {
  return (
    <SidebarEl>
      {rest.showLogo && (
        <>
          <Logotip />
          <Title>Добро пожаловать в “Фабрику бургеров”</Title>
        </>
      )}
      {children}
    </SidebarEl>
  );
};

export default Sidebar;

const SidebarEl = styled.div`
  position: relative;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 11px 15px;

  cursor: auto;

  @media (max-width: ${commonTheme.media.tab}) {
    width: 100% !important;
    max-width: unset;
    min-width: unset;
    height: auto;
    padding: 0;
  }
`;
const Logotip = styled(Logo)`
  max-width: 100%;
`;
const Title = styled.div`
  width: 128px;
  margin: 0 0 48px;
  
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-align: center;

  color: ${commonTheme.colors.black};
`;
