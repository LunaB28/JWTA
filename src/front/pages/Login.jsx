import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false)
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "error", payload: null });
		try {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (!res.ok) {
				dispatch({ type: "error", payload: data.msg });
				return;
			}

			localStorage.setItem("token", data.access_token);
			localStorage.setItem("user", JSON.stringify(data.user));

			dispatch({ type: "LOGIN_SUCCESS", payload: { user: data.user, token: data.access_token } });
			navigate("/private");
		} catch (err) {
			dispatch({ type: "error", payload: err?.message || "Error de conexión con el servidor" });
		}
	};

	return (
		<div className="container">
			<div className="row justify-content-center align-items-center">
				<div className="col-12 col-sm-8 col-md-6 col-lg-4">
					<div className="card p-4">
						<h1 className="mb-4 text-center">Log in to Your Account</h1>
						<form className="w-100 text-center" onSubmit={handleSubmit} >
							<input
								type="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								placeholder="Email"
								required
								className="form-control mb-3"
							/>
							<div className="mb-3 position-relative">
								<input
									type={showPassword ? "text" : "password"}
									value={password}
									className="form-control"
									onChange={e => setPassword(e.target.value)}
									placeholder="Password"
									id="password"
									required
								/>
								<button
									type="button"
									className="btn btn-sm btn-outline-secondary position-absolute end-0 top-50 translate-middle-y me-2"
									tabIndex={-1}
									onClick={() => setShowPassword((v) => !v)}
								>
									{showPassword ? <i className="fa-regular fa-eye-slash" /> : <i className="fa-regular fa-eye" />}
								</button>
							</div>
							<button
								type="submit"
								className="btn btn-primary w-100"
							>
								Login
							</button>
						</form>
						{store.error && <p className="text-danger mt-3">{store.error}</p>}
						<p className="mt-3 text-center">
							Don't have an account? <Link to="/register" className="text-primary">Register here</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};