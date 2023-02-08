import React, { FC, useState } from "react";
import styled from "styled-components/macro";

type SidebarPropsType = {
  children?: React.ReactNode;
};
export const LayoutDefaultContext = React.createContext({});

export const LayoutDefault: FC<SidebarPropsType> = ({ children }) => {
  const [hideTopMenu, setHideTopMenu] = useState<boolean>(false);

  const handleScroll = (e: any) => {
    const scrollTop = e.target.scrollTop;
    const scrollToHide = 220;

    if (scrollTop > scrollToHide && !hideTopMenu) {
      setHideTopMenu(true);
    } else if (scrollTop < scrollToHide && hideTopMenu) {
      setHideTopMenu(false);
    }
  };

  return (
    <Content onScroll={(e) => handleScroll(e)}>
      <LayoutDefaultContext.Provider value={{ hideTopMenu }}>
        {children}
      </LayoutDefaultContext.Provider>
    </Content>
  );
};

const Content = styled.div`
  position: relative;

  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  max-height: 100vh;
  padding: 0 24px 34px 24px;
`;
