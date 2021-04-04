import React from 'react'

import { TouchableOpacity, Text, View } from 'react-native'
import { widthToDp } from '../../stylesheet'
import { color } from '../../stylesheet/colors'
import Feather from 'react-native-vector-icons/Feather'
import { getFormInfo } from "../../store/actions/modalAction";
import { connect } from 'react-redux'

const mapStateToProps = () => ({

})

const mapDispatchToProps  = {
    getFormInfo
}

const AcceptedAbstract = (props) => {

    const month_ = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']

    const date = new Date(props.date)

    return (
        <>
            <TouchableOpacity
                style={{
                    marginHorizontal: widthToDp('7'),
                    marginVertical: widthToDp('2'),
                    padding: widthToDp('4'),
                    backgroundColor: `${color.GREY_4}55`,
                    borderRadius: widthToDp('4'),
                    flexDirection : 'row',
                    justifyContent : 'space-between',
                    alignItems : 'center'
                }}
                onPress={() => {
                    props.getFormInfo(props.id)
                        .then(form => {
                            props.openDetailModal()
                        }).catch(err => {
                            console.log(err);
                        })
                }}
            >
                <View
                    style={{
                        flex : 1,
                        padding : widthToDp('1')
                    }}
                >
                    <Text
                        style={{
                            fontWeight : 'bold',
                            color : color.BLUE_1,
                            fontSize : widthToDp('3.5')
                        }}
                    >
                        {
                            `id : ${props.id}`
                        }
                    </Text>
                    <Text
                        style={{
                            color : color.BLUE_0,
                            fontSize : widthToDp('3.5')
                        }}
                    >
                        {
                            `วันที่ ${date.getDate()} ${month_[date.getMonth()]} ${date.getFullYear() + 543}`
                        }
                    </Text>
                    <Text
                        style={{
                            color : color.BLUE_0,
                            fontSize : widthToDp('3.5')
                        }}
                    >
                        {
                            `เวลา ${('0' + date.getHours()).slice(-2)} : ${('0' + date.getMinutes()).slice(-2)} น.`
                        }
                    </Text>
                    <Text
                        style={{
                            color : color.BLUE_0,
                            fontSize : widthToDp('3.5')
                        }}
                    >
                        {
                            props.type
                        }
                    </Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default connect(mapStateToProps , mapDispatchToProps)(AcceptedAbstract)