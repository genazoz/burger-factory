import React, { FC } from "react";
import styled from "styled-components/macro";

import { uniqueId } from "@/app/common/common";
import Button from "@/UI/Button";
import { ReactComponent as PlusIcon } from "@/app/assets/plus-icon.svg";
import { useAppDispatch, useAppSelector } from "@/app/store/hook/hook";
import {
  recipesAction,
  selectRecipesData,
} from "@/modules/RecipesTables/store/recipes.slice";
import { ITable, TableRowType } from "@/modules/RecipesTables/models";
import RecipeTable from "@/modules/RecipesTables/components/RecipeTable";

export const RecipesTables: FC = () => {
  const { recipesData } = useAppSelector(selectRecipesData);
  const { setRecipesData } = recipesAction;
  const dispatch = useAppDispatch();

  const onClickAddTableButton = () => {
    dispatch(
      setRecipesData([
        ...recipesData,
        {
          title: "Новый блок",
          type: "table",
          id: uniqueId(),
          checked: false,
          data: [
            {
              id: uniqueId(),
              type: TableRowType.Common,
              name: "Ингредиенты",
              items: [],
            },
          ],
        },
      ])
    );
  };

  return (
    <>
      {recipesData?.map((tableData: ITable) => (
        <RecipeTable recipeDataObj={tableData} key={tableData.id} />
      ))}
      <AddButton
        icon={<PlusIcon fill={"#FFFFFF"} />}
        onClick={() => onClickAddTableButton()}
      >
        Новый блок
      </AddButton>
    </>
  );
};

const AddButton = styled(Button)`
  margin: 8px 0 0;
`;
