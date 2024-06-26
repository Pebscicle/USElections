import usa from '../../data/usa.json';
import usaElections from '../../data/usaElections.json';
import usaImages from '../../data/usaImages.json';
import countryImages from '../../data/countryImages.json'
import countries from '../../data/countries.json';

const getStateInfo = () => {

}

function getStateFromID(id) {
    let stateFound = '';
    for(let i = 0; i < usa.states.length; i++){
        if(usa.states[i].id === id){
            stateFound = usa.states[i];
        }
    }
    
    return stateFound;
}

function getStateElectionDataFromID(id) {
    let stateFound = '';
    for(let i = 0; i < usaElections.states.length; i++){
        if(usaElections.states[i].id === id){
            stateFound = usaElections.states[i];
        }
    }
    
    return stateFound;
}

    function determineDominantColor(leftVotes, rightVotes) {
        if(rightVotes > leftVotes){
            return 'red';
        }
        else if(leftVotes > rightVotes){
            return 'blue'
        }
        return '#D3D3D3';
    }

function findIndexOfYear(selectedYear) {
    let index = -1; // Initialize index to -1 indicating not found
    for (let i = 0; i < usaElections.states.length; i++) {
        const state = usaElections.states[i];
        for (let j = 0; j < state.electionResults.length; j++) {
            const result = state.electionResults[j];
            if (result.year === selectedYear) {
                return j; // Return the index of the matching year
            }
        }
    }
    return index; // Return -1 if no match was found
}

function getStateImageLinkFromID(id) {
    return usaImages.imageLinks[id];
}

function getCountryImageLinkFromID(id) {
    return countryImages.imageLinks[id];
}

function getCountryFromID(id) {
    console.log('id:'+id);
    console.log('countries[id]: ' + countries[id]);
    return countries[id];
}

module.exports = {
    getStateFromID,
    getStateElectionDataFromID, determineDominantColor,
    findIndexOfYear,
    getStateImageLinkFromID, getCountryImageLinkFromID, getCountryFromID
};

//export default {getStateFromID, getStateElectionDataFromID};