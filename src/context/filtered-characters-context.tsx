import { createContext, useContext, useState } from "react";
import { Character } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useGetAllCharacters } from "../hooks/useGetAllCharacters";
import { PageContext } from "./page-context";

type FilteredCharactersContextType = {
  filteredCharacters: Character[] | null;
  setFilteredCharacters: (characters: Character[] | null) => void;
  onFilterChange: (gender: string) => void;
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  onSearchChange: (search: string) => void;
};

export const FilteredCharactersContext = createContext<FilteredCharactersContextType>({
  filteredCharacters: null,
  setFilteredCharacters: () => {},
  onFilterChange: () => {},
  selectedGender: "",
  setSelectedGender: () => {},
  searchValue: "",
  setSearchValue: () => {},
  onSearchChange: () => {},
});

type FilteredCharactersProviderProps = {
  children: React.ReactNode;
};

export const FilteredCharactersContextProvider: React.FC<FilteredCharactersProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();

  const { currentPage, setTotalPages } = useContext(PageContext)
  const { allCharacters } = useGetAllCharacters();

  const [filteredCharacters, setFilteredCharacters] = useState<Character[] | null>(null);
  const [selectedGender, setSelectedGender] = useState("");

  const [searchValue, setSearchValue] = useState("");
   
  const onFilterChange = (gender: string) => {
    let filtered: Character[] | null = [];
  
    if (gender === "male" || gender === "female") {
      filtered = allCharacters?.filter((character) => character.gender === gender) ?? [];
    } else if (gender === "other") {
      filtered = allCharacters?.filter(
        (character) => (character.gender !== "male" && character.gender !== "female")
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

  const onSearchChange = (search: string) => {
    setSelectedGender("");
    onFilterChange("off");
  
    setSearchValue(search);
    if (search) {
      const searchedCharacters = allCharacters?.filter((character) =>
        character.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCharacters(searchedCharacters ?? null);
  
      // Calculate the total pages for searched characters
      const searchedCharactersCount = searchedCharacters?.length ?? 0;
      const totalPages = Math.ceil(searchedCharactersCount / 10);
      setTotalPages(totalPages);
    } else {
      setFilteredCharacters(null);
    }
  };
  

  return (
    <FilteredCharactersContext.Provider
    value={{
      filteredCharacters,
      setFilteredCharacters,
      onFilterChange,
      selectedGender,
      setSelectedGender,
      searchValue,
      setSearchValue,
      onSearchChange,
    }}
    >
      {children}
    </FilteredCharactersContext.Provider>
  );
};
