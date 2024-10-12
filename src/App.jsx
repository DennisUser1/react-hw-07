import React from "react";
import ContactForm from "components/ContactForm/ContactForm";
import SearchBox from "components/SearchBox/SearchBox";
import ContactList from "components/ContactList/ContactList";
import { FaAddressBook } from "react-icons/fa";
import { FaChess } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"; 
import { addContact, deleteContact, undoDeleteContact } from "./redux/contactsSlice"; 
import { selectContacts } from "./redux/contactsSlice"; 
import "./App.css";

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts); 
  const noContacts = contacts.length == 0;   
  const deletedContact = useSelector(state => state.contacts.deletedContact); 

  const handleAddContact = (contact) => {
    dispatch(addContact(contact)); 
  };

  const handleUndoDelete = () => {
    dispatch(undoDeleteContact()); 
  };

  return (
    <div className="cardBox">
      <FaAddressBook className="iconBook" />
      <h1 className="mainTitle">Phonebook</h1>
      <ContactForm addContact={handleAddContact} /> 
      <SearchBox />
      <div className="boxShadow">
        <div className="boxBackground">
          <div className={noContacts || !deletedContact ? "centeredTitleWrapper" : "subtitleWrapper"}>
            <h2 className="preTitle">Contacts</h2>
            {!noContacts && deletedContact && (
              <button className="undoButton" onClick={handleUndoDelete}>
                Undo
              </button>
            )}
          </div>
        </div>
        {noContacts ? (
          <div className="messageWrapper">
            <div className="messageContentWrapper">
              <FaChess className="messageIconInfo" size="16"/>
              <p className="messageInfo">
                No contacts are available at the moment. 
                <br/> 
                Please, add some contacts to view them here.
              </p>
            </div>
          </div>
        ) : (
          <ContactList contacts={contacts} deleteContact={deleteContact} />
        )}
      </div>   
    </div> 
  );
};
