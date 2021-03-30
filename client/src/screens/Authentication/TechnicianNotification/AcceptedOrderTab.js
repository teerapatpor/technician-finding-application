import React from 'react'

import {
    View,
} from 'react-native'

import { content } from '../../../stylesheet'

import AcceptedNotification from '../../../components/TechnicianNotification/AcceptedNotification'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

const AcceptedOrderTab = () => {


    return (
        <>
            <ScrollView style={content.container}>
                <AcceptedNotification />
            </ScrollView>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptedOrderTab)