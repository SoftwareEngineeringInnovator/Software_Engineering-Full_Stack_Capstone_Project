import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import IncidentsPage from "./pages/IncidentsPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/incidents" element={<IncidentsPage />} />
    </Routes>
  );
}

export default App;