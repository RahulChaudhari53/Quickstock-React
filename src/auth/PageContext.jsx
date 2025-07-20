import { createContext, useState, useContext, Children } from "react";

const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState("Dashboard");

  return (
    <PageContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </PageContext.Provider>
  );
};

// custom hook for consumption
export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("use must be used within a PageProvider.");
  }
  return context;
};
