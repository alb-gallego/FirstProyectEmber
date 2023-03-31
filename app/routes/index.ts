import Route from '@ember/routing/route';
import { service } from '@ember/service';
import rental, { Rental } from './rental';


export default class IndexRoute extends Route {
  @service store:any;
  async model() {

    let res:Promise<Rental[]> = this.store.findAll('rental');
    return res;
  }
}
