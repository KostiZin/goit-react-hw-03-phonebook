import React, { Component } from 'react';
import { Div, Section } from './App.styled';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import PropTypes from 'prop-types';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleAddContact = newContact => {
    const isExist = this.state.contacts.some(
      contact =>
        contact.name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase()
    );

    if (isExist) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    // overwrite the excisting data
    // newContact is an object (initialValues) with name, id and number
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  handleChangeFilter = newFilter => {
    //  create a new function that will be used for getting currentTarget.value from our form. newFilter is something that we type in a search bar (input in Filter)
    this.setState({
      filter: newFilter,
    });
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => {
      return {
        // we use filter() to create a new array/object without the chosen id
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  // we use it for getting data and setState with it, etc.
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  // we use it for doing something with the data after the each update, e.g. push it to localStorage
  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;

    // we add this const to create a new object/array with the filtered data and this object/array we will use with our .li that's why we will add it to ContactList

    const visibleFilter = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );

    return (
      <Section>
        <Div>
          <h1>Phonebook</h1>
          <ContactForm onAdd={this.handleAddContact} />
        </Div>
        <Div>
          <h2>Contacts</h2>
          <Filter
            filterContacts={filter}
            onChangeFilter={this.handleChangeFilter}
          />
          <ContactList
            data={visibleFilter}
            onDelete={this.handleDeleteContact}
          />
        </Div>
      </Section>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
};
