const categories = [
    {
        name:'Task',
        icon:'img/list.png'
    },
    {
        name:'Random_thought',
        icon:'img/thought.png'
    },
    {
        name:'Idea',
        icon:'img/idea.png'
    }
];

function getCategories(){
    return categories.map(elem => elem.name);
}

export {categories, getCategories};
