import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, TouchableNativeFeedback, ActivityIndicator, Alert, View } from 'react-native';
import { LocationObject } from 'expo-location';
import * as Location from 'expo-location';

import { Container, Title, Subtitle, TemperatureContainer, TemperatureLabel, TemperatureValue, TemperatureVariationContainer, TemperatureVariationContent, MaxTemperature, MinTemperature, OtherInfoContainer, OtherInformationContent, OtherInformationText, LocationInformationTextRegular, LocationInformationTextBold, WeatherImage, MaterialIconsLocation, MaterialIconsRefresh, FeatherIconsArrowUp, FeatherIconsArrowDown, FeatherIconsOtherInfo } from './styles';
import { loadWeatherInformation } from '../../services/openWeatherApi';
import { WeatherProps } from '../../utils/IWeatherProps';

import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export function Home(){
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState<WeatherProps>();
    const [location, setLocation] = useState<LocationObject>();

    const animation = useSharedValue(5000);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                
                { 
                    translateX: withTiming(animation.value)
                }
            ]
        }
    });

    const loadData = useCallback(async () => {
        setLoading(false);
        animation.value = 500;
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLoading(true);
                return;
            }
        
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

        
            const response = await loadWeatherInformation({latitude: location.coords.latitude, longitute: location.coords.longitude});

            setWeather(response);
            setLoading(true);
            animation.value = 0;
        } catch (error) {
            Alert.alert('ERRO', 'Ocorreu um erro ao tentar buscar os dados do clima. Tente novamente mais tarde.');
        }
    }, [animation]);

    useEffect(() => {
        loadData();
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
                <TouchableNativeFeedback onPress={loadData}>
                    <MaterialIconsRefresh name="refresh" />
                </TouchableNativeFeedback>
            </Container>
        </>
    );

    return (
        <ScrollView>
            <Animated.View style={animatedStyles}>
            <Container>
                <MaterialIconsLocation name="location-on" />
                <Title>{weather?.name}</Title>
                <Subtitle>{weather?.weather[0].description}</Subtitle>
                <TouchableNativeFeedback onPress={loadData}>
                    <MaterialIconsRefresh name="refresh" />
                </TouchableNativeFeedback>
                {renderImage()}
                <TemperatureContainer>
                    <TemperatureLabel>Temperatura (ºC)</TemperatureLabel>
                    <TemperatureVariationContainer>
                        <TemperatureVariationContent>
                            <FeatherIconsArrowUp name="arrow-up" />
                            <MaxTemperature>{weather?.main.temp_max}º</MaxTemperature>
                        </TemperatureVariationContent>
                        <TemperatureValue>{weather?.main.temp}º</TemperatureValue>
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
                        <FeatherIconsOtherInfo name="layers" />
                        <OtherInformationText>{weather?.main.pressure}hPa</OtherInformationText>
                    </OtherInformationContent>
                </OtherInfoContainer>
            </Container>
            </Animated.View>
        </ScrollView>
    );
}