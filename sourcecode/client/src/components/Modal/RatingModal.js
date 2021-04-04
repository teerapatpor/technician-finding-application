import React from 'react'
import { View, Button, Text, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modalbox'
import { widthToDp, color } from '../../stylesheet'
import { techRegModalStyles } from './SelectAptitudeModal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { voting , GET_TECHNICIAN_INFO } from '../../store/actions/techAction'

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    voting,
    GET_TECHNICIAN_INFO
}

const RatingModal = ({ isOpen, ...props }) => {
    const [star, setStar] = React.useState(0)
    return (
        <>
            <Modal
                isOpen={isOpen}
                backButtonClose={true}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'transparent'
                }}
                onClosed={() => props.onClose()}
                swipeToClose={false}
            >

                <View
                    style={{
                        width: widthToDp('70'),
                        height: widthToDp('35'),
                        backgroundColor: '#fff',
                        borderRadius: widthToDp('4'),
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: '#000',
                                fontWeight: 'bold',
                                fontSize: widthToDp('4')
                            }}
                        >
                            ให้คะแนน
                        </Text>
                        <View
                            style={{
                                marginTop: widthToDp('2'),
                                flexDirection: "row"
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setStar(1)
                                }}
                                style={{
                                    marginHorizontal : widthToDp('0.25')
                                }}
                            >
                                <Ionicons
                                    size={widthToDp('5')}
                                    name={star >= 1 ? 'star' : 'star-outline'}
                                    color={color.IOS_YELLOW_LIGHT}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setStar(2)
                                }}
                                style={{
                                    marginHorizontal : widthToDp('0.25')
                                }}
                            >
                                <Ionicons
                                    size={widthToDp('5')}
                                    name={star >= 2 ? 'star' : 'star-outline'}
                                    color={color.IOS_YELLOW_LIGHT}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setStar(3)
                                }}
                                style={{
                                    marginHorizontal : widthToDp('0.25')
                                }}
                            >
                                <Ionicons
                                    size={widthToDp('5')}
                                    name={star >= 3 ? 'star' : 'star-outline'}
                                    color={color.IOS_YELLOW_LIGHT}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setStar(4)
                                }}
                                style={{
                                    marginHorizontal : widthToDp('0.25')
                                }}
                            >
                                <Ionicons
                                    size={widthToDp('5')}
                                    name={star >= 4 ? 'star' : 'star-outline'}
                                    color={color.IOS_YELLOW_LIGHT}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setStar(5)
                                }}
                                style={{
                                    marginHorizontal : widthToDp('0.25')
                                }}
                            >
                                <Ionicons
                                    size={widthToDp('5')}
                                    name={star >= 5 ? 'star' : 'star-outline'}
                                    color={color.IOS_YELLOW_LIGHT}
                                />
                            </TouchableOpacity>


                        </View>
                        {/* <Text
                            style={{
                                color: '#000',
                                fontWeight: 'bold',
                                fontSize: widthToDp('4')
                            }}
                        >
                            {props.name}
                        </Text> */}
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            height: widthToDp('12'),
                            borderBottomRightRadius: widthToDp('4'),
                            borderBottomLeftRadius: widthToDp('4'),
                            borderTopColor: color.GREY_5,
                            borderTopWidth: 1
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                borderRightColor: color.GREY_5,
                                borderRightWidth: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={() => {
                                props.onClose()
                            }}
                        >
                            <Text
                                style={{
                                    color: color.IOS_RED_LIGHT,
                                    fontWeight: 'bold',
                                    fontSize: widthToDp('4')
                                }}
                            >
                                ยกเลิก
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={() => {
                                props.voting( props.aptitudeType , star , props.tid).then( (res) => {
                                    props.onClose()
                                    props.handleVote(res.star)
                                }).catch( () => {
                                    props.onClose()
                                })
                            }}
                        >
                            <Text
                                style={{
                                    color: color.IOS_GREEN_LIGHT,
                                    fontWeight: 'bold',
                                    fontSize: widthToDp('4')
                                }}
                            >
                                ให้คะแนน
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default connect(mapStateToProps , mapDispatchToProps)(RatingModal)