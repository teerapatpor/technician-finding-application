import React from 'react'
import { View, Text, SafeAreaView, RefreshControl, Platform, Image } from 'react-native'
import { color } from '../../stylesheet/colors'
import { content, widthToDp, searchScreen, heightToDp } from '../../stylesheet'
import { useRoute, getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { connect } from 'react-redux'
import { Rating } from 'react-native-ratings'
import { TextInput, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import ChatInput from '../Chat/ChatInput'
import RatingModal from '../Modal/RatingModal'
import { GET_TECHNICIAN_INFO, comment } from '../../store/actions/techAction'

const CommentCard = ({ name, decs, star, avatar }) => {
    return (
        <>
            <View
                style={{
                    backgroundColor: color.BLUE_5,
                    paddingVertical: widthToDp('5'),
                    paddingHorizontal: widthToDp('5'),
                    borderRadius: heightToDp('3'),
                    margin: widthToDp('1')
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: widthToDp('4'),
                    }}
                >
                    <Image
                        source={{ uri: avatar }}
                        style={{
                            width: widthToDp('10'),
                            height: widthToDp('10'),
                            backgroundColor: color.GREY_5,
                            borderRadius: widthToDp('4')

                        }}
                        resizeMethod='resize'
                        resizeMode='cover'
                    />
                    <Text
                        style={{
                            fontSize: widthToDp('5'),
                            fontWeight: 'bold',
                            marginLeft: widthToDp('5'),
                            color: color.BLUE_0
                        }}
                    >{name}</Text>
                </View><View>
                    <Text
                        style={{
                            fontSize: widthToDp('4'),
                            color: color.BLUE_2
                        }}
                    >{decs}</Text>
                </View>
            </View>
        </>
    )
}

const RatingTabPage = (props) => {
    const route = useRoute()
    const [info, setInfo] = React.useState({})
    const [star, setStar] = React.useState(0)
    const [comment, setComment] = React.useState([])
    const [myVote, setMyVote] = React.useState(0)
    const [ratingModalVisible, setRatingModalVisible] = React.useState(false)
    const [refreshing, setRefreshing] = React.useState(false)
    const [myComment, setMyComment] = React.useState('')
    const scrollRef = React.useRef(null)

    React.useEffect(() => {
        const thisInfo = props.aptitude.filter((k) => {
            return route.name == k.key
        })
        setInfo(thisInfo[0])
        setStar(thisInfo[0].data.star)
        setComment(thisInfo[0].data.comment)
        setMyVote(thisInfo[0].data.voted)
    }, [])

    const handleVote = (newStar) => {
        setStar(newStar)
    }

    const handleRefresh = () => {
        props.GET_TECHNICIAN_INFO(props.tid)
            .then(() => {
                const thisInfo = props.aptitude.filter((k) => {
                    return route.name == k.key
                })
                setInfo(thisInfo[0])
                setStar(thisInfo[0].data.star)
                setComment(thisInfo[0].data.comment)
                setMyVote(thisInfo[0].data.voted)
            })
    }

    return (
        <>
            <View
                style={{
                    backgroundColor : '#fff',
                    paddingHorizontal : widthToDp('7')
                }}
            >
                <Text
                    style={{
                        alignSelf: 'flex-start',
                        marginTop: widthToDp('4'),
                        marginBottom: widthToDp('1'),
                        fontSize: widthToDp('3.5'),
                        fontWeight: 'bold',
                        color: '#333'
                    }}
                >
                    {`คะแนนของ ${route.name} ของ ${props.firstname}`}
                </Text>
                <View
                    style={{
                        marginBottom: widthToDp(2),
                        flexDirection: 'row',
                        justifyContent: 'space-between',

                    }}
                >
                    <View
                        style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}
                    >
                        <Rating
                            type='custom'
                            startingValue={star}
                            imageSize={widthToDp('5')}
                            ratingBackgroundColor={color.GREY}
                            ratingColor={color.IOS_YELLOW_LIGHT}
                            tintColor={'#fff'}
                            readonly={true}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: `${color.IOS_GREEN_LIGHT}88`,
                            paddingHorizontal: widthToDp('4'),
                            paddingVertical: widthToDp('2'),
                            borderRadius: widthToDp('5')
                        }}
                        onPress={() => {
                            setRatingModalVisible(true)
                        }}
                    >
                        <Text
                            style={{
                                fontSize: widthToDp('3.5'),
                                color: '#222',
                                fontWeight: 'bold'
                            }}
                        >
                            ให้คะแนน
                                </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView
                style={content.container}
                ref={scrollRef}
                onContentSizeChange={() => {
                    scrollRef.current.scrollToEnd({ animated: true })
                }}
            >
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => handleRefresh()}
                />
                <View
                    style={{
                        flex: 1,
                        borderTopLeftRadius: widthToDp('4'),
                        borderTopRightRadius: widthToDp('4'),
                    }}
                >




                    {
                        comment.length !== 0 ? (
                            comment.map((item, index) => {
                                return (
                                    <CommentCard
                                        key={index}
                                        name={`${item.userInfoID.firstname} ${item.userInfoID.lastname}`}
                                        decs={item.comment}
                                        avatar={item.userInfoID.avatar}
                                    />
                                )
                            })
                        ) : (
                                <Text
                                    style={{
                                        alignSelf: 'center',
                                        fontSize: widthToDp('4'),
                                        color: color.BLUE_0
                                    }}
                                >
                                    ไม่มีคอมเมนต์
                                </Text>
                            )
                    }

                    {/* <CommentCard
                    name='ปริญญา สีตะวัน'
                    decs='คนนี้คือดี งานละเอียด'
                />
                <CommentCard
                    name='นนทวัท อุดพรม'
                    decs='ทำงานลวก ไม่ละเอียด คิดเงินแพง'
                /> */}
                </View>
            </ScrollView>
            <View
                style={{
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: widthToDp('4'),
                    paddingVertical: widthToDp('2')
                }}
            >
                <TextInput
                    placeholder='คอมเมนต์'
                    placeholderTextColor={color.BLUE_3}
                    multiline
                    value={myComment}
                    onChangeText={(val) => {
                        setMyComment(val)
                    }}
                    style={{
                        flex: 1,
                        fontSize: widthToDp('4'),
                        color: color.BLUE_0,
                        paddingHorizontal: widthToDp('4'),
                        paddingVertical: widthToDp('2')
                    }}
                />
                <TouchableOpacity
                    style={{
                        paddingHorizontal: widthToDp('4'),
                        paddingVertical: widthToDp('2'),
                        borderRadius: widthToDp('10'),
                        backgroundColor: color.IOS_INDIGO_LIGHT,
                    }}
                    onPress={() => {
                        setComment([...comment, {
                            userInfoID: {
                                firstname: props.userInfo.firstname,
                                lastname: props.userInfo.lastname,
                                avatar : props.userInfo.avatar
                            },
                            comment: myComment
                        }])
                        props.comment(route.name, myComment, props.tid)
                            .then(() => {
                                setMyComment('')
                            })
                    }}
                >
                    <Text
                        style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: widthToDp('3.5')
                        }}
                    >
                        ส่ง
                        </Text>
                </TouchableOpacity>
            </View>
            <RatingModal
                isOpen={ratingModalVisible}
                onClose={() => {
                    setRatingModalVisible(false)
                }}
                aptitudeType={route.name}
                tid={props.tid}
                handleVote={(star) => handleVote(star)}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
    aptitude: state.tech.info.aptitude,
    firstname: state.tech.info.personalInfo.firstname,
    tid: state.tech.info.personalInfo.userID,
    userInfo: state.auth.userInfo
})

const mapDispatchToProps = {
    GET_TECHNICIAN_INFO,
    comment
}

export default connect(mapStateToProps, mapDispatchToProps)(RatingTabPage)