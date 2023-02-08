import React, { FC } from "react";

import Title from "@/UI/Title";
import LineMenu from "@/UI/MenuLine";
import { mainTitle } from "@/pages/ComboSets/consts";
import { menuLinks } from "@/pages/ComboSets/mocks";
import styled from "styled-components/macro";
import {commonTheme} from "@/app/styles/themes";

interface IComboSetsPageHeaderProps {
  hideTopMenu: boolean;
}

const ComboSetsPageHeader: FC<IComboSetsPageHeaderProps> = ({
  hideTopMenu,
}) => {
  return (
    <PriceListHeaderEl isHide={hideTopMenu}>
      <LineMenu links={menuLinks} />
      <TitleWrapper>
        <Title>{mainTitle}</Title>
      </TitleWrapper>
    </PriceListHeaderEl>
  );
};

export default ComboSetsPageHeader;

const PriceListHeaderEl = styled.div<{ isHide: boolean }>`
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
