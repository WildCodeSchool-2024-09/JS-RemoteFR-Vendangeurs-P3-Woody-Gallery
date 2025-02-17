import { useArticles } from "../../../contexts/AdminArticlesContext";
import styles from "../../../styles/AdminPage/Articles/ArticlesFilter.module.css";

type ArticleProps = {
  setSelectCollection: React.Dispatch<React.SetStateAction<number[]>>;
  selectCollection: number[];
  setSelectStock: React.Dispatch<React.SetStateAction<string>>;
  setSelectPrice: React.Dispatch<React.SetStateAction<string>>;
  selectPrice: string;
  selectStock: string;
  setStockOrPrice: React.Dispatch<React.SetStateAction<boolean>>;
  stockOrPrice: boolean;
};

export default function ArticlesFilter({
  setSelectCollection,
  setSelectStock,
  setSelectPrice,
  selectCollection,
  selectPrice,
  selectStock,
  setStockOrPrice,
  stockOrPrice,
}: ArticleProps) {
  const { articles } = useArticles();

  const uniqueCollection = Array.from(
    new Map(
      articles.map((collections) => [collections.name, collections]),
    ).values(),
  );

  const handleChangeCollection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const collection = articles.find((collection) => collection.name === name);
    if (collection) {
      setSelectCollection((prevState) =>
        checked
          ? [...prevState, collection.id]
          : prevState.filter((id) => id !== collection.id),
      );
    }
  };

  const handleChangeTri = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;

    if (id === "ArtStockAsc") {
      setSelectStock("ArtStockAsc");
      articles.sort((a, b) => a.photos.stock - b.photos.stock);
    } else if (id === "ArtStockDesc") {
      setSelectStock("ArtStockDesc");
      articles.sort((a, b) => b.photos.stock - a.photos.stock);
    } else if (id === "ArtPriceAsc") {
      setSelectPrice("ArtPriceAsc");
      articles.sort((a, b) => a.photos.price - b.photos.price);
    } else if (id === "ArtPriceDesc") {
      setSelectPrice("ArtPriceDesc");
      articles.sort((a, b) => b.photos.price - a.photos.price);
    }
  };

  const handleChangeStock = () => {
    setStockOrPrice(true);
  };

  const handleChangePrice = () => {
    setStockOrPrice(false);
  };

  return (
    <div className={styles.articlesFiler}>
      <form action="collectionFilter" id="collectionFilter">
        <label htmlFor="collectionFilter">
          Collections :
          <ul>
            {uniqueCollection.map((collection) => (
              <li key={`filterCollection${collection.id}`}>
                <input
                  type="checkbox"
                  name={collection.name}
                  id={`filter${collection.name}`}
                  checked={selectCollection.includes(collection.id)}
                  onChange={handleChangeCollection}
                />
                {collection.name}
              </li>
            ))}
          </ul>
        </label>
      </form>
      <form action="stock" id="stock">
        <label htmlFor="stock">
          Par stock :
          <ul>
            <li>
              <input
                type="radio"
                name="stock"
                id="ArtStockAsc"
                checked={selectStock === "ArtStockAsc" && stockOrPrice}
                onChange={(e) => {
                  handleChangeTri(e);
                  handleChangeStock();
                }}
              />
              croissant
            </li>
            <li>
              <input
                type="radio"
                name="stock"
                id="ArtStockDesc"
                checked={selectStock === "ArtStockDesc" && stockOrPrice}
                onChange={(e) => {
                  handleChangeTri(e);
                  handleChangeStock();
                }}
              />
              décroissant
            </li>
          </ul>
        </label>
      </form>
      <form action="price">
        <label htmlFor="price">
          Par prix :
          <ul>
            <li>
              <input
                type="radio"
                name="price"
                id="ArtPriceAsc"
                checked={selectPrice === "ArtPriceAsc" && !stockOrPrice}
                onChange={(e) => {
                  handleChangeTri(e);
                  handleChangePrice();
                }}
              />
              croissant
            </li>
            <li>
              <input
                type="radio"
                name="price"
                id="ArtPriceDesc"
                checked={selectPrice === "ArtPriceDesc" && !stockOrPrice}
                onChange={(e) => {
                  handleChangeTri(e);
                  handleChangePrice();
                }}
              />
              décroissant
            </li>
          </ul>
        </label>
      </form>
    </div>
  );
}
