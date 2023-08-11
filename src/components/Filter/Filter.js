import React from 'react';
import PropTypes from 'prop-types';
import { Label } from './Filter.styled';

export const Filter = ({ filterContacts, onChangeFilter }) => {
  return (
    <Label>
      Find contacts by name
      <input
        type="text"
        value={filterContacts}
        onChange={evt => onChangeFilter(evt.currentTarget.value)}
      />
    </Label>
  );
};

Filter.propTypes = {
  filterContacts: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};
