import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com',
	headers: {
		'Content-Type': 'application/json',
	},
});

const login = async (email, password) => {
	return axios
		.post('http://challenge-react.alkemy.org', {
			email,
			password,
		})
		.then((response) => {
			if (response.data.token) {
				localStorage.setItem('user', JSON.stringify(response.data));
			}

			return response.data;
		});
};

const logout = () => {
	localStorage.removeItem('user');
};

const authService = {
	login,
	logout,
};

export default authService;
