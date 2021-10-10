import { hideWelcomeItems, createErrorCard } from "../modules/dom-manipulate.js";
import { getBook } from "../modules/non-dom-manipulate.js";

const form = document.getElementById("form");
const search = document.getElementById("search");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    form.classList.add("header__stickTop");

    const book = search.value;

    if (book) {
        getBook(book);

        // Hide welcome text when user performs a search 
        hideWelcomeItems();


    } else if (book === "") {
        hideWelcomeItems();

        createErrorCard("Please enter a valid book title in the input bar");
    }
});