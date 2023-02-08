import React from "react";
import styled from "styled-components/macro";

import { RecipesTables, ToolsPanel } from "@/modules/RecipesTables";

function RecipePage() {
  return (
    <>
      <RecipePageContainer>
        <RecipesTables />
      </RecipePageContainer>
      <ToolsPanelWrapper>
        <ToolsPanel />
      </ToolsPanelWrapper>
    </>
  );
}

export default RecipePage;

const RecipePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 auto;
  padding: 11px 18px 20px 18px;

  background: #ffffff;
  border-radius: 4px;
`;

const ToolsPanelWrapper = styled.div`
  position: sticky;
  bottom: 0;
  margin-left: -24px;

  width: calc(100% + 24px * 2);
`;
