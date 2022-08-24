import PropTypes from 'prop-types';
import React from 'react';

export default function Input({ obj }) {
  return (
    <label htmlFor={ obj.id }>
      <input
        type={ obj.type }
        id={ obj.id }
        data-testid={ obj.dataTestID }
        name={ obj.name }
        value={ obj.value }
        onChange={ obj.onChange }
        placeholder={ obj.placeholder }
      />
      {obj.title}
    </label>
  );
}

Input.propTypes = {
  obj: PropTypes.shape({
    dataTestID: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};
