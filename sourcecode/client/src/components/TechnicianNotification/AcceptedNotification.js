import React from 'react'

import { Text, View, TouchableOpacity, Button } from 'react-native'

import { notification, color, widthToDp, acceptedOrder } from '../../stylesheet'

import Abstract from './AcceptedAbstract'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    techAcceptedOrder : state.noti.techAcceptedOrder
})

const mapDispatchToProps = {

}

const AcceptedNotification = (props) => {
    const month = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฏาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']


    return (
        <>
            {props.techAcceptedOrder.length !== 0 ? (
                <View style={[notification.container, acceptedOrder.bg]}>
                    <View style={notification.headerContainer}>
                        <Text>
                            <Text style={[acceptedOrder.headerText, notification.headerText]}>
                                ออเดอร์
                        </Text>
                        </Text>
                    </View>
                    <View style={notification.content}>
                        {
                            props.techAcceptedOrder.length !== 0 ? (
                                props.techAcceptedOrder.map((item, index) => {
                                    const date_ = new Date(item.date)
                                    return <Abstract key={index}
                                        order={item}
                                        distance="2.21"
                                        date={`${date_.getDate()} ${month[date_.getMonth()]} ${date_.getFullYear() + 543}`}
                                        last={props.techAcceptedOrder.length === index + 1 ? true : false}
                                    />
                                })
                            ) : (
                                    <View style={{ padding: widthToDp('1.5') , paddingHorizontal:widthToDp('4') }}>
                                        <Text style={{ fontSize: widthToDp('3.5'), color: color.BLUE_5 }}>
                                            ไม่มีออเดอร์ใหม่
                                    </Text>
                                    </View>
                                )
                        }
                    </View>
                </View>
                ) : null
            }
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptedNotification)