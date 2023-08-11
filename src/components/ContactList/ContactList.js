import React from 'react';
import PropTypes from 'prop-types';
import { Button, ListItem } from './ContactList.styled';

export const ContactList = ({ data, onDelete }) => {
  return (
    <ul>
      {data.map(({ name, id, number }) => {
        return (
          <ListItem key={id}>
            {name}: {number}
            <Button type="button" onClick={() => onDelete(id)}>
              {/* if we want to pass an argument we should use an anonimous function, like above */}
              Delete
            </Button>
          </ListItem>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
