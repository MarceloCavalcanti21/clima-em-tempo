import axios from 'axios';

interface LocationProps {
    latitude: number;
    longitute: number;
}

export async function loadWeatherInformation({ latitude, longitute }: LocationProps) {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitute}&appid=${process.env.OPEN_WEATHER_KEY}&units=metric&lang=pt_br`);
    
    response.data.main.temp = Number(response.data.main.temp).toFixed();
    response.data.main.temp_max = Number(response.data.main.temp_max).toFixed();
    response.data.main.temp_min = Number(response.data.main.temp_min).toFixed();
    
    return response.data;
};