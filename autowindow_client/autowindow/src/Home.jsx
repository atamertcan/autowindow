import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home(){

    const [formData, setFormData] = useState({
    username: "",
    password: ""
    });

    const [isDone, setIsDone] = useState();

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("http://localhost:8080/api/login", formData);
        if (res.data.success) {    
        navigate("/dashboard", { state: { id: res.data.user.id } });
        } else {
            setIsDone(true);

        }
        } catch (err) {{}
            console.error(err);
        }
    };


    return(
        <div className="home">
            <h2 className="autowindow">
                Auto Window
            </h2>
            <p className="slogan">Evinizi havalandırın</p>
            <h2 className="alert1">{isDone ? "Kullanıcı adı veya şifre yanlış" : ""}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Kullanıcı Adı">
                </input><br></br>
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Şifre">
                </input><br></br>
                <button type="submit" className="button-sign-in">
                        Giriş
                </button><br></br>

                <p className="uye">Üye değil misiniz ?</p>
                <Link to="/signup">
                    <button 
                        className="button-sign-up">
                            Kaydol
                    </button>
                </Link>
            </form>
            
            
        </div>
    );
}

export default Home