import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherStackAPI = () => {
    const [data, setData] = useState(null);
    const [city, setCity] = useState("Chandigarh");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getWeatherDetail = async () => {
            const apiUrl = `//api.weatherstack.com/current?access_key=17dc1d5c83c551110cda86802a1353e3&query=${city}`;
            console.log(apiUrl);
            
            const response = await axios.get(apiUrl);
            if (!response.data) {
                throw new Error('Server Response not OK');
            }
            console.log(response.data);
            setData(response.data);
            setLoading(false);
    }
    // getWeatherDetail();
    useEffect(() => {
        if(loading){
            const getWeatherReport = async () => {
                await getWeatherDetail();
            };
            getWeatherReport();
        }
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (

        (data.current) ?
        <div className="container">
            <form id="content" autoComplete="off">
                <input
                    type="text"
                    name="input"
                    className="Search-box"
                    onChange={(e) => setCity(e.target.value)}
                />
                <span></span>
            </form>
            <button
                className="searchbtn"
                onClick={() => {
                    getWeatherDetail(city);
                }}
            >
                Search
            </button>
            <div id="card" className="weather">
                <div className="details">
                    <div className="temp_image">
                        <img alt="weather_image" src={data.current.weather_icons[0]} />
                    </div>
                    <div className="temp">
                        {data.current.temperature}
                        <span>&deg;</span>
                    </div>
                    <div className="right">
                        <div id="summary">{data.current.weather_descriptions[0]}</div>
                        <div style={{ fontWeight: "bold", marginTop: "4px" }}>{data.location.name}</div>
                    </div>
                </div>
            </div>
        </div>
        :
        <pre>{JSON.stringify(data.error)}</pre>
    );
};

export default WeatherStackAPI;