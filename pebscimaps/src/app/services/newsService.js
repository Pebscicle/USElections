import axios from 'axios';


async function fetchNews() {
    try {
        const response = await axios.get(`/api/get-news`);
        return response.data; // Return the data
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}
  

module.exports = {
    fetchNews
};