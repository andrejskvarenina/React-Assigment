import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import './characters-page.css'
import { useEffect } from "react"
import { CharacterCard } from "../../components/character-card/character-card"

type CharactersPageProps = {
  page: number;
  setCurrentPage: (page: number) => void;
}

const CharactersPage = ({ page, setCurrentPage }: CharactersPageProps) => {
  
  const { data: characters, isError, isLoading } = useQuery(
    ["chars", page],
    async () => {
      return await axios
        .get(`https://swapi.dev/api/people/?page=${page}`)
        .then((res: { data: any }) =>
          res.data.results.map((character: any, index: number) => ({
            ...character,
            id: (page - 1) * 10 + index + 1,
          }))
        );
    }
  );

  useEffect(() => {
    setCurrentPage(page);
  }, [page, setCurrentPage]);


  if (isLoading) {
    return (
      <h1>loading</h1>
    )
  }

  if (isError || !characters) {
    return (
      <h1>There was an error while loading data.</h1>
    )
  }
  

  return (
      <div className="characters">
        {characters?.map((character : any, index: any) => (
          <CharacterCard character={character} key={index}/>
        ))}
      </div>
  )
}

export default CharactersPage;
