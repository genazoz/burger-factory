import React from "react";
import styled from "styled-components/macro";

import ComboSetsPageHeader from "@/pages/ComboSets/components/ComboSetsPage/components/ComboSetsPageHeader";
import { IHideTopMenu } from "@/modules/Layout/models";
import { LayoutDefaultContext } from "@/modules/Layout/components/LayoutDefault";

function ComboSetsPage() {
  const { hideTopMenu }: IHideTopMenu = React.useContext(LayoutDefaultContext);

  return (
    <>
      <ComboSetsPageHeader hideTopMenu={!!hideTopMenu} />
      <ComboSetsPageContent></ComboSetsPageContent>
    </>
  );
}

export default ComboSetsPage;

const ComboSetsPageContent = styled.div`
  width: 100%;
  min-height: 1500px;
`;
