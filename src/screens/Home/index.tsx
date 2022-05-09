import React, { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import { ScrollView, TouchableNativeFeedback, ActivityIndicator, Alert } from 'react-native';
import {
    Container,
    Title,
    Subtitle,
    TemperatureContainer,
    TemperatureLabel,
    TemperatureValue,
    TemperatureVariationContainer,
    TemperatureVariationContent,
    MaxTemperature,
    MinTemperature,
    OtherInfoContainer,
    OtherInformationContent,
    OtherInformationText,
    LocationInformationTextRegular,
    LocationInformationTextBold,
    WeatherImage,
    MaterialIconsLocation,
    FeatherIconsArrowUp,
    FeatherIconsArrowDown,
    FeatherIconsOtherInfo,
} from './styles';


import { loadWeatherInformationRoute } from '../../services/openWeatherApi';

interface WeatherProps {
	coord: {
		lon: number;
		lat: number;
	},
	weather: [
		{
			id: number;
			main: string;
			description: string;
			icon: string;
		}
	],
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
		sea_level: number;
		grnd_level: number;
	},
	visibility: number;
	wind: {
		speed: number;
		deg: number;
		gust: number;
	},
	clouds: {
		all: number;
	},
	dt: number;
	sys: {
		country: string;
		sunrise: number;
		sunset: number;
	},
	timezone: number;
	id: number;
	name: string;
	cod: number;
}

export function Home(){
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState<WeatherProps>();
    const [location, setLocation] = useState<LocationObject>();

    const loadWeatherInformation = useCallback(async () => {
        setLoading(false);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setLoading(true);
            return;
        }
    
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        try {
            const response = await loadWeatherInformationRoute({latitude: location.coords.latitude, longitute: location.coords.longitude});

            setWeather(response);
            setLoading(true);
        } catch (error) {
            Alert.alert('ERRO', 'Ocorreu um erro ao tentar buscar os dados do clima. Tente novamente mais tarde.');
        }
    }, []);

    useEffect(() => {
        loadWeatherInformation();
      }, []);

    const renderImage = useCallback(() => {
        switch (weather?.weather[0].main) {
            case 'Thunderstorm':
                return (<WeatherImage source={require('../../assets/thnderstorm/thnderstorm.png')}/>)
                break;   
            case 'Drizzle':
                return (<WeatherImage source={require('../../assets/rainy/rainy.png')}/>)     
                break;
            case 'Rain':
                return (<WeatherImage source={require('../../assets/suny-rainy/suny-rainy.png')}/>)      
                break;     
            case 'Snow':
                return (<WeatherImage source={require('../../assets/snowy/snowy.png')}/>)        
                break;
            case 'Clear':
                return (<WeatherImage source={require('../../assets/suny/suny.png')}/>)   
                break;
            case 'Clouds':
                return (<WeatherImage source={require('../../assets/suny-cloudy/suny-cloudy.png')}/>)     
                break;
            default:
                return (<WeatherImage source={require('../../assets/suny-cloudy/suny-cloudy.png')}/>)
                break;
        }
    }, []);

    if(!loading) return (
        <>
            <Container>
                <ActivityIndicator size="large" color="#FFAB0B" />
                <LocationInformationTextRegular>Buscando informações climáticas...</LocationInformationTextRegular>
            </Container>
        </>
    )

    if(!location) return (
        <>
            <Container>
                <MaterialIconsLocation name="location-off" />
                <LocationInformationTextRegular>Acesse as <LocationInformationTextBold>Configurações</LocationInformationTextBold> do seu aparelho e conceda permissão de acesso à sua <LocationInformationTextBold>Localização</LocationInformationTextBold> para esse aplicativo.</LocationInformationTextRegular>
            </Container>
        </>
    );

    return (
        <ScrollView>
            <Container>
                <MaterialIconsLocation name="location-on" />
                <Title>{weather?.name}</Title>
                <Subtitle>{weather?.weather[0].description}</Subtitle>
                <TouchableNativeFeedback onPress={loadWeatherInformation}>
                    <MaterialIconsLocation name="refresh" />
                </TouchableNativeFeedback>
                {renderImage()}
                <TemperatureContainer>
                    <TemperatureLabel>Temperatura (ºC)</TemperatureLabel>
                    <TemperatureValue>{weather?.main.temp}º</TemperatureValue>
                    <TemperatureVariationContainer>
                        <TemperatureVariationContent>
                            <FeatherIconsArrowUp name="arrow-up" />
                            <MaxTemperature>{weather?.main.temp_max}º</MaxTemperature>
                        </TemperatureVariationContent>
                        <TemperatureVariationContent>
                            <FeatherIconsArrowDown name="arrow-down" />
                            <MinTemperature>{weather?.main.temp_min}º</MinTemperature>
                        </TemperatureVariationContent>
                    </TemperatureVariationContainer>
                </TemperatureContainer>
                <OtherInfoContainer>
                    <OtherInformationContent>
                        <FeatherIconsOtherInfo name="wind" />
                        <OtherInformationText>{weather?.wind.speed}m/s</OtherInformationText>
                    </OtherInformationContent>
                    <OtherInformationContent>
                        <FeatherIconsOtherInfo name="droplet" />
                        <OtherInformationText>{weather?.main.humidity}%</OtherInformationText>
                    </OtherInformationContent>
                    <OtherInformationContent>
                        <FeatherIconsOtherInfo name="anchor" />
                        <OtherInformationText>{weather?.main.sea_level}hPa</OtherInformationText>
                    </OtherInformationContent>
                </OtherInfoContainer>
            </Container>
        </ScrollView>
    );
}