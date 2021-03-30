import React from 'react'

import {
    View,
    Text,
    Button,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native'

import Feather from 'react-native-vector-icons/Feather'

import { content, widthToDp, color } from '../../../stylesheet'

import Abstract from '../../../components/UserNotification/AcceptedAbstract'
import { connect } from 'react-redux'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Header from '../../../components/UserInfo/Header'
import NotFoundComponent from '../../../components/NotFoundComponent'
import ContentLoader from 'react-native-easy-content-loader'
import { getAcceptedList, setNotificationBadge } from '../../../store/actions/notiAction'
import { } from '../../../store/actions/socketAction'
import { useFocusEffect } from '@react-navigation/native'
import ShowMapModal from '../../../components/Modal/ShowMapModal'
import AcceptedDetailModal from '../../../components/Modal/AcceptedDetailModal'
import AsyncStorage from '@react-native-async-storage/async-storage'

const TopTab = createMaterialTopTabNavigator()

const mapStateToProps = (state) => ({
    role: state.auth.userInfo.role,
    userConfirmed: state.noti.userConfirmed
})

const mapDispatchToProps = {
    getAcceptedList,
    setNotificationBadge
}


const AcceptedRequestOrder = ({ userConfirmed, ...props }) => {

    const [isReady, setIsReady] = React.useState(true)
    const [acceptedLists, setAcceptedLists] = React.useState([])
    const [mapModalVisible, setMapModalVisible] = React.useState(false)
    const [detailModalVisible, setDetailModalVisible] = React.useState(false)
    const [location, setLocation] = React.useState({
        lat: 0,
        lon: 0
    })

    useFocusEffect(
        React.useCallback(() => {
            AsyncStorage.getItem('notification').then(str => {
                const notification = JSON.parse(str)
                let readed = notification.map((item) => {
                    if (item.page === 'accepted') {
                        return {
                            ...item,
                            status: true
                        }
                    }
                    else {
                        return item
                    }
                })
                AsyncStorage.setItem('notification', JSON.stringify(readed)).then(() => {
                    props.setNotificationBadge()
                })
            })
            // socket.on('recieve_new_post_req', () => {
            //     handleNewOrder()
            // })
            setIsReady(true)
            props.getAcceptedList().then((res) => {
                setAcceptedLists(res.sort((a, b) => {
                    return new Date(a.date).getTime() - new Date(b.date).getTime()
                }).filter((val) => {
                    return new Date(val.date).getTime() > (new Date().getTime() - 86400000)
                })
                )
                setIsReady(false)
            }).catch(err => {
                // console.log(err)
            })
            // props.getAcceptedList().then(res => {
            //     setNewOrderLists(res)
            //     setIsReady(false)
            // }).catch(err => {
            //     console.log(err);
            // })

            return () => {
                setAcceptedLists([])
                AsyncStorage.getItem('notification').then(str => {
                    const notification = JSON.parse(str)
                    let readed = notification.map((item) => {
                        if (item.page === 'accepted') {
                            return {
                                ...item,
                                status: true
                            }
                        }
                        else {
                            return item
                        }
                    })
                    AsyncStorage.setItem('notification', JSON.stringify(readed)).then(() => {
                        props.setNotificationBadge()
                    })
                })
            }
        }, [])
    )

    return (
        <>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: '#fff'
                }}
            >
                <Header page='ยืนยันแล้ว' />
                {
                    isReady ? (
                        <>
                            <ContentLoader
                                pRows={0}
                                title
                                titleStyles={{
                                    height: widthToDp('30'),
                                    width: '92%',
                                    marginHorizontal: widthToDp('4'),
                                    marginVertical: widthToDp('2'),
                                    borderRadius: widthToDp('4')
                                }}

                            />
                            <ContentLoader
                                pRows={0}
                                title
                                titleStyles={{
                                    height: widthToDp('30'),
                                    width: '92%',
                                    marginHorizontal: widthToDp('4'),
                                    marginVertical: widthToDp('2'),
                                    borderRadius: widthToDp('4')
                                }}

                            />
                            <ContentLoader
                                pRows={0}
                                title
                                titleStyles={{
                                    height: widthToDp('30'),
                                    width: '92%',
                                    marginHorizontal: widthToDp('4'),
                                    marginVertical: widthToDp('2'),
                                    borderRadius: widthToDp('4')
                                }}

                            />
                        </>
                    ) : (
                            <ScrollView
                                style={{
                                    flex: 1,
                                    backgroundColor: '#fff'
                                }}
                            >
                                {
                                    acceptedLists.length !== 0 ? (
                                        acceptedLists.map((form, index) => {
                                            let date = new Date(form.date)
                                            date.setMinutes(date.getMinutes() - 7 * 60)
                                            return (
                                                <Abstract
                                                    key={index}
                                                    id={form._id}
                                                    date={date}
                                                    type={form.techType}
                                                    onOpenModal={() => {
                                                        setLocation({
                                                            lat: form.location.lat,
                                                            lon: form.location.lon
                                                        })
                                                        setMapModalVisible(true)
                                                    }}
                                                    openDetailModal={() => {
                                                        setDetailModalVisible(true)
                                                    }}
                                                />
                                            )
                                        })
                                    ) : <NotFoundComponent label='ไม่มีรายการที่ยืนยันแล้ว' />
                                }
                            </ScrollView>

                        )
                }
            </SafeAreaView>
            <ShowMapModal
                isOpen={mapModalVisible}
                onClosed={() => {
                    setMapModalVisible(false)
                }}
                location={location}
            />
            <AcceptedDetailModal
                isOpen={detailModalVisible}
                onClosed={() => {
                    setDetailModalVisible(false)
                }}

            />
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptedRequestOrder)