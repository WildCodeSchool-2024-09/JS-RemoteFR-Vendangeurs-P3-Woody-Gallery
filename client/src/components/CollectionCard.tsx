import styles from "../styles/CollectionCard.module.css";

type CollectionCardProps = {
  collectionId: number;
  collectionName: string;
  photos: {
    photoId: number;
    name: string;
    image: string;
  };
};

export default function CollectionCard({
  collectionId,
  collectionName,
  photos,
}: CollectionCardProps) {
  return (
    <div key={collectionId} className={styles.collectionCard}>
      <figure>
        <img src={photos.image} alt={photos.name} />
      </figure>
      <h3>Collection {collectionName}</h3>
    </div>
  );
}
