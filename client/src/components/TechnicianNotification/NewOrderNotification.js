import React from 'react'

import { Text, View, TouchableOpacity, Button } from 'react-native'

import { notification, color, widthToDp, newOrder } from '../../stylesheet'

import Abstract from './Abstract'
import { connect } from 'react-redux'
import NotFoundComponent from '../NotFoundComponent'

const mapStateToProps = (state) => ({
    // techOrder: state.noti.techOrder
})

const mapDispatchToProps = {

}

const NewOrderNotification = (props) => {
    const month = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฏาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']

    return (
        <>

            {
                props.lists.length !== 0 ? (
                    props.lists.map((item, index) => {
                        const date_ = new Date(item.date)
                        return <Abstract key={index}
                            order={item}
                            date={`${date_.getDate()} ${month[date_.getMonth()]} ${date_.getFullYear() + 543}`}
                            last={props.lists.length === index + 1 ? true : false}
                            handleNewOrder={() => props.handleNewOrder()}
                        />
                    })
                ) : null
            }
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderNotification)