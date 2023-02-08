import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components/macro";
import { useLocation, useParams } from "react-router";

import RecipePageHeader from "@/pages/Recipes/components/RecipePage/components/RecipePageHeader";
import { SubNavMenuNamesEnum } from "@/pages/Recipes/models";
import { IHideTopMenu } from "@/modules/Layout";
import { LayoutSidebarContext } from "@/modules/Layout/components/LayoutSidebar";
import { NavMenu } from "@/app/common/common";

const RecipesPageLayout: FC = () => {
  const { catId, id } = useParams();
  const location = useLocation();

  const subNavMenuArray = [
    {
      text: SubNavMenuNamesEnum.RECIPE,
      link: `/recipes/${catId}/${id}`,
      active: location.pathname === `/recipes/${catId}/${id}`,
    },
    {
      text: SubNavMenuNamesEnum.TIME,
      link: `/recipes/${catId}/${id}/time`,
      active: location.pathname === `/recipes/${catId}/${id}/time`,
    },
    {
      text: SubNavMenuNamesEnum.SUPPLY,
      link: `/recipes/${catId}/${id}/supply`,
      active: location.pathname === `/recipes/${catId}/${id}/supply`,
    },
  ];
  const { hideTopMenu }: IHideTopMenu = React.useContext(LayoutSidebarContext);
  const subMenu = NavMenu<SubNavMenuNamesEnum>({
    menuArray: subNavMenuArray,
  });

  return (
    <RecipePageContent>
      <RecipePageHeader hideTopMenu={!!hideTopMenu} subMenu={subMenu} />
      <Outlet />
    </RecipePageContent>
  );
};

export default RecipesPageLayout;

const RecipePageContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 15px;
  padding: 0 24px;
`;
