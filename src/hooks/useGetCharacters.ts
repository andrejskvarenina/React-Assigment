import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useContext } from "react";
import { PageContext } from "../context/page-context";

export const useGetCharacters = () => {
  const { currentPage } = useContext(PageContext)

  const { data: characters, isError: isCharactersError, isLoading: isCharactersLoading } = useQuery(
    ["characters", currentPage],
    async () => {
      return await axios
        .get(`https://swapi.dev/api/people/?page=${currentPage}`)
        .then((res: { data: any }) => {
          const brokenCharacterId = 17;

          return res.data.results.map((character: any, index: number) => {
            const id = (currentPage - 1) * 10 + index + 1;
            const adjustedId = id >= brokenCharacterId ? id + 1 : id;
            return { ...character, id: adjustedId };
          });
        });
    }
  );

  return { characters, isCharactersError, isCharactersLoading }
}
