import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Register = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "error", payload: null });
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_name: userName, email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch({ type: "error", payload: data.msg });
                return;
            }
            navigate("/");
        } catch (err) {
            dispatch({ type: "error", payload: err?.message || "Error de conexión con el servidor" });
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center " >
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="card p-4">
                        <h1 className="mb-4 text-center">Create your account</h1>
                        <form className="w-100 text-center" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                                placeholder="Username"
                                required
                                className="form-control mb-3"
                            />
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
                                Register
                            </button>
                        </form>
                        {store.error && <p className="text-danger mt-3">{store.error}</p>}
                        <p className="mt-3 text-center">
                            Already have an account? <Link to="/" className="text-primary">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
