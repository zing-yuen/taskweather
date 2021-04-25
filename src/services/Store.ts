import { openWeatherApi } from "config/AxiosConfig";
import { apiId } from "config/Constants";
import { format } from "date-fns";
import { BehaviorSubject } from "rxjs";
import { error$ } from '../components/main/WeatherDisplay';

interface IHistory {
    city: string,
    country: string | null,
    time: string,
    timeStamp: Date
}

export interface IGetWeatherProps {
    city: string,
    country: string
}

interface IWeatherData {
    city: string,
    country: string,
    main: string,
    description: string,
    temperature: string,
    humidity: string,
    time: string
}

const initialWeatherState: IWeatherData = {
    city: '',
    country: '',
    main: '',
    description: '',
    temperature: '',
    humidity: '',
    time: ''
};

const initialHistoryState: Array<IHistory> = []

export const weather$ = new BehaviorSubject(initialWeatherState);
export const history$ = new BehaviorSubject<Array<IHistory>>(initialHistoryState);

let historyState = initialHistoryState;

export const Store = {
    subscribeWeather: (setState: any) => weather$.subscribe(setState),
    subscribeHistory: (setState: any) => history$.subscribe(setState),
    fetchWeather: (searchParams: IGetWeatherProps) => {
        let timeStamp = new Date();

        const country = searchParams.country.length > 0 ? ',' + searchParams.country : '';
        const params = { city: searchParams.city, country: country };

        openWeatherApi.get('/weather?q='
            + params.city
            + params.country
            + "&appid=" + apiId
            + "&units=metric")
            .then(
                res => successCallback(res, timeStamp),
                errorCallback
            )
    },
    clearWeather: () => {
        weather$.next(initialWeatherState);
    },
    removeHistoryEntry: (timeStamp: Date) => {
        let index = historyState.findIndex(elem => elem.timeStamp === timeStamp);
        // store updated state to new variable so that React can re-render
        let newHistoryState = [...historyState];
        newHistoryState.splice(index, 1);
        historyState = newHistoryState;
        history$.next(newHistoryState);
    },
    initialWeatherState,
    initialHistoryState
}

function successCallback(result: any, timeStamp: Date) {

    const { weather, main, sys, name } = result.data;
    // format time to show in history record
    let historyEntry = {
        city: name,
        country: sys.country,
        time: format(timeStamp, 'hh:mm:ss a'),
        timeStamp: timeStamp
    }
    // do manipulation to api response to only show required fields
    // require city, country, main, description, temp min degC ~ temp max degC, humidity %, time(date time)
    let weatherData: IWeatherData = {
        city: name,
        country: sys.country,
        main: weather[0].main,
        description: weather[0].description,
        temperature: main.temp_min + '\u00B0C ~ ' + main.temp_max + '\u00B0C',
        humidity: main.humidity + '%',
        time: format(timeStamp, 'yyyy-MM-dd HH:mm a')
    }
    weather$.next(weatherData);
    // store the new history object into another variable so that react will re-render
    let newHistoryState = historyState.concat([historyEntry]);
    // reassign back to original variable to maintain source of truth
    historyState = newHistoryState;
    history$.next(historyState);
}

function errorCallback(error: any) {
    error$.next(error.message);
}