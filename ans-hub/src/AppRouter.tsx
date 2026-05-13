import { Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import DashboardLayout from "./components/layout/DashboardLayout.tsx";
import LoginForm from "./components/auth/Login.tsx";
import Home from "./components/dashboard/Home.tsx";
import AboutPage from "./components/about/About.tsx";
import PendingApprovalPage from "./components/pending-approval/PendingApproval.tsx";
import NewsIndex from "./components/news/NewsIndex.tsx";
import NewsDetail from "./components/news/NewsDetail.tsx";
import EventsIndex from "./components/events/EventsIndex.tsx";
import EventDetail from "./components/events/EventDetail.tsx";
import Knowledge from "./components/knowledge/Knowledge.tsx";
import Pillars from "./components/pillars/Pillars.tsx";
import ErrorPage403 from "./components/error/ErrorPage403.tsx";
import ErrorPage404 from "./components/error/ErrorPage404.tsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<App />}>
        {/* Standalone routes (no sidebar) */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/pending-approval" element={<PendingApprovalPage />} />
        <Route path="/403" element={<ErrorPage403 />} />

        {/* Dashboard routes (with sidebar layout) */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/news" element={<NewsIndex />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/events" element={<EventsIndex />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/pillars" element={<Pillars />} />
          <Route path="*" element={<ErrorPage404 />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
