import { action } from '@ember/object';
import Router from '@ember/routing/router';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { Rental } from 'super-rentals/routes/rental';

export default class RentalForm extends Component {
  @service store: any;
  @service router: any;

  @action
  async deleteRental(rental:any){
    rental.deleteRecord();
    console.log(rental.isDeleted);
    await rental.save().then(()=>this.router.transitionTo('index'));
    console.log("RENTAL BORRADO CORRECTAMENTE");



  }

}
