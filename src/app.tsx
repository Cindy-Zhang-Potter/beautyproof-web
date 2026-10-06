import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import HomePage from "@/pages/HomePage/HomePage";
import VerifyPage from "@/pages/VerifyPage/VerifyPage";
import EvidencePage from "@/pages/EvidencePage/EvidencePage";
import AboutPage from "@/pages/AboutPage/AboutPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="verify" element={<VerifyPage />} />
        <Route path="evidence" element={<EvidencePage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
