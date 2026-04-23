import "./TalentForm.css";
import React, { useState } from "react";

const TalentForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        email: "",
        talent: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.talent) {
            alert("Please select a talent before submitting.");
            return;
        }

        try {
            const response = await fetch("https://pepitoapi.azurewebsites.net/submit", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if(response.ok){
                const result = await response.json();
                alert("Form is submitted successfully");

                console.log("API Response:", result);
                console.log("Form submission was successful!");

                //reset the form
                setFormData({
                    name:"",
                    age:"",
                    email:"",
                    talent:"select your talent"
                });
            } else {
                alert("failed to submit form. Please try again");
                console.error("API ERROR", response.statusText);
            }
        } catch (error){
            alert("An error occurred while submitting the form");
            console.error("error", error);
        }

        // console.log("Form Data Submitted:", formData);

        // setFormData({
        //     name: "",
        //     age: "",
        //     email: "",
        //     talent: "",
        // });
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h2>Talent Form For PUPBC</h2>
                <p>Please fill out the form below to submit your talent information.</p>
                <form onSubmit={handleSubmit}>

                    {/* Name Field */}
                    <div className="form-field">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Age Field */}
                    <div className="form-field">
                        <label htmlFor="age">Age:</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            placeholder="Enter your age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Email Field */}
                    <div className="form-field">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Talent Field */}
                    <div className="form-field">
                        <label htmlFor="talent">Talent:</label>
                        <select
                            id="talent"
                            name="talent"
                            value={formData.talent}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a talent</option>
                            <option value="singing">Singing</option>
                            <option value="dancing">Dancing</option>
                            <option value="acting">Acting</option>
                        </select>
                    </div>
                    {/* Submit Button */}
                    <button type="submit" className="submit-button">
                        Submit
                    </button>

                </form>
            </div>
        </div>
    );
};

export default TalentForm;