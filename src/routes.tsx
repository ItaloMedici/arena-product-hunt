import { Route, Routes as RouterRoutes } from "react-router";
import { Home } from "./pages/Home";
import { ProductView } from "./pages/ProductView";

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route index element={<Home />} />
      <Route path=":slug" element={<ProductView />} />
    </RouterRoutes>
  );
};
