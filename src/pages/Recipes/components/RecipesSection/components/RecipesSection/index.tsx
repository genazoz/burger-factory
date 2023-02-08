import React from "react";
import { Outlet } from "react-router-dom";

import RecipesSectionLayout from "@/pages/Recipes/components/RecipesSection/components/RecipesSectionLayout";

function RecipesSection() {
  return (
    <RecipesSectionLayout>
      <Outlet />
    </RecipesSectionLayout>
  );
}

export default RecipesSection;
