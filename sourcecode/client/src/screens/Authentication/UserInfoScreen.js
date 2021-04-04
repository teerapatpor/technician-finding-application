import React from 'react'
import { StyleSheet } from 'react-native'
import { color, heightToDp , widthToDp } from '../../stylesheet'
import { connect } from 'react-redux'
import { GET_TECHNICIAN_INFO , clear } from '../../store/actions/techAction'
import UserInfoContentLoader from '../../components/UserInfo/UserInfoContentLoader'
import UserInfo from '../../components/UserInfo/UserInfo'
import { useFocusEffect } from '@react-navigation/native'

const mapStateToProps = (state) => ({
    info: state.tech.info,
    uid: state.auth.userInfo.uid,
    role: state.auth.userInfo.role,
    firstname: state.auth.userInfo.firstname,
    lastname: state.auth.userInfo.lastname,
    avatar: state.auth.userInfo.avatar,
})

const UserInfoScreen = (props) => {
    const [isReady , setIsReady] = React.useState(false)

    useFocusEffect(
        React.useCallback( () => {
            if (props.role === 'technician') {
                props.GET_TECHNICIAN_INFO(props.uid).then(() => {
                    setIsReady(true)
                }).catch(err => {
                    setIsReady(true)
                })
            }
            else {
                setIsReady(true)
            }
        },[])
    )

    React.useEffect( () => {
        return () => {
            props.clear()
        }
    },[])

    return (
        <>
        {
            !isReady ? (
                <UserInfoContentLoader />
            ) : <UserInfo />
        }

        </>
    )
}

export default connect(mapStateToProps, { clear, GET_TECHNICIAN_INFO })(UserInfoScreen)


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
        backgroundColor : '#fff'
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
        fontWeight : 'bold'
    }

})