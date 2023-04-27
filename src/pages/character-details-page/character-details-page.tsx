import './character-details-page.css';
// import { useContext } from 'react';
// import { CharacterContext } from '../../context/character-context';
import { useParams } from 'react-router-dom';
import { useCharacter } from '../../hooks/useCharacter';

const CharacterDetailsPage = () => {

  const { id } = useParams<{ id: string }>();
  const { character, isCharacterLoading, isCharacterError } = useCharacter(id ?? null);



  if (isCharacterLoading) {
    return <h1>Loading...</h1>;
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
