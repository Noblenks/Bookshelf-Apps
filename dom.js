const UNCOMPLETED_BOOK_SHELF_ID = "incompleteBookshelfList";
const COMPLETED_BOOK_SHELF_ID = "completeBookshelfList";
const ID_BOOK = 'bookId';

function addBook() {
    const incompleteBookshelfList = document.getElementById(UNCOMPLETED_BOOK_SHELF_ID );
    const completeBookshelfList = document.getElementById(COMPLETED_BOOK_SHELF_ID );

    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    const bookCompleted = document.getElementById("inputBookIsComplete").checked;

    if (bookCompleted.checked === true ) {
        const book = makeBook(
            bookTitle,
            bookAuthor,
            bookYear,
            true,
        );

    //     const bookObject = composeBookObject(
    //         bookTitle,
    //         bookAuthor,
    //         bookYear,
    //         true,
    //     );
    //
    //     book[ID_BOOK] = bookObject.id;
    //     books.push(bookObject);
    //
    //     completedBookList.append(book);
    //     updateDataToStorage();
    //
    // } else {
    //     const book = makeBook(
    //         bookTitle,
    //         bookAuthor,
    //         bookYear,
    //         false,
    //     );
    //
    //     const bookObject = composeBookObject(
    //         bookTitle,
    //         bookAuthor,
    //         bookYear,
    //         false,
    //     );


        uncompletedBookList.append(book);
        updateDataToStorage();

    }
    const book = makeBook(bookTitle, bookAuthor, bookYear,bookCompleted);
    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, false);
    book[ID_BOOK] = bookObject.id;
    books.push(bookObject);

    if (bookCompleted.checked) {
      completeBookshelfList.append(book);
    } else {
      incompleteBookshelfList.append(book);
    }
    updateDataToStorage();

}


function makeBook(title, author, year,isComplete) {

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerHTML = `Penulis: <span id="author">` + author + `</span>`;

    const bookYear = document.createElement("p");
    bookYear.innerText = year;

    const button = document.createElement("div");
    button.classList.add("action");

    const bookContainer=document.createElement("article");
    bookContainer.classList.add("book_item")
    bookContainer.append(bookTitle,bookYear,bookAuthor);

    if(isComplete){
        button.append(createTrashButton(),
        createUndoButton());
        bookContainer.append(button);
    } else {
        button.append(createFinishButton(),
          createTrashButton());
          bookContainer.append(button);
    }
    // bookContainer.append(button);

    return bookContainer;
}

function createButton(buttonTypeClass , eventListener,buttonText) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttonText;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });

    return button;
}

function addBookToCompleted(taskElement) {
  const listCompleted = document.getElementById(COMPLETED_BOOK_SHELF_ID);
   taskElement = taskElement.parentNode;
  const bookTitle = taskElement.querySelectorAll(".book_item > h3").innerText;
  const bookAuthor = taskElement.querySelectorAll(".book_item > p").innerText;
  const bookYear = taskElement.querySelectorAll(".book_item > p").innerText;

  const newBook = makeBook(bookTitle, bookAuthor,bookYear,true);
  const book =findBook(taskElement[ID_BOOK]);
  book.isCompleted=true;
  newBook[ID_BOOK]=book.id;

  listCompleted.append(newBook);
  taskElement.remove();

  updateDataToStorage();
}


function removeBookFromCompleted(taskElement) {
    taskElement.remove();
}


function undoBookFromCompleted(taskElement) {
  const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_SHELF_ID);
   taskElement = taskElement.parentNode;
  const bookTitle = taskElement.querySelectorAll(".book_item > h3").innerText;
  const bookAuthor = taskElement.querySelectorAll(".book_item > p").innerText;
  const bookYear = taskElement.querySelectorAll(".book_item > p").innerText;

  const newBook = makeBook(bookTitle, bookAuthor,bookYear,true);

  listUncompleted.append(newBook);
  taskElement.remove();
}


function createTrashButton() {
    return createButton("red", function(event){
        removeBookFromCompleted(event.target.parentElement.parentElement);
    },"Hapus Buku");
}


function createFinishButton() {
  return createButton(
    "green",
    function (event) {
      addBookToCompleted(event.target.parentElement);
    },
    "Selesai dibaca"
  );
}

function createUndoButton() {
  return createButton(
    "blue",
    function (event) {
      undoBookFromCompleted(event.target.parentElement);
    },
    "Baca Kembali"
  );
}
