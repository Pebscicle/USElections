import usa from '../../data/usa.json'



/**
 * 
 * @param {*} state The state to find its rank among others.
 * @param {string} metric the metric to which the state should be compared to. Can be population, gdp.
 * @returns {number} The rank of the given state based on the specified metric.
 */
function getRankingForGivenMetric(state, metric) {
    let ranking = 50;

    // Sort the states based on the specified metric
    usa.states.sort((a, b) => {
        if (metric === 'population') {
            if (a.population < b.population) {
                return -1;
            } else if (a.population === b.population) {
                return 0;
            } else {
                return 1;
            }
        } else if (metric === 'gdp') {
            if (a.gdp < b.gdp) {
                return -1;
            } else if (a.gdp === b.gdp) {
                return 0;
            } else {
                return 1;
            }
        }
    });

    // Find the ranking of the given state
    for (let i = 0; i < usa.states.length; i++) {
        if ((metric === 'population' && state.population >= usa.states[i].population) ||
            (metric === 'gdp' && state.gdp >= usa.states[i].gdp)) {
            ranking++;
        } else {
            break; // Stop once the state is found or surpassed
        }
    }

    console.log(ranking);
    return ranking;
}

module.exports = {
    getRankingForGivenMetric
};

//export default {getStateFromID, getStateElectionDataFromID};