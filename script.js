import notes from './items.js'

const table = document.querySelector('#main-content');
const createNoteBtn = document.querySelector('#add-btn');
const form = document.querySelector('#form');
const submit = document.querySelector('#submit');

fillTable();

function fillTable() {
    for (let obj of notes) {
        table.innerHTML += getElement(obj);
    }
}

function getElement(obj) {
    return `<tr id="${obj.id}">
            <td><i class='bx bx-task task-icon'></i></td>
            <td>${obj.name}</td>
            <td>${obj.created}</td>
            <td>${obj.category}</td>
            <td>${obj.content}</td>
            <td>${obj.dates}</td>
            <td>
                <button class="table-body-button"><i class='bx bxs-edit-alt table-body-button-icon'></i></button>
                <button class="table-body-button"><i class='bx bxs-archive-in table-body-button-icon'></i></button>
                <button class="table-body-button"><i class='bx bxs-trash-alt table-body-button-icon'></i></button>
            </td>
            </tr>`
}


createNoteBtn.addEventListener('click', () => {
    form.classList.remove('hidden');
})

form.addEventListener('click', (e) => {
    e.preventDefault();
})

submit.addEventListener('click', () => {
    const date = new Date();

    const newObj = {
        id: notes[notes.length - 1].id + 1,
        name: form.querySelector("#name").value,
        created: `${date.toLocaleString('en', { month: 'long'})} ${date.getDate()}, ${date.getFullYear()}`,
        category: form.querySelector("#category").value,
        content: form.querySelector("#content").value
    }

    notes.push(newObj);
    table.innerHTML += getElement(newObj);
    form.classList.add('hidden')
})




