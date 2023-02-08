import React from "react";

import RecipeCategoryPageHeader from "@/pages/Recipes/components/RecipeCategoryPage/components/RecipeCategoryPageHeader";
import { LayoutSidebarContext } from "@/modules/Layout/components/LayoutSidebar";
import { IHideTopMenu } from "@/modules/Layout/models";
import styled from "styled-components/macro";

function RecipeCategoryPage() {
  const { hideTopMenu }: IHideTopMenu = React.useContext(LayoutSidebarContext);

  return (
    <RecipesPageContainer>
      <RecipeCategoryPageHeader hideTopMenu={!!hideTopMenu} />
    </RecipesPageContainer>
  );
}

export default RecipeCategoryPage;

const RecipesPageContainer = styled.div`
  padding: 0 24px 34px 24px;
`;
