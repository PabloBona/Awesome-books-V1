class Books {
  constructor() {
    this.books = [];
    this.bookList = document.querySelector('.book-List');
    this.addForm = document.querySelector('.book-form');
    this.bar = document.querySelector('#bar');
    this.newTitle = document.querySelector('#h1-new');
    this.contactSection = document.querySelector('#contact');

    this.loadBooksFromLocalStorage();
    this.addForm.addEventListener('submit', this.saveFormSubmit.bind(this));

    this.navContact = document.querySelector('#nav-contact');
    this.listButton = document.querySelector('#nav-list');
    this.addButton = document.querySelector('#nav-add');
    this.addTitle = document.querySelector('#h1-add');
    this.listButton.addEventListener('click', this.showAwesomeBooks.bind(this));
    this.addButton.addEventListener('click', this.showAddBooks.bind(this));
    this.navContact.addEventListener('click', this.showContact.bind(this));
    this.showAwesomeBooks();
  }

  createBookElement(book) {
    const bookContainer = document.createElement('div');
    const titleElement = document.createElement('p');
    const removeBtn = document.createElement('button');
    const title = document.createTextNode(`'${book.title}' by ${book.author}`);
    const remove = document.createTextNode('Remove');

    titleElement.appendChild(title);
    removeBtn.appendChild(remove);
    bookContainer.appendChild(titleElement);
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
    this.showBorder();
  }

  saveBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
    this.showBorder();
  }

  loadBooksFromLocalStorage() {
    const dataSaved = localStorage.getItem('books');
    if (dataSaved) {
      this.books = JSON.parse(dataSaved);
      this.renderBookList();
    }
  }

  showBorder() {
    const dataSaved = localStorage.getItem('books');
    if (dataSaved && dataSaved.includes('title')) {
      this.bookList.classList.add('border');
    } else {
      this.bookList.classList.remove('border');
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
    this.showBorder();
    this.saveBooksToLocalStorage();
  }

  saveFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(this.addForm);
    const title = formData.get('title');
    const author = formData.get('author');
    const newBook = { title, author };
    this.addBook(newBook);
    this.showBorder();
    this.addForm.reset();
  }

  showAwesomeBooks() {
    this.addForm.classList.add('hidden');
    this.bar.classList.add('hidden');
    this.newTitle.classList.add('hidden');
    this.contactSection.classList.add('hidden');
    this.bookList.classList.remove('hidden');
    this.addTitle.classList.remove('hidden');
  }

  showAddBooks() {
    this.bookList.classList.add('hidden');
    this.bar.classList.add('hidden');
    this.addTitle.classList.add('hidden');
    this.addForm.classList.remove('hidden');
    this.contactSection.classList.add('hidden');
    this.newTitle.classList.remove('hidden');
  }

  showContact() {
    this.bookList.classList.add('hidden');
    this.addTitle.classList.add('hidden');
    this.addForm.classList.add('hidden');
    this.bar.classList.add('hidden');
    this.newTitle.classList.add('hidden');
    this.contactSection.classList.remove('hidden');
  }
}

// eslint-disable-next-line no-new
new Books();
