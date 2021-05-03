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
      console.log(value.length);
      console.log('maxLength', maxLength);
      console.log('fieldIndex', fieldIndex);
      

      // Check if they hit the max character length
      if (value.length >= maxLength) {
        // Check if it's not the last input field
        if (parseInt(fieldIndex, 10) < numberOfField) {
          // Get the next input field
          const nextSibling = document.querySelector(
            `input[name=ssn-${parseInt(fieldIndex, 10) + 1}]`
          );
          console.log('nextSibling',  `input[name=ssn-${parseInt(fieldIndex, 10) + 1}]`);
          
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
      {new Array(numberOfField).fill(undefined).map((item, index) => (
        <React.Fragment key={index}>
          {console.log('index', `sns-${index+1}`)}
        <input
          type="text"
          name={`ssn-${index+1}`}
          maxLength={1}
          onChange={handleChange} />
        </React.Fragment>
      ))}
 
    </div>
  );
});

export default SSNField;
