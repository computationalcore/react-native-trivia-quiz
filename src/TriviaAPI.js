/**
 * This file contains a function to interact with the Open Trivia Database.
 *
 * @see https://opentdb.com
 */

const API_URL = 'https://opentdb.com/api.php';

/**
 * @description Get questions request.
 * @param {number} amount - Number of Questions
 */
export const getQuestions = async (amount=10) => {
	return fetch(`${API_URL}?amount=${amount}`)
	.then(res => {
		if (res.status !== 200) {
			return res;
		}
		return res.json();
	})
	.then(data => {
		// Only happen if status is 200
		if (data.results) {
			return data.results;
		}
		// Return the object with with http status (error code)
		return {errorCode: data.status};
	});
}