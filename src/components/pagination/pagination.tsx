import { Link } from "react-router-dom"
import './pagination.css'
import { useState, useEffect } from "react";

type PaginationProps = {
  currentPage: number;
  pages: number[];
};

export const Pagination = ({ currentPage, pages } : PaginationProps) => {
  const [animatedText, setAnimatedText] = useState("");

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
  
  
  return (
    <div className="pagination">
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
}
