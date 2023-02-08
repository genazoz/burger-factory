import React, {FC, PropsWithChildren, ReactNode, useRef, useState} from "react";
import styled from "styled-components/macro";

import { commonTheme } from "@/app/styles/themes";
import { ReactComponent as ArrowIcon } from "@/app/assets/aside-arrow-icon.svg";

const paddingYTop = 50;
const paddingYBottom = 30;

type SidebarPropsType = {
  sidebar?: ReactNode;
};
export const LayoutSidebarContext = React.createContext({});

export const LayoutSidebar: FC<PropsWithChildren<SidebarPropsType>> = ({ children, sidebar }) => {
  const defaultSideBarWidth = 240;
  const minShowingSideBarWidth = defaultSideBarWidth * 0.9;
  const sidebarWidthFromLocalStorage = localStorage.getItem("sidebar-width");
  const defaultWidth: number =
    sidebarWidthFromLocalStorage !== null &&
    typeof Number(sidebarWidthFromLocalStorage) === "number"
      ? Number(sidebarWidthFromLocalStorage)
      : defaultSideBarWidth;
  const [isResizing, setIsResizing] = useState(false);
  const [isClosed, setIsClosed] = useState(
    defaultWidth < minShowingSideBarWidth
  );
  const [hideTopMenu, setHideTopMenu] = useState<boolean>(false);
  const [sideBarWidth, setSideBarWidth] = useState<number>(defaultWidth);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef<number>(defaultWidth);

  const drag = (event: any) => {
    const sidebar = sidebarRef.current;

    if (sidebar) {
      const mouseX = event.clientX;
      const sidebarLeft = sidebar.getBoundingClientRect().left;
      const width = mouseX - sidebarLeft;

      if (width < widthRef.current && width < minShowingSideBarWidth) {
        widthRef.current = 0;
        setSideBarWidth(0);
        setIsClosed(true);
        endDrag();
      } else {
        widthRef.current = width;
        setSideBarWidth(width);
      }
    }
  };
  const endDrag = () => {
    if (!setIsResizing) return 0;
    setIsResizing(false);
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", endDrag);
    localStorage.setItem("sidebar-width", `${widthRef.current}`);
  };
  const onMouseDownDivider = (e: any) => {
    e.preventDefault();

    if (!setIsResizing || isClosed) return 0;

    setIsResizing(true);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", endDrag);
  };
  const onClickUnfoldButton = () => {
    const width = isClosed ? defaultSideBarWidth : 0;
    widthRef.current = width;
    setIsClosed(!isClosed);
    setSideBarWidth(width);
    localStorage.setItem("sidebar-width", `${width}`);
  };
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
    <Section>
      <Aside isResizing={isResizing}>
        <SidebarEl
          isResizing={isResizing}
          ref={sidebarRef}
          style={{ width: Number(sideBarWidth) }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <Container isClosed={isClosed}>{sidebar}</Container>
          <Divider
            isClosed={isClosed}
            isResizing
            onMouseDown={(e) => onMouseDownDivider(e)}
          />
          <Icon
            style={{
              transform: `rotate(${
                sideBarWidth < minShowingSideBarWidth ? `0deg` : `180deg`
              })`,
            }}
            onClick={onClickUnfoldButton}
          />
        </SidebarEl>
      </Aside>
      <Content>
        <BackdropBlur isResizing={isResizing} />
        <ScrollableWrapper onScroll={(e) => handleScroll(e)}>
          <Wrapper isResizing={isResizing}>
            <LayoutSidebarContext.Provider value={{ hideTopMenu }}>
              {children}
            </LayoutSidebarContext.Provider>
          </Wrapper>
        </ScrollableWrapper>
      </Content>
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  flex-direction: row;
  height: 100%;
  flex: 1;
  margin: auto 0;

  @media (max-width: ${commonTheme.media.tab}) {
    flex-direction: column-reverse;
    justify-content: flex-end;
    gap: 30px;
    height: 100vh;
    max-height: unset;
    //padding: ${paddingYTop}px var(--unit) ${paddingYBottom}px var(--unit);
  }
`;
const Aside = styled.div<{ isResizing: boolean }>`
  background: #f6f8f9;

  transition: 0.3s transform;
`;
const Content = styled.div`
  position: relative;

  display: flex;
  flex: 1;
  height: 100vh;
`;
const ScrollableWrapper = styled.div`
  position: relative;

  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  max-height: 100vh;
  
  &::-webkit-scrollbar {
    display: none;
  }
`
const Wrapper = styled.div<{ isResizing: boolean }>`
  position: relative;

  display: flex;
  flex-direction: column;
  flex: 1;

  transition: 0.3s transform;

  ${(props) =>
    props.isResizing &&
    `
    cursor: col-resize;
    transform: scale(.97);
  `}
`;
const BackdropBlur = styled.div<{ isResizing: boolean }>`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  opacity: 0;
  pointer-events: none;
  backdrop-filter: blur(17px);

  transition: 0.3s all;

  ${(props) =>
    props.isResizing &&
    `
    opacity: 1;
    
    pointer-events: all;
  `}
`;
const SidebarEl = styled.div<{ isResizing: boolean }>`
  position: relative;

  display: flex;
  min-width: 26px;
  max-width: 350px;
  height: 100%;

  cursor: auto;

  ${(props) => !props.isResizing && `transition: .3s width;`};

  @media (max-width: ${commonTheme.media.tab}) {
    width: 100% !important;
    max-width: unset;
    min-width: unset;
    height: auto;
    padding: 0;
  }
`;
const Divider = styled.div<{ isResizing: boolean; isClosed: boolean }>`
  position: absolute;
  z-index: 2;
  top: 0;
  right: -25px;

  display: flex;
  width: 50px;
  height: 100%;

  opacity: 0.5;

  transition: 0.3s right;

  ${(props) => !props.isClosed && `cursor: col-resize;`}
  &::before {
    content: "";

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    width: 7px;
    height: 30px;
    margin: auto;

    background: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR};
    border-radius: 10px;
  }

  @media (max-width: ${commonTheme.media.tab}) {
    display: none;
  }

  ${(props) =>
    props.isResizing &&
    `
    right: -25px;
  `}
`;
const Icon = styled(ArrowIcon)`
  position: absolute;
  z-index: 2;
  top: 0;
  right: -12px;
  bottom: 0;

  margin: auto;

  transition: 0.2s all;

  cursor: pointer;
`;
const Container = styled.div<{ isClosed: boolean }>`
  width: 100%;

  transition: 0.15s opacity;

  ${(props) => props.isClosed && `opacity: 0 `}
`;
