import React, { useState } from "react";
import axios from "axios";

function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        username: "",
        password: ""
    });

    const [isDone, setIsDone] = useState();
    const [isValid, setIsValid] = useState();

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        if(formData.password.length >= 8){

            const res = await axios.post("http://localhost:8080/api/signup", formData);
            setIsDone(true);
            setFormData({ name: "", surname: "", username: "", password: "" });
        }
        else{
            setIsValid(true);
        }
        } catch (err) {
        console.error(err);
        }
    };

    return (

        <div className="home2">
            <h2 className="sign-up">Hesap Oluştur</h2>
            <h2 className="alert2">{isDone ? "Kayıt yapıldı !" : ""}</h2>
            <h2 className="alert3">{isValid ? "Şifre en az 8 karakter olmalı !" : ""}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="inp"
                    placeholder="Ad"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                /><br/>

                <input
                    className="inp"
                    placeholder="Soyad"
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    required
                /><br/>

                <input
                    className="inp"
                    placeholder="Kullanıcı Adı"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                /><br/>

                <input
                    className="inp"
                    placeholder="Şifre"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                /><br/>

                <button className="enter" type="submit">Kaydol</button>
            </form>
        </div>
    );
}

export default SignUp;