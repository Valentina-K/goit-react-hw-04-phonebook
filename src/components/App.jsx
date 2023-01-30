import { useState, useEffect } from 'react';
import { customAlphabet } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Container } from './App.styled';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

const nanoid = customAlphabet('1234567890id-', 5);
const LK_PHONEBOOK = 'phone_book_id';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem(LK_PHONEBOOK)) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  useEffect(
    () => window.localStorage.setItem(LK_PHONEBOOK, JSON.stringify(contacts)),
    [contacts]
  );
  const addContact = ({ name, number }) => {
    if (contacts.some(contact => contact.name === name)) {
      Notify.warning(`${name} is already in contacts`);
    } else {
      setContacts(prevState => [...prevState, { id: nanoid(), name, number }]);
    }
  };

  const deleteContact = id =>
    setContacts(contacts.filter(contact => contact.id !== id));

  const onChangeFilter = evt => setFilter(evt.target.value);

  const findByName = () =>
    contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter onChange={onChangeFilter} value={filter} />
      <ContactList
        contacts={filter === '' ? contacts : findByName()}
        onClick={deleteContact}
      />
    </Container>
  );
};
