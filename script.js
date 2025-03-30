const myLibrary = [];
const myLibraryDom = document.querySelector("main");

// String Constants
const IN_PROGRESS = "In Progress";
const COMPLETED = "Completed";
const READ = "Read";
const UNREAD = "Unread";

/**
 * Represents a book and its properties
 * @constructor
 * @param {string} title - The title of the book
 * @param {string} author - The author of the book
 * @param {number} pages - The number of pages in the book
 * @param {string} status - The reading status of the book (e.g., 'read', 'unread')
 * @returns {Object} A new Book object
 */
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = crypto.randomUUID();

}

// function to toggle read status of a book
Book.prototype.toggleStatus = function () {
    this.status = this.status === IN_PROGRESS ? COMPLETED : IN_PROGRESS;
};

/**
 * Generates a sample list of books and adds them to myLibrary
 * @returns {void}
 */
function sampleBooks() {
    myLibrary.push(new Book("Atomic Habits", "James Clear", 320, COMPLETED));
    myLibrary.push(new Book("Deep Work", "Cal Newport", 304, IN_PROGRESS));
    myLibrary.push(new Book("The Pragmatic Programmer", "Andrew Hunt & David Thomas", 352, COMPLETED));
    myLibrary.push(new Book("Clean Code", "Robert C. Martin", 464, IN_PROGRESS));
    // myLibrary.push(new Book("The Alchemist", "Paulo Coelho", 208, COMPLETED));
    // myLibrary.push(new Book("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 498, IN_PROGRESS));
    // myLibrary.push(new Book("Thinking, Fast and Slow", "Daniel Kahneman", 499, COMPLETED));
    // myLibrary.push(new Book("Zero to One", "Peter Thiel", 224, IN_PROGRESS));
    // myLibrary.push(new Book("The Subtle Art of Not Giving a F*ck", "Mark Manson", 224, COMPLETED));
    // myLibrary.push(new Book("Dune", "Frank Herbert", 688, IN_PROGRESS));
    // myLibrary.push(new Book("1984", "George Orwell", 328, COMPLETED));
    // myLibrary.push(new Book("To Kill a Mockingbird", "Harper Lee", 281, IN_PROGRESS));
    // myLibrary.push(new Book("Meditations", "Marcus Aurelius", 256, COMPLETED));
    // myLibrary.push(new Book("The Lean Startup", "Eric Ries", 336, IN_PROGRESS));
    // myLibrary.push(new Book("Rich Dad Poor Dad", "Robert Kiyosaki", 336, COMPLETED));
}

function deleteBook(bookId) {
    if (!confirm("Are you sure you want to delete this book?")) {
        return;
    }

    // Delete book from array - Find and remove from array first (data drives the app)
    const bookIndex = myLibrary.findIndex(b => b.id == bookId);
    if (bookIndex === -1) {
        console.warn(`Book with ID ${bookId} not found in library`);
        return;
    }
    myLibrary.splice(bookIndex, 1);

    // Delete book DOM
    const bookDiv = document.querySelector(`main .book[data-id="${bookId}"]`);
    if (bookDiv) {
        bookDiv.remove();
    } else {
        console.warn(`DOM element for book ID ${bookId} not found`);
    }
}


/**
 * Creates a DOM element representing a book and its details.
 * @param {Book} book 
 * @returns {HTMLElement} bookDiv - The generated book element.
 */
function createBookDom(book) {
    // Deepest element first - best practice ig

    // status
    const statusP = document.createElement("p");
    statusP.textContent = book.status;

    const statusDiv = document.createElement("div");
    statusDiv.classList.add("status");
    statusDiv.appendChild(statusP);

    // buttons
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        deleteBook(book.id);
    });
    
    const readButton = document.createElement("button");
    readButton.classList.add("read");
    readButton.textContent = book.status === IN_PROGRESS ? READ : UNREAD;
    readButton.addEventListener("click", () => {
        book.toggleStatus();
        readButton.textContent = book.status === IN_PROGRESS ? READ : UNREAD;
        statusP.textContent = book.status;
    });

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");
    buttonsDiv.appendChild(readButton);
    buttonsDiv.appendChild(deleteButton);

    // content
    const pagesP = document.createElement("p");
    pagesP.classList.add("pages");
    pagesP.textContent = `${book.pages} Pages`;

    const pagesDiv = document.createElement("div");
    pagesDiv.classList.add("pages");
    pagesDiv.appendChild(pagesP);

    const authorP = document.createElement("p");
    authorP.classList.add("author");
    authorP.textContent = `by ${book.author}`;

    const nameP = document.createElement("p");
    nameP.classList.add("name");
    nameP.textContent = book.title;

    const coverDiv = document.createElement("div");
    coverDiv.classList.add("cover");
    coverDiv.appendChild(nameP);
    coverDiv.appendChild(authorP);

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content");
    contentDiv.appendChild(coverDiv);
    contentDiv.appendChild(pagesDiv);

    // Book
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.setAttribute("data-id", book.id);
    bookDiv.append(contentDiv, buttonsDiv, statusDiv);

    return bookDiv;
}

function updateLibrary() {
    myLibrary.forEach(book => {
        myLibraryDom.appendChild(createBookDom(book));
    });
}

function submitAddBook(event) {
    event.preventDefault(); // prevent default action of form sending data to server

    // collect book details
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const pages = document.getElementById("pages").value.trim();
    const status = document.querySelector('input[name="status"]:checked').value;
    console.log(status); 

    // create new book and dom
    const book = new Book(title, author, pages, status);
    const bookDom = createBookDom(book);

    // add book and dom to Libarary and LibraryDOm
    myLibrary.push(book);
    myLibraryDom.appendChild(bookDom);

    // reset form
    event.target.reset();


}

function setupDomEvents() {
    const bookForm = document.querySelector(".form form");
    const formSubmitButton = document.querySelector(".form form .addbook");
    const dialogCloseButton = document.querySelector(".form button.close");

    bookForm.addEventListener("submit", submitAddBook);
}

function main() {
    setupDomEvents();
    sampleBooks();
    updateLibrary();
}

main();
