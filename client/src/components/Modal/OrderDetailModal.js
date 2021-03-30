import React from 'react'

import { View, Text, LogBox, SafeAreaView, Image, TouchableOpacity } from 'react-native'

LogBox.ignoreAllLogs()

import { connect } from 'react-redux'
import Modal from 'react-native-modalbox'
import { CLOSE_DETAIL_MODAL, OPEN_PRICE_INPUT_MODAL, getFormInfo, clearFormInfo } from '../../store/actions/modalAction'
import { removeOrder } from '../../store/actions/notiAction'
import { color, heightToDp, widthToDp } from '../../stylesheet'
import { ScrollView } from 'react-native-gesture-handler'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

const mapStateToProps = (state) => ({
    isOpen: state.modal.detail_modal,
    order_id: state.modal.order_id,
    formInfo: state.modal.formInfo,
    current_location: state.auth.userInfo.currentLocation
})

const mapDispatchToProps = {
    CLOSE_DETAIL_MODAL,
    OPEN_PRICE_INPUT_MODAL,
    removeOrder,
    getFormInfo,
    clearFormInfo
}

const ImageView = ({ uri }) => {
    return (
        <>
            <TouchableOpacity
                style={{
                    marginHorizontal: widthToDp(2.5),
                    width: widthToDp('20'),
                    aspectRatio: 1,
                }}
            >
                <Image
                    style={{
                        backgroundColor: color.GREY_5,
                        flex: 1,
                        borderRadius: widthToDp('6')
                    }}
                    source={{ uri: uri }}
                    resizeMode='cover'
                    resizeMethod='resize'
                />
            </TouchableOpacity>
        </>
    )
}

