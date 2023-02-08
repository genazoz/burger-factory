export interface ITable {
  title: string;
  type: "table";
  id: string;
  checked: boolean;
  data: ITableRow[];
}

export interface ITableRow {
  id: string;
  type: TableRowType;
  name: string;
  checked?: boolean;
  items?: ITableRow[];
  weight?: string;
  calories?: string;
  remark?: string;
}

export enum TableRowType {
  Category = "category",
  Common = "common",
  Ingredient = "ingredient",
}

export interface IGroups {
  [key: string]: number;
}
