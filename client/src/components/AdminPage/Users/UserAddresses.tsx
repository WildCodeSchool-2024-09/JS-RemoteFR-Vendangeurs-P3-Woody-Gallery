import styles from "../../../styles/AdminPage/Users/UserModal.module.css";

type UserAddressesProps = {
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
  country: string;
};

type UserProps = {
  addresses: UserAddressesProps;
};

export default function UserAddresses({ addresses }: UserProps) {
  return (
    <ul>
      {addresses.street_number ? (
        <>
          <li>
            Numéro de rue : <p>{addresses.street_number}</p>
          </li>
          <li>
            Nom de rue : <p>{addresses.street_name}</p>
          </li>
          <li>
            Code postal : <p>{addresses.postal_code}</p>
          </li>
          <li>
            Ville : <p>{addresses.city}</p>
          </li>
          <li>
            Pays : <p>{addresses.country}</p>
          </li>
        </>
      ) : (
        <li className={styles.noAddress}>Aucune addresse enregistré</li>
      )}
    </ul>
  );
}
