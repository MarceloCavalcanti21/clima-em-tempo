import styled, { css } from 'styled-components/native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Platform } from 'react-native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: ${RFValue(70)}px ${RFValue(25)}px ${RFValue(40)}px ${RFValue(25)}px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${RFValue(32)}px;
`;

export const Subtitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${RFValue(16)}px;
`;

export const TemperatureContainer = styled.View`
    align-items: center;
`;

export const TemperatureLabel = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.secondaryLight};
    font-size: ${RFValue(14)}px;
    margin-top: ${RFValue(10)}px;
`;

export const TemperatureValue = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${RFValue(82)}px;
    margin: 0 ${RFValue(30)}px;
`;

export const TemperatureVariationContainer = styled.View`
    flex-direction: row;

    ${Platform.OS === 'android' &&
        css`
          margin-top: ${RFValue(-20)}px;
    `}
`;

export const TemperatureVariationContent = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const MaxTemperature = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${RFValue(15)}px;
`;

export const MinTemperature = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${RFValue(15)}px;
`;

export const OtherInfoContainer = styled.View`
    width: 100%;
    flex-direction: row;
    background-color: #E5E6ED;
    border-radius: 30px;
    justify-content: space-between;
    padding: ${RFValue(20)}px ${RFValue(30)}px;
    margin-top: ${RFValue(30)}px;
`;

export const OtherInformationContent = styled.View`
    align-items: center;
`;

export const OtherInformationText = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${RFValue(16)}px;
    margin-top: ${RFValue(10)}px;
`;

export const LocationInformationTextRegular = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${RFValue(13)}px;
    margin-top: ${RFValue(20)}px;
    text-align: center;
`;

export const LocationInformationTextBold = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: #FFAB0B;
    font-size: ${RFValue(13)}px;
    margin-top: ${RFValue(20)}px;
    text-align: center;
`;

export const WeatherImage = styled.Image`
    margin-top: ${RFValue(30)}px;
`;

export const MaterialIconsLocation = styled(MaterialIcons)`
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${RFValue(32)}px;
`;

export const MaterialIconsRefresh = styled(MaterialIcons)`
    color: #FFAB0B;
    font-size: ${RFValue(32)}px;
    margin-top: ${RFValue(10)}px;
`;

export const FeatherIconsArrowUp = styled(Feather)`
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${RFValue(20)}px;
`;

export const FeatherIconsArrowDown = styled(Feather)`
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${RFValue(20)}px;
`;

export const FeatherIconsOtherInfo = styled(Feather)`
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${RFValue(32)}px;
`;