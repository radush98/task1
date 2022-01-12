import notes from './items.js'

const table = document.querySelector('#main-content'); //table;
const createNoteBtn = document.querySelector('#add-btn'); //btn
const form = document.querySelector('#form'); //form
const submit = document.querySelector('#submit'); //submit bnt (form)

const rows = document.getElementsByTagName('tr');//all our edit buttons

fillTable();

createNoteBtn.addEventListener('click', () => {
    form.classList.remove('hidden'); //show form
})

form.addEventListener('click', (e) => {
    e.preventDefault(); //prevent default behaviour
})

submit.addEventListener('click', () => {
    const newObj = createNewNote();
    notes.push(newObj); //add our object to DB
    table.innerHTML += getElement(newObj); //integration to DOM
    form.classList.add('hidden'); //hide our form
})

for (let row of rows) {
    row.addEventListener('click', (e) => {
        const caller = e.target;
        
        if (caller.classList.contains('bxs-edit-alt')) {
            form.classList.remove('hidden');
            fillForm(getIndexOfObject(row));
        }
    })
}

function fillTable() { //add our notes to DOM
    for (let obj of notes) {
        table.innerHTML += getElement(obj);
    }
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
                <button class="table-body-button-edit"><i class='bx bxs-edit-alt table-body-button-icon'></i></button>
                <button class="table-body-button"><i class='bx bxs-archive-in table-body-button-icon'></i></button>
                <button class="table-body-button"><i class='bx bxs-trash-alt table-body-button-icon'></i></button>
            </td>
            </tr>`
}

function createNewNote() {
    const date = new Date();

    const newObj = { //create new object
        id: notes[notes.length - 1].id + 1,
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

function fillForm(index){
    form.querySelector("#name").value = notes[index].name;
    form.querySelector("#category").value = notes[index].category;
    form.querySelector("#content").value = notes[index].content;
}