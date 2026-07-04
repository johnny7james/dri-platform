import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ResearchPage from "./pages/ResearchPage";
import ReportsPage from "./pages/ReportsPage";
import DivisionsPage from "./pages/DivisionsPage";
import InsightsPage from "./pages/InsightsPage";
import AboutPage from "./pages/AboutPage";
import PublicationPage from "./pages/PublicationPage";
import InsightPage from "./pages/InsightPage";
import SubscribePage from "./pages/SubscribePage";
import SearchPage from "./pages/SearchPage";
import SavedLibraryPage from "./pages/SavedLibraryPage";
import StudioPage from "./pages/StudioPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/divisions" element={<DivisionsPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/publication/:publicationId" element={<PublicationPage />} />
        <Route path="/insight/:insightId" element={<InsightPage />} />
        <Route path="/subscribe" element={<SubscribePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/library" element={<SavedLibraryPage />} />
        <Route path="/studio" element={<StudioPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
