const myLibrary = [];

function Book(title, author, pages) {
  if (!new.target) {
    throw Error("The 'new' operator must be used to call the constructor");
  }
  this.bookId = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = false;
}

function addBook(title, author, pages = undefined) {
  // Grab input value for title, author and pages
  const newBook = new Book(title, author, pages);
  myLibrary.push(newBook);
  console.log(newBook.bookId);
}

function displayLibrary() {
  for (const book of myLibrary) {
    console.log(
      `This book is called ${book.title}, it is written by ${book.author}, consisting of ${book.pages} pages.`,
    );
  }
}
