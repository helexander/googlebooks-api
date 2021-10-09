// following async await example from week 4, attempt to duplicate

// google api key
// const API_KEY = "AIzaSyBAdId07HtBnyLuS169Ja9pWVG16dRiw3Y";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const getButton = document.getElementById("searchButton");


const googleBooksURL = "https://www.googleapis.com/books/v1/volumes?q=";

// const getBook = async (searchInput) => {
//     // console.log(searchInput);
//     const response = await fetch(`${googleBooksURL}${searchInput}`);
//     const data = await response.json();
//     console.log(data);
//     return data.items;
// }

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

        // populating the list with elements obtained back from the fetch
        //         const element = document.createElement('li');
        //         const bookText = document.createTextNode(`${book.volumeInfo.title}`);

        //         element.appendChild(bookText);
        //         return element;
        //     });

        //     const append = parent => child => parent.appendChild(child);
        //     listItem.forEach(append(list));

        const cardHTML = `
        <div class="card">
        <div>
            <img
                src="${volumeInfo.imageLinks?.thumbnail ?? ''}"
                alt=""
                class="avatar"
            />
        </div>
        <div class="book-info">
            <h2>${volumeInfo.title}</h2>
            <p>
                ${volumeInfo?.description ?? "This book has no description"}
            </p>
            <p>Author: ${volumeInfo.authors}</p>
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

    if (book) {
        getBook(book);

        search.value = "";
    } else if (book === "") {
        createErrorCard("Please type a book title in the input bar");
    }
});