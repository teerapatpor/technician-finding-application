import React from 'react'

import { SafeAreaView, View, Text, TouchableOpacity, KeyboardAvoidingView, Keyboard, Platform } from 'react-native'
import { content, widthToDp, color, global, posting, datePicker, heightToDp, card } from '../../stylesheet'

import Header from '../../components/Setting/Header'
import { styles } from '../../components/Setting/styles'

import Feather from 'react-native-vector-icons/Feather'

import Modal from 'react-native-modalbox'
import { Picker } from '@react-native-picker/picker'
import { TextInput, ScrollView } from 'react-native-gesture-handler'
import { aptitudeType } from '../../misc/aptitude_type'
import { connect } from 'react-redux'
import { SET_LOCATION } from '../../store/actions/formAction'

import SelectWorkDayModal from '../../components/Modal/SelectWorkDayModal'
import SelectAptitudeModal, { techRegModalStyles } from '../../components/Modal/SelectAptitudeModal'
import MyButton from '../../components/MyButton'
import LocationPickerModal from '../../components/Modal/LocationPickerModal'
import { technicianRegister, GET_TECHNICIAN_INFO } from '../../store/actions/techAction'
import { updateToken, changeRole, LOADING, LOADED, checkToken } from '../../store/actions/authAction'
import Geolocation from '@react-native-community/geolocation'

export const CheckBox = ({ title, status, onPress }) => {
    return (
        <>
            <TouchableOpacity
                style={styles.row}
                onPress={() => {
                    onPress()
                }}
            >
                <TouchableOpacity style={[styles.selectBtn, status ? styles.selected : styles.unselect]}
                    onPress={() => {
                        onPress()
                    }}
                >
                    {
                        status ? <Feather name='check' style={styles.checkIcon} /> : null
                    }
                </TouchableOpacity>
                <Text style={[styles.selectedText]}>{title}</Text>
            </TouchableOpacity>
        </>
    )
}

const SelectedView = ({ title }) => {
    return (
        <>
            <View
                style={{
                    paddingHorizontal: widthToDp('4'),
                    paddingVertical: widthToDp('1'),
                    backgroundColor: `${color.IOS_BLUE}55`,
                    borderRadius: widthToDp('4'),
                    marginRight: widthToDp('2'),
                    marginBottom: widthToDp('2')
                }}
            >
                <Text
                    style={{
                        fontSize: widthToDp(3.5),
                        color: color.IOS_INDIGO_LIGHT
                    }}
                >
                    {title}
                </Text>
            </View>
        </>
    )
}

const mapStateToProps = (state) => ({
    location: state.form.location,
})

const mapDispatchToProps = {
    SET_LOCATION,
    technicianRegister,
    updateToken,
    GET_TECHNICIAN_INFO,
    changeRole,
    LOADING,
    LOADED,
    checkToken,
}

