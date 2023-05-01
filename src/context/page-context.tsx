import { createContext, useState } from "react";

type PageContextType = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
};

export const PageContext = createContext<PageContextType>({
  currentPage: 1,
  setCurrentPage: () => {},
  totalPages: 0,
  setTotalPages: () => {},
});

export const PageContextProvider = ({ children }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(9);

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage, totalPages, setTotalPages }}>
      {children}
    </PageContext.Provider>
  );
};
