import React, { FC, PropsWithChildren } from "react";

import Layout from "@/modules/Layout/components/Layout";
import Sidebar from "@/components/Sidebar";
import RecipesSectionAside from "@/pages/Recipes/components/RecipesSection/components/RecipesSectionAside";

const RecipesSectionLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Layout
      type={"aside"}
      sidebar={
        <Sidebar showLogo={true}>
          <RecipesSectionAside />
        </Sidebar>
      }
    >
      {children}
    </Layout>
  );
};

export default RecipesSectionLayout;
