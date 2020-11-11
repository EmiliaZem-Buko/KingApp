const checkboxes = document.querySelectorAll("input.checked");
const editButtonList = document.querySelectorAll("input.pen")

function howMany() {
    const checkedBoxes = document.querySelectorAll("input.checked:checked");
    console.log(checkboxes.length);
    console.log(checkedBoxes.length);
    const count = document.querySelector(".block");

    count.innerHTML = checkedBoxes.length + "/" + checkboxes.length;

}

function editBookName() {
    const bookID = this.dataset.bookid;
    const label = document.querySelector(`.bookItem label[data-bookid="${bookID}"]`);
    const bookNameInput = document.querySelector(`input.bookName[data-bookid="${bookID}"]`)
    label.hidden = true;
    bookNameInput.hidden = false;
}

checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", howMany);
});

editButtonList.forEach(btn => {
    btn.addEventListener("click", editBookName);
});

 function enterListener(event) {
    if (event.keyCode == 13 || event.which == 13) {
        this.form.submit();
    }
}


const newNameInputs = document.querySelectorAll("input.bookName");

newNameInputs.forEach(function (newNameInput) {
    newNameInput.addEventListener("keypress", enterListener);
});
