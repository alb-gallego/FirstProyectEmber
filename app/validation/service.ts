import Service from '@ember/service';

export default class Validation extends Service {
  // normal class body definition here

  checkErrors(formValues: any, key: string, arrErrors: any[], hasErrors:boolean) {
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
      hasErrors = true;
      return arrErrors;
    }
    // Return an empty array if there are no errors
    return [];
  }

}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'validation': Validation;
  }
}
