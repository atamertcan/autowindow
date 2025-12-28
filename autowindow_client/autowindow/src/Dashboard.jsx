import React, {useState} from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Dashboard(){

    const [houses, setHouses] = useState([]);
    const[newHouse, setNewHouse] = useState("");
    const [error, setError] = useState("");
    const[success, setSuccess] = useState("");

    const location = useLocation();
    const Id = location.state?.id;

    useEffect(() => {
        async function fetchHouses() {
        try {
            const response = await axios.get(`http://localhost:8080/api/dashboard/${Id}`);
            setHouses(response.data);
        } catch (error) {
            setError("Beklenmedik bir hata oluştu");
        }
    }
    fetchHouses();
    }, [Id]);


    function change(event){
        setNewHouse(event.target.value);
    }


   const addHouse = async () => {
    try {
        
        if(newHouse.trim() != ""){
            if(newHouse.length <= 80){
                const updatedHouses = [...houses, newHouse];
                await axios.put(`http://localhost:8080/api/dashboard/${Id}`, [newHouse]);
                setHouses(updatedHouses);
                setNewHouse("");
                setError("");
            }
            else{
                setError("Adres 80 karakterden kısa olmalı!");
            }
        }
        else{
            setError("Ev adı boş olamaz!");
        }
    } catch (err) {
        setError("Beklenmedik bir hata oluştu")
    }
};
   const deleteHouse = async (houseToDelete) => {
    try {
        await axios.delete(`http://localhost:8080/api/dashboard/${Id}`, {
            data: [houseToDelete]
        });
        setHouses(houses.filter(h => h !== houseToDelete));
    } catch (err) {
        setError("Beklenmedik bir hata oluştu")
    }
};

function message(){
    setSuccess("Başarılı!");
}

    return(
        <div className="dashboard">
            <h1 className="title">Sisteme Hoşgeldiniz</h1>
            <h2 className="title">Evlerim</h2>
            <p className="title">{success}</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                <input
                    className="inp-house"
                    type="text"
                    placeholder="Adres girin"
                    value={newHouse}
                    onChange={change}>
                </input>
                <button
                    type="button"
                    className="button-dashboard"
                    onClick={addHouse}>
                        Ekle
                </button>
            </div>
            <ol>
                {houses.map((house,index) =>
                 <li key={index}>
                    <span className="writing">{house}</span>
                    <button
                        onClick={message}
                        type="button"
                        className="button-dashboard">
                        Aç
                    </button>
                    <button
                        type="button"
                        className="button-dashboard">
                        Kapat
                    </button>
                    <button
                        type="button"
                        className="button-dashboard">
                        Otomatik
                    </button>
                    <button
                        type="button"
                        className="button-dashboard" 
                        onClick={() => deleteHouse(house)}>
                            Sil
                    </button>
                 </li>
                )}
            </ol>
            
        </div>
    );
}

export default Dashboard