import React, { FC, useContext, useState } from "react";

type loadingType = boolean;

interface loadingContextType {
  loading: loadingType;
  setLoading: React.Dispatch<React.SetStateAction<loadingType>>;
}

interface Props {
  children: React.ReactNode;
}

const LoadingContext = React.createContext<loadingContextType>({
  loading: false,
  setLoading: () => {},
});

const LoadingHolder: FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);

export default LoadingHolder;
