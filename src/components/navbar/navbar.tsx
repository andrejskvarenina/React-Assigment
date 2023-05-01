import { Link, useLocation, useNavigate } from "react-router-dom"
import './navbar.css'
import { useMemo } from "react";
import { useContext } from "react";
import { PageContext } from "../../context/page-context";
import { useGetCharacter } from "../../hooks/useGetCharacter";
import { useAnimatedText } from "../../hooks/useAnimateText";

type PaginationProps = {
  pages: number[];
};

export const Navbar = ({ pages }: PaginationProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentPage, totalPages } = useContext(PageContext)
   
  const characterIdMatch = location.pathname.match(/\/character\/(\d+)/);
  const characterId = characterIdMatch ? characterIdMatch[1] : null;

  const { character, isCharacterError, isCharacterLoading } = useGetCharacter(characterId)

  const targetText = useMemo(() => {
    if (location.pathname === "/" || location.pathname.startsWith("/page")) {
      return `/ Page ${currentPage}`;
    } else if (character) {
      return `/ ${character?.name}`;
    } else {
      return "";
    }
  }, [currentPage, character]);
  
  const animatedText = useAnimatedText(targetText, [targetText]);
  
  if (location.pathname === "/" || location.pathname.startsWith("/page")) {
    return (
      <div className="navbar">
        <p>Characters {animatedText}</p>
        <div className="pages">
           {pages.slice(0, totalPages).map((page) => (
            <Link
               key={page}
               to={`/page/${page}`}
               className={currentPage === page ? "active" : ""}
            >
              {page}
            </Link>
           ))}
         </div>
      </div>
    )
  } else {
    return (
      <div className="navbar">
        {
        (isCharacterError || !character || isCharacterLoading) ? <p>Character</p> : 
        <p>Character {animatedText}</p> 
        }
        <button className="previous-page-button" onClick={() => navigate(-1)}> &#8592; Back</button>
      </div>
    )
  }
}

