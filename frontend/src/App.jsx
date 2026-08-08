import { Route, Routes } from "react-router";
import Navigation from "./components/Navigation.jsx";
import HomePage from "./pages/HomePage.jsx";
import IncidentsPage from "./pages/IncidentsPage.jsx";
import CreateIncidentPage from "./pages/CreateIncidentPage.jsx";
import IncidentDetailsPage from "./pages/IncidentDetailsPage.jsx";


function App() {
  return (
    <>
      <Navigation />

      <Routes>
        {/* Displays the Home page */}
        <Route path="/" element={<HomePage />} />

        {/* Displays the page that lists the reported cybersecurity incidents */}
        <Route path="/incidents" element={<IncidentsPage />} />

        {/* Displays the form where users can report a cybersecurity incident */}
        <Route path="/incidents/new" element={<CreateIncidentPage />} />

        {/* Displays one incident based on the ID */}
        <Route path="/incidents/:id" element={<IncidentDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;