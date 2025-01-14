import { createContext, useContext, useEffect, useState } from "react";
import { Collection, MockedRoute } from "./CollectionContext.types";
import { baseMockRoute, createCollection } from "../constants/baseMockRoute";
import { uuidv4 } from "../utils/uuid";
import {
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
} from "../utils/storage";
import {
  compressJSON,
  decompressJSON,
  copyStringToClipboard,
  readClipboard,
} from "../utils/compress";

const CollectionContext = createContext<any>(undefined);

function CollectionProvider({ children }: any) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [isMockazzoOn, setIsMockazzoOn] = useState(false);

  const setInitialState = async () => {
    try {
      const isMockazzoOn = await getLocalStorage("isMockazzoOn");
      const collections = await getLocalStorage("mockazzoStorage");

      if (isMockazzoOn) setIsMockazzoOn(isMockazzoOn.isMockazzoOn === "true");
      if (collections) setCollections(JSON.parse(collections.mockazzoStorage));
    } catch (error) {}
  };

  useEffect(() => {
    setInitialState();
  }, []);

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

      setLocalStorage("mockazzoStorage", newCollections);
      return newCollections;
    });
  };

  const addCollection = () => {
    const newCollection = createCollection();
    newCollection.id = uuidv4();
    newCollection.label = `collection-${collections.length + 1}`;

    setCollections((collections) => {
      const lastCollections = [...collections, newCollection];
      setLocalStorage("mockazzoStorage", lastCollections);

      return lastCollections;
    });
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

  const toggleMockazzoOn = () => {
    setIsMockazzoOn((isOn) => {
      setLocalStorage("isMockazzoOn", !isOn);
      return !isOn;
    });
  };

  const deleteCollection = (collectionId: string) => {
    const updatedCollection = collections.filter(
      (collection) => collection.id !== collectionId
    );

    setLocalStorage("mockazzoStorage", updatedCollection);
    setCollections(updatedCollection);
  };

  const updateCollectionLabel = (collectionId: string, label: string) => {
    const updatedCollections = collections.map((collection) => {
      if (collection.id === collectionId) {
        collection.label = label;
      }
      return collection;
    });

    setLocalStorage("mockazzoStorage", updatedCollections);
    setCollections(updatedCollections);
  };

  const exportCollections = (collectionIds: string[]) => {
    if (collectionIds.length === 0) return;

    const collectionsToBeExported = collections.filter(
      (collection) =>
        collectionIds.includes(collection.id) && collection.routes.length > 0
    );
    const compressedData = compressJSON(collectionsToBeExported);
    copyStringToClipboard(compressedData);
  };

  const importCollections = async () => {
    try {
      const clipboardContent = await readClipboard();
      if (!clipboardContent) throw "No data in clipboard";

      const decompressedData = decompressJSON(clipboardContent);
      setCollections((collections) => {
        setLocalStorage("mockazzoStorage", [
          ...collections,
          ...decompressedData,
        ]);
        return [...collections, ...decompressedData];
      });
    } catch (error) {
      alert("Collections could not be imported");
    }
  };

  const clearAll = async () => {
    try {
      clearLocalStorage();
      setSelectedId("");
      setIsMockazzoOn(false);
      setCollections([]);
    } catch (error) {
      alert("Could not clear data");
    }
  };

  return (
    <CollectionContext.Provider
      value={{
        collections,
        selectedId,
        isMockazzoOn,
        setSelectedId,
        addCollection,
        addRouteToCollection,
        getRoute,
        deleteRoute,
        updateRoute,
        toggleMockazzoOn,
        exportCollections,
        importCollections,
        deleteCollection,
        updateCollectionLabel,
        clearAll,
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