const OrderDetailModal = (props) => {

    const month = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฏาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']

    const onClosed = () => {
        props.CLOSE_DETAIL_MODAL()
    }

    return (
        <>
            <Modal
                isOpen={props.isOpen}
                onClosed={() => onClosed()}
                backButtonClose={true}
                style={{
                    height: heightToDp('80'),
                    backgroundColor: 'transparent'
                }}
                position='bottom'
                swipeArea={heightToDp('3')}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: color.BLUE_2,
                        borderTopLeftRadius: heightToDp('3'),
                        borderTopRightRadius: heightToDp('3')
                    }}>
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
                    <View
                        style={{ flex: 1 }}
                    >
                        <ScrollView
                            style={{
                                flex: 1,
                                padding: widthToDp('4')
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    paddingHorizontal: widthToDp('2')
                                }}
                            >
                                <Image
                                    source={{ uri: props.formInfo.userInfoID.avatar }}
                                    style={{
                                        width: widthToDp('25'),
                                        height: widthToDp('25'),
                                        borderRadius: widthToDp('10'),
                                        backgroundColor: color.GREY_5
                                    }}
                                />
                                <View
                                    style={{
                                        flex: 1,
                                        alignItems: 'flex-start',
                                        justifyContent: 'flex-start',
                                        paddingLeft: widthToDp('5'),
                                        paddingVertical: widthToDp('4')
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: widthToDp('6'),
                                            color: color.GREY_5
                                        }}
                                    >
                                        {`${props.formInfo.userInfoID.firstname} ${props.formInfo.userInfoID.lastname}`}
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: widthToDp('4'),
                                            color: color.GREY_5
                                        }}
                                    >
                                        ห่างจากคุณ {props.formInfo.distance} กม.
                                </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    padding: widthToDp('5'),
                                }}
                            >
                                <View
                                    style={{
                                        marginBottom: widthToDp('5')
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: widthToDp('6'),
                                            color: color.GREY_5
                                        }}
                                    >
                                        {`วันที่ : ${new Date(props.formInfo.date).getDate()} ${month[new Date(props.formInfo.date).getMonth()]} ${new Date(props.formInfo.date).getFullYear() + 543}`}
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: widthToDp('6'),
                                            color: color.GREY_5
                                        }}
                                    >
                                        {`เวลา : ${('0' + new Date(props.formInfo.date).getHours()).slice(-2)} : ${new Date(props.formInfo.date).getMinutes()} น.`}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        marginBottom: widthToDp('5')
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: widthToDp('6'),
                                            color: color.GREY_5
                                        }}
                                    >
                                        รายละเอียด
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: widthToDp('4'),
                                            color: color.GREY_5
                                        }}
                                    >
                                        {
                                            props.formInfo.detail.trimEnd().length === 0 ? 'ไม่มีคำอธิบายเพิ่มเติม' : props.formInfo.detail
                                        }
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        marginBottom: widthToDp('5')
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: widthToDp('6'),
                                            color: color.GREY_5
                                        }}
                                    >
                                        รูปภาพ หรือ วิดีโอ
                                </Text>
                                    <View
                                        style={{
                                            flexWrap: 'wrap',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                            width: '100%',
                                            paddingVertical: widthToDp('2')
                                        }}
                                    >
                                        {
                                            props.formInfo.image.length !== 0 ? (
                                                props.formInfo.image.map(item => {
                                                    return <ImageView uri={item} key={item} />
                                                })
                                            ) :
                                                (
                                                    <Text
                                                        style={{
                                                            fontWeight: 'bold',
                                                            fontSize: widthToDp('4'),
                                                            color: color.GREY_5
                                                        }}
                                                    >
                                                        ไม่มีรูปเพิ่มเติม
                                                    </Text>
                                                )
                                        }
                                    </View>
                                </View>
                                <View
                                    style={{
                                        marginBottom: widthToDp('5')
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: widthToDp('6'),
                                            color: color.GREY_5
                                        }}
                                    >
                                        สถานที่
                                </Text>
                                    <View
                                        style={{
                                            flexWrap: 'wrap',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '100%',
                                            paddingVertical: widthToDp('2'),
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: '100%',
                                                aspectRatio: 2,
                                                backgroundColor: color.GREY_5,
                                                borderRadius: widthToDp('5')
                                            }}
                                        >
                                            <MapView

                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: widthToDp('5')
                                                }}
                                                provider={PROVIDER_GOOGLE}
                                                zoomEnabled
                                                initialRegion={{
                                                    latitude: props.formInfo.location.lat,
                                                    longitude: props.formInfo.location.lon,
                                                    latitudeDelta: 0.005,
                                                    longitudeDelta: 0.005
                                                }}
                                                showsUserLocation
                                            >
                                                <Marker
                                                    coordinate={{
                                                        latitude: props.formInfo.location.lat,
                                                        longitude: props.formInfo.location.lon,
                                                    }}
                                                />
                                            </MapView>
                                        </View>

                                    </View>
                                </View>
                                <View
                                    style={{
                                        marginBottom: widthToDp('5'),
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        width: '100%'
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            paddingVertical: widthToDp('3'),
                                            paddingHorizontal: widthToDp('6'),
                                            borderRadius: widthToDp('10'),
                                            backgroundColor: color.IOS_GREEN_LIGHT
                                        }}
                                        onPress={() => {
                                            props.OPEN_PRICE_INPUT_MODAL(props.order_id)
                                            onClosed()
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: widthToDp('4'),
                                                fontWeight: 'bold',
                                                color: color.GREY_5
                                            }}
                                        >
                                            ตอบรับ
                                    </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            paddingVertical: widthToDp('3'),
                                            paddingHorizontal: widthToDp('6'),
                                            borderRadius: widthToDp('10'),
                                            backgroundColor: color.IOS_ORANGE_DARK
                                        }}
                                        onPress={() => {
                                            props.CLOSE_DETAIL_MODAL()
                                            props.removeOrder(props.order_id)
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: widthToDp('4'),
                                                fontWeight: 'bold',
                                                color: color.GREY_5
                                            }}
                                        >
                                            ไม่สนใจ
                                    </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailModal)