import { showForm } from "./form/form";

const createNoteBtn = document.querySelector('#add-btn'); //btn
const closeArchiveBtn = document.querySelector("#close-archived");
const openArchiveBtn = document.querySelector("#open-archive");

openArchiveBtn.addEventListener('click', () => {
    closeArchiveBtn.parentNode.classList.remove('hidden');
})

closeArchiveBtn.addEventListener('click', () => {
    closeArchiveBtn.parentNode.classList.add('hidden');
})

createNoteBtn.addEventListener('click', () => {
    showForm(); //show form
})

