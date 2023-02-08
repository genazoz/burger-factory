import { NavMenuNamesEnum } from "@/app/common/models";

export const paths = {
  recipes: "/recipes",
  priceList: "/price-list",
  comboSets: "/combo-sets",
};

export const navMenuArray = [
  {
    text: NavMenuNamesEnum.RECIPES,
    link: paths.recipes,
  },
  {
    text: NavMenuNamesEnum.PRICELIST,
    link: paths.priceList,
  },
  {
    text: NavMenuNamesEnum.COMBOSETS,
    link: paths.comboSets,
  },
];
