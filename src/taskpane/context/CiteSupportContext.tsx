import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import CiteSupport from "../../utils/citesupport";
import data from "../../utils/data";

interface CiteSupportContextProviderProps {
  children: ReactNode;
}

const CiteSupportContext = createContext<CiteSupport>(null);

export function CiteSupportContextProvider({
  children,
}: CiteSupportContextProviderProps): JSX.Element {
  const [citeSupport] = useState(() => new CiteSupport(data));
  useEffect(() => {
    // eslint-disable-next-line no-void
    void citeSupport.initDocument();
  });
  return (
    <CiteSupportContext.Provider value={citeSupport}>
      {children}
    </CiteSupportContext.Provider>
  );
}

export function useCiteSupport(): CiteSupport {
  const context = useContext(CiteSupportContext);
  if (!context) {
    throw new Error(
      "useCiteSupport must be used within a CiteSupportContextProvider. Wrap a parent component in <CiteSupportContextProvider> to fix this error."
    );
  }
  return context;
}
