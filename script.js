import notes from './items.js'

const table = document.querySelector('#main-content'); //table;
const createNoteBtn = document.querySelector('#add-btn'); //btn
const form = document.querySelector('#form'); //form
const submit = document.querySelector('#submit'); //submit bnt (form)
const rows = document.getElementsByTagName('tr');//all our edit buttons

let position = null;

fillTable();

createNoteBtn.addEventListener('click', () => {
    form.classList.remove('hidden'); //show form
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

    form.classList.add('hidden'); //hide our form
    fillTable();
})

function updateListeners() { //update our event listeners 
    for (let row of rows) {
        row.addEventListener('click', e => {
            const caller = e.target;
            if (caller.classList.contains('table-body-button-edit')) {
                edit(row)
            }
            else if (caller.classList.contains('table-body-button-delete')) {
                console.log(caller)
                deleteNote(row)
            }
            console.dir(notes)
        })
    }
}

function edit(row) { //edit logic
    form.classList.remove('hidden');
    fillForm(getIndexOfObject(row));
}

function deleteNote(row) {
    notes.splice(getIndexOfObject(row), 1);
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
        if (notes.find(elem => elem.id === id) === undefined){
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