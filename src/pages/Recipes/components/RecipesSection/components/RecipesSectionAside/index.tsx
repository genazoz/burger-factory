import React, { FC, useState } from "react";
import styled from "styled-components/macro";
import ListDropdown from "@/UI/DropdownList";
import {
  baguetteMenu,
  burgersMenu,
  sandwichesMenu,
} from "@/pages/Recipes/mocks";
import { useParams } from "react-router";
import {IDropdownList, IDropdownListItem} from "@/app/common/models";

interface IRecipesSectionAsideProps {}

const RecipesSectionAside: FC<IRecipesSectionAsideProps> = ({}) => {
  const { catId, id } = useParams();

  const [menuData, setMenuData] = useState<IDropdownList[]>([
    {
      title: "Сендвичи",
      list: sandwichesMenu,
    },
    {
      title: "Бургеры",
      list: burgersMenu,
    },
    {
      title: "Багет",
      list: baguetteMenu,
    },
  ]);

  return (
    <RecipesSectionAsideEl>
      {menuData?.map(({ title, list }: IDropdownList, idx: number) => (
        <ListDropdown
          key={idx}
          title={title}
          list={list.map((item: IDropdownListItem) =>
            Number(item.catId) === Number(catId) &&
            Number(item.id) === Number(id)
              ? { ...item, active: true }
              : item
          )}
        />
      ))}
    </RecipesSectionAsideEl>
  );
};

export default RecipesSectionAside;

const RecipesSectionAsideEl = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
