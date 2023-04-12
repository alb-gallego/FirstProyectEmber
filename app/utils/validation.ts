export default function checkErrors(formValues: any, key: string, arrErrors: string[]) {
  if (key==='bedrooms' && parseInt(formValues['bedrooms']) <= 0) {
    const message:string = `The number of ${key} must be greater than 0`
    if(!arrErrors.includes(message)){
      arrErrors.push(message);
    }

  } else if (formValues[key].length < 5 && key !== 'bedrooms'&& key!=='image') {
    arrErrors.push(`The ${key} length must be greater than 5`);
  }
  // If there are errors, return the array of error messages
  if (arrErrors.length > 0) {
    return arrErrors;
  }else{
    // Return an empty array if there are no errors
    return [];
  }
}

