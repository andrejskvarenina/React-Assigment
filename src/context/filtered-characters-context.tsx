import { createContext, useContext, useState } from "react";
import { Character } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useGetAllCharacters } from "../hooks/useGetAllCharacters";
import { PageContext } from "./page-context";

type FilteredCharactersContextType = {
  filteredCharacters: Character[] | null;
  setFilteredCharacters: (characters: Character[] | null) => void;
  onFilterChange: (gender: string) => void;
};

export const FilteredCharactersContext = createContext<FilteredCharactersContextType>({
  filteredCharacters: null,
  setFilteredCharacters: () => {},
  onFilterChange: () => {},
});

type FilteredCharactersProviderProps = {
  children: React.ReactNode;
};

export const FilteredCharactersProvider: React.FC<FilteredCharactersProviderProps> = ({
  children,
}) => {
  const { currentPage, setTotalPages } = useContext(PageContext)
  const { allCharacters } = useGetAllCharacters();
  const [filteredCharacters, setFilteredCharacters] = useState<Character[] | null>(null);
 
  const navigate = useNavigate();

  const onFilterChange = (gender: string) => {
    let filtered: Character[] | null = [];
  
    if (gender === "male" || gender === "female") {
      filtered = allCharacters?.filter((character) => character.gender === gender) ?? [];
    } else if (gender === "other") {
      filtered = allCharacters?.filter(
        (character) => character.gender !== "male" && character.gender !== "female"
      ) ?? [];
    } else if (gender === "off") {
      filtered = null;
    } else {
      filtered = allCharacters ?? [];
    }
  
    setFilteredCharacters(filtered);
  
    if (currentPage !== 1) {
      navigate("/page/1");
    }
  
    // Calculate the total pages for filtered characters
    const filteredCharactersCount = filtered?.length ?? allCharacters?.length ?? 0;
    const totalPages = Math.ceil(filteredCharactersCount / 10);
    setTotalPages(totalPages);
  };

  return (
    <FilteredCharactersContext.Provider
      value={{ filteredCharacters, setFilteredCharacters, onFilterChange }}
    >
      {children}
    </FilteredCharactersContext.Provider>
  );
};
