import { edit, deleteNote, archive } from "../form/form.js";
import notes from "../data/notes.js";
import { getElement, getStatisticElement } from "../render/render.js";
import calculateStatistic from "../additional/statistic.js";

const table = document.querySelector('#main-content'); //table;
const archiveTable = document.querySelector('#archive');
const statisticTable = document.querySelector('#statistic');//

fillTables();

function updateListeners() { //update our event listeners 
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

function getIndexOfObject(row) {
    const data = row.querySelector('.created').innerText;
    return notes.indexOf(notes.find(note => note.created === data));
}

function clearTables(table, statisticTable) { //clear our table
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }

    while (statisticTable.hasChildNodes()) {
        statisticTable.removeChild(statisticTable.firstChild);
    }

    while (archiveTable.hasChildNodes()) {
        archiveTable.removeChild(archiveTable.firstChild);
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

export {table , updateListeners, getIndexOfObject, fillTables};

