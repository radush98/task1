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

const name = form.querySelector("#name");
const category = form.querySelector("#category");
const content = form.querySelector("#content");

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
        notes[position].name = name.value;
        notes[position].category = category.value;
        notes[position].content = content.value;
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
    name.value = notes[index].name;
    category.value = notes[index].category;
    content.value = notes[index].content;
    position = index;
}

function resetForm() {
    name.value = '';
    category.value = '';
    content.value = '';
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
        name: name.value,
        created: `${date.toLocaleString('en', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`,
        category: category.value,
        content: content.value,
        dates: parseData(content.value)
    }

    return newObj;
}

export {edit, deleteNote, archive, showForm}