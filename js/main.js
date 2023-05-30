//create an array of localStorage element, or an empty array if no localStorage
let books = JSON.parse(localStorage.getItem('books')) || [];
const bookList = document.querySelector('.book-List');
const addBookForm = document.querySelector('.book-form');
class Book {
  //constructor and properties
    constructor(title,author) {
      // Instance Properties, describes de current state of that object
      // this.*** is about the current object, the object wich es created by a class
      this.title = title
      this.author =  author
  }
  //here are the Class's methodes
  static removeBook = (index) => {
    books = books.filter((book, i) => i !== index);
    saveBooksToLocalStorage(books);
  }

  static addBook = (book) => {
    books.push(book);
    saveBooksToLocalStorage(books);
    const newIndex = books.length - 1;
    createBookElement(book, newIndex);
  }

}

const saveBooksToLocalStorage = (books) => {
  localStorage.setItem('books', JSON.stringify(books));
}

const renderBookList = () => {
  books.forEach((book, index) => {
    createBookElement(book, index);
  });
}

const loadBooksFromLocalStorage = () => {
  const dataSaved = localStorage.getItem('books');
  if (dataSaved) {
    books = JSON.parse(dataSaved);
    renderBookList();
  }
}

//Instant Methods, they use instant Properties to achieve the results

const saveFormSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(addBookForm);
  const title = formData.get('title');
  const author = formData.get('author');
  const newBook = { title, author };
  Book.addBook(newBook)
  addBookForm.reset();
}

//A table that will contain all books
const tableOfBooks = document.createElement('table')

const createBookElement = (book, index) => {
  //Create a tableRow as books list
  const tableRow = document.createElement('tr');
  const bookDetailsContainer = document.createElement('td');
  const removeBtnContainer = document.createElement('td');
  bookDetailsContainer.classList.add("book_details")
  removeBtnContainer.classList.add("remove_btn_container")
  //Create book's elements
  const removeBtn = document.createElement('button')
  removeBtn.appendChild(document.createTextNode("remove"))
  const bookDetails = document.createTextNode(`"${book.title}" by ${book.author}`)
  //append elment on their parents
  bookDetailsContainer.appendChild(bookDetails)
  removeBtnContainer.appendChild(removeBtn)
  tableRow.appendChild(bookDetailsContainer);
  tableRow.appendChild(removeBtnContainer)

  removeBtn.addEventListener('click', () => {
    Book.removeBook(index);
    tableRow.remove();
  });
  tableOfBooks.appendChild(tableRow);
  bookList.appendChild(tableOfBooks);
}

addBookForm.addEventListener('submit',saveFormSubmit)
  window.onload = () => {
    loadBooksFromLocalStorage()
}


// eslint-disable-next-line no-new
