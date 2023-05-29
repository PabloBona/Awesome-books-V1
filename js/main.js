// We create an empty array to store title and author
let books = [];
// select an element with the required class
const bookList = document.querySelector('.book-List');
const addForm = document.querySelector('.book-form');

const createBookElement = (book) => {
  // create elements
  const bookContainer = document.createElement('div');
  const titleElement = document.createElement('p');
  const authorElement = document.createElement('p');
  const removeBtn = document.createElement('button');
  // create text nodes
  const title = document.createTextNode(book.title);
  const author = document.createTextNode(book.author);
  const remove = document.createTextNode('Remove');
  // add nodes to created elements
  titleElement.appendChild(title);
  authorElement.appendChild(author);
  removeBtn.appendChild(remove);
  // add both p and button to bookContainer(div)
  bookContainer.appendChild(titleElement);
  bookContainer.appendChild(authorElement);
  bookContainer.appendChild(removeBtn);

  // Create function in remove buton
  removeBtn.addEventListener('click', () => {
    books = books.filter((currentBook) => book.title !== currentBook.title);
    localStorage.setItem('books', JSON.stringify(books));
    bookContainer.remove();
  });
  // add .div(bookContainer) to html
  bookList.appendChild(bookContainer);
};

const renderBookList = () => {
  books.forEach((book) => createBookElement(book));
};

const saveBook = (book) => {
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
  createBookElement(book);
};

// create a submit event when we push the btn

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const myFormData = new FormData(e.target); // this JS object allows to access the values of form
  const title = myFormData.get('title'); // here we get the value of the input where name=title
  const author = myFormData.get('author'); // here we get the value of the input where name=author
  // Maybe we con do a console.log(title)
  saveBook({ title, author });
  addForm.reset();
});

// when the page loads, look for the storage data y call the render function (renderBookList)
document.addEventListener('DOMContentLoaded', () => {
  const dataSaved = localStorage.getItem('books');

  if (dataSaved) {
    books = JSON.parse(dataSaved);
    renderBookList();
  }
});

// crear array
// listener formulario para obtener valores de los inputs
// guardar libros para pushearlos al array de book y save en el local storages
// creamos la fx renderizar cdo carga la pagina
// creamos createBookEl  que crea los elementos texto y boton remover y el eventlistenr del boton
