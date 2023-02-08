import React from "react";

import RecipesPageHeader from "@/pages/Recipes/components/RecipesPage/components/RecipesPageHeader";
import { LayoutSidebarContext } from "@/modules/Layout/components/LayoutSidebar";
import styled from "styled-components/macro";
import { IHideTopMenu } from "@/modules/Layout/models";

function RecipesPage() {
  const { hideTopMenu }: IHideTopMenu = React.useContext(LayoutSidebarContext);

  return (
    <RecipesPageContainer>
      <RecipesPageHeader hideTopMenu={!!hideTopMenu} />
      <RecipesPageContent></RecipesPageContent>
    </RecipesPageContainer>
  );
}

export default RecipesPage;

const RecipesPageContainer = styled.div`
  padding: 0 24px 34px 24px;
`
const RecipesPageContent = styled.div`
  height: 1000px;
  width: 100%;
`
