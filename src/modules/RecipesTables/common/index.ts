import { TableRowType } from "@/modules/RecipesTables/models";

export const isNotChecked = (obj: any) => {
  let checkboxesChecked = 0;
  let checkboxesCount = 0;
  let commonWeight = 0;

  getProp(obj);

  function getProp(o: any) {
    for (let prop in o) {
      if (typeof o[prop] === "object") {
        getProp(o[prop]);
      } else {
        if (prop === "checked") {
          checkboxesCount++;
          if (o[prop]) {
            checkboxesChecked++;

            if (
              o.hasOwnProperty("weight") &&
              o?.type === TableRowType.Ingredient
            ) {
              commonWeight = commonWeight + Number(o?.weight);
            }
          }
        }
      }
    }
  }

  return {
    checkedCount: checkboxesChecked,
    allCheckboxesCount: checkboxesCount,
    commonWeight,
  };
};
