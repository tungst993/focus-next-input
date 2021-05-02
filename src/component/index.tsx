import React from 'react';
import './index.css';

const useSSNFields = (numberOfField: number) => {
  const [ssnValues, setValue] = React.useState({
    ssn1: "",
    ssn2: "",
    ssn3: ""
  });

  return {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const { maxLength, value, name } = e.target;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [fieldName, fieldIndex] = name.split("-");

      // Check if they hit the max character length
      if (value.length >= maxLength) {
        // Check if it's not the last input field
        if (parseInt(fieldIndex, 10) < numberOfField) {
          // Get the next input field
          const nextSibling = document.querySelector(
            `input[name=ssn-${parseInt(fieldIndex, 10) + 1}]`
          );

          // If found, focus the next field
          if (nextSibling !== null) {
            //@ts-ignore
            nextSibling.focus();
          }
        }
      }

      setValue({
        ...ssnValues,
        [`ssn${fieldIndex}`]: value
      });
    }
  };
};

interface SSNFieldProps {
  numberOfField: number;
}

const SSNField = React.memo<SSNFieldProps>(({numberOfField}) => {
  const { handleChange } = useSSNFields(numberOfField);

  return (
    <div>
      <input
        type="text"
        name="ssn-1"
        maxLength={3}
        onChange={handleChange} />
      <input
        type="text"
        name="ssn-2"
        maxLength={2}
        onChange={handleChange} />
      <input
        type="text"
        name="ssn-3"
        maxLength={4}
        onChange={handleChange} />
    </div>
  );
});

export default SSNField;
