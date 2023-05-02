import { useContext } from "react";
import "./character-filter.css";
import { FilteredCharactersContext } from "../../context/filtered-characters-context";

export const CharacterFilter = () => {
  const { onFilterChange, filteredCharacters, selectedGender, setSelectedGender, searchValue, setSearchValue, onSearchChange } = useContext(FilteredCharactersContext)
  
  const handleFilterClick = (gender: string) => {
    onFilterChange(gender);
    setSelectedGender(gender);
    setSearchValue("")
  };

  return (
    <div className="filter-component">
      <div className="gender-filter">
        <button
          className={`gender-button ${selectedGender === "male" ? "active" : ""}`}
          onClick={() => handleFilterClick("male")}
        >
          Male
        </button>
        <button
          className={`gender-button ${selectedGender === "female" ? "active" : ""}`}
          onClick={() => handleFilterClick("female")}
        >
          Female
        </button>
        <button
          className={`gender-button ${selectedGender === "other" ? "active" : ""}`}
          onClick={() => handleFilterClick("other")}
        >
          Others
        </button>
        {filteredCharacters && (
          <button
            className="gender-button"
            onClick={() => {
              onFilterChange("off");
              setSelectedGender("");
              setSearchValue("");
            }}
          >
            Turn Filter / Search Off
          </button>
        )}
      </div>
      <input
        className="name-search-input"
        placeholder="Search by Name"
        type="text"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
  
};
