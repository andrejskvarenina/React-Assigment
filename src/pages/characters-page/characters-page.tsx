import './characters-page.css'
import { useEffect } from "react"
import { CharacterCard } from "../../components/character-card/character-card"
import { useGetCharacters } from '../../hooks/useGetCharacters'
import { useContext } from 'react'
import { PageContext } from '../../context/page-context'

type CharactersPageProps = {
  page: number;
}

const CharactersPage = ({ page }: CharactersPageProps) => {
  
  const { characters, isCharactersError, isCharactersLoading } = useGetCharacters()
  const { setCurrentPage } = useContext(PageContext)

  useEffect(() => {
    setCurrentPage(page);
  }, [page, setCurrentPage]);


  if (isCharactersLoading) {
    return (
      <h1>loading</h1>
    )
  }

  if (isCharactersError || !characters) {
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
