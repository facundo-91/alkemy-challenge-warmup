import { Navigate } from 'react-router-dom';

function PublicPage({ children, isAuthenticated }) {
	if (isAuthenticated) {
		return <Navigate to="/" />;
	}

	return children;
}

export default PublicPage;
