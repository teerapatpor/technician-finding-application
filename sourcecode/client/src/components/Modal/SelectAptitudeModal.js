import React from 'react'
import { Button, SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import Modal from 'react-native-modalbox'
import { widthToDp } from '../../stylesheet'
import Radio from '../Radio'
import { color } from '../../stylesheet/colors'


const SelectAptitudeModal = (props) => {

    return (
        <>
            <Modal
                isOpen={props.isOpen}
                backButtonClose={true}
                onClosed={() => props.onClosed()}
                swipeToClose={false}
                style={{
                    backgroundColor: 'transparent'
                }}
            >
                <SafeAreaView
                    style={techRegModalStyles.container}
                >
                    <View
                        style={{
                            backgroundColor: '#fff',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: widthToDp('80'),
                            borderRadius: widthToDp('4'),
                        }}
                    >
                        <View style={techRegModalStyles.header}>
                            <Text
                                style={techRegModalStyles.headerText}
                            >
                                เลือกความถนัด
                            </Text>
                            <Text
                                style={[techRegModalStyles.headerText , {fontWeight : 'normal'}]}
                            >
                                (เลือกได้มากกว่าหนึ่ง)
                            </Text>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: widthToDp('5'),
                                paddingVertical: widthToDp('2'),
                                width: '100%'
                            }}
                        >
                            {
                                props.aptitude.type.map((item, index) => (
                                    <View
                                        style={techRegModalStyles.rowContainer}
                                        key={item}
                                    >
                                        <Radio
                                            status={props.aptitude.status[index]}
                                            setStatus={() => {
                                                let status = [...props.aptitude.status]
                                                status[index] = !status[index]
                                                props.setAbtitude({ ...props.aptitude, status: status })
                                            }}
                                        />
                                        <Text
                                            style={techRegModalStyles.text}
                                        >
                                            {item}
                                        </Text>
                                    </View>
                                )
                                )
                            }
                        </View>
                        <View
                            style={techRegModalStyles.closeContainer}
                        >
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    props.onClosed()
                                }}
                            >
                                <Text
                                    style={{
                                        color: color.IOS_BLUE,
                                        fontWeight: 'bold',
                                        fontSize: widthToDp('4')
                                    }}
                                >
                                    ยืนยัน
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>

            </Modal>
        </>
    )
}

export default SelectAptitudeModal

export const techRegModalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: widthToDp('1.5'),
        width: '100%',
    },
    header: {
        marginTop: widthToDp('3'),
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: color.GREY_5,
        paddingBottom: widthToDp('3')
    },
    headerText: {
        fontSize: widthToDp('4'),
        color: "#222",
        fontWeight: 'bold'
    },
    text: {
        fontSize: widthToDp('4')
    },
    closeContainer : {
        flexDirection: 'row',
        height: widthToDp('12'),
        borderBottomRightRadius: widthToDp('4'),
        borderBottomLeftRadius: widthToDp('4'),
        borderTopColor: color.GREY_5,
        borderTopWidth: 1
    },
})