import { getCategories } from "../data/categories.js";
import { getIndexOfObject } from "../tables/tables.js";
import notes from "../data/notes.js";
import { parseData } from "../additional/prepareData.js";
import { fillTables } from "../tables/tables.js";
import createId from "../additional/createId.js";

const form = document.querySelector('#form'); //form
const submit = document.querySelector('#submit'); //submit bnt (form)
const close = document.querySelector("#close");
const categorySelect = document.querySelector('#category');

let position = null;
createCategories();

form.addEventListener('click', (e) => {
    e.preventDefault(); //prevent default behaviour
})

submit.addEventListener('click', () => {
    if (position === null) {
        const newObj = createNewNote();
        notes.push(newObj) //add our object to DB
    }
    else {
        notes[position].name = form.querySelector("#name").value;
        notes[position].category = form.querySelector("#category").value;
        notes[position].content = form.querySelector("#content").value;
        notes[position].dates = parseData(notes[position].content);
        position = null;
    }

    closeForm(); //hide our form
    fillTables();
})

close.addEventListener('click', closeForm)

function edit(row) { //edit logic
    showForm();
    fillForm(getIndexOfObject(row));
}

function deleteNote(row) {
    notes.splice(getIndexOfObject(row), 1);
    fillTables();
}

function archive(row) {
    notes[getIndexOfObject(row)].archive = true;
    fillTables();
}

function fillForm(index) {
    form.querySelector("#name").value = notes[index].name;
    console.log(notes[index].category)
    form.querySelector("#category").value = notes[index].category;
    form.querySelector("#content").value = notes[index].content;
    position = index;
}

function resetForm() {
    form.querySelector("#name").value = '';
    form.querySelector("#category").value = '';
    form.querySelector("#content").value = '';
}

function closeForm() {
    form.classList.add('hidden');
    resetForm();
}

function showForm() {
    form.classList.remove('hidden');
}

function createCategories() {
    const categories = getCategories();
    for (let category of categories)
        categorySelect.insertAdjacentHTML('beforeend', `<option value=${category}>${category}</option>`);
}

function createNewNote() {
    const date = new Date();

    const newObj = { //create new object
        id: createId(),
        name: form.querySelector("#name").value,
        created: `${date.toLocaleString('en', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`,
        category: form.querySelector("#category").value,
        content: form.querySelector("#content").value,
        dates: parseData(form.querySelector("#content").value)
    }

    return newObj;
}

export {edit, deleteNote, archive, showForm}