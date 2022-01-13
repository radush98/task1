import { edit, deleteNote, archive } from "../form/form.js";
import notes from "../data/notes.js";
import { getElement, getStatisticElement } from "../render/render.js";
import calculateStatistic from "../additional/statistic.js";

const table = document.querySelector('#main-content'); //table;
const archiveTable = document.querySelector('#archive');//archive table
const statisticTable = document.querySelector('#statistic');//statistic table
const tables = [table, archiveTable, statisticTable];

const archiveAllBtn = document.querySelector('#archive-all');
const deleteAllBtn = document.querySelector('#delete-all');
const unarchiveAllBtn = document.querySelector('#unarchive-all');

fillTables();
updateListeners();

function updateMainTableListeners() {
    const rows = document.getElementsByClassName('row');//all our edit buttons
    for (let row of rows) {
        row.addEventListener('click', e => {
            const caller = e.target;
            if (caller.classList.contains('table-body-button-edit')) { //if we pressed edit
                edit(row);
            }
            else if (caller.classList.contains('table-body-button-delete')) {//if we pressed delete
                deleteNote(row);
            }
            else if (caller.classList.contains('table-body-button-archive')) {//if we pressed archive
                archive(row);
            }
        })
    }
}

function archiveToggle(archive){
    notes.forEach((note) => {
        note.archive = archive;
    })
    fillTables();
}

archiveAllBtn.addEventListener('click', () => {
    archiveToggle(true);
})

unarchiveAllBtn.addEventListener('click', () => {
    archiveToggle(false);
})

deleteAllBtn.addEventListener('click', () => {
    notes.splice(0, notes.length);
    fillTables();
})

function updateArchiveListeners() {
    const rows = document.getElementsByClassName('archive-row');
    for (let row of rows) {
        row.addEventListener('click', e => {
            const caller = e.target;
            if (caller.classList.contains('table-body-button-unarchive')) { //if we pressed edit
                unarchive(row);
            }
        })
    }
}

function updateListeners() { //update our event listeners 
    updateMainTableListeners();
    updateArchiveListeners();
}

function getIndexOfObject(row) {
    const data = row.querySelector('.created').innerText;
    return notes.indexOf(notes.find(note => note.created === data));
}

function clearTables() {
    for (let t of tables) {
        while (t.hasChildNodes()) {
            t.removeChild(t.firstChild);
        }
    }
}

function fillTables() { //add our notes to DOM
    clearTables(table, statisticTable, archiveTable);
    for (let obj of notes) {
        if (!obj.archive)
            table.insertAdjacentHTML('beforeend', getElement(obj, false));
        else {
            archiveTable.insertAdjacentHTML('beforeend', getElement(obj, true))
        }
    }

    for (let obj of calculateStatistic()) {
        statisticTable.insertAdjacentHTML('beforeend', getStatisticElement(obj));
    }
    updateListeners();
}

function unarchive(row) {
    notes[getIndexOfObject(row)].archive = false;
    fillTables();
}

export { table, updateListeners, getIndexOfObject, fillTables };

