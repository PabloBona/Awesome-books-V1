class Books {
  constructor() {
    // Instance Properties, describes de current state of that object
    // this.*** is about the current object, the object wich es created by a class
    this.books = [];
    this.bookList = document.querySelector('.book-List');
    this.addForm = document.querySelector('.book-form');

    // Next are methods: By calling this function in the constructor, we ensure that
    // books are automatically loaded and displayed when a new instance of the Books class created.
    this.loadBooksFromLocalStorage();
    this.addForm.addEventListener('submit', this.saveFormSubmit.bind(this));
  }

  // Instant Methods, they use instant Properties to achieve the results
  createBookElement(book) {
    const bookContainer = document.createElement('div');
    const titleElement = document.createElement('p');
    const authorElement = document.createElement('p');
    const removeBtn = document.createElement('button');
    const title = document.createTextNode(book.title);
    const author = document.createTextNode(book.author);
    const remove = document.createTextNode('Remove');

    titleElement.appendChild(title);
    authorElement.appendChild(author);
    removeBtn.appendChild(remove);
    bookContainer.appendChild(titleElement);
    bookContainer.appendChild(authorElement);
    bookContainer.appendChild(removeBtn);

    removeBtn.addEventListener('click', () => {
      const index = this.books.indexOf(book);
      if (index === -1) {
        return;
      }

      this.removeBook(index);
      bookContainer.remove();
    });

    this.bookList.appendChild(bookContainer);
  }

  renderBookList() {
    this.books.forEach((book, index) => {
      this.createBookElement(book, index);
    });
  }

  saveBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  loadBooksFromLocalStorage() {
    const dataSaved = localStorage.getItem('books');
    if (dataSaved) {
      this.books = JSON.parse(dataSaved);
      this.renderBookList();
    }
  }

  addBook(book) {
    this.books.push(book);
    this.saveBooksToLocalStorage();
    const newIndex = this.books.length - 1;
    this.createBookElement(book, newIndex);
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.saveBooksToLocalStorage();
  }

  saveFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(this.addForm);
    const title = formData.get('title');
    const author = formData.get('author');
    const newBook = { title, author };
    this.addBook(newBook);
    this.addForm.reset();
  }
}

// eslint-disable-next-line no-new
new Books();
