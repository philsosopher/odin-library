// String Constants
const IN_PROGRESS = "In Progress";
const COMPLETED = "Completed";
const READ = "Read";
const UNREAD = "Unread";

class Book {

    /**
     * 
     * @param {string} title - The title of the book
     * @param {string} author - The author of the book
     * @param {number} pages - The number of pages in the book
     * @param {string} status - The reading status of the book (e.g., 'read', 'unread')
    */
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.id = crypto.randomUUID();
    }

    /**
     * function to toggle read status of a book
     */
    toggleStatus() {
        this.status = this.status === IN_PROGRESS ? COMPLETED : IN_PROGRESS;
    }
}

class Library {
    constructor() {
        this.myLibrary = [];
        this.myLibraryDom = document.querySelector("main");
    }

    /**
     * Creates a new book and adds it to the JS library and DOM library
     * @param {string} title 
     * @param {string} author 
     * @param {number} pages 
     * @param {string} status 
     */
    addBook(title, author, pages, status) {
        const book = new Book(title, author, pages, status);
        this.myLibrary.push(book);
        this.myLibraryDom.appendChild(this.createBookDom(book));
    }

    /**
     * Deletes the book with give bookId from both JS library and DOM Library
     * @param {string} bookId 
     */
    deleteBook(bookId) {
        if (!confirm("Are you sure you want to delete this book?")) {
            return;
        }
    
        // Delete book from array - Find and remove from array first (data drives the app)
        const bookIndex = this.myLibrary.findIndex(b => b.id == bookId);
        if (bookIndex === -1) {
            console.warn(`Book with ID ${bookId} not found in library`);
            return;
        }
        this.myLibrary.splice(bookIndex, 1);
    
        // Delete book DOM
        const bookDiv = this.myLibraryDom.querySelector(`.book[data-id="${bookId}"]`);
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
    createBookDom(book) {
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
            this.deleteBook(book.id);
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

    // Load sample books
    loadSampleBooks() {
        this.addBook("Atomic Habits", "James Clear", 320, COMPLETED);
        this.addBook("Deep Work", "Cal Newport", 304, IN_PROGRESS);
        this.addBook("The Pragmatic Programmer", "Andrew Hunt & David Thomas", 352, COMPLETED);
        this.addBook("Clean Code", "Robert C. Martin", 464, IN_PROGRESS);
    }

}

class LibraryApp {
    constructor() {
        this.Library = new Library();
        this.formDialog = document.querySelector("dialog.form");
        this.bookForm = document.querySelector(".form form");
        this.dialogCloseButton = document.querySelector(".form button.close");
        this.openDialogButton = document.querySelector("header button.opendialog");
        
    }

    setupDomEvents() {
        this.openDialogButton.addEventListener("click", () => {
            this.formDialog.showModal();
        });

        this.bookForm.addEventListener("submit", (event) => {
            event.preventDefault(); // prevent default action of form sending data to server
    
            // collect book details
            const title = document.getElementById("title").value.trim();
            const author = document.getElementById("author").value.trim();
            const pages = document.getElementById("pages").value.trim();
            const status = document.querySelector('input[name="status"]:checked');
            console.log(status); 
    
            if (!title || !author || !pages || !status) {
                console.log("Not all fields specified");
                event.target.reset();
                this.formDialog.close();
                return;
            }
        
            // create new book and dom
            this.Library.addBook(title, author, pages, status.value);
        
            // reset form
            event.target.reset();
    
            // close dialog
            this.formDialog.close();
        });

        this.dialogCloseButton.addEventListener("click", () => {
            this.bookForm.reset;
            this.formDialog.close();
        });
    }

    start() {
        this.setupDomEvents();
        this.Library.loadSampleBooks();
    }
}

// Initialize and run the app
const app = new LibraryApp();
app.start();

