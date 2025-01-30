import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type CollectionProps = {
  id: number;
  name: string;
  photos: {
    collection_id: number;
  };
};

type CollectionContextType = {
  collections: CollectionProps[];
  fetchCollections: () => void;
};

const MyCollectionContext = createContext<CollectionContextType | undefined>(
  undefined,
);

export const MyCollectionsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [collections, setCollections] = useState<CollectionProps[]>([]);

  const fetchCollections = useCallback(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/collection-articles`)
      .then((response) => response.json())
      .then((data: CollectionProps[]) => setCollections(data));
  }, []);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return (
    <MyCollectionContext.Provider value={{ collections, fetchCollections }}>
      {children}
    </MyCollectionContext.Provider>
  );
};

export const useCollection = () => {
  const context = useContext(MyCollectionContext);
  if (!context) {
    throw new Error("useArticles must be used within an ArticlesProvider");
  }
  return context;
};
