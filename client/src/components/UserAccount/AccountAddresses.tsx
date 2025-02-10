import { useEffect, useState } from "react";
import styles from "../../styles/UserAccount/AccountAddresses.module.css";
import AccountDeleteAddress from "./AccountDeleteAddress";

type AddressesProps = {
  id?: number;
  street_number: number;
  street_name: string;
  postal_code: string;
  city: string;
  country: string;
  user_id: number;
};

export default function Addresses() {
  const users = sessionStorage.getItem("user");
  const [address, setAddress] = useState<AddressesProps | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [editedAddress, setEditedAddress] = useState<AddressesProps | null>(
    null,
  );
  const [addedAddress, setAddedAddress] = useState<AddressesProps>({
    street_number: 0,
    street_name: "",
    postal_code: "",
    city: "",
    country: "",
    user_id: 0,
  });
  const [isNewButtonClicked, setIsNewButtonClicked] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [deleteIsClicked, setDeleteIsClicked] = useState<boolean>(false);

  const toggleClick = () => {
    setIsClicked(!isClicked);
    setEditedAddress(address);
  };
  const toggleNewClick = () => {
    setIsNewButtonClicked(!isNewButtonClicked);
    if (address) {
      setAddedAddress(address);
    } else {
      setAddedAddress({
        street_number: 0,
        street_name: "",
        postal_code: "",
        city: "",
        country: "",
        user_id: 0,
      });
    }
  };

  useEffect(() => {
    if (users) {
      fetch(`${import.meta.env.VITE_API_URL}/api/addresses/${users}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erreur ${response.status}: Adresse non trouvée.`);
          }
          return response.json();
        })
        .then((data) => setAddress(data))
        .catch((error) => {
          console.error("Erreur lors du fetch des adresses:", error.message);
          setAddress(null);
        });
    }
  }, [users]);

  const handleEdit = () => {
    if (!users || !editedAddress) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/addresses/${users}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedAddress),
    })
      .then((response) => {
        if (response.ok) {
          setAddress(editedAddress);
          setIsClicked(false);
        } else if (response.status === 400) {
          response.json().then((errorData) => {
            alert(errorData.error);
          });
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la modification:", error),
      );
  };

  const handleAdd = () => {
    if (!users || !addedAddress) return;
    setAddedAddress({ ...addedAddress, user_id: Number(users) });
    fetch(`${import.meta.env.VITE_API_URL}/api/addresses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...addedAddress, user_id: Number(users) }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(
              `Erreur ${response.status}: ${data.message || "Erreur inconnue"}`,
            );
          });
        }
        setAddress(addedAddress);
        setIsNewButtonClicked(false);
      })
      .catch((error) => console.error("Erreur lors de la création:", error));
  };

  const handleDelete = async () => {
    try {
      if (isValid && deleteIsClicked) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/addresses/${users}`,
          {
            method: "DELETE",
          },
        );
        if (response.ok) {
          setAddress(null);
          setModalDelete(false);
        } else {
          console.error("Erreur lors de la suppression de l'adresse'");
        }
      }
    } catch (err) {
      console.error("Erreur lors de la suppression de l'adresse' :", err);
    }

    setModalDelete(false);
  };

  const handleChange = (
    field: keyof AddressesProps,
    value: string | number,
  ) => {
    if (editedAddress) {
      setEditedAddress({ ...editedAddress, [field]: value });
    }
  };

  const handleNewChange = (
    field: keyof AddressesProps,
    value: string | number,
  ) => {
    if (addedAddress) {
      setAddedAddress({ ...addedAddress, [field]: value });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEdit();
    }
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <section className={styles.addresses}>
      {modalDelete && (
        <AccountDeleteAddress
          handleCloseModalDelete={() => setModalDelete(false)}
          onConfirm={handleDelete}
          isValid={isValid}
          setIsValid={setIsValid}
          setDeleteIsClicked={setDeleteIsClicked}
        />
      )}
      <section className={address ? styles.container : styles.newContainer}>
        {address ? (
          isClicked ? (
            <>
              <input
                type="text"
                value={editedAddress?.street_number || ""}
                placeholder="Numéro de rue"
                onChange={(e) => handleChange("street_number", e.target.value)}
                onKeyDown={handleKeyDown}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Nom de la rue"
                value={editedAddress?.street_name || ""}
                onChange={(e) => handleChange("street_name", e.target.value)}
                onKeyDown={handleKeyDown}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Code postal"
                value={editedAddress?.postal_code || ""}
                onChange={(e) => handleChange("postal_code", e.target.value)}
                onKeyDown={handleKeyDown}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Ville"
                value={editedAddress?.city || ""}
                onChange={(e) => handleChange("city", e.target.value)}
                onKeyDown={handleKeyDown}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Pays"
                value={editedAddress?.country || ""}
                onChange={(e) => handleChange("country", e.target.value)}
                onKeyDown={handleKeyDown}
                className={styles.input}
              />
              <section className={styles.updateButtons}>
                <button
                  type="button"
                  className={styles.saveButton}
                  onClick={handleEdit}
                >
                  <span id={styles.titleSave}>Sauvegarder</span>
                  <span id={styles.titleRegister}>Enregistrer l'adresse</span>
                </button>
                <button
                  type="button"
                  className={styles.abortButton}
                  onClick={toggleClick}
                >
                  Annuler
                </button>
              </section>
            </>
          ) : (
            <>
              <p>{`${address.street_number} ${address.street_name}`}</p>
              <p>{`${address.postal_code} ${address.city}`}</p>
              <p>{address.country}</p>
              <section className={styles.buttons}>
                <button
                  type="button"
                  className={`${styles.buttonModDel} ${styles.editButton}`}
                  onClick={toggleClick}
                >
                  Modifier
                </button>
                <button
                  type="button"
                  className={styles.buttonModDel}
                  onClick={() => setModalDelete(true)}
                >
                  Effacer
                </button>
              </section>
            </>
          )
        ) : isNewButtonClicked ? (
          <>
            <input
              type="number"
              placeholder="Numéro de rue"
              onChange={(e) =>
                handleNewChange(
                  "street_number",
                  Number.parseInt(e.target.value),
                )
              }
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Nom de la rue"
              onChange={(e) => handleNewChange("street_name", e.target.value)}
              onKeyUp={handleKeyUp}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Code postal"
              onChange={(e) => handleNewChange("postal_code", e.target.value)}
              onKeyUp={handleKeyUp}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Ville"
              onChange={(e) => handleNewChange("city", e.target.value)}
              onKeyUp={handleKeyUp}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Pays"
              onChange={(e) => handleNewChange("country", e.target.value)}
              onKeyUp={handleKeyUp}
              className={styles.input}
            />
            <section className={styles.newAddressButtons}>
              <button
                type="button"
                className={styles.saveButton}
                onClick={handleAdd}
              >
                Sauvegarder
              </button>
              <button
                type="button"
                className={styles.abortButton}
                onClick={toggleNewClick}
              >
                Annuler
              </button>
            </section>
          </>
        ) : (
          <>
            <button
              type="button"
              className={styles.addButton}
              onClick={toggleNewClick}
            >
              <span className={`material-symbols-outlined ${styles.addIcon}`}>
                add_circle
              </span>
            </button>
            <p className={styles.addAddress}>Ajouter une adresse</p>
          </>
        )}
      </section>
    </section>
  );
}
