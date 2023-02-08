import { combineReducers } from "redux";
import { recipesReducer } from "@/modules/RecipesTables/index";

export default combineReducers({
  recipes: recipesReducer,
});
