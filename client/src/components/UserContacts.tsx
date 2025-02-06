type UserProps = {
  lastname: string;
  firstname: string;
  email: string;
  phone_number: string;
};

export default function UserContacts({
  lastname,
  firstname,
  email,
  phone_number,
}: UserProps) {
  return (
    <ul>
      <li>
        Nom : <p>{lastname}</p>
      </li>
      <li>
        Prénom : <p>{firstname}</p>
      </li>
      <li>
        Email : <p>{email}</p>{" "}
      </li>
      <li>
        Téléphone :{" "}
        <p>{phone_number ? phone_number : "Aucun numéro enregistré"}</p>
      </li>
    </ul>
  );
}
