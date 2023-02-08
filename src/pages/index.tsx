import { Route, Routes } from "react-router-dom";

import { paths } from "@/app/common/mocks";
import NotFoundPage from "@/pages/NotFoundPage/index";
import RecipePage from "@/pages/Recipes/components/RecipePage/components/RecipePage";
import PriceListPage from "@/pages/PriceList/components/PriceListPage/components/PriceListPage";
import ComboSetsPage from "@/pages/ComboSets/components/ComboSetsPage/components/ComboSetsPage";
import RecipesPage from "@/pages/Recipes/components/RecipesPage/components/RecipesPage";
import PrivateRoutes from "@/components/PrivateRoutes/PrivateRoutes";
import RecipesSection from "@/pages/Recipes/components/RecipesSection/components/RecipesSection";
import RecipeCategoryPage from "@/pages/Recipes/components/RecipeCategoryPage/components/RecipeCategoryPage";
import RecipeTimePage from "@/pages/Recipes/components/RecipePage/components/RecipeTimePage/components/RecipeTimePage";
import ComboSetsSection from "@/pages/ComboSets/components/ComboSetsSection/components/ComboSetsSection";
import PriceListSection from "@/pages/PriceList/components/PriceListSection/components/PriceListSection";
import RecipeSupplyPage from "@/pages/Recipes/components/RecipePage/components/RecipeSupplyPage/components/RecipeSupplyPage";
import RecipePageLayout from "@/pages/Recipes/components/RecipePage/components/RecipePageLayout";

export const Routing = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path={"recipes"} element={<RecipesSection />}>
          <Route index element={<RecipesPage />} />
          <Route path={":catId"} element={<RecipeCategoryPage />}></Route>
          <Route element={<RecipePageLayout />}>
            <Route path={":catId/:id"} element={<RecipePage />}></Route>
            <Route path={":catId/:id/time"} element={<RecipeTimePage />}></Route>
            <Route path={":catId/:id/supply"} element={<RecipeSupplyPage />}></Route>
          </Route>
        </Route>
        <Route element={<PriceListSection />} path={paths.priceList}>
          <Route index element={<PriceListPage />} />
        </Route>
        <Route element={<ComboSetsSection />} path={paths.comboSets}>
          <Route index element={<ComboSetsPage />} />
        </Route>
      </Route>
      <Route element={<NotFoundPage />} path={"*"}></Route>
    </Routes>
  );
};
