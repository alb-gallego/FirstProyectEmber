import { action } from '@ember/object';
import Router from '@ember/routing/router';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Rental from 'super-rentals/models/rental';
import checkErrors from 'super-rentals/utils/validation';

interface RentalUpdateArgs {
  rental: Rental;
}

export default class RentalForm extends Component<RentalUpdateArgs> {
  @service store: any;
  @service router!: Router; // Agrega la propiedad router
  @tracked hasErrors: boolean = false;
  @tracked errors: string[] = [];

  rental = this.args.rental;

  //{{on "click" (fn this.updateRental @rental)}}
  @action
  async updateRental(event: Event) {
    this.hasErrors = false;
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const formValues: Record<string, string> = {};
    const arrErrors: string[] = [];

    formData.forEach((value, key) => {
      formValues[key] = value?.toString();
      if (formValues[key] != null || undefined || '') {
        [this.errors, this.hasErrors] = checkErrors(formValues, key, arrErrors)
          ? [this.errors, this.hasErrors]
          : [[], this.hasErrors];
        console.log(this.errors);
      } else {
        arrErrors.push(`The ${key} cant be empty`);
        this.hasErrors = true;
      }
    });
    if (this.hasErrors) {
      console.log('DETECTA QUE HAY ERRORES');
      return;
    }
    this.store.findRecord('rental', this.rental.id).then((rental: any) => {
      this.rental.title = formValues['title'] ?? '';
      const bedrooms = formValues['bedrooms'];
      if (typeof bedrooms === 'string') {
        this.rental.bedrooms = Number.parseInt(bedrooms, 10) || 0;
      } else {
        this.rental.bedrooms = 0;
      }
      this.rental.image = formValues['image'] ?? '';
      this.rental.category = formValues['category'] ?? '';
      this.rental.city = formValues['city'] ?? '';
      this.rental.owner = formValues['owner'] ?? '';
      this.rental.description = formValues['description'] ?? '';
      rental.save();
    });

    this.router.transitionTo('index');
  }
}
