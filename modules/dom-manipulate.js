const main = document.getElementById("main");
const headerItem = document.querySelector(".body__welcomeText");
const welcomeItem = document.querySelector(".body__welcomeGIF");
const search = document.getElementById("search");

export const createBookCard = (books) => {

    const booksList = books.map((book) => {
        const { volumeInfo } = book;

        const cardHTML = `
        <div class="card">
                <img
                    src="${volumeInfo.imageLinks?.thumbnail ?? '../images/book-default.jpeg'}"
                    alt="${volumeInfo.title}"
                    class="avatar"
                />

            <div class="card__info">
                <h2>${volumeInfo.title}</h2>
            </div>

            <div class="card__overview">
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

export const createErrorCard = (message) => {
    const cardHTML = `
        <div class="card__error">
            <h1 class="card__error_text">${message}</h1>
        </div>
    `

    main.innerHTML = cardHTML;
}

export const hideWelcomeItems = () => {
    headerItem.style.display = "none";
    welcomeItem.style.display = "none";

    search.value = "";
}