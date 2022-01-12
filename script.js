import notes from './items.js'

const table = document.querySelector('#main-content'); //table;
const statisticTable = document.querySelector('#statistic');//
const createNoteBtn = document.querySelector('#add-btn'); //btn
const form = document.querySelector('#form'); //form
const submit = document.querySelector('#submit'); //submit bnt (form)
const rows = document.getElementsByTagName('tr');//all our edit buttons
const close = document.querySelector("#close");

let position = null;

fillTable();

createNoteBtn.addEventListener('click', () => {
    showForm(); //show form
})

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
        position = null;
    }

    closeForm(); //hide our form
    fillTable();
})

close.addEventListener('click', closeForm)

function updateListeners() { //update our event listeners 
    for (let row of rows) {
        row.addEventListener('click', e => {
            const caller = e.target;
            if (caller.classList.contains('table-body-button-edit')) {
                edit(row);
            }
            else if (caller.classList.contains('table-body-button-delete')) {
                deleteNote(row);
            }
            else if (caller.classList.contains('table-body-button-archive')) {
                archive(row);
            }
        })
    }
}

function edit(row) { //edit logic
    showForm();
    fillForm(getIndexOfObject(row));
}

function deleteNote(row) {
    notes.splice(getIndexOfObject(row), 1);
    fillTable();
}

function archive(row) {
    notes[getIndexOfObject(row)].archive = true;
    fillTable();
}

function clearTable(table) { //clear our table
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }
}

function fillTable() { //add our notes to DOM
    clearTable(table);
    for (let obj of notes) {
        if (!obj.archive)
            table.insertAdjacentHTML('beforeend', getElement(obj));
    }
    updateListeners();
}

function getElement(obj) { //return pattern with data
    return `<tr id="${obj.id}">
            <td><i class='bx bx-task task-icon'></i></td>
            <td>${obj.name}</td>
            <td class="created">${obj.created}</td>
            <td>${obj.category}</td>
            <td>${obj.content}</td>
            <td>${obj.dates}</td>
            <td>
                <button class="table-body-button-edit">Edit</button>
                <button class="table-body-button-archive">Archive</button>
                <button class="table-body-button-delete">Delete</button>
            </td>
            </tr>`
}

function createId() {
    while (true) {
        let id = Math.round(0 - 0.5 + Math.random() * (1000000 - 0 + 1)); //0 - min, 1000000 - max
        if (notes.find(elem => elem.id === id) === undefined) {
            return id
        }
    }
}

function createNewNote() {
    const date = new Date();

    const newObj = { //create new object
        id: createId(),
        name: form.querySelector("#name").value,
        created: `${date.toLocaleString('en', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`,
        category: form.querySelector("#category").value,
        content: form.querySelector("#content").value
    }

    return newObj;
}

function getIndexOfObject(row) {
    const data = row.querySelector('.created').innerText;
    return notes.indexOf(notes.find(note => note.created === data));
}

function fillForm(index) {
    form.querySelector("#name").value = notes[index].name;
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

function statistic() {
    const tasks = notes.filter(elem => elem.category == 'Task').length;
    const archivedTasks = notes.filter(elem => elem.category == 'Task' && elem.archive == true).length;

    const thoughts = notes.filter(elem => elem.category == 'Random thought').length;
    const archivedThougs = notes.filter(elem => elem.category == 'Random thought' && elem.archive == true).length;

    const ideas = notes.filter(elem => elem.category == 'Idea').length;
    const archivedIdeas = notes.filter(elem => elem.category == 'Idea' && elem.archive == true).length;
}



