import React from 'react'

import {
    View, Text, TouchableOpacity, Image
} from 'react-native'

import Feather from 'react-native-vector-icons/Feather'

import { widthToDp } from '../../stylesheet'
import { infoStyles } from '../../screens/Authentication/UserInfoScreen'

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { color } from '../../stylesheet/colors'

import LinearGradient from 'react-native-linear-gradient'

import { useNavigation } from '@react-navigation/native'


const TechnicianInfoComponent = (props) => {
    const day_ = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']


    const { navigate } = useNavigation()

    const [amountReview, setAmountReview] = React.useState(0)
    React.useEffect(() => {
        props.info.aptitude.map( (item ) => {
            setAmountReview(amountReview + item.data.amountOfcomment);
        })
    }, [])

    React.useEffect(() => {

    }, [])

    return (
        <>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

                <View style={infoStyles.onside}>
                    {
                        props.info.frontStore ? (
                            <>
                                <Feather name='check' style={[infoStyles.onsideIcon, infoStyles.checkColor]} />
                                <Text style={[infoStyles.onsideText, infoStyles.checkColor]}>
                                    หน้าร้าน
                                </Text>
                            </>
                        ) :
                            (
                                <>
                                    <Feather name='x' style={[infoStyles.onsideIcon, infoStyles.xColor]} />
                                    <Text style={[infoStyles.onsideText, infoStyles.xColor]}>
                                        หน้าร้าน
                                    </Text>
                                </>
                            )

                    }
                </View>
                <View style={infoStyles.onside}>
                    {
                        props.info.onSite ? (
                            <>
                                <Feather name='check' style={[infoStyles.onsideIcon, infoStyles.checkColor]} />
                                <Text style={[infoStyles.onsideText, infoStyles.checkColor]}>
                                    บริการนอกสถานที่
                                </Text>
                            </>
                        ) : (
                                <>
                                    <Feather name='x' style={[infoStyles.onsideIcon, infoStyles.xColor]} />
                                    <Text style={[infoStyles.onsideText, infoStyles.xColor]}>
                                        บริการนอกสถานที่
                                    </Text>
                                </>
                            )
                    }

                </View>
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: widthToDp('2'),
            }}>
                <Text
                    style={{
                        fontSize: widthToDp('4'),
                        color: color.BLUE_0
                    }}
                >
                    {
                        props.info.bio
                    }
                </Text>
            </View>
            <View style={infoStyles.infoContainer}>

                <View style={infoStyles.infoRow}>
                    <View style={infoStyles.infoTopic}>
                        <Text style={infoStyles.topicText}>
                            ความถนัด
                        </Text>
                    </View>
                    <View style={[infoStyles.infoDetail, { justifyContent: "flex-end" }]}>
                        {
                            props.info.aptitude.map((item, index) => {
                                return (
                                    <View key={index} style={infoStyles.aptitude}>
                                        <Text style={infoStyles.aptitudeText}>{item.key}</Text>
                                    </View>
                                )
                            })
                        }

                    </View>
                </View>

                <View style={infoStyles.infoRow}>
                    <View style={infoStyles.infoTopic}>
                        <Text style={infoStyles.topicText}>
                            วันทำงาน
                        </Text>
                    </View>
                    <View style={[infoStyles.infoDetail, { justifyContent: "flex-end" }]}>
                        {/* <Text style={{
                                fontSize : widthToDp('4'),
                                color : color.BLUE_0
                            }}>
                                {
                                    workDay.toString().replace(/,/g , '  ')
                                }
                            </Text> */}
                        {
                            props.info.workDay.length == 7 ? (
                                <View style={[infoStyles.aptitude, {
                                    borderRadius: widthToDp('5'),
                                    paddingHorizontal: widthToDp('2')
                                }]}>
                                    <Text style={infoStyles.aptitudeText}>ทุกวัน</Text>
                                </View>
                            ) : (
                                    props.info.workDay.map((item, index) => {
                                        return (
                                            <View key={index} style={[infoStyles.aptitude, {
                                                borderRadius: widthToDp('5'),
                                                paddingHorizontal: widthToDp('2')
                                            }]}>
                                                <Text style={infoStyles.aptitudeText}>{day_[item]}</Text>
                                            </View>
                                        )
                                    })
                                )
                        }

                    </View>
                </View>

                <View style={infoStyles.infoRow}>
                    <View style={infoStyles.infoTopic}>
                        <Text style={infoStyles.topicText}>
                            เวลาทำงาน
                        </Text>
                    </View>
                    <View style={[infoStyles.infoDetail, { justifyContent: "flex-end" }]}>
                        <View>
                            <View style={infoStyles.aptitude}>
                                <Text style={infoStyles.aptitudeText}>{`เปิด ${('0' + props.info.workTime.start.hour).slice(-2)}:${('0' + props.info.workTime.start.minutes).slice(-2)} น.`}</Text>
                            </View>
                            <View style={infoStyles.aptitude}>
                                <Text style={infoStyles.aptitudeText}>{`ปิด ${('0' + props.info.workTime.end.hour).slice(-2)}:${('0' + props.info.workTime.end.minutes).slice(-2)} น.`}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: widthToDp('4'),
                    margin: widthToDp('2'),

                }}>
                    <Text
                        style={{
                            fontSize: widthToDp('4'),
                            color: color.BLUE_2,
                            fontWeight: 'bold',
                            marginBottom: widthToDp('2')
                        }}
                    >
                        ที่อยู่
                    </Text>
                    <Text
                        style={{
                            fontSize: widthToDp('4'),
                            color: color.BLUE_0
                        }}
                    >
                        {
                            props.info.description
                        }
                    </Text>
                </View>

                <MapView
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation
                    style={{
                        width: '100%',
                        height: widthToDp('50'),
                        borderRadius: widthToDp('4')
                    }}
                    region={{
                        latitude: props.info.location.lat,
                        longitude: props.info.location.lon,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: props.info.location.lat,
                            longitude: props.info.location.lon,
                        }}
                        title={`${props.info.personalInfo.firstname} ${props.info.personalInfo.lastname}`}
                    >

                    </Marker>

                </MapView>

                <TouchableOpacity
                    onPress={() => {
                        navigate('rating')
                    }}
                >
                    <LinearGradient
                        style={[infoStyles.infoRow, infoStyles.ratingContainer]}
                        colors={[
                            color.BLUE_3,
                            color.BLUE_3,
                        ]}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Feather name='star' style={[infoStyles.btnText, { paddingHorizontal: widthToDp('1') }]} />
                            <Text style={infoStyles.btnText}>เรทติ้ง</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={infoStyles.btnText}>{`${parseInt(props.info.star)}/5  (${amountReview} ครั้ง)`}</Text>
                            <Feather name='chevron-right' style={infoStyles.btnText} />
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default TechnicianInfoComponent

