import React, { SyntheticEvent, useState } from 'react';
import { Store } from '../../services/Store';
import { error$ } from './WeatherDisplay';
import './Search.css';

const initialState = {
    city: '',
    country: ''
}

export default function Search() {
    const [searchParams, setSearchParams] = useState(initialState);

    function handleFormSubmit(event: SyntheticEvent) {
        event.preventDefault();
        setSearchParams(initialState);
        // // call api with the params from user input
        Store.fetchWeather(searchParams);
    }

    function handleChange(data: { [key: string]: string }) {
        // clear "Not Found" when user retype
        error$.next("");
        // to get the corresponding key for each text field
        let key = Object.keys(data)[0];
        setSearchParams({ ...searchParams, [key]: data[key] })
    }

    function handleClearBtn() {
        // clear the text field
        setSearchParams(initialState);
        // reset the weather$ observable
        Store.clearWeather();
    }

    return (
        <div className="search-box">
            <form onSubmit={handleFormSubmit}>
                <div className="form-flex-container">
                    <div className="form-input-grid-container">
                        <label className="form-label">City:</label>
                        <input className="form-input" type="text" name="input-city" data-testid="input-city"
                            value={searchParams.city}
                            onChange={(event) => handleChange({ city: event.currentTarget.value })} />
                    </div>
                    <div className="form-input-grid-container">
                        <label className="form-label">Country:</label>
                        <input className="form-input" type="text" name="input-country" data-testid="input-country"
                            value={searchParams.country}
                            onChange={(event) => handleChange({ country: event.currentTarget.value })}
                        />
                    </div>

                    <div className="form-btn-container">
                        <button className="form-btn" type='submit' data-testid="btn-search">Search</button>
                        <button className="form-btn" type='button' onClick={() => handleClearBtn()} data-testid="btn-clear">Clear</button>
                    </div>

                </div>

            </form>
        </div>
    )
}
