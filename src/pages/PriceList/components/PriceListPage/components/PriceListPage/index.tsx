import React from "react";
import styled from "styled-components/macro";

import PriceListPageHeader from "@/pages/PriceList/components/PriceListPage/components/PriceListPageHeader";
import { IHideTopMenu } from "@/modules/Layout/models";
import { LayoutDefaultContext } from "@/modules/Layout/components/LayoutDefault";

function PriceListPage() {
  const { hideTopMenu }: IHideTopMenu = React.useContext(LayoutDefaultContext);

  return (
    <>
      <PriceListPageHeader hideTopMenu={!!hideTopMenu} />
      <PriceListPageContent></PriceListPageContent>
    </>
  );
}

export default PriceListPage;

const PriceListPageContent = styled.div`
  width: 100%;
  min-height: 1500px;
`;
