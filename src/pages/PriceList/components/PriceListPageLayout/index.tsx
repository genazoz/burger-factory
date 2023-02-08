import React, { FC, PropsWithChildren } from "react";

import Layout from "@/modules/Layout/components/Layout";

const PriceListPageLayout: FC<PropsWithChildren> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default PriceListPageLayout;
