import { action } from '@ember/object';
import Router from '@ember/routing/router';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { Rental } from 'super-rentals/routes/rental';

interface RentalUpdateArgs {
  rental: Rental;
}

export default class RentalForm extends Component<RentalUpdateArgs> {
  @service store: any;
  @service router!: Router; // Agrega la propiedad router

  rental = this.args.rental;

//{{on "click" (fn this.updateRental @rental)}}
  @action
  async updateRental(event:Event){
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const formValues: Record<string, string> = {};
    formData.forEach((value, key) => {

      formValues[key] = value?.toString();

    });


   await this.store.findRecord('rental',this.rental.id).then((rental:any)=>{
    this.rental.title = formValues['title'] ?? '';
    this.rental.bedrooms =  formValues['bedrooms'] ?? '';
    this.rental.image = formValues['image'] ?? '';
    this.rental.category = formValues['category'] ?? '';
    this.rental.city = formValues['city']??'';
    this.rental.owner = formValues['owner']??'';
    this.rental.description = formValues['description']??'';
    rental.save();
   })
   await this.router.transitionTo('index');

  }

}
