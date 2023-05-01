import { useContext } from "react";
import "./character-filter.css";
import { FilteredCharactersContext } from "../../context/filtered-characters-context";

export const CharacterFilter = () => {
  const { onFilterChange } = useContext(FilteredCharactersContext)

  return (
    <div className="filter-component">
      <div className="gender-filter">
        <button onClick={() => onFilterChange("male")}>Male</button>
        <button onClick={() => onFilterChange("female")}>Female</button>
        <button onClick={() => onFilterChange("other")}>Others</button>
      </div>
      <input type="text" />
    </div>
  );
};
