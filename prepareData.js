import notes from "./notes.js";

const regex = /\d{2}([\/.-])\d{2}\1\d{4}/g;
notes.forEach(elem => elem.dates = parseData(elem.content))

// function getShortText(text) {
//     return text.slice(0, 10) + '...';
// }

function parseData(content) {
    return content.match(regex)?content.match(regex):'-';
}

export { parseData };