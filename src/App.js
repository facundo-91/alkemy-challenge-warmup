import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedPage from './pages/ProtectedPage';
import PublicPage from './pages/PublicPage';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Post from './pages/Post';
import NewPost from './pages/NewPost';
import EditPost from './pages/EditPost';
import NotFound from './pages/NotFound';

function App() {
	const [logged, setLogged] = useState(true);

	return (
		<Routes>
			<Route
				element={
					<PublicPage isAuthenticated={logged}>
						<Login />
					</PublicPage>
				}
				path="/login"
			/>
			<Route element={<Layout setLogged={setLogged} />}>
				<Route
					element={
						<ProtectedPage isAuthenticated={logged}>
							<Home />
						</ProtectedPage>
					}
					path="/"
				/>
				<Route
					element={
						<ProtectedPage isAuthenticated={logged}>
							<Post />
						</ProtectedPage>
					}
					path="/post/:id"
				/>
				<Route
					element={
						<ProtectedPage isAuthenticated={logged}>
							<EditPost />
						</ProtectedPage>
					}
					path="/edit-post/:id"
				/>
				<Route
					element={
						<ProtectedPage isAuthenticated={logged}>
							<NewPost />
						</ProtectedPage>
					}
					path="/new-post"
				/>
				<Route
					element={
						<ProtectedPage isAuthenticated={logged}>
							<NotFound />
						</ProtectedPage>
					}
					path="*"
				/>
			</Route>
		</Routes>
	);
}

export default App;
