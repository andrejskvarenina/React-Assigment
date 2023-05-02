import './character-details-page.css';
import { useParams } from 'react-router-dom';
import { useGetCharacter } from '../../hooks/useGetCharacter';
import { Loader } from '../../components/loader/loader';

const CharacterDetailsPage = () => {

  const { id } = useParams<{ id: string }>();
  const { character, isCharacterLoading, isCharacterError } = useGetCharacter(id ?? null);

  if (isCharacterLoading) {
    return (
      <>
        <Loader />
        <p>Loading . . .</p>
      </>
    )
  }

  if (isCharacterError || !character) {
    return <h1>There was an error while loading data.</h1>;
  }

  return (
    <div className="character-details-page">
      <div className="character-details">
        <img src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt={character.name} />
        
        <div className="character-details-info">
          <h1>{character.name}</h1>
          <p>
            <strong>Height:</strong> {character.height} cm
          </p>
          <p>
            <strong>Mass:</strong> {character.mass} kg
          </p>
          <p>
            <strong>Birth Year:</strong> {character.birth_year}
          </p>
          <p>
            <strong>Gender:</strong> {character.gender}
          </p>
          <p>
            <strong>Hair Color:</strong> {character.hair_color}
          </p>
          <p>
            <strong>Eye Color:</strong> {character.eye_color}
          </p>
          <p>
            <strong>Skin Color:</strong> {character.skin_color}
          </p>
          

        </div>
      </div>
    </div>
  );
};

export default CharacterDetailsPage;
