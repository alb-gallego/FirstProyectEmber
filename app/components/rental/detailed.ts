import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class RentalForm extends Component {
  @service store: any;
  @service router: any;

  @action
  async deleteRental(rental:any){
    try {
      const rentalD = await this.store.findRecord('rental', rental.id);
      if (rentalD.isDeleted) {
        console.log('El registro ya ha sido eliminado');
        this.router.transitionTo('index');
      }
      rentalD.deleteRecord();
      await rentalD.save();
      this.router.transitionTo('index');
    } catch (error) {
      console.log(error);
      console.log('RENTAL NO BORRADO');
    }

    // console.log(rental.isDeleted);
    // await rentalD.save();

  }

}
