import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'

import { content, heightToDp, global, widthToDp, color } from '../../stylesheet'

import ContentLoader from 'react-native-easy-content-loader'


const UserInfoContentLoader = (props) => {
    return (
        <>
            <SafeAreaView style={content.topsafearray} />
            <SafeAreaView style={content.safearray} >
                <View style={[global.header]}>
                    <ContentLoader
                        avatar
                        avatarStyles={infoStyles.profileImage}
                        pRows={0}
                        title={false}
                        containerStyles={{
                            width: heightToDp('5')
                        }}
                    />
                </View>
                <View style={[infoStyles.headerContainer]}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ContentLoader
                            pRows={0}
                            title
                            titleStyles={{
                                width : widthToDp('50')
                            }}
                            containerStyles={{
                                width : widthToDp('50')
                            }}
                        />
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 8}}>
                    <View>
                        <View
                            style={{ width: widthToDp('70'), borderRadius: widthToDp('1'), justifyContent: 'center', alignItems: 'center', height: widthToDp('7') }}
                        >
                            <ContentLoader
                            pRows={0}
                            title
                            titleStyles={{
                                width : widthToDp('70')
                            }}
                            containerStyles={{
                                width : widthToDp('70')
                            }}
                        />
                        </View>
                    </View>
                </View>
                {/* <ScrollView >
                    <View style={[content.container]}>
                        {
                            props.role === 'user' ? (
                                <>

                                </>
                            ) :
                                props.role === 'technician' ? (
                                    <>
                                        <TechnicianInfoComponent
                                            info={props.info}
                                        />
                                    </>
                                ) : null
                        }
                    </View>
                </ScrollView> */}
            </SafeAreaView>
        </>
    )
}

export default UserInfoContentLoader

export const infoStyles = StyleSheet.create({
    coverImage: {
        backgroundColor: color.BLUE_4,
        height: heightToDp('20')
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: widthToDp('1'),
        backgroundColor: '#fff'
    },
    profileImage: {
        width: heightToDp('5'),
        height: heightToDp('5'),
        borderRadius: heightToDp('3'),
        backgroundColor: color.GREEN_4,
    },
    headerButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: widthToDp('1'),
        flexDirection: 'row',
        width: widthToDp('20'),
        height: widthToDp('6')
    },
    contactColor: {
        backgroundColor: color.BLUE_5,
    },
    callColor: {
        backgroundColor: color.GREEN_4
    },
    contactText: {
        color: color.BLUE_0,
        fontWeight: 'bold',
        fontSize: widthToDp('3')
    },
    callText: {
        color: color.GREEN_0,
        fontWeight: 'bold',
        fontSize: widthToDp('3')
    },
    onside: {
        height: widthToDp('10'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    onsideIcon: {
        fontSize: widthToDp('4'),
        marginHorizontal: widthToDp('1'),
    },
    infoContainer: {
        padding: widthToDp('2'),
    },
    xColor: {
        color: color.RED_2
    },
    checkColor: {
        color: color.GREEN_2
    },
    onsideText: {
        fontSize: widthToDp('4'),
    },
    infoRow: {
        flexDirection: 'row',
        marginVertical: widthToDp('1'),
        paddingHorizontal: widthToDp('3'),
        backgroundColor: '#fff',
        paddingVertical: widthToDp('2'),
    },
    bottomBorder: {
        borderBottomColor: color.BLUE_3,
        borderBottomWidth: 1
    },
    infoTopic: {
        flex: 1,
    },
    topicText: {
        fontSize: widthToDp('4'),
        color: color.BLUE_1,
        fontWeight: 'bold'
    },
    infoDetail: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    aptitude: {
        backgroundColor: color.GREY_4,
        justifyContent: 'center',
        paddingHorizontal: widthToDp('4'),
        paddingVertical: widthToDp('0.5'),
        marginHorizontal: widthToDp('0.5'),
        marginVertical: widthToDp('0.5'),
        borderRadius: widthToDp('5'),
    },
    aptitudeText: {
        fontSize: widthToDp('4'),
        color: color.BLUE_1
    },
    imageContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    image: {
        width: widthToDp('23'),
        height: widthToDp('23'),
        marginHorizontal: widthToDp('0.5'),
        marginVertical: widthToDp('0.5'),
        backgroundColor: color.YELLOW_4
    },
    ratingContainer: {
        backgroundColor: color.BLUE_5,
        paddingVertical: widthToDp('2'),
        borderRadius: widthToDp('2'),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnText: {
        color: color.GREY_5,
        fontSize: widthToDp('4'),
        fontWeight: 'bold'
    }

})