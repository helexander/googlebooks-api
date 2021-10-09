// google api key
// const API_KEY = "AIzaSyBAdId07HtBnyLuS169Ja9pWVG16dRiw3Y";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const getButton = document.getElementById("searchButton");
const headerItem = document.querySelector(".welcomeText");

const googleBooksURL = "https://www.googleapis.com/books/v1/volumes?q=";

const getBook = async (searchQuery) => {
    try {
        const { data } = await axios.get(googleBooksURL + searchQuery);

        createBookCard(data.items);
    } catch (err) {
        createErrorCard("The book does not exist in the database.")
    }
}

const createBookCard = (books) => {

    const booksList = books.map((book) => {
        const { volumeInfo } = book;

        const cardHTML = `
        <div class="card">
                <img
                    src="${volumeInfo.imageLinks?.thumbnail ?? ''}"
                    alt="${volumeInfo.title}"
                    class="avatar"
                />
            <div class="book-info">
                <h2>${volumeInfo.title}</h2>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <p>Author: ${volumeInfo.authors}</p>
                <p>
                    Description: <br/>${volumeInfo?.description ?? "This book has no description"}
                </p>
                
            </div>
        </div>
        `

        return cardHTML;
    });

    main.innerHTML = booksList.join('');
}

const createErrorCard = (message) => {
    const cardHTML = `
        <div class="card">
            <h1>${message}</h1>
        </div>
    `

    main.innerHTML = cardHTML;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const book = search.value;

    form.classList.add("stickToTop");


    if (book) {
        getBook(book);

        // Hide welcome text when user performs a search 
        headerItem.style.display = "none";

        search.value = "";
    } else if (book === "") {
        createErrorCard("Please enter a valid book title in the input bar");
    }
});