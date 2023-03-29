import { Response } from 'express';

interface Rental {
  id: string;
  title: string;
  owner: string;
  city: string;
  lat: string;
  lng: string;
  category: string;
  bedrooms: number;
  image: string;
  description: string;
}

export function formatRentalResponse(res, rental: Rental): void {
  const response = {
    data: {
      type: 'rentals',
      id: rental.id,
      attributes: {
        title: rental.title,
        owner: rental.owner,
        city: rental.city,
        location: {
          lat: rental.lat,
          lng: rental.lng,
        },
        category: rental.category,
        bedrooms: rental.bedrooms,
        image: rental.image,
        description: rental.description,
      },
    },
  };

  res.json(response);
}
