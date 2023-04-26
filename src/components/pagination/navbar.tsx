import { Link, useLocation, useNavigate } from "react-router-dom"
import './navbar.css'
import { useState, useEffect } from "react";

type PaginationProps = {
  currentPage: number;
  pages: number[];
};

export const Navbar = ({ currentPage, pages } : PaginationProps) => {
  const [animatedText, setAnimatedText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let i = 0;
    const targetText = `/ Page ${currentPage}`;
    const animateText = () => {
      if (i <= targetText.length) {
        setAnimatedText(targetText.substring(0, i));
        i++;
        setTimeout(animateText, 100);
      }
    };
    animateText();
  }, [currentPage]);
  
 
  // return (
  //   <div className="navbar">
  //     <p>Characters {animatedText}</p>
  //     {location.pathname === "/" || location.pathname.startsWith("/page") ? (
  //       <div className="pages">
  //         {pages.map((page) => (
  //           <Link
  //             key={page}
  //             to={`/page/${page}`}
  //             className={currentPage === page ? "active" : ""}
  //           >
  //             {page}
  //           </Link>
  //         ))}
  //       </div>
  //     ) : (
  //       <button className="previous-page-button" onClick={() => navigate(-1)}> &#8592; Back to previous page.</button>
  //     )}
  //   </div>
  // );

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
        <p>Character: </p>
        <button className="previous-page-button" onClick={() => navigate(-1)}> &#8592; Back to previous page.</button>
      </div>
    )
  }
  
}
