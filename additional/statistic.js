import notes from '../data/notes.js'
import { getCategories } from '../data/categories.js'

const categories = getCategories();

function calculateStatistic() {
    const statistic = [];
    for (let category of categories) {
        statistic.push({
            note_category: category,
            active: notes.filter(elem => elem.category == category).length,
            archived: notes.filter(elem => elem.category == category && elem.archive == true).length,
        })
    }
    return statistic;
}

export default calculateStatistic;
