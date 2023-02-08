import React, { FC } from "react";
import styled from "styled-components/macro";

import Title from "@/UI/Title";
import LineMenu, { ILink } from "@/UI/MenuLine";
import Breadcrumbs from "@/UI/Breadcrumbs";
import { breadcrumbsRecipe, menuLinks } from "@/pages/Recipes/mocks";
import {commonTheme} from "@/app/styles/themes";

interface IRecipePageHeaderProps {
  hideTopMenu: boolean;
  subMenu?: ILink[];
}

const RecipePageHeader: FC<IRecipePageHeaderProps> = ({
  hideTopMenu,
  subMenu,
}) => {
  return (
    <RecipePageHeaderEl isHide={hideTopMenu}>
      <HeaderTop isHide={hideTopMenu}>
        <LineMenu links={menuLinks} />
        <BreadcrumbsWrapper>
          <Breadcrumbs links={breadcrumbsRecipe} />
        </BreadcrumbsWrapper>
        <TitleWrapper>
          <Title>Классический</Title>
        </TitleWrapper>
      </HeaderTop>
      {subMenu && <LineMenu links={subMenu} theme={"pink"} />}
    </RecipePageHeaderEl>
  );
};

export default RecipePageHeader;

const RecipePageHeaderEl = styled.div<{ isHide: boolean }>`
  position: sticky;
  z-index: 1;
  top: 0;

  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px 0 0;

  background-color: ${commonTheme.colors.lightWhite};

  transition: 0.2s transform;

  ${(props) =>
    props.isHide &&
    `
    transform: translateY(calc(-100% + 36px + 10px));
  `}
`;
const BreadcrumbsWrapper = styled.div`
  margin: 0 2px 0 20px;
`;
const TitleWrapper = styled.div`
  margin: 0 0 0 20px;
`;
const HeaderTop = styled.div<{ isHide: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;

  transition: 0.2s all;

  ${(props) =>
    props.isHide &&
    `
    opacity: 0;
  `}
`;
