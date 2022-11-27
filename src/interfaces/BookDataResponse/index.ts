interface BookDataResponse {
  bookTitle: string;
  bookDescription: string;
  rating: string;
  genres: Array<string>;
  author: string;
  bookCover: string | null;
  url?: string;
}

export default BookDataResponse;
