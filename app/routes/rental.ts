import Route from '@ember/routing/route';
import { service } from '@ember/service';
//import { service } from '@ember/service';

export interface Rental {
  id: string;
  title: string;
  owner: string;
  city: string;
  category: string;
  bedrooms: number;
  image: string;
  description: string;
}

export default class RentalRoute extends Route {
  @service declare store: any;

  async model(params: { rental_id: string }) {
    const res = await this.store.findRecord('rental', params.rental_id);
    console.log(res);
    return res;
  }

  /*async model():Promise<Rental[]>{
    const response = await fetch("/api/rentals.json");

    console.log(response.json());
    console.log('hola');
    return response.json();
  }*/
}

/*@service declare store:any;
  async model() {

    const res = fetch('http://localhost:3000/rentals', {
      method: 'GET',

    })
    .then(response => {

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('funciona')
      response.json().then(data=>{
      console.log(data)
      return data;}
      )
       // Utilizar el método json() para obtener la respuesta en formato JSON
    })
    .catch(error => {
      console.error('There was an error:', error);
    });

    return res;
}*/
