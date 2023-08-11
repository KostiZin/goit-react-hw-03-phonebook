import React, { Component } from 'react';
import {
  StyledError,
  StyledForm,
  StyledField,
  StyledButton,
} from './ContactForm.styled';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Type min 2 letters')
    .trim()
    .lowercase()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Name is a required field'),
  number: Yup.string()
    .min(7, 'Type min 7 digits')
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Number is a required field'),
});

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  render() {
    return (
      <Formik
        // it is initial value of our input
        initialValues={{
          name: '',
          number: '',
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          // all values from initialValues when we click 'submit'
          // if it is class and not just const we need to use this.props.FUNCTION() if we want to use a functioon from the main page (APP)
          this.props.onAdd({ ...values, id: nanoid() });
          actions.resetForm();
        }}
      >
        <StyledForm>
          <label>
            Name
            <StyledField name="name" placeholder="Max Poirier" />
            <StyledError name="name" component="div" />
          </label>
          <label>
            Number
            <StyledField type="tel" name="number" placeholder="+380931074242" />
            <StyledError name="number" component="div" />
          </label>
          <StyledButton type="submit" onSubmit={this.onSubmit}>
            Add contact
          </StyledButton>
        </StyledForm>
      </Formik>
    );
  }
}

ContactForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
