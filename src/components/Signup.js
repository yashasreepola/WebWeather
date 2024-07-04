import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const history = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/signup", {
                email,
                password,
            })
                .then((res) => {
                    if (res.data === "exist") {
                        alert("User already exists");
                    } else if (res.data === "notexist") {
                        history("/home", { state: { id: email } });
                    }
                })
                .catch((e) => {
                    alert("wrong details");
                    console.log(e);
                });

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="login-title">Signup</h1>
                <form action="POST">
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
                    <input type="submit" onClick={submit} className="login-button" />
                </form>
                <br />
                <p className="login-or">OR</p>
                <br />
                <Link to="/" className="login-link">
                    Login Page
                </Link>
            </div>
        </div>
    );
}

export default Login;
