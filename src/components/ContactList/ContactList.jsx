import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter, selectNumberFilter } from "../../redux/filtersSlice"; 
import { useSelector } from "react-redux";

export default function ContactList() {
    const contacts = useSelector(selectContacts);
    const nameFilter = useSelector(selectNameFilter);
    const numberFilter = useSelector(selectNumberFilter); 

    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(nameFilter.toLowerCase()) && 
      contact.number.includes(numberFilter) 
    );

    return (
      <>
        <ul className={styles.contactsList}>
          {filteredContacts.map(({ id, name, number }) => {
            return (
              <li className={styles.contactItem} key={id}>
                <Contact
                  id={id}
                  name={name}
                  number={number}
                />
              </li>
            );
          })}
        </ul>
      </>
    );
};
