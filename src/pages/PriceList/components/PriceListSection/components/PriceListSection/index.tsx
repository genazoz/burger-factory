import React from "react";
import { Outlet } from "react-router-dom";

import PriceListSectionLayout from "@/pages/PriceList/components/PriceListSection/components/PriceListSectionLayout";

function PriceListSection() {
  return (
    <PriceListSectionLayout>
      <Outlet />
    </PriceListSectionLayout>
  );
}

export default PriceListSection;
