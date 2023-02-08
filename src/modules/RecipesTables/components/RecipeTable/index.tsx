import React, { FC, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import cloneDeepWith from "lodash.clonedeepwith";
import styled from "styled-components/macro";

import { recipesAction, selectRecipesData } from "../../store/recipes.slice";
import { useAppDispatch, useAppSelector } from "@/app/store/hook/hook";
import { ReactComponent as PlusIcon } from "@/app/assets/plus-icon.svg";
import { ReactComponent as MoreHorizontalIcon } from "@/app/assets/more-horizontal-icon.svg";
import { ReactComponent as CloseCircleIcon } from "@/app/assets/close-circle-icon.svg";
import TableRow from "@/modules/RecipesTables/components/TableRow";
import Button from "@/UI/Button";
import { uniqueId } from "@/app/common/common";
import { IDragProps } from "@/app/common/models";
import { isNotChecked } from "@/modules/RecipesTables/common";
import {
  IGroups,
  ITable,
  ITableRow,
  TableRowType,
} from "@/modules/RecipesTables/models";
import TableHead from "@/modules/RecipesTables/components/TableHead";
import { commonTheme } from "@/app/styles/themes";

interface IRecipeTableProps {
  recipeDataObj: ITable;
}

const RecipeTable: FC<IRecipeTableProps> = ({ recipeDataObj }) => {
  const { recipesData } = useAppSelector(selectRecipesData);
  const { setRecipesData } = recipesAction;
  const { data: recipesObj } = recipeDataObj;
  const dispatch = useAppDispatch();
  const [groups, setGroups] = useState<IGroups>({});

  const updateGroups = (items: ITableRow[]) => {
    const groups: IGroups = {};
    for (let i = 0; i < Object.keys(items).length; ++i) {
      const currentGroup = items[i];
      groups[currentGroup.id] = i;
    }

    // Makes the groups searchable via their id.
    setGroups(groups);
  };
  const buildAndSave = (items: ITableRow[]) => {
    updateRecipeDataArray(items);
    updateGroups(items);
  };
  const onDragEndHandle = (result: IDragProps) => {
    const { destination, source, type } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    if ("group" === type) {
      const sourceIndex = source.index;
      const targetIndex = destination.index;

      const workValue: ITableRow[] = recipesObj.slice();
      const [deletedItem] = workValue.splice(sourceIndex, 1);
      workValue.splice(targetIndex, 0, deletedItem);

      buildAndSave(workValue);

      return;
    }

    const sourceDroppableIndex = groups[source.droppableId];
    const targetDroppableIndex = groups[destination.droppableId];
    const sourceItems = recipesObj?.[sourceDroppableIndex]?.items?.slice();
    const targetItems =
      source.droppableId !== destination.droppableId
        ? recipesObj?.[targetDroppableIndex]?.items?.slice()
        : sourceItems;

    if (!sourceItems) return;
    // Pull the item from the source.
    const [deletedItem] = sourceItems?.splice(source.index, 1);
    targetItems?.splice(destination.index, 0, deletedItem);

    const workValue = recipesObj.slice();
    workValue[sourceDroppableIndex] = {
      ...recipesObj[sourceDroppableIndex],
      items: sourceItems,
    };
    workValue[targetDroppableIndex] = {
      ...recipesObj[targetDroppableIndex],
      items: targetItems,
    };

    updateRecipeDataArray(workValue);
  };
  const updateRecipeDataArray = (items: ITableRow[]) => {
    const updatedRecipesData = recipesData.map((recipeData) =>
      recipeData.id === recipeDataObj.id
        ? {
            ...recipeData,
            data: items,
          }
        : recipeData
    );
    dispatch(setRecipesData(getUpdatedCheckboxes(updatedRecipesData)));
  };
  const onClickRemoveTableButton = () => {
    dispatch(
      setRecipesData(
        recipesData.filter(
          (tableObj: ITable) => tableObj.id !== recipeDataObj.id
        )
      )
    );
  };
  const onClickAddIngredientButton = () => {
    const customizer = (val: any, key: any, parent: any) =>
      parent?.type === TableRowType.Common && key === "items"
        ? [
            ...val,
            {
              id: uniqueId(),
              name: "Новый ингредиент",
              type: TableRowType.Ingredient,
              checked: false,
            },
          ]
        : undefined;
    const updatedRecipesData = recipesData.map((tableObj: ITable) =>
      tableObj.id === recipeDataObj.id
        ? cloneDeepWith(tableObj, customizer)
        : tableObj
    );

    dispatch(setRecipesData(getUpdatedCheckboxes(updatedRecipesData)));
  };
  const onClickAddGroupButton = () => {
    const newCategoryObj = {
      id: uniqueId(),
      name: "Новая категория",
      type: TableRowType.Category,
      items: [],
      checked: false,
    };
    const updatedRecipesData: ITable[] = recipesData.map((tableObj: ITable) =>
      tableObj.id === recipeDataObj.id
        ? {
            ...tableObj,
            data: [...tableObj.data, newCategoryObj],
          }
        : tableObj
    );

    dispatch(setRecipesData(getUpdatedCheckboxes(updatedRecipesData)));
  };
  const onClickRemoveIngredientButton = (id: string) => {
    const updatedRecipesData = recipesData.map((tableObj: ITable) =>
      tableObj.id === recipeDataObj.id
        ? {
            ...tableObj,
            data: tableObj.data.map((obj: ITableRow) => ({
              ...obj,
              items: obj?.items?.filter((item: ITableRow) => item.id !== id),
            })),
          }
        : tableObj
    );

    dispatch(setRecipesData(getUpdatedCheckboxes(updatedRecipesData)));
  };
  const onClickRemoveCategoryButton = (id: string) => {
    const updatedRecipesData = recipesData.map((tableObj: ITable) =>
      tableObj.id === recipeDataObj.id
        ? {
            ...tableObj,
            data: tableObj.data.filter((obj: ITableRow) => obj.id !== id),
          }
        : tableObj
    );

    dispatch(setRecipesData(getUpdatedCheckboxes(updatedRecipesData)));
  };
  const getUpdatedCheckboxes = (defaultRecipesData: ITable[]) => {
    const categoryCustomizer = (val: any) => {
      if (val.items && val.type === TableRowType.Category) {
        const { checkedCount, allCheckboxesCount } = isNotChecked(val.items);
        if (checkedCount !== 0 || allCheckboxesCount !== 0) {
          return { ...val, checked: checkedCount === allCheckboxesCount };
        }
      }
    };
    const tableCustomizer = (val: any) => {
      if (val.id === recipeDataObj.id) {
        const { checkedCount, allCheckboxesCount } = isNotChecked(val.data);
        if (checkedCount !== 0 || allCheckboxesCount !== 0) {
          return { ...val, checked: checkedCount === allCheckboxesCount };
        }
      }
    };

    return cloneDeepWith(
      cloneDeepWith(defaultRecipesData, categoryCustomizer),
      tableCustomizer
    );
  };
  const onCheckboxChange = (params: {
    checked: boolean;
    id: string;
    field: string;
  }) => {
    const updatedRecipesData = cloneDeepWith(recipesData, (value) =>
      value.id === params.id
        ? value?.type === TableRowType.Category
          ? {
              ...value,
              [params.field]: params.checked,
              items: [
                ...value?.items?.map((item: ITableRow) => ({
                  ...item,
                  checked: params.checked,
                })),
              ],
            }
          : {
              ...value,
              [params.field]: params.checked,
            }
        : undefined
    );

    dispatch(setRecipesData(getUpdatedCheckboxes(updatedRecipesData)));
  };
  const onTableCheckboxChange = (checked: boolean) => {
    const customizer = (val: any, key: any) => {
      return key === "checked" ? checked : undefined;
    };

    const updatedRecipesData = recipesData.map((tableData: ITable) =>
      tableData.id === recipeDataObj.id
        ? {
            ...tableData,
            checked: checked,
            data: cloneDeepWith(tableData.data, customizer),
          }
        : { ...tableData }
    );

    dispatch(setRecipesData(updatedRecipesData));
  };
  const onInputBlur = (params: {
    value: string;
    id: string;
    field: string;
  }) => {
    const updatedRecipesData = cloneDeepWith(recipesData, (value) =>
      value.id === params.id
        ? {
            ...value,
            [params.field]: params.value,
          }
        : undefined
    );
    dispatch(setRecipesData(updatedRecipesData));
  };

  useEffect(() => {
    // Mock an API call.
    buildAndSave(recipesObj);
  }, []);
  useEffect(() => {
    updateGroups(recipesObj);
  }, [recipesObj]);

  return (
    <TableWrapper>
      <Header>
        <Title>
          {recipeDataObj.title}
          <CloseButton
            fill={commonTheme.colors.pink}
            onClick={onClickRemoveTableButton}
          />
        </Title>
        <Buttons>
          <Button
            theme={"outline"}
            icon={<PlusIcon fill={commonTheme.colors.pink} />}
            onClick={onClickAddIngredientButton}
          >
            Ингредиент
          </Button>
          <Button
            theme={"outline"}
            icon={<PlusIcon fill={commonTheme.colors.pink} />}
            onClick={onClickAddGroupButton}
          >
            Группа
          </Button>
        </Buttons>
      </Header>
      <TableHead
        checked={recipeDataObj.checked}
        onTableCheckboxChange={(checked) => onTableCheckboxChange(checked)}
        showCheckbox={
          recipesObj.length > 1 ||
          (recipesObj.length === 1 &&
            Number(recipesObj?.[0]?.items?.length) > 0)
        }
      />
      <DragDropContext onDragEnd={(result) => onDragEndHandle(result)}>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {recipesObj.map((item: ITableRow, index: number) => (
                <Draggable draggableId={item.id} key={item.id} index={index}>
                  {(providedUpper) => (
                    <div
                      {...providedUpper.draggableProps}
                      ref={providedUpper.innerRef}
                    >
                      <Droppable droppableId={item.id}>
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {item.type === TableRowType.Category && (
                              <Tr>
                                <MoveIconWrapper
                                  {...providedUpper.dragHandleProps}
                                >
                                  <MoreHorizontalIcon fill={"#C1C1C1"} />
                                </MoveIconWrapper>
                                <TableRow
                                  data={item}
                                  onClickRemoveButton={(id: string) =>
                                    onClickRemoveCategoryButton(id)
                                  }
                                  onCheckboxChange={(params: {
                                    checked: boolean;
                                    id: string;
                                    field: string;
                                  }) => onCheckboxChange(params)}
                                  onInputBlur={(params: {
                                    value: string;
                                    id: string;
                                    field: string;
                                  }) => onInputBlur(params)}
                                />
                              </Tr>
                            )}
                            {item.type === TableRowType.Common && (
                              <Tr>
                                <MoveIconWrapper
                                  {...providedUpper.dragHandleProps}
                                >
                                  <MoreHorizontalIcon fill={"#C1C1C1"} />
                                </MoveIconWrapper>
                                <Td>Ингредиенты</Td>
                              </Tr>
                            )}
                            <TBody>
                              {item?.items?.map(
                                (ingredient: ITableRow, index: number) => (
                                  <Draggable
                                    key={ingredient.id}
                                    draggableId={ingredient.id}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <Tr
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}
                                      >
                                        <MoveIconWrapper
                                          {...provided.dragHandleProps}
                                        >
                                          <MoreHorizontalIcon
                                            fill={"#C1C1C1"}
                                          />
                                        </MoveIconWrapper>
                                        <TableRow
                                          key={ingredient.id}
                                          data={ingredient}
                                          type={
                                            item.type ===
                                              TableRowType.Category &&
                                            "subcategory"
                                          }
                                          onClickRemoveButton={(id: string) =>
                                            onClickRemoveIngredientButton(id)
                                          }
                                          onCheckboxChange={(params: {
                                            checked: boolean;
                                            id: string;
                                            field: string;
                                          }) => onCheckboxChange(params)}
                                          onInputBlur={(params: {
                                            value: string;
                                            id: string;
                                            field: string;
                                          }) => onInputBlur(params)}
                                        />
                                      </Tr>
                                    )}
                                  </Draggable>
                                )
                              )}
                            </TBody>
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </TableWrapper>
  );
};
export default RecipeTable;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 0 20px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  gap: 6px;

  font-weight: 400;
  font-size: 21px;
  line-height: 25px;
  color: ${commonTheme.colors.blueGray};
`;

const Buttons = styled.div`
  display: flex;
  gap: 12px;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 14px;
`;

const TBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const Tr = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
  height: 40px;
`;

const Td = styled.div<{ isCategory?: boolean; isSubcategory?: boolean }>`
  overflow: hidden;
  display: flex;
  align-items: center;

  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  color: ${commonTheme.colors.black};
`;

const MoveIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 25px;

  cursor: grab;
`;

const CloseButton = styled(CloseCircleIcon)`
  cursor: pointer;
`;
