import './characters-page.css'
import { useEffect, useState } from "react"
import { CharacterCard } from "../../components/character-card/character-card"
import { useContext } from 'react'
import { PageContext } from '../../context/page-context'
import { CharacterFilter } from '../../components/character-filter/character-filter'
import { useGetAllCharacters } from '../../hooks/useGetAllCharacters';
import { Character } from '../../types/types';
import { FilteredCharactersContext } from '../../context/filtered-characters-context';
import { Loader } from '../../components/loader/loader'

type CharactersPageProps = {
  page: number;
}

const CharactersPage = ({ page }: CharactersPageProps) => {
  const { setCurrentPage } = useContext(PageContext)
  const { allCharacters, isAllCharactersError, isAllCharactersLoading } = useGetAllCharacters();
  const { filteredCharacters } = useContext(FilteredCharactersContext)
  const [displayedCharacters, setDisplayedCharacters] = useState<Character[] | null>(null);

  useEffect(() => {
    if (filteredCharacters) {
      setDisplayedCharacters(filteredCharacters.slice((page - 1) * 10, page * 10));
    } else if (allCharacters) {
      setDisplayedCharacters(allCharacters.slice((page - 1) * 10, page * 10));
    }
  }, [allCharacters, filteredCharacters, page]);

  useEffect(() => {
    setCurrentPage(page);
  }, [page, setCurrentPage]);

  if (isAllCharactersLoading) {
    return (
      <Loader />
    )
  }

  if (isAllCharactersError || !allCharacters) {
    return (
      <h1>There was an error while loading data.</h1>
    )
  }
  
  return (
    <div className="characters-page">
      <CharacterFilter />
      <div className="characters">
      {displayedCharacters?.map((character: Character, index: number) => (
        <CharacterCard character={character} key={index} />
      ))}
      </div>
    </div>
  );
}

export default CharactersPage;
