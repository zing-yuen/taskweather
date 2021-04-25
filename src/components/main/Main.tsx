import React from 'react'
import HistoryDisplay from './HistoryDisplay'
import Search from './Search'
import WeatherDisplay from './WeatherDisplay'

export default function Main() {

    return (
        <>
            <Search />
            <WeatherDisplay />
            <HistoryDisplay />
        </>
    )
}
