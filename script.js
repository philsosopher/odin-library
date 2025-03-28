const myLibrary = [];

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
    myLibrary.push(new Book("The Psychology of Money", "Morgan Housel", 256, "read"));
    myLibrary.push(new Book("Atomic Habits", "James Clear", 320, "reading"));
    myLibrary.push(new Book("Deep Work", "Cal Newport", 304, "unread"));
    myLibrary.push(new Book("Thinking, Fast and Slow", "Daniel Kahneman", 512, "reading"));
    myLibrary.push(new Book("The 7 Habits of Highly Effective People", "Stephen R. Covey", 432, "read"));
    myLibrary.push(new Book("Essentialism", "Greg McKeown", 272, "unread"));
    myLibrary.push(new Book("The Hobbit", "J.R.R. Tolkien", 310, "read")); // Kept one classic
    myLibrary.push(new Book("Make Your Bed", "William H. McRaven", 144, "read"));
}


function main() {
    sampleBooks();
}

main();
