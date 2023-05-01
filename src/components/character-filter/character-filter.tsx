import { useContext, useState } from "react";
import "./character-filter.css";
import { FilteredCharactersContext } from "../../context/filtered-characters-context";

export const CharacterFilter = () => {
  const { onFilterChange, filteredCharacters } = useContext(FilteredCharactersContext)
  const [selectedGender, setSelectedGender] = useState("");

  const handleFilterClick = (gender: string) => {
    onFilterChange(gender);
    setSelectedGender(gender);
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
              onFilterChange("off")
              setSelectedGender("");
            }}
          >
            Turn Filter Off
          </button>
        )}
      </div>
      <input type="text" />
    </div>
  );
  
};
