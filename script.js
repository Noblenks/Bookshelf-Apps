document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.getElementById("inputBook");
    document.getElementById("inputBookIsComplete").addEventListener("change", checkbox);
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    if (isStorageExist()) {
      loadDataFromStorage();
}
});

function checkbox() {
  var books = document.getElementById("inputBookIsComplete");
  books.value = books.value.toUpperCase();
}

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});
