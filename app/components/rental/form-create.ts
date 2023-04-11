import { action } from '@ember/object';
import Router from '@ember/routing/router';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class RentalForm extends Component {
  @service store: any;
  @service router!: Router;
  @tracked hasErrors: boolean = false;
  @tracked errors: string[] = [];

  checkErrors(formValues: any, key: string, arrErrors: any[]) {
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
      this.hasErrors = true;
      return arrErrors;
    }
    // Return an empty array if there are no errors
    return [];
  }

  @action
  async sendRental(event: Event) {
    this.hasErrors = false;
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const formValues: Record<string, string> = {};
    const arrErrors: string[] = [];
    formData.forEach((value, key) => {
      formValues[key] = value.toString();
      if (formValues[key] != null || undefined || '') {
        this.errors = this.checkErrors(formValues, key, arrErrors);
        console.log(this.errors);
      }else{
        arrErrors.push(`The ${key} cant be empty`);
        this.hasErrors = true;
      }
    });
    //If there are errors, it doesnt send data
    if (this.hasErrors) {
      console.log('DETECTA QUE HAY ERRORES');
      return;
    }
    let post = this.store.createRecord('rental', {
      title: formValues['title'],
      image: formValues['image'],
      owner: formValues['owner'],
      city: formValues['city'],
      category: formValues['category'],
      bedrooms: formValues['bedrooms'],
      description: formValues['description'],
    });

    try {
      console.log('1212');

      post.save();
      console.log('prue');

      this.router.transitionTo('index');
      console.log('RUTA A INDEX');
    } catch (error) {
      console.log(error);
      this.router.transitionTo('create-rental');
    }
  }
}
