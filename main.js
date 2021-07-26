const STORAGE_KEY = "BOOKSHELF_APPS";

let books = [];

function isStorageExist() /* boolean */ {
   if(typeof(Storage) === undefined){
       alert("Browser kamu tidak mendukung local storage");
       return false
   }
   return true;
}

function saveBook() {
   const parsed = JSON.stringify(books);
   localStorage.setItem(STORAGE_KEY, parsed);
   document.dispatchEvent(new Event("onbooksaved"));
}

function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);

   let data = JSON.parse(serializedData);

   if(data !== null)
       books = data;

   document.dispatchEvent(new Event("onbookloaded"));
}

function updateDataToStorage() {
   if(isStorageExist())
       saveBook();
}

function findBook(bookId) {
   for(book of books){
       if(book.id === bookId)
           return book;
   }
   return null;
}

function findBookIndex(bookId) {
   let index = 0
   for (book of books) {
       if(book.id === bookId)
           return index;

       index++;
   }

   return -1;
}

function composeBookObject(bookTitle, bookAuthor, bookYear, bookCompleted) {
    return {
        id: +new Date(),
        bookTitle,
        bookAuthor,
        bookYear,
        bookCompleted,
    };
}

function refreshDataFromTodos() {
   const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_SHELF_ID);
   let listCompleted = document.getElementById(COMPLETED_BOOK_SHELF_ID);


   for(book of books){
       const newBook = makeTodo(book.bookTitle, book.bookAuthor, book.bookYear);
       newBook[ID_BOOK] = book.id;


       if(book.isCompleted){
           listCompleted.append(newBook);
       } else {
           listUncompleted.append(newBook);
       }
   }
}
