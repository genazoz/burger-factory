import { NavMenuNamesEnum } from "@/app/common/models";
import { NavMenu } from "@/app/common/common";
import { navMenuArray } from "@/app/common/mocks";

export const menuLinks = NavMenu<NavMenuNamesEnum>({
  menuArray: navMenuArray,
  name: NavMenuNamesEnum.COMBOSETS,
});
