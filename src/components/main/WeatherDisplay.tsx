import React, { useLayoutEffect, useState } from 'react'
import { BehaviorSubject } from 'rxjs';
import { Store } from '../../services/Store';
import './WeatherDisplay.css';

export const error$ = new BehaviorSubject("");

export default function WeatherDisplay() {
    const [weather, setWeather] = useState(Store.initialWeatherState);
    const [error, setError] = useState("");

    useLayoutEffect(() => {
        let s1 = Store.subscribeWeather(setWeather);
        let s2 = error$.subscribe(setError);

        return () => {
            s1.unsubscribe();
            s2.unsubscribe();
        }
    }, [])

    function showError() {
        return (
            <div className="not-found-box">
                <p style={{ padding: '0.5em 1em', margin: 0 }}>Not Found</p>
            </div>
        )
    }
    function showWeather() {
        if (weather.city.length > 0) {
            return (
                <div className="weather-container">
                    <p className="grey-font">{weather.city}, {weather.country}</p>
                    <p className="large-font">{weather.main}</p>
                    <div className="sub-weather-container">
                        <div className="row-item-a">Description:</div>
                        <div className="row-item-b">{weather.description}</div>
                        <div className="row-item-a">Temperature:</div>
                        <div className="row-item-b">{weather.temperature}</div>
                        <div className="row-item-a">Humidity:</div>
                        <div className="row-item-b">{weather.humidity}</div>
                        <div className="row-item-a">Time:</div>
                        <div className="row-item-b">{weather.time}</div>
                    </div>
                </div>
            )
        } else return <div className="weather-empty" />; // return a fix height so as to minimize ui 'jump'

    }
    return (
        <>
            {error.length > 0
                ?
                showError()
                :
                showWeather()
            }
        </>
    )
}
