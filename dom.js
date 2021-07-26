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

        book[ID_BOOK] = bookObject.id;
        books.push(bookObject);

        uncompletedBookList.append(book);
        updateDataToStorage();

    }
    const book = makeBook(bookTitle, bookAuthor, bookYear,bookCompleted);
    incompleteBookshelfList.append(book);

}


function makeBook(title, author, year,isComplete) {

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerHTML = `Penulis: <span id="author">` + author + `</span>`;

    const bookYear = document.createElement("p");
    bookYear.innerText = year;

    const bookContainer = document.createElement("div");
    bookContainer.classList.add("item", "shadow");
    bookContainer.append(bookTitle, bookAuthor, bookYear);

    if(isComplete){
        bookContainer.append(createTrashButton(),
        createUndoButton());
    } else {
        bookContainer.append(createFinishButton(),
          createTrashButton());
    }
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
  const bookTitle = taskElement.querySelectorAll(".inner > h3").innerText;
  const bookAuthor = taskElement.querySelectorAll(".inner > p").innerText;
  const bookYear = taskElement.querySelectorAll(".inner > p").innerText;

  const newBook = makeBook(bookTitle, bookAuthor,bookYear,true);
  // const book =findBook(taskElement[BOOK_ITEMID]);
  // book.isCompleted=true;
  // newBook[BOOK_ITEMID]=book.id;

  listCompleted.append(newBook);
  taskElement.remove();

  // updateDataStorage();
}


function removeBookFromCompleted(taskElement) {
    taskElement.remove();
}


function undoBookFromCompleted(taskElement) {
  const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_SHELF_ID);
  const bookTitle = taskElement.querySelectorAll(".inner > h3").innerText;
  const bookAuthor = taskElement.querySelectorAll(".inner > p").innerText;
  const bookYear = taskElement.querySelectorAll(".inner > p").innerText;

  const newBook = makeBook(bookTitle, bookAuthor,bookYear,false);

  listUncompleted.append(newBook);
  taskElement.remove();
}


function createTrashButton() {
    return createButton("red", function(event){
        removeBookFromCompleted(event.target.parentElement);
    },"Hapus Buku");
}


function createFinishButton() {
  return createButton(
    "green",
    function (event) {
      addBookToCompleted(event.target.parentElement.parentElement);
    },
    "Selesai dibaca"
  );
}

function createUndoButton() {
  return createButton(
    "blue",
    function (event) {
      undoBookFromCompleted(event.target.parentElement.parentElement);
    },
    "Baca Kembali"
  );
}
