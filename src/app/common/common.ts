import { IMenuItem, INavMenu } from "@/app/common/models";

export const NavMenu = <T>({ menuArray, name, idx }: INavMenu<T>) => {
  const getMenu = () => {
    if (menuArray) {
      if (name) {
        return [...menuArray].map((item) =>
          item.text === name ? { ...item, active: true } : item
        );
      } else if (idx) {
        return [...menuArray].map((item: IMenuItem<T>, index: number) => {
          return index + 1 === idx ? { ...item, active: true } : item;
        });
      } else {
        return menuArray;
      }
    } else {
      return [];
    }
  };

  return getMenu();
};

export const uniqueId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};
