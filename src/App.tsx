import { Route, Routes } from "react-router-dom";
import './App.css'
import { Navbar } from "./components/navbar/navbar";
import { Header } from "./components/header/header";
import CharacterDetailsPage from "./pages/character-details-page/character-details-page";
import CharactersPage from "./pages/characters-page/characters-page";

const App = () => {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
      <div className="app">
          <Header />
          <Navbar pages={pages}/>
          
          <Routes>
            <Route path="/" element={<CharactersPage page={1} />} />
            {pages.map((page) => (
              <Route key={page} path={`/page/${page}`} element={<CharactersPage page={page} />} />
            ))}
            <Route path="/character/:id" element={<CharacterDetailsPage />} />
          </Routes>
    </div>
  );
};

export default App;