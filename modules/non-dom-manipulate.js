import { createBookCard, createErrorCard } from "../modules/dom-manipulate.js";

let maxResult = "&maxResults=" + 30;
const googleBooksURL = "https://www.googleapis.com/books/v1/volumes?q=";

export const getBook = async (searchQuery) => {
    try {
        const { data } = await axios.get(googleBooksURL + searchQuery + maxResult);

        createBookCard(data.items);
    } catch (err) {
        createErrorCard("The book does not exist in the database.");
    }
}