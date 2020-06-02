const importTest= (name, path) => {
    describe(name, () => require(path));
};

//RESOURCE USERS
describe('/api/users', () => {
    importTest('/login', './users/login');
    importTest('/register', './users/register');
    importTest('/profile', './users/profile');
    importTest('/topUp', './users/topUp');
    importTest('/subscribe', './users/subscribe');
});

//RESOURCE RECIPES
describe('/api/recipes', () => {
    //IMPORT DISINI
});

//RESOURCE MEALS
describe('/api/meals', () => {
    //IMPORT DISINI
});