import React from 'react'

import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, Animated, ActivityIndicator, Easing, KeyboardAvoidingView, Platform, Modal } from 'react-native'

import Header from '../../components/Header'
import DateTimePicker from '../../components/Form/DateTimePicker'
import Line from '../../components/Form/Line'
import DetailInput from '../../components/Form/DetailInput'
import ImagePicker from '../../components/Form/ImagePicker'
import LocationPicker from '../../components/Form/LocationPicker'
import TypePicker from '../../components/Form/TypePicker'
import MyButton from '../../components/MyButton'
import DatePickerModal from '../../components/Modal/DatePickerModal'
import TimePickerModal from '../../components/Modal/TimePickerModal'
import ImagePickerModal from '../../components/Modal/ImagePickerModal'
import SelectTypePickerModal from '../../components/Modal/SelectTypePickerModal'
import LocationPickerModal from '../../components/Modal/LocationPickerModal'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import ImagePickerManager from 'react-native-image-crop-picker'

import { sendPostReq, connection } from '../../store/actions/socketAction'
import { addNewResponse } from '../../store/actions/notiAction'
import { SET_FILE, SET_LOCATION, clear, SET_DATE, SET_MONTH, SET_YEAR, SET_HOUR, SET_MINUTE, APPEND_FILE } from '../../store/actions/formAction'
import { CLOSE_IMAGE_PICKER_MODAL } from '../../store/actions/modalAction'
import { LOADING, LOADED, setCurrentLocation } from '../../store/actions/authAction'
import { useFocusEffect } from '@react-navigation/native'
import { connect } from 'react-redux'
import { content, color, card, widthToDp } from '../../stylesheet'
import { styles } from '../../components/Setting/styles'
import Feather from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient'
import Geolocation from '@react-native-community/geolocation'
import { getLocationDescription } from '../../misc/getLocationDescription'


const mapStateToProps = (state) => ({
    firstname: state.auth.userInfo.firstname,
    lastname: state.auth.userInfo.lastname,
    uid: state.auth.userInfo.uid,
    date: state.form.date,
    month: state.form.month,
    year: state.form.year,
    hour: state.form.hour,
    minute: state.form.minute,
    file: state.form.file,
    detail: state.form.detail,
    lat: state.form.location.latitude,
    lng: state.form.location.longitude,
    location: state.form.location,
    type: state.form.type,
    currentLocation: state.auth.userInfo.currentLocation
})

const mapDispatchToProps = {
    LOADING,
    LOADED,
    clear,
    addNewResponse,
    SET_LOCATION,
    sendPostReq,
    SET_FILE,
    CLOSE_IMAGE_PICKER_MODAL,
    SET_DATE,
    SET_MONTH,
    SET_YEAR,
    SET_HOUR,
    SET_MINUTE,
    APPEND_FILE,
    connection,
    setCurrentLocation
}

const connector = connect(mapStateToProps, mapDispatchToProps)

