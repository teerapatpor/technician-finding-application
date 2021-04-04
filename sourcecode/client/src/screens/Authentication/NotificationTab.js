import React from 'react'

import { SafeAreaView, ScrollView, Button, Text, View, TouchableOpacity, Image, RefreshControl } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { content, widthToDp } from '../../stylesheet'
import Header from '../../components/Header'
import { color } from '../../stylesheet/colors'
import Feather from 'react-native-vector-icons/Feather'
import NotificationMoreModal from '../../components/Modal/NotificationMoreModal'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { setNotificationBadge } from '../../store/actions/notiAction'
import { connect } from 'react-redux'
import { socket } from '../../store/actions/socketAction'

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    setNotificationBadge
}

const NotificationLists = ({ item, tech }) => {
    const onPress = async () => {
        navigate(item.page)
    }
    const { navigate } = useNavigation()

    // const handleDelete = () => {
    //     AsyncStorage.getItem('notification').then(str => {
    //         const notification = JSON.parse(str)
    //         const filtered = notification.filter((val) => {
    //             return val.id !== item.id && val.type !== item.type && val.name !== item.name 
    //         })
    //         AsyncStorage.setItem('notification', JSON.stringify(filtered)).then(() => {
    //             onRefresh()
    //         })
    //     })
    // }

    return (
        <>
            <TouchableOpacity
                style={{
                    paddingVertical: widthToDp('3'),
                    paddingHorizontal: widthToDp('4'),
                    backgroundColor: item.status ? color.GREY_5 : color.BLUE_5,
                    margin: widthToDp('1'),
                    borderRadius: widthToDp('2'),
                    flexDirection: 'row',
                    alignItems: 'center'
                }}

                onPress={() => {
                    onPress()
                }}
            >
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <Text
                        style={{
                            fontSize: widthToDp('4'),
                            fontWeight: 'bold',
                            color: color.BLUE_0
                        }}
                    >
                        {
                            item.page === 'techNotification' ?
                                `มีการเสนองานใหม่จาก ${tech}` :
                                item.page === 'accepted' ?
                                    `ออเดอร์ ${item.id} ยืนยันแล้ว` :
                                    `มีการเสนอราคาจาก ${tech}`
                        }
                    </Text>
                    <Text
                        style={{
                            fontSize: widthToDp('3.5'),
                            color: color.BLUE_1
                        }}
                    >
                        {
                            item.page === 'techNotification' ?
                                `เกี่ยวกับ ${item.type}` :
                                item.page === 'accepted' ?
                                    `` :
                                    `เกี่ยวกับการหา ${item.type} ของคุณ`}
                    </Text>
                </View>
                {/* <TouchableOpacity
                    style={{
                        width: widthToDp('6'),
                        aspectRatio: 1,
                        borderRadius: widthToDp('3'),
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => {
                        // handleDelete()
                        // openModal()
                    }}
                >
                    <Feather name='trash-2' color={color.IOS_RED_LIGHT} size={widthToDp('4')} />
                </TouchableOpacity> */}

            </TouchableOpacity>
        </>
    )
}

const NotificationTab = (props) => {
    const [moreVisible, setMoreVisible] = React.useState(false)

    const [notificationLists, setNotificationLists] = React.useState([])


    const [refreshing, setRefreshing] = React.useState(false)

    const onRefresh = () => {
        AsyncStorage.getItem('notification').then(json => {
            if (json === null) {
                setNotificationLists([])
            }
            else {
                const noti_json = JSON.parse(json)
                setNotificationLists(noti_json)
            }
            props.setNotificationBadge()
        })
    }

    useFocusEffect(
        React.useCallback(() => {
            socket.on('recieve_new_response', () => {
                setTimeout(() => {
                    onRefresh()
                }, 3000)
            })
            socket.on('recieve_new_post_req', () => {
                setTimeout(() => {
                    onRefresh()
                }, 3000)
            })
            socket.on('confirm_technician_response', () => {
                setTimeout(() => {
                    onRefresh()
                }, 3000)
            })
            onRefresh()
            // AsyncStorage.setItem('notification' , JSON.stringify(json_var))
            return () => setNotificationLists([])
        }, [])
    )

    return (
        <>
            <SafeAreaView style={content.topsafearray} />
            <SafeAreaView style={content.safearray} >
                <Header page='การแจ้งเตือน' />

                <ScrollView
                    style={content.container}
                >
                    {
                        notificationLists.length === 0 ? (
                            <>
                                <Image
                                    source={require('../../assets/image/noNotification.jpg')}
                                    style={{
                                        height: widthToDp('60'),
                                        alignSelf: 'center',
                                        resizeMode: 'contain'
                                    }}
                                />
                                <Text
                                    style={{
                                        alignSelf: 'center',
                                        fontSize: widthToDp('5'),
                                        color: color.BLUE_2
                                    }}
                                >
                                    ยังไม่มีการแจ้งเตือน
                        </Text>
                            </>
                        ) : null
                    }
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => onRefresh()}
                    />
                    <View>
                        {
                            notificationLists.map((item, index) => {
                                return (
                                    <NotificationLists key={index}
                                        openModal={() => setMoreVisible(true)}
                                        tech={item.name}
                                        status={item.status}
                                        type={item.type}
                                        page={item.page}
                                        id={item.id}
                                        item={item}
                                        onRefresh={() => onRefresh()}
                                        setBadge={() => props.setNotificationBadge()}
                                    />
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
            <NotificationMoreModal
                isOpen={moreVisible}
                onClosed={() => setMoreVisible(false)}
            />
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationTab)