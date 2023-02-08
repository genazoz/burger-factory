import React, { FC, PropsWithChildren } from "react";

import Layout from "@/modules/Layout/components/Layout";

const ComboSetsPageLayout: FC<PropsWithChildren> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default ComboSetsPageLayout;
