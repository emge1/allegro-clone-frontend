import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const RegisterForm = () => {
    const [accountType, setAccountType] = useState("personal");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreements, setAgreements] = useState({
        all: false,
        terms: false,
        marketing1: false,
        marketing2: false,
    });

    const navigate = useNavigate();

    const handleAgreementChange = (name) => {
        setAgreements({
            ...agreements,
            [name]: !agreements[name],
        });
    };

    const handleAllAgreements = () => {
        const newValue = !agreements.all;
        setAgreements({
            all: newValue,
            terms: newValue,
            marketing1: newValue,
            marketing2: newValue,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!agreements.terms) {
            alert("You must accept the terms and conditions to register.");
            return;
        }

        const type_choice = accountType === "personal" ? 4 : 3;

        const userData = {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            type_choice,
        };

        try {
            const response = await fetch("http://localhost:8000/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert("Registration successful!");
                navigate("/"); // Redirect to the home page
            } else {
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error registering user:", error);
            alert("An error occurred during registration. Please try again later.");
        }
    };

    return (
        <div className="register-form">
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <div className="account-type">
                    <label>
                        <input
                            type="radio"
                            name="accountType"
                            value="personal"
                            checked={accountType === "personal"}
                            onChange={() => setAccountType("personal")}
                        />
                        Customer Account
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="accountType"
                            value="business"
                            checked={accountType === "business"}
                            onChange={() => setAccountType("business")}
                        />
                        Merchant Account
                    </label>
                </div>

                <div className="login-data">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="agreements">
                    <label>
                        <input
                            type="checkbox"
                            checked={agreements.all}
                            onChange={handleAllAgreements}
                        />
                        Select all consents
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={agreements.terms}
                            onChange={() => handleAgreementChange("terms")}
                        />
                        * I declare that I know and accept the provisions of the Allegro Clone Regulations.
                    </label>
                </div>

                <button className="register-button" type="submit">
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
