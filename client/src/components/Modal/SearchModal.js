import React from 'react'
import { View, Text, SafeAreaView,Modal , Button, TextInput, Animated, Easing, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { color, searchScreen, heightToDp, widthToDp } from '../../stylesheet'
import Feather from 'react-native-vector-icons/Feather'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { SEARCH_GUIDE, SET_SEARCH_KEY_WORD } from '../../store/actions/techAction'

const mapStateToProps = (state) => ({
    keyword: state.tech.keyword
})

const mapDispatchToProps = {
    SEARCH_GUIDE,
    SET_SEARCH_KEY_WORD
}

const SearchModal = ({ isOpen, onClosed, ...props }) => {

    const [guideLists, setGuideLists] = React.useState([])
    const [allLists , setAllLists] = React.useState([])
    const inputRef = React.useRef(null)

    const handleCloseModal = () => {
        onClosed()
    }

    const handleSearch = (key) => {
            props.setSearchList(key , allLists)
            handleCloseModal()
    }

    const filterSearchLists = (keyword, word) => {
        const lowerCase = word.toLocaleLowerCase()
        const regex = new RegExp(`^${keyword.toLocaleLowerCase()}.*`)
        if (regex.test(lowerCase)) {
            setGuideLists( old => [...old , word])
        }
    }

    const emptySearchLists = () => {
        return new Promise((resolve, reject) => {
            setGuideLists([])
            resolve()
        })
    }

    const handleChangeText = (val) => {
        props.SET_SEARCH_KEY_WORD(val)
        if (val.trimEnd().length !== 0) {
            props.SEARCH_GUIDE(val.trimEnd())
                .then(lists => {
                    setAllLists(lists)
                    emptySearchLists().then( 
                        async () => {
                        await lists.map((item) => {
                            filterSearchLists(val, item)
                        })
                    })
                })
                .catch(err => {
                    // console.log('error on search guide method', err);
                })
        }
        else {
            setGuideLists([])
            setAllLists([])
        }
        if (val.length > 0) {
            animateIn()
        } else {
            animateOut()
        }
    }

    const animateIn = () => {
        Animated.spring(opacity, {
            toValue: 1,
            delay: 0,
            useNativeDriver: true,
            easing: Easing.elastic(4)
        }).start();
    };

    const animateOut = () => {
        Animated.timing(
            opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }
        ).start()
    }

    const [opacity, setOpacity] = React.useState(new Animated.Value(0));

    const translateX = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })

    const translateY = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })

    return (
        <>
            <Modal
                visible={isOpen}
                onRequestClose={ () => handleCloseModal()}
                animationType='fade'
            >
                {/* <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior='padding'
                > */}
                    <SafeAreaView>
                        <View
                            style={{
                                flexDirection: 'row',
                                paddingHorizontal: widthToDp('1'),
                                
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: color.GREY_5,
                                    flexDirection: 'row-reverse',
                                    justifyContent: 'space-between',
                                    flex: 1,
                                    height: widthToDp('9'),
                                    alignItems: 'center',
                                    margin: widthToDp('2'),
                                    borderRadius: widthToDp('2'),
                                    paddingVertical : 0

                                }}
                            >

                                <Animated.View
                                    style={{
                                        opacity,
                                        transform: [
                                            { scaleX: translateX },
                                            { scaleY: translateY }
                                        ],
                                        marginRight: widthToDp('2')
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            props.SET_SEARCH_KEY_WORD('')
                                            animateOut()
                                            setGuideLists([])
                                        }}
                                    >
                                        <Feather name='x' style={searchScreen.xIcon} />
                                    </TouchableOpacity>
                                </Animated.View>
                                <TextInput
                                    placeholder="ค้นหาช่าง ประเภท , ชื่อ หรือ อื่นๆ "
                                    placeholderTextColor={color.BLUE_4}
                                    ref={inputRef}
                                    autoFocus
                                    autoCompleteType='off'
                                    style={{
                                        flex: 1,
                                        fontSize: widthToDp('4'),
                                        color: color.BLUE_1,
                                        paddingVertical : 0
                                    }}
                                    value={props.keyword}
                                    onChangeText={(val) => {
                                        handleChangeText(val)
                                    }}
                                    onSubmitEditing={() => {
                                        handleSearch(props.keyword)
                                    }}
                                ></TextInput>
                                <View style={searchScreen.searchIconContainer}>
                                    <Feather name='search' style={searchScreen.searchIcon} />
                                </View>
                            </View>
                            <TouchableOpacity
                                style={searchScreen.xIconContainer}
                                onPress={() => {
                                    handleCloseModal()
                                }}>
                                <Text
                                    style={{
                                        fontSize: widthToDp('3.5'),
                                        color: color.BLUE_1,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    ยกเลิก
                        </Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            {
                                guideLists.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => {
                                                handleSearch(item)
                                            }}
                                        >
                                            <View
                                                style={{
                                                    paddingHorizontal: widthToDp('2'),
                                                    paddingVertical: widthToDp('2'),
                                                    width: '90%',
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: color.GREY_5,
                                                    marginLeft: widthToDp('5'),
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Feather
                                                    name='search'
                                                    style={{
                                                        marginRight: widthToDp('2'),
                                                        fontSize: widthToDp('4'),
                                                        color: color.BLUE_2
                                                    }}
                                                />
                                                <Text
                                                    style={{
                                                        marginRight: widthToDp('2'),
                                                        fontSize: widthToDp('4'),
                                                        color: color.BLUE_3,
                                                    }}
                                                >
                                                    {item}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </SafeAreaView>
                {/* </KeyboardAvoidingView> */}
            </Modal>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal)