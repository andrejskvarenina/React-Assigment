import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Character } from "../types/types";

const fetchAllCharacters = async () => {
  let fetchedCharacters: Character[] = [];
  let nextPage = 1;
  let hasMorePages = true;
  const brokenCharacterId = 17;

  while (hasMorePages) {
    const response = await axios.get(`https://swapi.dev/api/people/?page=${nextPage}`);
    const charactersData = response.data.results;
    nextPage += 1;
    hasMorePages = response.data.next !== null;

    const charactersWithId = charactersData.map((character: Character, index: number) => {
      const id = (nextPage - 2) * 10 + index + 1;
      const adjustedId = id >= brokenCharacterId ? id + 1 : id;
      return { ...character, id: adjustedId };
    });

    fetchedCharacters = [...fetchedCharacters, ...charactersWithId];
  }

  // Filter out the broken character
  fetchedCharacters = fetchedCharacters.filter((character) => character.id !== brokenCharacterId);

  return fetchedCharacters;
};


export const useGetAllCharacters = () => {
  const { data: allCharacters, isError: isAllCharactersError, isLoading: isAllCharactersLoading } = useQuery(
    ["allCharacters"],
    fetchAllCharacters
  );

  return { allCharacters, isAllCharactersError, isAllCharactersLoading };
};
