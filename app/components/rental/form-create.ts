import { action } from '@ember/object';
import Router from '@ember/routing/router';
import { service } from '@ember/service';
import Component from '@glimmer/component';



export default class RentalForm extends Component {
  @service store: any;
  @service router!: Router; // Agrega la propiedad router

  checkImage(formValue: string) {
    if (formValue && formValue.length < 5) {
      console.log('El titulo debe tener más de 5 caracteres.');
      //return true;
    }
  }

  @action
  async sendRental(event: Event) {
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

    let post = await this.store.createRecord('rental', {
      title: formValues['title'],
      image: formValues['image'],
      owner: formValues['owner'],
      city: formValues['city'],
      category: formValues['category'],
      bedrooms: formValues['bedrooms'],
      description: formValues['description'],

    });
    console.log();

     post.save()
     this.router.transitionTo('index');

  }




}
