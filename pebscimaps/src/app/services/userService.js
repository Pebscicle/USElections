import dumbyDatabase from '../../data/dumbyDatabase.json';

function getUserByID(id) {

    const returnedUser = returnMatchingUser(id, dumbyDatabase['users']);
    //Check if user exists
    if(returnedUser === false || returnedUser === undefined){
        console.log("Error 404, user could not be found!");
        return false;
    }
    return returnedUser;
}

    const returnMatchingUser = (id, arrToSearch) => {
        for(let i = 0; i < arrToSearch.length; i++){
            if(arrToSearch[i].id === id){
                return arrToSearch[i];
            }
            return false;
        }
    }


module.exports = {
    getUserByID
};