const TechnicianRegisterScreen = (props) => {

    const scrollRef = React.useRef()
    const [bioLayout, setBioLayout] = React.useState(0)
    const [addressLayout, setaddressLayout] = React.useState(0)
    const [onsite, setOnsite] = React.useState(null)
    const [frontStore, setFrontStore] = React.useState(null)
    const [workDayVisible, setWorkDayVisible] = React.useState(false)
    const [aptitudeVisible, setApititudeVisible] = React.useState(false)
    const [locationVisible, setLocationVisible] = React.useState(false)
    const [bio, setBio] = React.useState('')
    const [day, setDay] = React.useState({
        title: ['วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์', 'วันอาทิตย์'],
        status: [false, false, false, false, false, false, false],
        no: [1, 2, 3, 4, 5, 6, 0]
    })
    const [starTimeVisible, setStartTimeVisible] = React.useState(false)
    const [endTimeVisible, setEndTimeVisible] = React.useState(false)
    const [time, setTime] = React.useState({
        start: {
            hour: 0,
            minute: 0
        },
        end: {
            hour: 0,
            minute: 0
        }
    })

    const [aptitude, setAbtitude] = React.useState({
        type: aptitudeType,
        status: [...aptitudeType].map((item) => false)
    })

    const [detail, setDetail] = React.useState('')

    React.useEffect(() => {
        Geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            props.SET_LOCATION(latitude, longitude)
        },
            (err) => {
                console.log(err);
            })
    }, [])

    const handleSubmit = async () => {
        return new Promise((resovle, reject) => {
            const selectedAptitude = aptitude.type.filter((val, index) => {
                return aptitude.status[index]
            })
            const selectedDay = day.no.filter((val, index) => {
                return day.status[index]
            })
            const info = {
                workDay: selectedDay,
                workTime: {
                    start: {
                        hour: time.start.hour,
                        minutes: time.start.minute
                    },
                    end: {
                        hour: time.end.hour,
                        minutes: time.end.minute
                    }
                },
                aptitude: selectedAptitude,
                address: {
                    lat: props.location.latitude,
                    lon: props.location.longitude
                },
                description: detail,
                bio: bio,
                onSite: onsite,
                frontStore: frontStore

            }
            resovle(info)
        }).catch(err => {
            reject(err)
        })
    }

    return (
        <>
            <SafeAreaView style={content.topsafearray} />
            <View style={[content.safearray, { backgroundColor: color.GREY_5 }]}>
                <Header navigation={props.navigation} title='สมัครเป็นช่าง' />

                <ScrollView
                    style={content.container}
                    ref={scrollRef}
                >

                    {/* work day */}
                    <View style={card.card}>
                        <View style={card.cardHeader}>
                            <Text style={card.headerText}>
                                วันทำงาน
                            </Text>
                        </View>
                        <View style={[card.cardContainer, { flexDirection: 'row', flexWrap: 'wrap' }]}>
                            {
                                day.title.map((item, index) => (
                                    day.status[index] ? <SelectedView key={item} title={item} /> : null
                                ))
                            }
                            <TouchableOpacity
                                style={{
                                    width: '100%',
                                    backgroundColor: color.BLUE_5,
                                    padding: widthToDp('2'),
                                    paddingLeft: widthToDp('5'),
                                    borderRadius: widthToDp('2'),
                                    marginBottom: widthToDp('2'),
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                                onPress={() => setWorkDayVisible(true)}
                            >
                                <Text
                                    style={styles.selectedText}
                                >
                                    เลือกวันทำงาน
                                </Text>
                                <Feather
                                    style={styles.selectedText}
                                    name='chevron-right'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* workTime */}
                    <View style={card.card}>
                        <View style={card.cardHeader}>
                            <Text style={card.headerText}>เวลาทำงาน</Text>
                        </View>
                        <View style={card.cardContainer}>
                            <View style={[posting.halfContainer]}>
                                <View style={{ flex: 1 }}>
                                    <Text style={posting.halfHeader}>เวลาเริ่มงาน</Text>
                                    <TouchableOpacity
                                        style={[posting.halfInput, { marginRight: widthToDp('1'), backgroundColor: color.BLUE_5 }]}
                                        onPress={() => {
                                            setStartTimeVisible(true)
                                        }}
                                    >
                                        <Text style={posting.inputText}>{`${("0" + time.start.hour).slice(-2)} : ${("0" + time.start.minute).slice(-2)} น`}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={posting.halfHeader}>เวลาเสร็จงาน</Text>
                                    <TouchableOpacity
                                        style={[posting.halfInput, { marginLeft: widthToDp('1'), backgroundColor: color.BLUE_5 }]}
                                        onPress={() => setEndTimeVisible(true)}
                                    >
                                        <Text style={posting.inputText}>{`${("0" + time.end.hour).slice(-2)} : ${("0" + time.end.minute).slice(-2)} น`}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* frontStore */}
                    <View style={card.card}>
                        <View style={card.cardHeader}>
                            <Text style={card.headerText}>หน้าร้าน</Text>
                        </View>
                        <View style={[card.cardContainer, { flexDirection: 'row', justifyContent: 'space-around' }]}>
                            <TouchableOpacity
                                style={[{
                                    width: '30%',
                                    alignItems: 'center',
                                    paddingVertical: widthToDp('1'),
                                    borderRadius: widthToDp('2'),
                                }, frontStore ? {
                                    backgroundColor: `${color.IOS_GREEN_LIGHT}66`,
                                } : {
                                        backgroundColor: color.BLUE_5,
                                    }]}
                                onPress={() => {
                                    setFrontStore(true)
                                }}
                            >
                                <Text
                                    style={[
                                        styles.selectedText
                                        , frontStore === null ? {

                                        } : frontStore ? {
                                            fontWeight: 'bold',
                                            color: color.GREEN_1
                                        } : null
                                    ]}
                                >
                                    มี
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[{
                                    width: '30%',
                                    alignItems: 'center',
                                    paddingVertical: widthToDp('1'),
                                    borderRadius: widthToDp('2'),
                                    backgroundColor: color.BLUE_5,
                                }, frontStore === null ? {
                                    backgroundColor: color.BLUE_5,
                                } : !frontStore ? {
                                    backgroundColor: `${color.IOS_RED_LIGHT}66`,
                                } : null
                                ]}
                                onPress={() => {
                                    setFrontStore(false)
                                }}
                            >
                                <Text
                                    style={[
                                        styles.selectedText
                                        ,
                                        frontStore === null ? null : !frontStore ? {
                                            fontWeight: 'bold',
                                            color: color.RED_0
                                        } : null
                                    ]}
                                >
                                    ไม่มี
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    {/* onSite */}
                    <View style={card.card}>
                        <View style={card.cardHeader}>
                            <Text style={card.headerText}>บริการนอกสถานที่</Text>
                        </View>
                        <View style={[card.cardContainer, { flexDirection: 'row', justifyContent: 'space-around' }]}>
                            <TouchableOpacity
                                style={[{
                                    width: '30%',
                                    alignItems: 'center',
                                    paddingVertical: widthToDp('1'),
                                    borderRadius: widthToDp('2'),
                                    backgroundColor: color.BLUE_5,
                                }, onsite ? {
                                    backgroundColor: `${color.IOS_GREEN_LIGHT}66`,
                                } : onsite === null ? {
                                    backgroundColor: color.BLUE_5,
                                } : null
                                ]
                                }
                                onPress={() => {
                                    setOnsite(true)
                                }}
                            >
                                <Text
                                    style={[
                                        styles.selectedText
                                        , onsite === null ? {

                                        } : onsite ? {
                                            fontWeight: 'bold',
                                            color: color.GREEN_1
                                        } : null
                                    ]}
                                >
                                    มี
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[{
                                    width: '30%',
                                    alignItems: 'center',
                                    paddingVertical: widthToDp('1'),
                                    borderRadius: widthToDp('2'),
                                    backgroundColor: color.BLUE_5,
                                }, onsite === null ? {
                                    backgroundColor: color.BLUE_5,
                                } : !onsite ? {
                                    backgroundColor: `${color.IOS_RED_LIGHT}66`,
                                } : null
                                ]}
                                onPress={() => {
                                    setOnsite(false)
                                }}
                            >
                                <Text
                                    style={[
                                        styles.selectedText
                                        , onsite === null ? {

                                        } : !onsite ? {
                                            fontWeight: 'bold',
                                            color: color.RED_0
                                        } : null
                                    ]}
                                >
                                    ไม่มี
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    {/* aptitude */}
                    <View style={card.card}>
                        <View style={card.cardHeader}>
                            <Text style={card.headerText}>ความถนัด</Text>
                        </View>
                        <View style={[card.cardContainer, { flexDirection: 'row', flexWrap: 'wrap' }]}>
                            {/* {
                                aptitude.type.map((item, index) => {
                                    return <CheckBox
                                        title={item}
                                        onPress={() => {
                                            let status = [...aptitude.status]
                                            status[index] = !status[index]
                                            setAbtitude({ ...aptitude, status: status })

                                        }}
                                        status={aptitude.status[index]}
                                        key={item}

                                    />
                                })
                            } */}
                            {
                                aptitude.type.map((item, index) => (
                                    aptitude.status[index] ? <SelectedView key={item} title={item} /> : null
                                ))
                            }
                            <TouchableOpacity
                                style={{
                                    width: '100%',
                                    backgroundColor: color.BLUE_5,
                                    padding: widthToDp('2'),
                                    paddingLeft: widthToDp('5'),
                                    borderRadius: widthToDp('2'),
                                    marginBottom: widthToDp('2'),
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    setApititudeVisible(true)
                                }}
                            >
                                <Text
                                    style={styles.selectedText}
                                >
                                    เลือกความถนัด หรือ สายงาน
                                </Text>
                                <Feather
                                    style={styles.selectedText}
                                    name='chevron-right'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* bio */}
                    <View style={card.card}
                        onLayout={(e) => {
                            setBioLayout(e.nativeEvent.layout.y)
                        }}
                    >
                        <View style={card.cardHeader} >
                            <Text style={card.headerText}>คำอธิบายเพิ่มเติม</Text>
                        </View>
                        <View style={card.cardContainer}>
                            <TextInput
                                multiline
                                style={[posting.detailInput, { marginBottom: 5 }]}
                                placeholder='เกี่ยวกับงาน หรือ ประวัติส่วนตัว'
                                value={bio}
                                placeholderTextColor={color.GREY_2}
                                onChangeText={(val) => setBio(val)}
                                onFocus={(e) => {
                                    scrollRef.current.scrollTo({
                                        x: 0,
                                        y: bioLayout,
                                        animated: true
                                    })
                                }}
                            />
                        </View>
                    </View>

                    {/* address */}
                    <View style={card.card}
                        onLayout={(e) => {
                            setaddressLayout(e.nativeEvent.layout.y)
                        }}
                    >
                        <View style={card.cardHeader} >
                            <Text style={card.headerText}>ที่อยู่</Text>
                        </View>
                        <View style={card.cardContainer}>
                            <TextInput
                                multiline
                                style={[posting.detailInput, { marginBottom: 5 }]}
                                placeholder='ที่อยู่'
                                value={detail}
                                onChangeText={(val) => setDetail(val)}
                                onFocus={(e) => {
                                    scrollRef.current.scrollTo({
                                        x: 0,
                                        y: addressLayout,
                                        animated: true
                                    })
                                }}
                            />
                            <TouchableOpacity
                                style={{
                                    width: '100%',
                                    backgroundColor: color.BLUE_5,
                                    padding: widthToDp('2'),
                                    paddingLeft: widthToDp('5'),
                                    borderRadius: widthToDp('2'),
                                    marginBottom: widthToDp('2'),
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    setLocationVisible(true)
                                }}
                            >
                                <Text
                                    style={styles.selectedText}
                                >
                                    ระบุโลเคชัน
                                </Text>
                                {/* <Feather
                                    style={styles.selectedText}
                                    name='map-pin'
                                /> */}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <MyButton
                        title='ยืนยัน'
                        onPress={() => {
                            props.LOADING()
                            handleSubmit()
                                .then(info => {
                                    props.technicianRegister(info)
                                        .then(res => {
                                            // props.changeRole('technician')
                                            props.updateToken()
                                                .then(({ uid }) => {
                                                    props.GET_TECHNICIAN_INFO(uid)
                                                        .then(() => {
                                                            props.checkToken()
                                                            props.navigation.navigate('userInfo')
                                                        })
                                                })
                                        }).catch(err => {
                                            console.log('technician register err :', err);
                                        })
                                })
                        }}
                    />
                    <View style={{ marginBottom: widthToDp('8') }} />
                </ScrollView>


                {/* Start Time Modal */}
                <Modal
                    isOpen={starTimeVisible}
                    onClosed={() => setStartTimeVisible(false)}
                    style={{ backgroundColor: 'transparent' }}
                    position='center'
                    swipeToClose={false}
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
                            }}>
                            <View style={techRegModalStyles.header}>
                                <Text
                                    style={techRegModalStyles.headerText}
                                >
                                    เลือกเวลาา
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
                                <View
                                    style={
                                        [
                                            technicianRegister.rowContainer,
                                            {
                                                flexDirection: 'row'
                                            }
                                        ]
                                    }
                                >
                                    <View
                                        style={{
                                            flex: 1
                                        }}
                                    >
                                        <Picker
                                            itemStyle={{
                                                ...Platform.select({
                                                    ios: {
                                                        height: widthToDp('30'),
                                                    },
                                                    android: {
                                                        height: widthToDp('10'),
                                                    }
                                                })
                                            }}
                                            selectedValue={time.start.hour}
                                            onValueChange={(val) => {
                                                setTime({ ...time, start: { hour: val, minute: time.start.minute } })
                                            }}

                                        >
                                            {
                                                [...Array(24)].map((item, index) => <Picker.Item key={index} label={`${index}`} value={`${index}`} />)
                                            }
                                        </Picker>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1
                                        }}>
                                        <Picker
                                            itemStyle={{
                                                ...Platform.select({
                                                    ios: {
                                                        height: widthToDp('30'),
                                                    },
                                                    android: {
                                                        height: widthToDp('10'),
                                                    }
                                                })
                                            }}
                                            selectedValue={time.start.minute}
                                            onValueChange={(val) => setTime({ ...time, start: { ...time.start, minute: val } })}
                                        >
                                            {
                                                [...Array(60)].map((item, index) => <Picker.Item key={index} label={`${index}`} value={`${index}`} />)
                                            }
                                        </Picker>
                                    </View>
                                </View>
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
                                        setStartTimeVisible(false)
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

                {/* End time Modal */}
                <Modal
                    isOpen={endTimeVisible}
                    onClosed={() => setEndTimeVisible(false)}
                    style={{ backgroundColor: 'transparent' }}
                    position='center'
                    swipeToClose={false}
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
                            }}>
                            <View style={techRegModalStyles.header}>
                                <Text
                                    style={techRegModalStyles.headerText}
                                >
                                    เลือกเวลาา
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
                                <View
                                    style={
                                        [
                                            technicianRegister.rowContainer,
                                            {
                                                flexDirection: 'row'
                                            }
                                        ]
                                    }
                                >
                                    <View
                                        style={{
                                            flex: 1
                                        }}
                                    >
                                        <Picker
                                            itemStyle={{
                                                ...Platform.select({
                                                    ios: {
                                                        height: widthToDp('30'),
                                                    },
                                                    android: {
                                                        height: widthToDp('10'),
                                                    }
                                                })
                                            }}
                                            selectedValue={time.end.hour}
                                            itemStyle={{ height: 150 }}
                                            onValueChange={(val) => {
                                                // props.SET_HOUR(val)
                                                setTime({ ...time, end: { ...time.end, hour: val } })
                                            }}

                                        >
                                            {
                                                [...Array(24)].map((item, index) => <Picker.Item key={index} label={`${index}`} value={`${index}`} />)
                                            }
                                        </Picker>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1
                                        }}>
                                        <Picker
                                            itemStyle={{
                                                ...Platform.select({
                                                    ios: {
                                                        height: widthToDp('30'),
                                                    },
                                                    android: {
                                                        height: widthToDp('10'),
                                                    }
                                                })
                                            }}
                                            selectedValue={time.end.minute}
                                            itemStyle={{ height: 150 }}
                                            onValueChange={(val) => setTime({ ...time, end: { ...time.end, minute: val } })}
                                        >
                                            {
                                                [...Array(60)].map((item, index) => <Picker.Item key={index} label={`${index}`} value={`${index}`} />)
                                            }
                                        </Picker>
                                    </View>
                                </View>
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
                                        setEndTimeVisible(false)
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
            </View>

            <SelectWorkDayModal
                isOpen={workDayVisible}
                onClosed={() => setWorkDayVisible(false)}
                day={day}
                setDay={(res) => setDay(res)}
            />
            <SelectAptitudeModal
                isOpen={aptitudeVisible}
                onClosed={() => setApititudeVisible(false)}
                aptitude={aptitude}
                setAbtitude={(res) => setAbtitude(res)}
            />
            <LocationPickerModal
                isOpen={locationVisible}
                onClosed={() => setLocationVisible(false)}
                location={props.location}
                setLocation={(lat, lng) => {
                    props.SET_LOCATION(lat, lng)
                }}
            />

        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TechnicianRegisterScreen)