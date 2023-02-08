import React from "react";
import { Outlet } from "react-router-dom";
import ComboSetsSectionLayout from "@/pages/ComboSets/components/ComboSetsSection/components/ComboSetsSectionLayout";

function ComboSetsSection() {
  return (
    <ComboSetsSectionLayout>
      <Outlet />
    </ComboSetsSectionLayout>
  );
}

export default ComboSetsSection;
