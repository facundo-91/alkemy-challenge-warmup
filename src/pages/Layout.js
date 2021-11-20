import { Outlet, Link } from 'react-router-dom';

const Layout = ({ setLogged }) => {
	return (
		<div>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/new-post">New Post</Link>
					</li>
					<li>
						<button onClick={() => setLogged(false)}>Log Out</button>
					</li>
				</ul>
			</nav>
			<hr />
			<Outlet />
		</div>
	);
};

export default Layout;
