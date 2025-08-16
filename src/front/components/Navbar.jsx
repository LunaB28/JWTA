import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	const handleLogout = () => {
		// Limpia el usuario y token del store y localStorage
		dispatch({ type: "LOGIN_SUCCESS", payload: { user: null, token: null } });
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		navigate("/");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">JWT Autentication</span>
				</Link>
				<div className="ml-auto">
					{store.token ? (
						<button className="btn btn-danger" onClick={handleLogout}>
							Logout
						</button>
					) : (
						<Link to="/register">
							<button className="btn btn-primary">Register</button>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};