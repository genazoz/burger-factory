import { FC } from "react";
import {DraggableLocation} from "react-beautiful-dnd";

export interface RouteType {
  path: string;
  component: FC;
}

export enum NavMenuNamesEnum {
  RECIPES = "Рецепты",
  PRICELIST = "Прайс-лист",
  COMBOSETS = "Комбо-наборы",
}

export interface IMenuItem<T> {
  text: T;
  link?: string;
  active?: boolean;
}

export interface INavMenu<T> {
  menuArray: IMenuItem<T>[];
  name?: T;
  idx?: number;
}

export interface IDropdownListItem {
  id: number;
  catId: number;
  text: string;
  link: string;
}

export interface IDropdownList {
  title: string;
  list: IDropdownListItem[];
}

export interface IDragProps {
  destination: DraggableLocation | null | undefined;
  source: { index: number; droppableId: string };
  type: string;
}
