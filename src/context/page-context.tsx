import { createContext, useState } from "react";

type PageContextType = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const PageContext = createContext<PageContextType>({
  currentPage: 1,
  setCurrentPage: () => {},
});


export const PageContextProvider = ({ children }: any) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
};
