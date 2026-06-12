export interface Cliente {
  id: string;

  gender: string;

  name: {
    title: string;
    first: string;
    last: string;
  };

  location: {
    street: string;
    city: string;
    state: string;
    postcode: number;
  };

  email: string;

  phone: string;

  cell: string;

  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}