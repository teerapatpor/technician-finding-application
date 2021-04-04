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

import { content, widthToDp, color } from '../../stylesheet'

import Abstract from '../../components/UserNotification/HistoryAbstract'
import { connect } from 'react-redux'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Header from '../../components/UserInfo/Header'
import NotFoundComponent from '../../components/NotFoundComponent'
import ContentLoader from 'react-native-easy-content-loader'
import { getAcceptedList } from '../../store/actions/notiAction'
import {} from '../../store/actions/socketAction'
import { useFocusEffect } from '@react-navigation/native'
import ShowMapModal from '../../components/Modal/ShowMapModal'
import HistoryDetailModal from '../../components/Modal/HistoryDetailModal'

const TopTab = createMaterialTopTabNavigator()

const mapStateToProps = (state) => ({
    role: state.auth.userInfo.role,
    userConfirmed: state.noti.userConfirmed
})

const mapDispatchToProps = {
    getAcceptedList
}


const AcceptedRequestOrder = ({ userConfirmed , ...props}) => {

    const [isReady, setIsReady] = React.useState(true)
    const [acceptedLists , setAcceptedLists] = React.useState([])
    const [modalVisible , setModalVisible] = React.useState(false)
    const [location , setLocation ] = React.useState({
        lat : 0,
        lon : 0
    })

    useFocusEffect(
        React.useCallback(() => {
            // socket.on('recieve_new_post_req', () => {
            //     handleNewOrder()
            // })
            setIsReady(true)
            props.getAcceptedList().then( (res) => {
                setAcceptedLists(res.sort((a,b) => {
                    return new Date(b.date).getTime() - new Date(a.date).getTime()
                }).filter( (val) => {
                    return new Date(val.date).getTime() < (new Date().getTime() - 86400)
                })
                )
                setIsReady(false)
            }).catch( err => {
                console.log(err)
            })
            // props.getAcceptedList().then(res => {
            //     setNewOrderLists(res)
            //     setIsReady(false)
            // }).catch(err => {
            //     console.log(err);
            // })

            return () => {
                setAcceptedLists([])
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
                <Header page='ประวัติ' />
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
                            <ScrollView
                                style={{
                                    flex: 1,
                                    backgroundColor: '#fff'
                                }}
                            >
                                {
                                    acceptedLists.length !== 0 ? (
                                        acceptedLists.map((form) => {
                                            let date = new Date(form.date)
                                            date.setDate(date.getMinutes() - 7 * 60)
                                            return (
                                                <Abstract 
                                                    id={form._id}
                                                    date={form.date}
                                                    type={form.techType}
                                                    openDetailModal={ () => setModalVisible(true)}
                                                />
                                            )
                                        })
                                    ) : <NotFoundComponent label='ยังไม่มีประวัติการซ่อม' />
                                }
                            </ScrollView>

                        )
                }
            </SafeAreaView>
            <HistoryDetailModal 
                isOpen={modalVisible}
                onClosed = { () => {
                    setModalVisible(false)
                }}
            />
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptedRequestOrder)