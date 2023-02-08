import React, { FC, ReactNode } from "react";
import { LayoutSidebar } from "@/modules/Layout/components/LayoutSidebar";
import { LayoutDefault } from "@/modules/Layout/components/LayoutDefault";

type LayoutPropsType = {
  type?: "aside" | "default";
  sidebar?: ReactNode;
  children?: ReactNode;
};

const Layout: FC<LayoutPropsType> = ({
  type = "default",
  sidebar,
  children,
}) => {
  return (
    <>
      {type === "aside" && (
        <LayoutSidebar sidebar={sidebar}>{children}</LayoutSidebar>
      )}
      {type === "default" && <LayoutDefault>{children}</LayoutDefault>}
    </>
  );
};

export default Layout;
