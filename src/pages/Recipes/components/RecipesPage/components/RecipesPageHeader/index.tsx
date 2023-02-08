import React, { FC } from "react";
import styled from "styled-components/macro";

import Title from "@/UI/Title";
import LineMenu from "@/UI/MenuLine";
import { breadcrumbsRecipes, menuLinks } from "@/pages/Recipes/mocks";
import { mainTitle } from "@/pages/Recipes/consts";
import Breadcrumbs from "@/UI/Breadcrumbs";
import {commonTheme} from "@/app/styles/themes";

interface IRecipesPageHeaderProps {
  hideTopMenu?: boolean;
}

const RecipesPageHeader: FC<IRecipesPageHeaderProps> = ({
  hideTopMenu = false,
}) => {
  return (
    <RecipesPageHeaderEl isHide={hideTopMenu}>
      <HeaderTop isHide={hideTopMenu}>
        <LineMenu links={menuLinks} />
        <BreadcrumbsWrapper>
          <Breadcrumbs links={breadcrumbsRecipes} />
        </BreadcrumbsWrapper>
        <TitleWrapper>
          <Title>{mainTitle}</Title>
        </TitleWrapper>
      </HeaderTop>
    </RecipesPageHeaderEl>
  );
};

export default RecipesPageHeader;

const RecipesPageHeaderEl = styled.div<{ isHide: boolean }>`
  position: sticky;
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
    transform: translateY(-100%);
  `}
`;
const TitleWrapper = styled.div`
  margin: 0 0 0 20px;
`;
const BreadcrumbsWrapper = styled.div`
  margin: 0 2px 0 20px;
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
