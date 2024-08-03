import usaCountiesElections from '../../data/usaCountiesElections.json';

function getCountyFromID(id){
    return usaCountiesElections[id];
}

function getCounties(){
    return Object.values(usaCountiesElections).filter(item => item.name !== undefined);
}


module.exports = {
    getCountyFromID, getCounties
};