import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class RentalForm extends Component {
  @service store: any;
  @service router: any;

  @action
  async deleteRental(rental:any){
    rental.deleteRecord();
    console.log(rental.isDeleted);
    await rental.save();
    this.router.transitionTo('index');
    console.log("RENTAL BORRADO CORRECTAMENTE");



  }

}
