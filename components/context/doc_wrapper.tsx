import React, { useState, useContext, FC, useEffect } from "react";
import { wholeDoc } from "../interfaces";
import { storeData } from "../credStore";

type docType = null | wholeDoc;

interface DocContextType {
  docData: docType;
  setDocData: React.Dispatch<React.SetStateAction<docType>>;
}

interface Props {
  children: React.ReactNode;
}

export const DocDataContext = React.createContext<DocContextType>({
  docData: null,
  setDocData: () => {},
});

const DocDataHolder: FC<Props> = ({ children }) => {
  const [docData, setDocData] = useState<docType>(null);

  useEffect(() => {
    async function storeLocal() {
      if (docData) {
        await storeData("doc_data", docData);
      }
    }
    storeLocal();
  }, [docData]);

  return (
    <DocDataContext.Provider value={{ docData, setDocData }}>
      {children}
    </DocDataContext.Provider>
  );
};

export const useDocContext = () => useContext(DocDataContext);

export default DocDataHolder;
