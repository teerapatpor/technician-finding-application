import React from 'react'
import { content, widthToDp } from '../../../stylesheet'
import NewOrderNotification from '../../../components/TechnicianNotification/NewOrderNotification'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import Header from '../../../components/Header'
import NotFoundComponent from '../../../components/NotFoundComponent'
import { getNewOrderLists, setNotificationBadge } from '../../../store/actions/notiAction'
import { CLOSE_DETAIL_MODAL } from '../../../store/actions/modalAction'
import { SafeAreaView, RefreshControl, KeyboardAvoidingView, Platform } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import ContentLoader from 'react-native-easy-content-loader'
import OrderDetailModal from '../../../components/Modal/OrderDetailModal'
import { socket } from '../../../store/actions/socketAction'
import AsyncStorage from '@react-native-async-storage/async-storage'

const mapStateToProps = (state) => ({
    techOrder: state.noti.techOrder,
    order_badge: state.noti.order_badge
})

const mapDispatchToProps = {
    getNewOrderLists,
    setNotificationBadge,
    CLOSE_DETAIL_MODAL
}

const NewOrder = (props) => {

    const [isReady, setIsReady] = React.useState(true)
    const [newOrderLists, setNewOrderLists] = React.useState([])

    const [refreshing, setRefreshing] = React.useState(false);

    const handleRefresh = () => {
        setIsReady(true)
        handleNewOrder()
    }

    const handleNewOrder = () => {
        props.getNewOrderLists().then(res => {
            setNewOrderLists(res.sort((a, b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime()
            }))
            setIsReady(false)
        }).catch(err => {
            console.log(err);
        })
    }

    useFocusEffect(
        React.useCallback(() => {
            AsyncStorage.getItem('notification').then(str => {
                const notification = JSON.parse(str)
                let readed = notification.map((item) => {
                    if (item.page === 'techNotification') {
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
            socket.on('recieve_new_post_req', () => {
                handleNewOrder()
            })
            socket.on('confirm_accepted_req', () => {
                handleNewOrder()
            })
            setIsReady(true)
            handleNewOrder()

            return () => {
                setNewOrderLists([])
                props.CLOSE_DETAIL_MODAL()
                AsyncStorage.getItem('notification').then(str => {
                    const notification = JSON.parse(str)
                    let readed = notification.map((item) => {
                        if (item.page === 'techNotification') {
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
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
            >
                <SafeAreaView style={content.topsafearray} />
                <SafeAreaView style={content.safearray}>
                    <Header back page='ออเดอร์ใหม่' />
                    {
                        isReady ? (
                            <>
                                <ContentLoader
                                    pRows={0}
                                    title
                                    titleStyles={{
                                        height: widthToDp('30'),
                                        width: '92%',
                                        margin: widthToDp('4'),
                                        borderRadius: widthToDp('4')
                                    }}

                                />
                                <ContentLoader
                                    pRows={0}
                                    title
                                    titleStyles={{
                                        height: widthToDp('30'),
                                        width: '92%',
                                        margin: widthToDp('4'),
                                        borderRadius: widthToDp('4')
                                    }}

                                />
                                <ContentLoader
                                    pRows={0}
                                    title
                                    titleStyles={{
                                        height: widthToDp('30'),
                                        width: '92%',
                                        margin: widthToDp('4'),
                                        borderRadius: widthToDp('4')
                                    }}

                                />
                            </>
                        ) : (
                                <>
                                    <ScrollView style={content.container}>
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={() => handleRefresh()}
                                        />
                                        {
                                            newOrderLists.length !== 0 ? (
                                                <NewOrderNotification lists={newOrderLists} handleNewOrder={() => handleNewOrder()} />
                                            )
                                                : <NotFoundComponent label='ยังไม่มีงานใหม่' />
                                        }
                                    </ScrollView>
                                </>
                            )
                    }
                </SafeAreaView>
            </KeyboardAvoidingView>
            <OrderDetailModal />
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder)