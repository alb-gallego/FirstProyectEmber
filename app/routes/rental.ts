import Route from '@ember/routing/route';
//import { service } from '@ember/service';


  export interface Rental{
    type: string,
      id: string,
      attributes: {
        title: string,
        owner: string,
        city: string,
        location: {
          lat: number,
          lng: number
        },
        category: string,
        bedrooms: number,
        image: string,
      description:string
    }

  }


export default class RentalRoute extends Route {
  //@service store;
/*
  async model(params) {
    return this.store.findRecord('rental', params.rental_id);
  }*/
  async model():Promise<Rental[]>{
    const response = await fetch("/api/rentals.json");
    return response.json();
  }


  }
