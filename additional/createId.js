import notes from "../data/notes.js";

function createId() {
    while (true) {
        let id = Math.round(0 - 0.5 + Math.random() * (1000000 - 0 + 1)); //0 - min, 1000000 - max
        if (notes.find(elem => elem.id === id) === undefined) {
            return id
        }
    }
}

export default createId