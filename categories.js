const categories = [
    {
        name:"Task",
        icon:''
    },
    {
        name:"Random thought",
        icon:''
    },
    {
        name:"Idea",
        icon:''
    }
];

function getCategories(){
    return categories.map(elem => elem.name);
}

export {categories, getCategories};
