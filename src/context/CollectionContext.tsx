import { createContext, useContext, useMemo, useState } from "react";
import { Collection, MockedRoute } from "./CollectionContext.types";
import { baseMockRoute, createCollection } from "../constants/baseMockRoute";
import { uuidv4 } from "../utils/uuid";
import { setLocalStorage } from "../utils/storage";

const CollectionContext = createContext<any>(undefined);

function CollectionProvider({ children }: any) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedId, setSelectedId] = useState("");

  const addRouteToCollection = (collectionId: string) => {
    setCollections((collection) => {
      const newCollections = collection.map((col) => {
        if (col.id === collectionId) {
          const routeLength = col.routes.length;
          col.routes.push({
            ...baseMockRoute,
            label: `route-${routeLength + 1}`,
            id: uuidv4(),
          });
        }
        return col;
      });

      return newCollections;
    });
  };

  const addCollection = () => {
    const newCollection = createCollection();
    newCollection.id = uuidv4();
    newCollection.label = `collection-${collections.length + 1}`;

    setCollections((collections) => [...collections, newCollection]);
  };

  const getRoute = (routeId: string) => {
    for (let i of collections) {
      for (let j of i.routes) {
        if (j.id === routeId) {
          return j;
        }
      }
    }

    return null;
  };

  const deleteRoute = (routeId: string) => {
    const newCollections: Collection[] = collections
      .map((collection) => {
        collection.routes = collection.routes.filter(
          (route) => route.id !== routeId
        );

        return collection;
      })
      .filter((collection) => collection.routes.length > 0);

    setDataToBrowserStoreage(newCollections);
    setCollections(newCollections);
  };

  const updateRoute = (routeId: string, payload: MockedRoute) => {
    const newCollections: Collection[] = collections.map((collection) => {
      collection.routes = collection.routes.map((route) => {
        if (route.id === routeId) {
          return {
            ...route,
            ...payload,
          };
        }

        return route;
      });

      return collection;
    });

    setDataToBrowserStoreage(newCollections);
    setCollections(newCollections);
  };

  const setDataToBrowserStoreage = (collections: any) => {
    setLocalStorage("mockazzoStorage", collections);
  };

  return (
    <CollectionContext.Provider
      value={{
        collections,
        selectedId,
        setSelectedId,
        addCollection,
        addRouteToCollection,
        getRoute,
        deleteRoute,
        updateRoute,
      }}
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
