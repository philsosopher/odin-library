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

/**
 * Generates a sample list of books and adds them to myLibrary
 * @returns {void}
 */
function sampleBooks() {
    myLibrary.push(new Book("Atomic Habits", "James Clear", 320, "read"));
    myLibrary.push(new Book("Deep Work", "Cal Newport", 304, "unread"));
    myLibrary.push(new Book("The Pragmatic Programmer", "Andrew Hunt & David Thomas", 352, "read"));
    myLibrary.push(new Book("Clean Code", "Robert C. Martin", 464, "unread"));
    myLibrary.push(new Book("The Alchemist", "Paulo Coelho", 208, "read"));
    myLibrary.push(new Book("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 498, "unread"));
    myLibrary.push(new Book("Thinking, Fast and Slow", "Daniel Kahneman", 499, "read"));
    myLibrary.push(new Book("Zero to One", "Peter Thiel", 224, "unread"));
    myLibrary.push(new Book("The Subtle Art of Not Giving a F*ck", "Mark Manson", 224, "read"));
    myLibrary.push(new Book("Dune", "Frank Herbert", 688, "unread"));
    myLibrary.push(new Book("1984", "George Orwell", 328, "read"));
    myLibrary.push(new Book("To Kill a Mockingbird", "Harper Lee", 281, "unread"));
    myLibrary.push(new Book("Meditations", "Marcus Aurelius", 256, "read"));
    myLibrary.push(new Book("The Lean Startup", "Eric Ries", 336, "unread"));
    myLibrary.push(new Book("Rich Dad Poor Dad", "Robert Kiyosaki", 336, "read"));
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
    
    const readButton = document.createElement("button");
    readButton.classList.add("read");
    readButton.textContent = book.status == IN_PROGRESS ? READ : UNREAD;

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

function main() {
    sampleBooks();
    updateLibrary();
}

main();
