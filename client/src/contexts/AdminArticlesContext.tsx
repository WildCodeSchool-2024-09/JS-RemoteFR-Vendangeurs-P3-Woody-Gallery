import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Article = {
  id: number;
  name: string;
  photos: {
    id: number;
    name: string;
    image: string;
    description: string;
    format: string;
    stock: number;
    price: number;
    collection_id: number;
  };
};

type ArticlesContextType = {
  articles: Article[];
  fetchArticles: () => void;
};

const ArticlesContext = createContext<ArticlesContextType | undefined>(
  undefined,
);

export const ArticlesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchArticles = useCallback(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/collection-articles`)
      .then((response) => response.json())
      .then((data: Article[]) => setArticles(data));
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <ArticlesContext.Provider value={{ articles, fetchArticles }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error("useArticles must be used within an ArticlesProvider");
  }
  return context;
};
