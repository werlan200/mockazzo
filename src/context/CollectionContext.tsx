import { createContext, useContext, useMemo, useState } from "react";
import { Collection, MockedRoute } from "./CollectionContext.types";
import { baseMockRoute, baseCollection } from "../constants/baseMockRoute";
import { uuidv4 } from "../utils/uuid";

const CollectionContext = createContext<any>(undefined);

function CollectionProvider({ children }: any) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedId, setSelectedId] = useState("");

  const addCollection = () => {
    const newCollection = baseCollection;
    newCollection.id = uuidv4();
    newCollection.label = `collection-${collections.length + 1}`;
    setCollections((collections) => [...collections, newCollection]);
  };

  return (
    <CollectionContext.Provider
      value={{ collections, selectedId, setSelectedId, addCollection }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

function useCollectionContext() {
  const context = useContext(CollectionContext);
  if (context === undefined) {
    throw new Error(
      "useCollectionContext must be used within a   CollectionProvider"
    );
  }
  return context;
}

export { CollectionProvider, useCollectionContext };
