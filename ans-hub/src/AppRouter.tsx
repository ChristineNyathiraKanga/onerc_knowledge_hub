import { Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import LoginForm from "./components/auth/Login.tsx";
import { ProtectedRoute } from "./components/auth/ProtectedRoute.tsx";
import Home from "./components/dashboard/Home.tsx";
import AboutPage from "./components/about/About.tsx";
import PendingApprovalPage from "./components/pending-approval/PendingApproval.tsx";
import ErrorPage403 from "./components/error/ErrorPage403.tsx";
import ErrorPage404 from "./components/error/ErrorPage404.tsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<App />}>
        <Route path="/login" element={<LoginForm />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pending-approval" element={<PendingApprovalPage />} />
        </Route>

        <Route path="/403" element={<ErrorPage403 />} />
        <Route path="*" element={<ErrorPage404 />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
