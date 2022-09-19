let myLibrary = []
let id = 0
let booksDiv = document.querySelector('div.books')
let newBook = document.querySelector('#newbook')
let form = document.querySelector('form')

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.id = id
  id += 1
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, parseInt(pages), read))
}

function removeBookFromLibrary(id) {
  let book = myLibrary.find((book) => book.id === id)
  if (typeof book === 'undefined') {
    return
  }
  const index = myLibrary.indexOf(book)
  if (index !== -1) {
    myLibrary.splice(index, 1)
  }
  displayBooks()
}

function displayBooks() {
  while (booksDiv.hasChildNodes()) {
    booksDiv.removeChild(booksDiv.firstChild)
  }
  myLibrary.forEach((book) => {
    let bookCard = document.createElement('div')
    bookCard.classList.add('book')
    bookCard.dataset.id = id.toString()

    let title = document.createElement('div')
    title.textContent = book.title
    let author = document.createElement('div')
    author.textContent = book.author
    let pages = document.createElement('pages')
    pages.textContent = book.pages.toString()
    let read = document.createElement('div')
    read.textContent = book.read ? 'yes' : 'no'

    let removeButton = document.createElement('button')
    removeButton.textContent = 'Remove'
    removeButton.addEventListener('click', () => {
      removeBookFromLibrary(book.id)
    })

    let readButton = document.createElement('button')
    readButton.textContent = 'Toggle Read'
    readButton.addEventListener('click', () => {
      book.read = !book.read
      displayBooks()
    })

    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
    bookCard.appendChild(read)
    bookCard.appendChild(removeButton)
    bookCard.appendChild(readButton)

    booksDiv.appendChild(bookCard)
  })
}

newBook.addEventListener('click', () => {
  form.hidden = false
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  console.log(event.target[0].value)
  console.log(event.target[1].value)
  console.log(event.target[2].value)
  console.log(event.target[3].value)
  addBookToLibrary(
    event.target[0].value,
    event.target[1].value,
    event.target[2].value,
    event.target[3].value === 'on'
  )
  form.hidden = true
  form.reset()
  displayBooks()
})

myLibrary.push(new Book('Flow1', 'Me', 100, false))
myLibrary.push(new Book('Flow2', 'Me', 100, false))
myLibrary.push(new Book('Flow3', 'Me', 100, false))

console.log(myLibrary)

displayBooks()
