import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PublicPage({ children }) {
	const { isLoggedIn } = useSelector((state) => state.auth);

	if (isLoggedIn) {
		return <Navigate to="/" />;
	}

	return children;
}

export default PublicPage;
