import React from 'react';
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
	return (
		<Routes>
			<Route
				element={
					<PublicPage>
						<Login />
					</PublicPage>
				}
				path="/login"
			/>
			<Route element={<Layout />}>
				<Route
					element={
						<ProtectedPage>
							<Home />
						</ProtectedPage>
					}
					path="/"
				/>
				<Route
					element={
						<ProtectedPage>
							<Post />
						</ProtectedPage>
					}
					path="/post/:id"
				/>
				<Route
					element={
						<ProtectedPage>
							<EditPost />
						</ProtectedPage>
					}
					path="/edit-post/:id"
				/>
				<Route
					element={
						<ProtectedPage>
							<NewPost />
						</ProtectedPage>
					}
					path="/new-post"
				/>
				<Route
					element={
						<ProtectedPage>
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
