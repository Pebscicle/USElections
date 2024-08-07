import usa from '../../data/usa.json';
import usaCounties from '../../data/usaCounties.json';
import usaCountiesElections from '../../data/usaCountiesElections.json'
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

function getUSACountyFromID(id){
    return usaCounties[id];
}

function getUSACountyElectionDataFromID(id){
    return usaCountiesElections[id];
}

function getStates(){
    return usa.states;
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
    //Search counties...
    if(index == -1){
        let counties = Object.entries(usaCountiesElections);
        for (let i = 0; i < counties.length; i++) {
            const county = counties[i][1];
            if(county?.electionResults){
                for (let j = 0; j < county.electionResults.length; j++) {
                    const result = county.electionResults[j];
                    if (result.year === selectedYear) {
                        return j; // Return the index of the matching year
                    }
                }
            }
        }
    }
    return index; // Return -1 if no match was found
}

function getLeftEVs(selectedYear) {
    let sumEVs = 0;
    for (let i = 0; i < usaElections.states.length; i++) {
        const state = usaElections.states[i];
        for (let j = 0; j < state.electionResults.length; j++) {
            const result = state.electionResults[j];
            
            if (result.year === selectedYear) {
                sumEVs = sumEVs + result.leftEVs;
            }
        }
    }
    return sumEVs;
}
function getRightEVs(selectedYear) {
    let sumEVs = 0;
    for (let i = 0; i < usaElections.states.length; i++) {
        const state = usaElections.states[i];
        for (let j = 0; j < state.electionResults.length; j++) {
            const result = state.electionResults[j];
            if (result.year === selectedYear) {
                sumEVs += result.rightEVs;
            }
        }
    }
    return sumEVs;
}
function getOtherEVs(selectedYear) {
    let sumEVs = 0;
    for (let i = 0; i < usaElections.states.length; i++) {
        const state = usaElections.states[i];
        for (let j = 0; j < state.electionResults.length; j++) {
            const result = state.electionResults[j];
            if (result.year === selectedYear) {
                sumEVs += result.otherEVs;
            }
        }
    }
    return sumEVs;
}

function getEVsForYear(selectedYear, refersToCensusYear){
    //Determine the EVs
    console.log('sdguysduyigvsutygvsdyut')
    console.log(selectedYear);
    if(refersToCensusYear){
        //console.log('sgy8hsguyshgouys')
        //console.log(usaElections.electoralVotesByCensus?.[String.toString(selectedYear)] || usaElections.electoralVotesByCensus[2020]);
        if(selectedYear >= 2020){
            return usaElections.electoralVotesByCensus[2020];
        }else if(selectedYear >= 2010){
            return usaElections.electoralVotesByCensus[2010];
        }else{
            return usaElections.electoralVotesByCensus[2000];
        }
    }
    if(selectedYear > 2020){
        return usaElections.electoralVotesByCensus[2020];
    }else if(selectedYear > 2010){
        return usaElections.electoralVotesByCensus[2010];
    }else{
        return usaElections.electoralVotesByCensus[2000];
    }
    
}

function getEVByYearAndID(selectedYear, id, refersToCensusYear){
    if(refersToCensusYear){
        if(selectedYear >= 2020){
            return getEVsForYear(2020)[id];
        }else if(selectedYear >= 2010){
            return getEVsForYear(2010)[id];
        }else{
            return getEVsForYear(2000)[id];
        }
    }else{
        if(selectedYear > 2020){
            return getEVsForYear(2020)[id];
        }else if(selectedYear > 2010){
            return getEVsForYear(2010)[id];
        }else{
            return getEVsForYear(2000)[id];
        }
    }
}

function getStateImageLinkFromID(id) {
    return usaImages.imageLinks[id];
}

function getCountryImageLinkFromID(id) {
    return countryImages.imageLinks[id];
}

function getCountryFromID(id) {
    return countries[id];
}

function getCountries(){
    return countries;
}

module.exports = {
    getStateFromID, getStates, 
    getUSACountyFromID, getUSACountyElectionDataFromID,
    getStateElectionDataFromID, getLeftEVs, getRightEVs, getOtherEVs, getEVsForYear, getEVByYearAndID, determineDominantColor,
    findIndexOfYear,
    getStateImageLinkFromID, getCountryImageLinkFromID, getCountryFromID, getCountries
};

//export default {getStateFromID, getStateElectionDataFromID};