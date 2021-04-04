import React from 'react'

import { View , SafeAreaView, TouchableOpacity , Text } from 'react-native'

import MapView , {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import Modal from 'react-native-modalbox'
import { widthToDp } from '../../stylesheet'
import { techRegModalStyles } from './SelectAptitudeModal'
import { connect } from 'react-redux'
import { color } from '../../stylesheet/colors'

const mapStateToProps = (state) => ({
    current_location : state.auth.userInfo.currentLocation
}) 

const mapDispatchToProps = {

}

const ShowMapModal = (props) => {
    return(
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
                                สถานที่นัด
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
                                    // latitude : props.location.lat,
                                    // longitude : props.location.lon,
                                    latitude: props.current_location.lat,
                                    longitude: props.current_location.lon,
                                    latitudeDelta: 0.005,
                                    longitudeDelta: 0.005
                                }}
                                zoomEnabled
                                showsUserLocation
                            >
                                <Marker
                                    coordinate={{
                                        latitude : props.location.lat,
                                        longitude : props.location.lon
                                    }}
                                >
                                </Marker>
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
                                        color: color.IOS_RED_LIGHT,
                                        fontWeight: 'bold',
                                        fontSize: widthToDp('4')
                                    }}
                                >
                                    ปิด
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>

            </Modal>

        </>
    )
}

export default connect(mapStateToProps , mapDispatchToProps)(ShowMapModal)