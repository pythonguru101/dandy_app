import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import photo from '../../assets/dandy.png'
import { setOnboarding } from '../../redux/Actions';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';

const Square = ({ isLight, selected }) => {
    let backgroundColor;
    if (isLight) {
        backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
    } else {
        backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
    }
    return (
        <View
            style={{
                width: 6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor,
            }}
        />
    );
};

const backgroundColor = isLight => (isLight ? 'blue' : 'lightblue');
const color = isLight => backgroundColor(!isLight);

const Done = ({ isLight, ...props }) => (
    <Button
        title={'Done'}
        buttonStyle={{
            backgroundColor: backgroundColor(isLight),
        }}
        containerViewStyle={{
            marginVertical: 10,
            width: 70,
            backgroundColor: backgroundColor(isLight),
        }}
        textStyle={{ color: color(isLight) }}
        {...props}
    />
);

const Skip = ({ isLight, skipLabel, ...props }) => (
    <Button
        title={'Skip'}
        buttonStyle={{
            backgroundColor: backgroundColor(isLight),
        }}
        containerViewStyle={{
            marginVertical: 10,
            width: 70,
        }}
        textStyle={{ color: color(isLight) }}
        {...props}
    >
        {skipLabel}
    </Button>
);

const Next = ({ isLight, ...props }) => (
    <Button
        title={'Next'}
        buttonStyle={{
            backgroundColor: backgroundColor(isLight),
        }}
        containerViewStyle={{
            marginVertical: 10,
            width: 70,
            backgroundColor: backgroundColor(isLight),
        }}
        textStyle={{ color: color(isLight) }}
        {...props}
    />
);


const OnboardingScreen = () => {
    const dispatch = useDispatch();

    return (
        <View style={{ flex: 1 }}>
            <Onboarding
                DotComponent={Square}
                NextButtonComponent={Next}
                SkipButtonComponent={Skip}
                DoneButtonComponent={Done}
                titleStyles={{ color: 'blue' }}
                onSkip={() => {
                    console.log('skip');
                    dispatch(setOnboarding());
                }
                }
                onDone={() => {
                    console.log('done');
                    dispatch(setOnboarding());
                }}
                pages={[
                    {
                        backgroundColor: '#fff',
                        image: <Image source={require('../../assets/dandy.png')} />,
                        title: 'Welcome to Dandy',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={photo} />,
                        title: 'Let\'s get started',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },

                ]}
            />
        </View>
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({})

