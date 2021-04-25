import React, { useLayoutEffect, useState } from 'react'
import { MdDelete, MdSearch } from 'react-icons/md';
import { Store } from '../../services/Store'
import { IGetWeatherProps } from '../../services/Store';
import './HistoryDisplay.css';

export default function HistoryDisplay() {
    const [history, setHistory] = useState(Store.initialHistoryState);

    useLayoutEffect(() => {
        let s1 = Store.subscribeHistory(setHistory);

        return () => {
            s1.unsubscribe();
        }
    }, []);

    function handleSearchFunction(params: IGetWeatherProps) {
        // call the openweatherapi with params from history record
        Store.fetchWeather(params);
    }

    function handleDeleteRecord(timeStamp: Date) {
        Store.removeHistoryEntry(timeStamp);
    }

    function renderHistory() {
        let htmlArr = history.map((value, index) => {
            return (
                <React.Fragment key={value.time}>
                    <li key={value.time} className="history-row-container">
                        <div className="history-row-item-a">{index + 1}. {value.city}, {value.country}</div>
                        <div style={{ flexGrow: 1 }}></div>
                        <span style={{ padding: '0.5em' }}>{value.time}</span>
                        <div className="history-row-item-b">
                            {/* <div className="btn-history-list"> */}
                            <button className="circle-icon"
                                onClick={() => {
                                    handleSearchFunction({
                                        city: value.city,
                                        country: value.country
                                    })
                                }}>
                                <MdSearch />
                            </button>
                            {/* </div> */}

                            {/* <div className="btn-history-list"> */}
                            <button className="circle-icon"
                                onClick={() => {
                                    handleDeleteRecord(value.timeStamp)
                                }}>
                                <MdDelete />
                            </button>
                            {/* </div> */}

                        </div>

                    </li>
                    <hr />
                </React.Fragment>
            )
        })
        return (
            <ul className="no-bullets">
                {htmlArr}
            </ul>
        )
    }

    function renderNoRecordFound() {
        return (
            <div className="no-record-box">
                <p className="grey-font">No Record</p>
            </div>
        )
    }
    return (
        <div className="history-container">
            <h2 className="history-title">Search History</h2>
            <hr />
            {history.length === 0
                ?
                renderNoRecordFound()
                :
                renderHistory()
            }
        </div>
    )
}
