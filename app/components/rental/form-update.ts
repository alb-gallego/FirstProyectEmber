import { action } from '@ember/object';
import Router from '@ember/routing/router';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import Rental from 'super-rentals/models/rental';

interface RentalUpdateArgs {
  rental: Rental;
}

export default class RentalForm extends Component<RentalUpdateArgs> {
  @service store: any;
  @service router!: Router; // Agrega la propiedad router

  rental = this.args.rental;

  //{{on "click" (fn this.updateRental @rental)}}
  @action
  async updateRental(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const formValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      formValues[key] = value?.toString();
    });

     this.store
      .findRecord('rental', this.rental.id)
      .then((rental: any) => {
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
