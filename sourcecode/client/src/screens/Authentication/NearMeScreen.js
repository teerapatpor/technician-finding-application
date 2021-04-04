import React from 'react'

import {
    View,
    Text,
    Button,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Header from '../../components/Header'
import { content, searchScreen, color, technician, widthToDp, heightToDp } from '../../stylesheet'
import { connect } from 'react-redux'
import { SEARCH_BY_KEY_WORD, GET_NEAR_TECHNICIAN, GET_TECHNICIAN_INFO, searchTechnicianByType } from '../../store/actions/techAction'
import { SET_LOCATION } from '../../store/actions/formAction'
import Feather from 'react-native-vector-icons/Feather'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { useFocusEffect } from '@react-navigation/native'
import Modal from 'react-native-modalbox'
import { aptitudeType } from '../../misc/aptitude_type'
import { useNavigation } from '@react-navigation/native'

const mapStateToProps = (state) => ({
    location: state.form.location
})

const mapDispatchToProps = {
    SEARCH_BY_KEY_WORD,
    GET_NEAR_TECHNICIAN,
    SET_LOCATION,
    GET_TECHNICIAN_INFO,
    searchTechnicianByType
}

const NearMeScreen = ({ navigation, ...props }) => {
    const [mapKeyword, setMapKeyword] = React.useState('')
    const [technicians, setTechnicians] = React.useState([])
    const [isOpen, setIsOpen] = React.useState(true)

    React.useEffect(() => {
        // props.GET_NEAR_TECHNICIAN(
        //     props.location.latitude,
        //     props.location.longitude
        // ).then((res) => {
        //     setTechnicians(res)
        // })
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            setTechnicians([])
        }, [])
    )

    const handleOnPressFilterModal = (type) => {
        props.searchTechnicianByType(type).then(res => {
            setTechnicians(res)
        })
        setIsOpen(false)
    }

    const { navigate } = useNavigation()

    return (
        <>
            <SafeAreaView style={content.topsafearray} />
            <View style={[content.safearray, { backgroundColor: color.GREY_5 }]}>
                <Header page="ใกล้ฉัน" back={true} navigation={navigation} />
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: widthToDp('5'),
                        backgroundColor: color.BLUE_3,
                        zIndex: 4,
                        width: widthToDp('40'),
                        paddingVertical: widthToDp('3'),
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: widthToDp('10'),
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.34,
                        shadowRadius: 6.27,

                        elevation: 10,
                    }}
                    onPress={() => setIsOpen(true)}
                >
                    <Ionicons
                        name='options-outline'
                        size={widthToDp("6")}
                        style={{
                            fontSize: widthToDp('6'),
                            fontWeight: 'bold',
                            color: '#fff',
                        }}
                    />
                </TouchableOpacity>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={[content.container]}
                    initialRegion={{
                        latitude: props.location.latitude,
                        longitude: props.location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                    }}
                    region={{
                        latitude: props.location.latitude,
                        longitude: props.location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                    }}
                    showsUserLocation
                >
                    {
                        technicians.length !== 0 ?
                            technicians.map((tech, index) => {
                                return (

                                    <Marker
                                        key={index}
                                        coordinate={{
                                            latitude: tech.address.lat - 0.0005 ,
                                            longitude: tech.address.lon
                                        }}
                                        onPress={() => {
                                            props.GET_TECHNICIAN_INFO(tech.userInfoID.userID)
                                                .then(() => {
                                                    navigate('techInfo')
                                                })
                                        }}
                                    >
                                        <View
                                            style={{
                                                // marginTop : widthToDp('5')
                                                justifyContent : 'center',
                                                alignItems : 'center'
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    width: widthToDp('10'),
                                                    height: widthToDp('10'),
                                                    borderRadius: widthToDp('5'),
                                                    borderWidth: 2,
                                                    borderColor: color.RED_0
                                                }}
                                                source={{
                                                    uri: tech.userInfoID.avatar
                                                }}
                                            >
                                            </Image>
                                            <Text
                                                style={{
                                                    backgroundColor : '#fff',
                                                    padding : 2,
                                                    borderRadius : widthToDp('2')
                                                }}
                                            >
                                                {`${tech.userInfoID.firstname} ${tech.userInfoID.lastname}`}
                                            </Text>
                                        </View>
                                    </Marker>
                                )
                            })
                            : null
                    }
                </MapView>
            </View>
            <Modal
                isOpen={isOpen}
                onClosed={() => setIsOpen(false)}
                position='bottom'
                style={{
                    height: heightToDp('60'),
                    borderTopRightRadius: heightToDp(3),
                    borderTopLeftRadius: heightToDp(3)
                }}
                swipeArea={heightToDp(3)}
            >
                <View
                    style={{ flex: 1 }}
                >
                    <View
                        style={{
                            height: heightToDp('3'),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: color.GREY_2,
                                height: 5,
                                width: widthToDp('10'),
                                borderRadius: 5
                            }}
                        />
                    </View>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: widthToDp('6'),
                            color: color.BLUE_1,
                            alignSelf: 'center'
                        }}
                    >
                        เลือกประเภท
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            padding: widthToDp('4')
                        }}
                    >
                        {
                            aptitudeType.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        style={{
                                            paddingVertical: widthToDp('2'),
                                            marginHorizontal: widthToDp('1'),
                                            marginVertical: widthToDp('1'),
                                            paddingHorizontal: widthToDp('4'),
                                            borderRadius: widthToDp('4'),
                                            backgroundColor: color.GREY_5
                                        }}
                                        key={index}
                                        onPress={() => {
                                            handleOnPressFilterModal(item)
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: widthToDp('4'),
                                                fontWeight: 'bold',
                                                color: color.BLUE_1
                                            }}
                                        >

                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>

            </Modal>

        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NearMeScreen)