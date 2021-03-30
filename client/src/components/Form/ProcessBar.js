import React, { } from 'react'

import {
    View, StyleSheet, Text, TouchableOpacity
} from 'react-native'
import { color } from '../../stylesheet'

import Feather from 'react-native-vector-icons/Feather'

const Start = (props) => {
    return (
        <>
            <View style={{ flex: 1 }}>
                <View style={processBarStyle.subContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            props.setProcess(1)
                        }}
                        style={[
                            processBarStyle.circle,
                            processBarStyle.hl,
                            props.process == 1 ? processBarStyle.processing : processBarStyle.processed
                        ]}>
                        {/* <Text
                            style={
                                props.process == 1 ? processBarStyle.processing : processBarStyle.processed

                            }
                        >
                            1
                        </Text> */}
                        <Feather name={props.process === 1 ? 'clock' : 'check'} style={processBarStyle.icon} />
                    </TouchableOpacity>
                    <View
                        style={[
                            processBarStyle.line,
                            props.process == 1 ? processBarStyle.non :
                                processBarStyle.processed
                        ]} />
                </View>
                <View style={{ alignItems: 'flex-start' }}>
                    <Text style={processBarStyle.desc}>
                        เลือกวันที่
                    </Text>
                </View>
            </View>

        </>
    )

}

const Regular = (props) => {
    return (
        <>
            <View style={{ flex: 1 }}>
                <View style={processBarStyle.subContainer}>
                    <View
                        style={[
                            processBarStyle.line,
                            props.process == 1 ? processBarStyle.non :
                                processBarStyle.processed
                        ]} />
                    <TouchableOpacity
                        onPress={() => {
                            props.setProcess(2)
                        }}
                        style={[
                            processBarStyle.circle,
                            props.process == 1 ?
                                [processBarStyle.non, processBarStyle.hs]
                                :
                                props.process == 2 ? [
                                    processBarStyle.processing,
                                    processBarStyle.hl
                                ] : [
                                        processBarStyle.processed,
                                        processBarStyle.hl
                                    ]
                        ]}>
                        {/* <Text
                            style={
                                props.process == 1 ? processBarStyle.non :
                                    props.process == 2 ? processBarStyle.processing :
                                        processBarStyle.processed
                            }
                        >
                            2
                        </Text> */}
                        {
                            props.process === 2 ? <Feather name="clock" style={processBarStyle.icon} />
                                : props.process === 3 ? <Feather name="check" style={processBarStyle.icon} />
                                    : null
                        }

                    </TouchableOpacity>
                    <View
                        style={[
                            processBarStyle.line,
                            props.process == 3 ? processBarStyle.processed : processBarStyle.non
                        ]} />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={processBarStyle.desc}>
                        ระบุรายละเอียด
                    </Text>
                </View>
            </View>
        </>
    )
}

const End = (props) => {
    return (
        <>
            <View style={{ flex: 1 }}>
                <View style={processBarStyle.subContainer}>
                    <View
                        style={[
                            processBarStyle.line,
                            props.process == 3 ? processBarStyle.processed : processBarStyle.non
                        ]} />
                    <TouchableOpacity
                        onPress={() => {
                            props.setProcess(3)
                        }}
                        style={[
                            processBarStyle.circle,
                            props.process == 3 ? [
                                processBarStyle.processing,
                                processBarStyle.hl

                            ] : [
                                    processBarStyle.non,
                                    processBarStyle.hs
                                ]
                        ]}>
                        {
                            props.process === 3 ? <Feather style={processBarStyle.icon} name="clock" /> : null
                        }
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={processBarStyle.desc}>
                        ระบุสถานที่
                    </Text>
                </View>
            </View>
        </>
    )
}

const ProcessBar = (props) => {
    return (
        <>
            <View style={processBarStyle.container}>
                <Start process={props.process} setProcess={props.setProcess} />
                <Regular process={props.process} setProcess={props.setProcess} />
                <End process={props.process} setProcess={props.setProcess} />
            </View>
        </>
    )
}

export default ProcessBar

export const processBarStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // flex: 1,
        height:60,
        paddingHorizontal: 25,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginVertical:10,
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    line: {
        height: 5,
        flex: 1,
    },
    circle: {
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    hl: {
        height: 30,
        borderRadius: 15,
    },
    hs: {
        height: 15,
        borderRadius: 10,
    },
    processed: {
        backgroundColor: color.GREEN_4,
        color: color.BLUE_0
    },
    non: {
        backgroundColor: color.BLUE_5,
        color: color.BLUE_0
    },
    processing: {
        backgroundColor: color.YELLOW,
        color: '#000'
    },
    desc: {
        color: color.BLUE_5,
        fontSize:14
    },
    icon: {
        color: color.BLUE_0,
        fontSize: 16
    }
})