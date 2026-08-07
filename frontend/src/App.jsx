import { Route, Routes } from "react-router";
import Navigation from "./components/Navigation.jsx";
import HomePage from "./pages/HomePage.jsx";
import IncidentsPage from "./pages/IncidentsPage.jsx";
import CreateIncidentPage from "./pages/CreateIncidentPage.jsx";

function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/incidents" element={<IncidentsPage />} />
        <Route path="/incidents/new" element={<CreateIncidentPage />} />
      </Routes>
    </>
  );
}

export default App;