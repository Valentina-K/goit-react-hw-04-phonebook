import { useState, useEffect } from 'react';
import { customAlphabet } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Container } from './App.styled';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

const nanoid = customAlphabet('1234567890id-', 5);
const LK_PHONEBOOK = 'phone_book_id';
//comm
export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localContacts = JSON.parse(localStorage.getItem(LK_PHONEBOOK));
    if (localContacts !== null) {
      setContacts({ localContacts });
    }
  }, []);

  useEffect(
    () => localStorage.setItem(LK_PHONEBOOK, JSON.stringify(contacts)),
    [contacts]
  );
  const addContact = ({ name, number }) => {
    const newContact = { id: nanoid(), name, number };
    if (contacts.some(contact => contact.name === name)) {
      Notify.info(`${name} is already in contacts`);
    } else {
      setContacts(prevState => [...prevState, { newContact }]);
    }
  };

  const deleteContact = id =>
    setContacts([contacts.filter(contact => contact.id !== id)]);

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
/* export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const localContacts = JSON.parse(localStorage.getItem(LK_PHONEBOOK));
    if (localContacts !== null) {
      this.setState({ contacts: localContacts });
    }
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(LK_PHONEBOOK, JSON.stringify(this.state.contacts));
    }
  }
  addContact = ({ name, number }) => {
    const newContact = { id: nanoid(), name, number };
    if (this.state.contacts.some(contact => contact.name === name)) {
      Notify.info(`${name} is already in contacts`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [...contacts, newContact],
      }));
    }
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  onChangeFilter = evt => this.setState({ filter: evt.target.value });

  findByName = () =>
    this.state.contacts.filter(contact =>
      contact.name
        .toLocaleLowerCase()
        .includes(this.state.filter.toLocaleLowerCase())
    );

  render() {
    const { contacts, filter } = this.state;
    const filterContacts = this.findByName();
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter onChange={this.onChangeFilter} value={filter} />
        <ContactList
          contacts={filter === '' ? contacts : filterContacts}
          onClick={this.deleteContact}
        />
      </Container>
    );
  }
} */
