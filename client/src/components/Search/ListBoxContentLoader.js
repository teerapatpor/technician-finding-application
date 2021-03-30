import React from 'react'

import { View, Text, Image } from 'react-native'

import { Rating } from 'react-native-ratings'

import { searchScreen, widthToDp, color } from '../../stylesheet'


import  ContentLoader from 'react-native-easy-content-loader'


const ListBoxContentLoading = (props) => {

    return (
        <>
            <View
                style={[searchScreen.listContainer]}
            >
                    <ContentLoader
                        avatar
                        pRows={1}
                    />
            </View>
            <View
                style={[searchScreen.listContainer]}
            >
                    <ContentLoader
                        avatar
                        pRows={1}
                    />
            </View>
            <View
                style={[searchScreen.listContainer]}
            >
                    <ContentLoader
                        avatar
                        pRows={1}
                    />
            </View>
            <View
                style={[searchScreen.listContainer]}
            >
                    <ContentLoader
                        avatar
                        pRows={1}
                    />
            </View>
            <View
                style={[searchScreen.listContainer]}
            >
                    <ContentLoader
                        avatar
                        pRows={1}
                    />
            </View>
            
        </>
    )
}

export default ListBoxContentLoading