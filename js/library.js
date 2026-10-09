// Initial Library
const myLibrary = [];

myLibrary.push(
  new Book(
    "Soft Skills: The Software Developer's Life Manual",
    "John Sonmez",
    502,
    true,
  ),
);
myLibrary.push(new Book("Raising Kanye", "Donda West", 266, true));
myLibrary.push(new Book("The War of Art", "Steven Pressfield", 190, true));
myLibrary.push(
  new Book("Epistulae Morales ad Lucilium", "Lucius Annaeus Seneca", 607, true),
);
myLibrary.push(new Book("Meditations", "Marcus Aurelius", 208, false));
myLibrary.push(
  new Book("Beyond Good and Evil", "Friedrich Nietzsche", 253, false),
);

// Elements
const libraryDisplay = document.querySelector("#library");
const newBookModal = document.querySelector("#newBookModal");
const newBookForm = newBookModal.querySelector("#newBookForm");
const titleInput = newBookForm.querySelector("#titleInput");
const authorInput = newBookForm.querySelector("#authorInput");
const pagesInput = newBookForm.querySelector("#pagesInput");
const removeToggleBtn = document.querySelector("#removeToggleBtn");
const removeToggleCheck = document.querySelector("#removeToggleCheck");

// Event Listeners
newBookForm.addEventListener("submit", addBook);
removeToggleBtn.addEventListener("click", () => {
  removeToggleCheck.checked = !removeToggleCheck.checked;
  if (removeToggleCheck.checked) {
    removeToggleBtn.classList.add("enabled");
    removeToggleBtn.classList.remove("disabled");
    removeToggleBtn.textContent = "Disable Removal";
  } else {
    removeToggleBtn.classList.add("disabled");
    removeToggleBtn.classList.remove("enabled");
    removeToggleBtn.textContent = "Enable Removal";
  }
});

function Book(title, author, pages, isRead) {
  if (!new.target) {
    throw Error("The 'new' operator must be used to call the constructor");
  }
  this.id = `id-${crypto.randomUUID()}`; // Id prefix to be used as selector later
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleRead = function () {
  if (!this.checkEl) {
    const bookEl = document.getElementById(this.id);
    this.checkEl = bookEl.querySelector("input[type=checkbox]");
  }
  this.isRead = this.checkEl.checked;
};

Book.prototype.removeBook = function () {
  if (window.confirm(`Are you sure you want to remove ${this.title}`)) {
    const i = myLibrary.findIndex((obj) => obj.id === this.id);
    myLibrary.splice(i, 1);

    const bookEl = document.getElementById(this.id);
    bookEl.remove();
  }
};

function addBook(event) {
  event.preventDefault();

  const newBook = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    false,
  );
  myLibrary.push(newBook);
  createBookCard(newBook, libraryDisplay);

  newBookModal.close();

  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";

  const bookEl = document.querySelector(`#${newBook.id}`);
  bookEl.scrollIntoView({ block: "end", behavior: "smooth" });
}

function displayLibrary() {
  clearChildren(libraryDisplay);

  for (const book of myLibrary) {
    createBookCard(book, libraryDisplay);
  }
}

function createBookCard(book, parent) {
  if ("content" in document.createElement("template")) {
    const template = document.querySelector("#card-template");

    const clone = document.importNode(template.content, true);

    const bookCard = clone.querySelector(".book-card");
    bookCard.id = book.id;

    const bookTitle = bookCard.querySelector(".book-title");
    bookTitle.textContent = book.title;
    bookTitle.setAttribute("title", book.title);

    const bookAuthor = bookCard.querySelector(".book-author");
    bookAuthor.textContent = book.author;
    bookAuthor.setAttribute("title", book.author);

    if (book.pages) {
      const bookPages = bookCard.querySelector(".book-pages");
      bookPages.textContent = book.pages + " pages";
    }

    const readCheck = bookCard.querySelector("input[type=checkbox]");
    readCheck.checked = book.isRead;
    readCheck.addEventListener("change", () => book.toggleRead());

    const bookRemove = bookCard.querySelector(".book-remove");
    bookRemove.addEventListener("click", () => book.removeBook());

    parent.insertBefore(bookCard, parent.firstChild);
  } else {
    // Used in browsers without template support
    // Approximately 0.22% of users globally, worth :))
    const bookCard = document.createElement("div");
    bookCard.id = book.id;
    bookCard.classList.add("book-card");

    const bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");
    const bookTitle = document.createElement("p");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = book.title;
    bookTitle.setAttribute("title", book.title);
    bookInfo.appendChild(bookTitle);
    const authorEl = document.createElement("p");
    authorEl.classList.add("book-author");
    authorEl.textContent = book.author;
    bookInfo.appendChild(authorEl);
    if (book.pages) {
      const pagesEl = document.createElement("p");
      pagesEl.classList.add("book-pages");
      pagesEl.textContent = book.pages + " pages";
      bookInfo.appendChild(pagesEl);
    }
    bookCard.appendChild(bookInfo);

    const bookActions = document.createElement("div");
    bookActions.classList.add("book-actions");
    const bookRemove = document.createElement("button");
    bookRemove.classList.add("btn", "book-remove");
    bookRemove.textContent = "Remove";
    bookRemove.addEventListener("click", () => book.removeBook());
    bookActions.appendChild(bookRemove);
    const readLabel = document.createElement("label");
    readLabel.classList.add("book-read");
    readLabel.textContent = "Read";
    const readCheck = document.createElement("input");
    readCheck.type = "checkbox";
    readCheck.checked = book.isRead;
    readCheck.addEventListener("change", () => book.toggleRead());
    readLabel.appendChild(readCheck);
    const readMark = document.createElement("span");
    readMark.classList.add("checkmark");
    readLabel.appendChild(readMark);
    bookActions.appendChild(readLabel);
    bookCard.appendChild(bookActions);

    parent.insertBefore(bookCard, parent.firstChild);
  }
}

function clearChildren(parent) {
  const children = parent.querySelectorAll("*");
  children.forEach((child) => child.remove());
}

displayLibrary();
