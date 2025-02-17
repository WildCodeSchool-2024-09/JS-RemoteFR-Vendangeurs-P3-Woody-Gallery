// import { useEffect } from "react";
// import Filters from "../components/Filters";
// import SearchBar from "../components/SearchBar";
// import ShopPhotos from "../components/ShopPhotos";
// import styles from "../styles/ShopPage.module.css";

// export default function NewShopPage() {

//     useEffect(() => {
//         fetch(`${import.meta.env.VITE_API_URL}/`)
//     })

//   return (
//     <div className={styles.shopPage}>
//       <section className={styles.searchTools}>
//         <div className={styles.navContainer}>
//           <h2>Shop</h2>
//           <SearchBar onSearch={handleSearch} />
//           <Filters
//             filter={filterNames}
//             setCurrentFilter={handleFilterChange}
//             photos={photos}
//           />
//         </div>
//       </section>
//       <section
//         className={`${styles.photosContainer} ${visiblePhotos.length < filteredPhotos.length ? "" : styles.withoutSeeMore}`}
//       >
//         {filteredPhotos.slice(0, visiblePhotos.length).map((photo) => (
//           <ShopPhotos key={photo.id} photo={photo} />
//         ))}
//         {visiblePhotos.length < filteredPhotos.length && (
//           <button
//             className={styles.seeMore}
//             type="button"
//             onClick={loadMorePhotos}
//           >
//             Voir plus
//           </button>
//         )}
//         {searchTerm && filteredPhotos.length === 0 && (
//           <p className={styles.notFound}>
//             Aucun article ne correspond à votre recherche
//           </p>
//         )}
//       </section>
//     </div>
//   );
// }
