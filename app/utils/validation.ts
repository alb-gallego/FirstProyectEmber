export default function checkErrors(
  formValues: any

  //  arrErrors: string[]
) {
  let arrErrors: string[] = [];

  const keys = Object.keys(formValues);

  for (let key in keys) {
    if (formValues[key] !== null && formValues[key]!== undefined && formValues[key]!=='') {
      if (key === 'bedrooms' && parseInt(formValues['bedrooms']) <= 0) {
        const message: string = `The number of ${key} must be greater than 0`;
        if (!arrErrors.includes(message)) {
          arrErrors.push(message);
        }
      } else if (
        formValues[key].length < 5 &&
        key !== 'bedrooms' &&
        key !== 'image'
      ) {
        arrErrors.push(`The ${key} length must be greater than 5`);
      }
    } else {
      arrErrors.push(`The ${key} cant be empty`);
      //this.errors=arrErrors;
    }

  }
  // If there are errors, return the array of error messages
  if (arrErrors.length > 0) {
    return arrErrors;
  } else {
    // Return an empty array if there are no errors
    return [];
  }
}
