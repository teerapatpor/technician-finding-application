import React, { } from 'react'

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import { color, widthToDp } from '../../stylesheet'
import { connect } from 'react-redux'

import {clear } from '../../store/actions/regAction'

const mapStateToProps = (state) => ({
    
})

const Footer = (props) => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate('login')
                    }}>
                        <Text style={styles.text}>ฉันมีบัญชีผู้ใช้แล้ว</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default connect(mapStateToProps , {})(Footer)

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: color.GREY_4,
        backgroundColor : '#fff',
        borderTopWidth: widthToDp('0.1'),
        paddingBottom:5
    },
    row: {
        flexDirection: 'row'
    },
    text: {
        color: color.IOS_BLUE,
        fontWeight : 'bold'
    }
})