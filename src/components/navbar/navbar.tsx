import { Link, useLocation, useNavigate } from "react-router-dom"
import './navbar.css'
import { useState, useEffect } from "react";
import { useContext } from "react";
import { PageContext } from "../../context/page-context";
import { useGetCharacter } from "../../hooks/useGetCharacter";

type PaginationProps = {
  pages: number[];
};

export const Navbar = ({ pages } : PaginationProps) => {
  const [animatedText, setAnimatedText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { currentPage } = useContext(PageContext)

  const characterIdMatch = location.pathname.match(/\/character\/(\d+)/);
  const characterId = characterIdMatch ? characterIdMatch[1] : null;

  const { character, isCharacterError, isCharacterLoading } = useGetCharacter(characterId)

  useEffect(() => {
    let i = 0;
    let targetText: string = '';
  
    if (location.pathname === "/" || location.pathname.startsWith("/page")) {
      targetText = `/ Page ${currentPage}`;
    } else if (character) {
      targetText = `/ ${character?.name}`;
    } else {
      return; // Do not start the animation if character data is not available
    }
    
    const animateText = () => {
      if (i <= targetText.length) {
        setAnimatedText(targetText.substring(0, i));
        i++;
        setTimeout(animateText, 100);
      }
    };
    animateText();
  }, [currentPage, character]);
  
  if (location.pathname === "/" || location.pathname.startsWith("/page")) {
    return (
      <div className="navbar">
        <p>Characters {animatedText}</p>
        <div className="pages">
           {pages.map((page) => (
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
        <button className="previous-page-button" onClick={() => navigate(-1)}> &#8592; Back to previous page.</button>
      </div>
    )
  }
  
}
