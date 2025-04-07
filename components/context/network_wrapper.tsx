import React, { Component, useEffect, useState, useContext } from "react";
import NetInfo from "@react-native-community/netinfo";

interface NetworkContextType {
  isOnline: boolean;
  setIsOnline: React.Dispatch<React.SetStateAction<boolean>>;
}

const NetworkContext = React.createContext<NetworkContextType>({
  isOnline: false,
  setIsOnline: () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function NewtworkWrapper({ children }: Props) {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected ?? false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ isOnline, setIsOnline }}>
      {children}
    </NetworkContext.Provider>
  );
}

export const useNetworkContext = () => useContext(NetworkContext);
