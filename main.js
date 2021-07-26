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
   const parsed = JSON.stringify(todos);
   localStorage.setItem(STORAGE_KEY, parsed);
   document.dispatchEvent(new Event("onbooksaved"));
}

function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);

   let data = JSON.parse(serializedData);

   if(data !== null)
       todos = data;

   document.dispatchEvent(new Event("onbookloaded"));
}

function updateDataToStorage() {
   if(isStorageExist())
       saveBook();
}

function findTodo(bookId) {
   for(book of books){
       if(book.id === bookId)
           return book;
   }
   return null;
}

function findTodoIndex(bookId) {
   let index = 0
   for (book of books) {
       if(book.id === bookId)
           return index;

       index++;
   }

   return -1;
}

function composeBookObject(title, author, year, isComplete) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isComplete,
    };
}
