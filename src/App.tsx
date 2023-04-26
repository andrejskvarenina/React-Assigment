import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharactersPage from "./pages/characters-page/characters-page";
import './App.css'
import { Navbar } from "./components/pagination/navbar";
import { useState } from "react";
import { Header } from "./components/header/header";
import CharacterDetailsPage from "./pages/character-details-page/character-details-page";

const App = () => {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [currentPage, setCurrentPage] = useState(1);

  return (
      <div className="app">
        <Router>
          <Header />
          <Navbar currentPage={currentPage} pages={pages}/>
          <Routes>
            <Route path="/" element={<CharactersPage page={1} setCurrentPage={setCurrentPage} />} />
            {pages.map((page) => (
              <Route key={page} path={`/page/${page}`} element={<CharactersPage page={page} setCurrentPage={setCurrentPage}/>} />
            ))}
            <Route path="/character/:id" element={<CharacterDetailsPage />} />
          </Routes>
        </Router>
    </div>
  );
};

export default App;