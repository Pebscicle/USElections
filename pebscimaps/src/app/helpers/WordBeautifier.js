function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function fromCamelCase(value) {
    const spaced = value.replace(/([a-z])([A-Z])/g, '$1 $2');
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

module.exports = {
    capitalizeFirstLetter, fromCamelCase
};