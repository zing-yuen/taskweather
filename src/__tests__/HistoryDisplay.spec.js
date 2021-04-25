import React from 'react';
import { render, screen } from '@testing-library/react';
import HistoryDisplay from '../components/main/HistoryDisplay';
import { history$ } from '../services/Store';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';

const mockHistory = [
    { "city": "London", "country": "GB", "time": "12:32:25 PM", "timeStamp": "2021-04-23T04:32:25.292Z" },
    { "city": "Singapore", "country": "SG", "time": "12:33:26 PM", "timeStamp": "2021-04-23T04:33:26.383Z" },
    { "city": "Caracas", "country": "VE", "time": "12:34:27 PM", "timeStamp": "2021-04-23T04:34:27.281Z" }
]

describe('<HistoryDisplay />', () => {

    beforeEach(() => {
        render(<HistoryDisplay />);
    });


    it ('Display no record found', () => {
        expect(screen.getByText('No Record')).toBeInTheDocument();
    });

    it('Display a list of history', () => {
        act(() => history$.next(mockHistory));

        expect(screen.getByText("1. London, GB")).toBeInTheDocument();
        expect(screen.getByText("2. Singapore, SG")).toBeInTheDocument();
        expect(screen.getByText("3. Caracas, VE")).toBeInTheDocument();
        expect(screen.getAllByRole("button").length).toBe(6);
    });
})