import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherDisplay, { error$ } from '../components/main/WeatherDisplay';
import { weather$ } from '../services/Store';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';

const mockLondonWeather = {
    city: "London",
    country: "UK",
    main: "Clear",
    description: "Clear weather",
    temperature: "22\u00B0C ~ 30\u00B0C",
    humidity: "50%",
    time: '2021-04-23 09:30 PM'
}
describe('<WeatherDisplay />', () => {

    beforeEach(() => {
        render(<WeatherDisplay />);
    });

    it('Display London Weather info', () => {
        act(() => weather$.next(mockLondonWeather));

        expect(screen.getByText("London, UK")).toBeInTheDocument();
        expect(screen.getByText('Clear')).toBeInTheDocument();
        expect(screen.getByText('Description:')).toBeInTheDocument();
        expect(screen.getByText('Clear weather')).toBeInTheDocument();
    });

    it('Display not found', () => {

        act(() => {
            weather$.next(mockLondonWeather);
            error$.next('city not found');
        });


        expect(screen.getByText("Not Found")).toBeInTheDocument();
    });
})