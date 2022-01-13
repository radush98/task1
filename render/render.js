import { categories } from "../data/categories.js"

function getElement(obj, isArchive) { //return pattern with data
    return `<tr class=${!isArchive ? 'row' : 'archive-row'}>
            <td><img src="${getIcon(obj.category)}"></td>
            <td>${obj.name}</td>
            <td class="created">${obj.created}</td>
            <td>${obj.category}</td>
            <td>${obj.content}</td>
            <td>${obj.dates}</td>
            <td>
                ${getControlButtons(isArchive)}
            </td>
            </tr>`
}

function getControlButtons(isArchive) {
    if (isArchive)
        return `<button class="table-body-button-unarchive">Unarchive</button>`
    else
        return `<button class="table-body-button-edit">Edit</button>
                <button class="table-body-button-archive">Archive</button>
                <button class="table-body-button-delete">Delete</button>`
}

function getStatisticElement(obj) {
    return `<tr>
            <td><img src="${getIcon(obj.note_category)}"></td>
            <td>${obj.note_category}</td>
            <td class="created">${obj.active}</td>
            <td>${obj.archived}</td>
            </tr>`
}

function getIcon(categoryName){
    console.log(categories.filter(category => category.name === categoryName))
    return categories.filter(category => category.name === categoryName)[0].icon;
}

export {getElement, getStatisticElement}