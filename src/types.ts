export interface Book {
  id: number | null;
  name: string;
  author: string;
  genres: string;
  description: string;
  imageUrl: string;
  wasRead: boolean;
}

// TBD if it's gonna be used
export enum BookGenre {
  'Horror',
  'Action',
  'Psichology',
  'Fantasy',
  'Adventure',
}

export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
