import { action } from '@ember/object';
import { service } from '@ember/service';
import { typeOf } from '@ember/utils';
import Component from '@glimmer/component';

interface RentalFormArgs {}

export default class RentalForm extends Component<RentalFormArgs> {
  @service store: any;

  checkImage(formValue: string) {
    if (formValue && formValue.length < 5) {
      console.log('El titulo debe tener más de 5 caracteres.');
      //return true;
    }
  }

  @action
  sendRental(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const formValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      formValues[key] = value.toString();
      if (formValues[key] != null && typeof formValues[key] === 'number') {
        this.checkImage(value.toString());
      }
    });

    let post = this.store.createRecord('rental', {
      title: formValues['title'],
      image: formValues['image'],
      owner: formValues['owner'],
      city: formValues['city'],
      category: formValues['category'],
      bedrooms: formValues['bedrooms'],
      description: formValues['description'],

    });
    console.log(post);

    post.save();
  }
}
/*
    //Transforms the key:values form(string) in JSON data
    const jsonData = JSON.stringify(formValues);
    console.log(jsonData);
     fetch('http://localhost:3000/rentals', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: jsonData
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response;
})
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('There was an error:', error);
});




    //console.log(formValues);
 */
