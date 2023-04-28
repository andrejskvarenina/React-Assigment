import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetCharacter = (id: string | null) => {
  const { data: character, isError: isCharacterError, isLoading: isCharacterLoading } = useQuery(["character", id], async () => {
    const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
    return response.data;
  }, {
    enabled: !!id
  });

  return { character, isCharacterError, isCharacterLoading };
};
