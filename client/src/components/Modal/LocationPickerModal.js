import React from 'react'
import { Button, SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import Modal from 'react-native-modalbox'
import { widthToDp } from '../../stylesheet'
import { color } from '../../stylesheet/colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { techRegModalStyles } from './SelectAptitudeModal'
import { getLocationDescription } from '../../misc/getLocationDescription'

const LocationPickerModal = ({ setLocation, location, changeDesc , ...props }) => {

    return (
        <>
            <Modal
                isOpen={props.isOpen}
                backButtonClose={true}
                onClosed={() => props.onClosed()}
                swipeToClose={false}
                style={{
                    backgroundColor: 'transparent'
                }}
            >
                <SafeAreaView
                    style={techRegModalStyles.container}
                >
                    <View
                        style={{
                            backgroundColor: '#fff',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: widthToDp('80'),
                            borderRadius: widthToDp('4'),
                        }}
                    >
                        <View style={techRegModalStyles.header}>
                            <Text
                                style={techRegModalStyles.headerText}
                            >
                                ระบุที่อยู่
                            </Text>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                // paddingHorizontal: widthToDp('5'),
                                // paddingVertical: widthToDp('2'),
                                width: '100%',
                                aspectRatio: 1
                            }}
                        >
                            <MapView
                                style={{ width: '100%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: widthToDp('2') }}
                                provider={PROVIDER_GOOGLE}
                                initialRegion={{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                    latitudeDelta: 0.005,
                                    longitudeDelta: 0.005
                                }}
                                zoomEnabled
                                showsUserLocation
                                onRegionChangeComplete={ async (res) => {
                                    setLocation(res.latitude, res.longitude)
                                    const desc = await getLocationDescription(res.latitude  , res.longitude)
                                    changeDesc(desc)
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: location.latitude,
                                        longitude: location.longitude
                                    }}
                                >

                                </Marker>
                                {/* <Ionicons name='pin' size={50} style={{ top: -20, right: -2, color: 'red' }} /> */}
                            </MapView>
                        </View>
                        <View
                            style={techRegModalStyles.closeContainer}
                        >
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    props.onClosed()
                                }}
                            >
                                <Text
                                    style={{
                                        color: color.IOS_BLUE,
                                        fontWeight: 'bold',
                                        fontSize: widthToDp('4')
                                    }}
                                >
                                    ยืนยัน
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>

            </Modal>
        </>
    )
}

export default LocationPickerModal
