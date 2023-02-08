import { NavMenu } from "@/app/common/common";
import { navMenuArray } from "@/app/common/mocks";
import { NavMenuNamesEnum } from "@/app/common/models";
import { SubNavMenuNamesEnum } from "@/pages/Recipes/models";

export const menuLinks = NavMenu<NavMenuNamesEnum>({
  menuArray: navMenuArray,
  name: NavMenuNamesEnum.RECIPES,
});

export const breadcrumbsRecipe = [
  {
    text: "Рецепты",
    link: "/recipes",
  },
  {
    text: "Бургеры",
    link: "/recipes/1",
  },
  {
    text: "Классический",
    link: "/",
    active: true,
  },
];

export const breadcrumbsRecipesCategory = [
  {
    text: "Рецепты",
    link: "/recipes",
  },
  {
    text: "Бургеры",
    link: "/recipes/1",
    active: true,
  },
];

export const breadcrumbsRecipes = [
  {
    text: "Рецепты",
    link: "/recipes",
    active: true,
  },
];

export const sandwichesMenu = [
  {
    text: "Классический",
    link: "/recipes/1/1",
    catId: 1,
    id: 1
  },
  {
    text: "С ветчиной",
    link: "/recipes/1/2",
    catId: 1,
    id: 2
  },
  {
    text: "С бараниной",
    link: "/recipes/1/3",
    catId: 1,
    id: 3
  },
];

export const burgersMenu = [
  {
    text: "Классический",
    link: "/recipes/2/1",
    catId: 2,
    id: 1
  },
  {
    text: "Чизбургер",
    link: "/recipes/2/2",
    catId: 2,
    id: 2
  },
  {
    text: "БигМак",
    link: "/recipes/2/3",
    catId: 2,
    id: 3
  },
  {
    text: "Биг Тейсти",
    link: "/recipes/2/4",
    catId: 2,
    id: 4
  },
];

export const baguetteMenu = [
  {
    text: "С ветчиной",
    link: "/recipes/3/1",
    catId: 3,
    id: 1
  },
  {
    text: "С пастрами",
    link: "/recipes/3/2",
    catId: 3,
    id: 2
  },
  {
    text: "Чесночный",
    link: "/recipes/3/3",
    catId: 3,
    id: 3
  },
  {
    text: "С перцем-гриль",
    link: "/recipes/3/4",
    catId: 3,
    id: 4
  },
];
