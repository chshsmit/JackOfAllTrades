import { getPageHtmlData, cleanString } from "../../util/util";
import { JSDOM } from "jsdom";

interface BookDataResponse {
  bookTitle: string;
  bookDescription: string;
  rating: string;
  genres: Array<string>;
  author: string;
  bookCover: string | null;
}

export default class GoodReads {
  static async fetchBookData(
    bookUrl: string
  ): Promise<BookDataResponse | undefined> {
    const HTMLData = await getPageHtmlData(bookUrl);

    if (HTMLData === undefined) return undefined;

    const dom = new JSDOM(HTMLData);

    const { document } = dom.window;
    const bookTitle = GoodReads.getBookTitle(document);
    const bookDescription = GoodReads.getBookDescription(document);
    const rating = GoodReads.getBookRating(document);
    const genres = GoodReads.getGenres(document);
    const author = GoodReads.getAuthor(document);
    const bookCover = GoodReads.getBookCover(document);

    return {
      bookTitle: cleanString(bookTitle),
      bookDescription: cleanString(bookDescription),
      rating: cleanString(rating),
      genres,
      author: cleanString(author),
      bookCover: bookCover ? cleanString(bookCover) : null,
    };
  }

  static getBookTitle(document: Document): string {
    const titleElement: Element | null = document.querySelector("#bookTitle");
    return titleElement?.textContent ?? "";
  }

  static getBookDescription(document: Document): string {
    const descriptionElement: Element | null = document.querySelector(
      "#description > span"
    );

    return descriptionElement?.textContent ?? "";
  }

  static getBookRating(document: Document): string {
    const ratingElement: Element | null = document.querySelector(
      "[itemprop=ratingValue]"
    );
    return ratingElement?.textContent ?? "0.0";
  }

  static getGenres(document: Document): Array<string> {
    const genreElements: HTMLCollectionOf<Element> =
      document.getElementsByClassName("actionLinkLite bookPageGenreLink");

    // We only care about the first 3 genres
    const genres: Array<string> = [];
    for (let i = 0; i < 3; i++) {
      const genre = genreElements[i];
      if (genre && genre?.textContent !== null)
        genres.push(cleanString(genre.textContent));
    }
    return genres;
  }

  static getAuthor(document: Document): string {
    const authorElement: Element | null = document.querySelector(
      "#bookAuthors > span:nth-child(2) > div > a > span"
    );
    return authorElement?.textContent ?? "";
  }

  static getBookCover(document: Document): string | null | undefined {
    const bookCoverElement: HTMLElement | null =
      document.getElementById("coverImage");

    return bookCoverElement?.getAttribute("src");
  }
}
