import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './login.css';

function Login() {
    const history = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/", {
                email,
                password,
            })
                .then((res) => {
                    if (res.data === "exist") {
                        history("/home", { state: { id: email } });
                    } else if (res.data === "notexist") {
                        alert("User has not signed up");
                    }
                })
                .catch((e) => {
                    alert("Wrong details");
                    console.log(e);
                });

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="login-title">Login</h1>
                <form onSubmit={submit}>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="login-input"
                    />
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="login-input"
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="login-or">OR</p>
                <Link to="/signup" className="login-link">
                    Signup Page
                </Link>
            </div>
        </div>
    );
}

export default Login;