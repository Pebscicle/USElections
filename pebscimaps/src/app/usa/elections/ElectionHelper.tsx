class ElectionHelper{

    /**
     * Calculates the total sum of votes across different political affiliations.
     * 
     * @param {Object} results - An object containing vote counts for different political parties.
     * @returns {number} The total sum of votes across all political affiliations.
     */
    public getTotal(results): number {
        return results.republican + results.democrat + results.independent + results.libertarian + results.green + results.other;
    }

    /**
     * Calculates the percentage of votes for a specific political affiliation based on whether it is considered left-leaning or right-leaning.
     * 
     * @param {boolean} isLeft - A boolean value indicating whether to calculate the percentage for a left-leaning (true) or right-leaning (false) party.
     * @param {Object} results - An object containing vote counts for different political parties.
     * @returns {number} The calculated percentage of votes for the specified political affiliation.
     */
    public getPercentage(isLeft, results): number {
        return isLeft ? 100*results.democrat/this.getTotal(results) : 100*results.republican/this.getTotal(results);
    }

}

export default ElectionHelper;