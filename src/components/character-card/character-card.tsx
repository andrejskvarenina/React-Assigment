import { Link } from 'react-router-dom';
import './character-card.css'

type CharactersCardProps = {
  character: any;
}

export const CharacterCard = ({character} : CharactersCardProps) => {
  return (
    <Link to={`/character/${character.id}`}>
      <div className="character">
        <img src={`https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`} alt={character.name} />
        <div className="character-name-div">
          <p>{character.name}</p>
        </div>
      </div>
    </Link>
  )
}
