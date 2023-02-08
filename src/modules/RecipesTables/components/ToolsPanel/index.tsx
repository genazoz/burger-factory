import React, { FC } from "react";
import styled from "styled-components/macro";
import cloneDeepWith from "lodash.clonedeepwith";

import Button from "@/UI/Button";
import { ReactComponent as CloseCircleIcon } from "@/app/assets/close-circle-icon.svg";
import { ReactComponent as CopyIcon } from "@/app/assets/copy-icon.svg";
import { ReactComponent as MinusSquareIcon } from "@/app/assets/minus-square-icon.svg";
import { useAppDispatch, useAppSelector } from "@/app/store/hook/hook";
import {
  recipesAction,
  selectRecipesData,
} from "@/modules/RecipesTables/store/recipes.slice";
import { uniqueId } from "@/app/common/common";
import { isNotChecked } from "@/modules/RecipesTables/common";
import {
  ITable,
  ITableRow,
  TableRowType,
} from "@/modules/RecipesTables/models";
import { commonTheme } from "@/app/styles/themes";

export const ToolsPanel: FC = () => {
  const { recipesData } = useAppSelector(selectRecipesData);
  const dispatch = useAppDispatch();
  const { setRecipesData } = recipesAction;

  const getCountOfCheckedIngredients = () => {
    const { checkedCount, commonWeight } = isNotChecked(
      recipesData.map((tableObj: ITable) => tableObj.data)
    );

    return { checkedCount, commonWeight };
  };
  const getObjWithoutSelectedCheckboxes = (obj: ITable[]) => {
    const customizer = (val: any, key: any) =>
      key === "checked" && val ? false : undefined;

    return cloneDeepWith(obj, customizer);
  };
  const onClickDeselectButton = () => {
    dispatch(setRecipesData(getObjWithoutSelectedCheckboxes(recipesData)));
  };
  const onClickDeleteButton = () => {
    const categoriesCustomizer = (val: any) => {
      if (val.hasOwnProperty("data") && val?.type === "table") {
        return {
          ...val,
          data: val.data.filter((item: ITableRow) => !item?.checked),
        };
      }
    };
    const ingredientsCustomizer = (val: any) => {
      if (val.hasOwnProperty("items")) {
        return {
          ...val,
          items: val.items.filter((item: ITableRow) => !item?.checked),
        };
      }
    };
    const recipesDataUpdatedByCategories = cloneDeepWith(
      recipesData,
      categoriesCustomizer
    );
    const recipesDataUpdatedByBlock = cloneDeepWith(
      recipesDataUpdatedByCategories,
      ingredientsCustomizer
    );

    dispatch(setRecipesData(recipesDataUpdatedByBlock));
  };
  const onClickCopyButton = () => {
    const newTableObj: ITable = {
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
    };

    const categoriesCustomizer = (val: any) => {
      if (val?.type === TableRowType.Category) {
        const { checkedCount, allCheckboxesCount } = isNotChecked(val.items);

        if (
          (val?.checked && !allCheckboxesCount) ||
          (allCheckboxesCount && allCheckboxesCount === checkedCount)
        ) {
          newTableObj.data.push({
            ...val,
            id: uniqueId(),
            items: val.items.map((item: ITableRow) => ({
              ...item,
              id: uniqueId(),
            })),
          });
          return null;
        }
      }
    };
    const ingredientsCustomizer = (val: any) => {
      if (val?.type === TableRowType.Ingredient && val?.checked) {
        newTableObj?.data?.[0]?.items?.push({ ...val, id: uniqueId() });
        return null;
      }
    };
    const recipesDataUpdatedByCategories = cloneDeepWith(
      recipesData,
      categoriesCustomizer
    );
    cloneDeepWith(recipesDataUpdatedByCategories, ingredientsCustomizer);

    dispatch(
      setRecipesData(
        getObjWithoutSelectedCheckboxes([...recipesData, newTableObj])
      )
    );
  };

  const ingredientCount = getCountOfCheckedIngredients().checkedCount;
  const commonWeight = getCountOfCheckedIngredients().commonWeight;

  return (
    <>
      {ingredientCount && (
        <ToolsPanelEl>
          <ButtonsWrapper>
            <Button
              icon={<CloseCircleIcon />}
              theme={"outline"}
              textColor={commonTheme.colors.mediumBlue}
              color={commonTheme.colors.mediumWhite}
              onClick={() => onClickDeleteButton()}
            >
              Удалить
            </Button>
            <Button
              icon={<CopyIcon />}
              theme={"outline"}
              textColor={commonTheme.colors.mediumBlue}
              color={commonTheme.colors.mediumWhite}
              onClick={() => onClickCopyButton()}
            >
              Копировать
            </Button>
            <Button
              icon={<MinusSquareIcon />}
              theme={"outline"}
              textColor={commonTheme.colors.mediumBlue}
              color={commonTheme.colors.mediumWhite}
              onClick={() => onClickDeselectButton()}
            >
              Снять выделения
            </Button>
          </ButtonsWrapper>
          <InfosWrapper>
            <InfoWrapper>
              Выбранные ингредиенты:
              <span>{ingredientCount}</span>
            </InfoWrapper>
            <Separator />
            <InfoWrapper>
              Общий вес:
              <span>{commonWeight}</span>
            </InfoWrapper>
          </InfosWrapper>
        </ToolsPanelEl>
      )}
    </>
  );
};

const ToolsPanelEl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 24px;

  background: #ffffff;
  box-shadow: 0px -1px 10px rgba(77, 77, 77, 0.12);
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const InfosWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #686868;

  span {
    font-weight: 600;
    color: ${commonTheme.colors.black};
  }
`;

const Separator = styled.span`
  height: 26px;
  width: 1px;

  background-color: #dadada;
`;
