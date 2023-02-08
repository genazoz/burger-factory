import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";
import { uniqueId } from "@/app/common/common";
import { ITable, TableRowType } from "@/modules/RecipesTables/models";

export type RecipesState = {
  recipesData: ITable[];
};

const initialState: RecipesState = {
  recipesData: [
    {
      title: "Основа",
      id: uniqueId(),
      type: "table",
      checked: false,
      data: [
        {
          id: uniqueId(),
          type: TableRowType.Common,
          name: "Ингредиенты",
          items: [
            {
              id: uniqueId(),
              name: "Кетчуп",
              weight: "12",
              type: TableRowType.Ingredient,
              checked: false,
              calories: "130",
              remark: "Uncle Benz, Махеев или аналоги...",
            },
            {
              id: uniqueId(),
              name: "Майонез",
              type: TableRowType.Ingredient,
              weight: "12",
              checked: true,
              calories: "130",
              remark: "Calve",
            },
          ],
        },
        {
          id: uniqueId(),
          name: "Соус1",
          type: TableRowType.Category,
          weight: "12",
          checked: false,
          calories: "130",
          remark: "",
          items: [
            {
              id: uniqueId(),
              name: "Кетчуп",
              type: TableRowType.Ingredient,
              weight: "12",
              checked: false,
              calories: "130",
              remark: "Uncle Benz, Махеев или аналоги...",
            },
            {
              id: uniqueId(),
              name: "Майонез",
              type: TableRowType.Ingredient,
              weight: "12",
              checked: false,
              calories: "130",
              remark: "Calve",
            },
          ],
        },
        {
          id: uniqueId(),
          name: "Соус2",
          type: TableRowType.Category,
          checked: false,
          weight: "12",
          calories: "130",
          remark: "",
          items: [
            {
              id: uniqueId(),
              name: "Кетчуп",
              weight: "12",
              type: TableRowType.Ingredient,
              checked: false,
              calories: "130",
              remark: "Uncle Benz, Махеев или аналоги...",
            },
            {
              id: uniqueId(),
              name: "Майонез",
              type: TableRowType.Ingredient,
              weight: "12",
              checked: false,
              calories: "130",
              remark: "Calve",
            },
          ],
        },
      ],
    },
  ],
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipesData: (state, action: PayloadAction<ITable[]>) => {
      state.recipesData = action.payload;
    },
  },
});

export const recipesReducer = recipesSlice.reducer;
export const recipesAction = recipesSlice.actions;
export const selectRecipesData = (state: RootState) => state.recipes;
