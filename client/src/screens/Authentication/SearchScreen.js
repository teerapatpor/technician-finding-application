import React, { useState } from 'react'

import {
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Animated,
    Easing,
    Keyboard,
    Text,
    Image
} from 'react-native'

import Feather from 'react-native-vector-icons/Feather'
import { searchScreen, content, color, widthToDp } from '../../stylesheet'

import Header from '../../components/Header'
import ListBox from '../../components/Search/ListBox'

import { connect } from 'react-redux'

import { SET_SEARCH_KEY_WORD, SEARCH_BY_KEY_WORD, SEARCH_GUIDE } from '../../store/actions/techAction'
import { LOADED, LOADING } from '../../store/actions/authAction'
import { SET_LOCATION } from '../../store/actions/formAction'
import { getDistance } from '../../misc/getDistance'
import Geolocation from '@react-native-community/geolocation'
import { useFocusEffect } from '@react-navigation/native'
import SearchModal from '../../components/Modal/SearchModal'
import ListBoxContentLoader from '../../components/Search/ListBoxContentLoader'


const mapStateToProps = (state) => ({
    keyword: state.tech.keyword,
    location: state.form.location
})


const SearchScreen = (props) => {

    const [isLoading, setIsLoading] = React.useState(false)
    const [listsWithDistance, setListsWithDistance] = React.useState([])
    const [searchLists, setSearchLists] = React.useState([])
    const [check, setCheck] = React.useState(false)
    const searchInputRef = React.useRef()

    useFocusEffect(
        React.useCallback(() => {
            Geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
                props.SET_LOCATION(latitude, longitude)
            },
                (err) => {
                    console.log(err);
                })

        }, [])
    )

    React.useEffect(() => {
        return () => {
            props.SET_SEARCH_KEY_WORD('')
            setListsWithDistance([])
        }
    }, [])
    const handleDistance = async (t_lists) => {
        let temp_lists = []
        Promise.all(
            Object.keys(t_lists).map(async (key) => {
                const count = t_lists[key].count
                const distance = await getDistance(
                    props.location.latitude,
                    props.location.longitude,
                    t_lists[key].address.lat,
                    t_lists[key].address.lon
                )
                temp_lists.push({
                    ...t_lists[key],
                    distance: distance,
                    sorter: (distance / 2000) + (5 - t_lists[key].star)
                })
            })
        )
            .then(() => {
                // props.LOADED()
                setIsLoading(false)
                setListsWithDistance(temp_lists.sort((a, b) => {
                    return a.sorter - b.sorter
                }))
            }).catch((err) => {
                // props.LOADED()
                setIsLoading(false)
                console.log(err);
            })
    }


    const handleSearch = (arr) => {
        return new Promise((resovle, reject) => {
            let t_list = {}
            Promise.all(
                arr.map(async (key) => {
                    await props.SEARCH_BY_KEY_WORD(key)
                        .then((lists) => {
                            lists.map((list) => {
                                t_list[list._id] = list
                            })
                        })

                    // .then((res) => {
                    //     const filter_lists= res.filter( list => {
                    //         if(!pair_list.includes(list._id)){
                    //             pair_list.push(list._id)
                    //             setSearchLists( lists => [list , ...lists])
                    //             handleDistance( searchLists )
                    //         }
                    //         return !pair_list.includes(list._id)
                    //     })
                    //     return(filter_lists)
                    // })
                })
            ).then(() => {
                resovle(t_list)
            }).catch(err => {
                reject(err)
            })
        })
    }


    return (
        <>
            <SafeAreaView style={content.topsafearray} />
            <SafeAreaView style={content.safearray}>
                <Header page="ค้นหา" back={false} navigation={props.navigation} />
                <View style={{ backgroundColor: '#fff', flex: 1 }}
                    onStartShouldSetResponder={() => true}
                // onTouchStart={() => {
                //     searchInputRef.current.blur()
                // }}
                >
                    <View
                        style={{
                            // position: 'absolute',
                            width: widthToDp('100'),
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 4,
                            // paddingHorizontal: widthToDp('7'),
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginHorizontal: widthToDp('7')
                            }}>
                            <TouchableOpacity
                                onPress={() => setCheck(true)}
                                style={[
                                    searchScreen.textInputContainer,
                                ]}
                            >
                                <Text style={searchScreen.textInput}>
                                    {
                                        props.keyword.length !== 0 ? props.keyword : 'ค้นหาช่าง  ประเภท , ชื่อ หรือ อื่นๆ'
                                    }
                                </Text>
                                {/* <TextInput
                                    placeholder="ค้นหาช่าง  ประเภท , ชื่อ หรือ อื่นๆ "
                                    placeholderTextColor={color.BLUE_4}
                                    style={searchScreen.textInput}
                                    ref={searchInputRef}
                                    editable={false}
                                    autoCorrect={false}
                                    value={props.keyword}
                                /> */}
                                <View style={searchScreen.searchIconContainer}>
                                    <Feather name='search' style={searchScreen.searchIcon} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                backgroundColor: 'white',
                                paddingLeft: widthToDp('10'),
                                paddingRight: widthToDp('5'),
                                borderBottomLeftRadius: widthToDp('5'),
                                borderBottomRightRadius: widthToDp('5'),
                                width: '100%'
                            }}
                        >
                        </View>
                    </View>
                    {
                        !isLoading && listsWithDistance.length === 0 ? (
                            <Image
                                style={{
                                    height: widthToDp('60'),
                                    width: '100%',
                                    marginTop: widthToDp('10')
                                }}
                                source={require('../../assets/image/technician.jpg')}
                                resizeMode='contain'
                            />
                        ) : null
                    }
                    <ScrollView
                        style={{
                            paddingHorizontal: widthToDp('7'),
                            paddingVertical: widthToDp('1')
                        }}
                    >

                        {
                            isLoading ? <ListBoxContentLoader /> :
                                listsWithDistance.map((item, index) => {
                                    return <ListBox
                                        key={index}
                                        name={`${item.userInfoID.firstname} ${item.userInfoID.lastname}`}
                                        star={item.star}
                                        distance={parseFloat(item.distance / 1000).toFixed(2)}
                                        tid={item.userID}
                                        avatar={item.userInfoID.avatar}
                                        navigation={props.navigation}
                                    />
                                })
                        }
                    </ScrollView>
                </View>
            </SafeAreaView>
            <SearchModal
                isOpen={check}
                onClosed={() => {
                    setCheck(false)
                }}
                setSearchList={(key) => {
                    setIsLoading(true)
                    props.SET_SEARCH_KEY_WORD(key)
                    // props.LOADING()
                    setSearchLists([])
                    props.SEARCH_GUIDE(key).then(arr => {
                        handleSearch(arr).then(async (t_list) => {
                            await handleDistance(t_list)
                        })
                    })
                }}
            />
        </>
    )
}

export default connect(mapStateToProps, { LOADING, SET_LOCATION, SEARCH_GUIDE, LOADED, SET_SEARCH_KEY_WORD, SEARCH_BY_KEY_WORD })(SearchScreen)