const PostScreen = (props) => {
    const [locationVisible, setLocationVisible] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [locationDesc, setLocationDesc] = React.useState('')


    useFocusEffect(
        React.useCallback(() => {
            setIsLoading(false)
            const current_date = new Date()
            Geolocation.getCurrentPosition(async (position) => {
                props.setCurrentLocation(position.coords.latitude, position.coords.longitude)
                props.SET_LOCATION(position.coords.latitude, position.coords.longitude)
                const desc = await getLocationDescription(position.coords.latitude, position.coords.longitude)
                setLocationDesc(desc)
            }, () => {

            })
            props.SET_DATE(current_date.getDate())
            props.SET_MONTH(current_date.getMonth())
            props.SET_YEAR(current_date.getFullYear())
            props.SET_HOUR(current_date.getHours())
            props.SET_MINUTE(current_date.getMinutes())

            return () => {
                props.clear()
            }
        }, [])
    )

    const [opacity, setOpacity] = React.useState(new Animated.Value(1))

    const translateY = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, parseInt(widthToDp('20'))]
    })

    const snackPopDown = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start()
    }

    const errorPopUp = () => {
        Animated.sequence([
            Animated.timing(opacity, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 3000,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            })
        ]).start()
    }


    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
            >
                <SafeAreaView style={content.topsafearray} />
                <SafeAreaView style={content.safearray} >
                    <Header page='บอกอาการ' navigation={props.navigation} chat={false} isRadius={true} />
                    <ScrollView style={content.container}>
                        <View style={card.card}>
                            <View style={card.cardHeader}>
                                <Text style={card.headerText}>
                                    ระบุเวลานัด
                            </Text>
                            </View>
                            <View style={card.cardContainer}>
                                <DateTimePicker />
                            </View>
                        </View>
                        <View style={card.card}>
                            <View style={card.cardHeader}>
                                <Text style={card.headerText}>
                                    ระบุรายละเอียด
                            </Text>
                            </View>
                            <View style={card.cardContainer}>
                                <TypePicker />
                                <DetailInput />
                                <ImagePicker />
                            </View>
                        </View>
                        <View style={card.card}>
                            <View style={[card.cardHeader, { justifyContent: 'center', alignItems: 'center' }]}>
                                <Text style={card.headerText}>
                                    ระบุสถานที่
                            </Text>
                                <Text
                                    style={styles.selectedText}
                                >
                                    {locationDesc}
                                </Text>
                            </View>
                            <View style={card.cardContainer}>
                                <View>
                                    <MapView
                                        style={{ width: '100%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: widthToDp('2') }}
                                        provider={PROVIDER_GOOGLE}
                                        // initialRegion={{
                                        //     latitude: props.currentLocation.lat,
                                        //     longitude: props.currentLocation.lon,
                                        //     latitudeDelta: 0.005,
                                        //     longitudeDelta: 0.005
                                        // }}
                                        region={{
                                            latitude: props.location.latitude,
                                            longitude: props.location.longitude,
                                            latitudeDelta: 0.005,
                                            longitudeDelta: 0.005
                                        }}
                                        zoomEnabled
                                        showsUserLocation
                                        onRegionChangeComplete={async (res) => {
                                            props.SET_LOCATION(res.latitude, res.longitude)
                                            const desc = await getLocationDescription(res.latitude, res.longitude)
                                            setLocationDesc(desc)
                                        }}
                                    >
                                        <Marker
                                            coordinate={{
                                                latitude: props.location.latitude,
                                                longitude: props.location.longitude
                                            }}
                                        >

                                        </Marker>
                                    </MapView>
                                </View>

                            </View>
                        </View>
                        <MyButton title='ยืนยัน'
                            onPress={() => {
                                const date = `${props.year}-${("0" + (props.month + 1)).slice(-2)}-${("0" + (props.date)).slice(-2)}T${("0" + (props.hour)).slice(-2)}:${("0" + (props.minute)).slice(-2)}:00.209Z`
                                const name = `${props.firstname} ${props.lastname}`
                                if (props.type === '') {
                                    errorPopUp()
                                }
                                else {
                                    setIsLoading(true)
                                    props.sendPostReq({
                                        name: name,
                                        uid: props.uid,
                                        date: date,
                                        type: props.type,
                                        file: props.file,
                                        detail: props.detail,
                                        location: {
                                            lat: props.lat,
                                            lon: props.lng
                                        }
                                    }).then(res => {
                                        setIsLoading(false)
                                        props.navigation.navigate('userNotification')
                                    }).catch(err => {
                                        setIsLoading(false)
                                    })
                                }
                            }}
                        />
                        <View style={{ marginBottom: 25 }} />
                    </ScrollView>
                    <DatePickerModal />
                    <TimePickerModal />
                    <SelectTypePickerModal />
                    <ImagePickerModal
                        libFunc={() => {
                            ImagePickerManager.openPicker({
                                multiple: true,
                                maxFiles: 5,
                                mediaType: 'photo',
                            }).then((img) => {
                                img.map(item => {
                                    props.APPEND_FILE(item)
                                })
                                props.CLOSE_IMAGE_PICKER_MODAL()
                            })
                        }}

                        camFunc={() => {
                            ImagePickerManager.openCamera({
                                mediaType: 'photo'
                            }).then((img) => {
                                props.APPEND_FILE(img)
                                props.CLOSE_IMAGE_PICKER_MODAL()
                            })
                        }}
                    />


                    <Animated.View
                        style={{
                            // backgroundColor : 'red',
                            width: '100%',
                            height: widthToDp('16'),
                            position: 'absolute',
                            bottom: widthToDp('0'),
                            paddingVertical: widthToDp('2'),
                            paddingHorizontal: widthToDp('4'),
                            zIndex: 3,
                            backgroundColor: 'transparent',
                            transform: [
                                { translateY: translateY }
                            ],
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: color.RED_4,
                                flex: 1,
                                borderRadius: widthToDp('4'),

                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    paddingHorizontal: widthToDp('2'),
                                    paddingVertical: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        paddingHorizontal: widthToDp('4'),
                                    }}
                                    onPress={() => props.navigation.navigate('acceptedRequest')}
                                >
                                    <Text
                                        style={{
                                            fontSize: widthToDp('4'),
                                            color: color.RED_0,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        กรุณาระบุประเภท
                                </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        height: widthToDp('8'),
                                        aspectRatio: 1,
                                        backgroundColor: `#ffffff66`,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: widthToDp('3')
                                    }}
                                    onPress={() => {
                                        snackPopDown()
                                    }}
                                >
                                    <Feather name='x' style={{
                                        fontSize: widthToDp('5'),
                                        color: color.IOS_RED_LIGHT
                                    }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>
                </SafeAreaView>
            </KeyboardAvoidingView>
            <Modal
                visible={isLoading}
                animationType='fade'
                transparent={true}
            >
                <SafeAreaView
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#22222233',

                    }}
                >
                    <ActivityIndicator size='small' />
                </SafeAreaView>
            </Modal>
        </>
    )
}

export default connector(PostScreen)