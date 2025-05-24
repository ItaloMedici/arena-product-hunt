import { Route, Routes as RouterRoutes } from "react-router";
import { Home } from "./pages/Home";

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
    </RouterRoutes>
  );
};
