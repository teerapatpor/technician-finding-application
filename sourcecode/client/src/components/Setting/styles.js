import { StyleSheet } from 'react-native'
import { widthToDp, color, heightToDp } from '../../stylesheet'

export const styles = StyleSheet.create({
    container: {

    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'center',
    },
    selectBtn: {
        width: widthToDp('5'),
        height: widthToDp('5'),
        marginLeft: widthToDp('10'),
        marginRight : widthToDp('3') ,
        borderRadius: widthToDp('1'),
        justifyContent:'center',
        alignItems:'center',
        marginVertical : widthToDp('1')
    },
    unselect: {
        // backgroundColor: color.GREEN_4,
        // color: color.GREEN_0,
        // fontWeight: 'bold'
        backgroundColor: '#ddd',
        color : color.BLUE_4,
    },
    selected: {
        backgroundColor: color.GREEN_4,
        color: color.GREEN_0,
        fontWeight: 'bold'
    },
    selectedText: {
        fontSize: widthToDp('4'),
        color : color.BLUE_1
    },
    checkIcon: {
        fontSize:widthToDp('4'),
        color:color.WHITE
    },
    topicText:{
        fontSize:widthToDp('4.5'),
        color : color.BLUE_0
    },
    card:{
        backgroundColor: '#fff',
        borderRadius : widthToDp('2'),
        marginBottom : 15
    },
    cardHeader : {
        borderBottomColor : color.WHITE,
        paddingHorizontal : widthToDp('4'),
        paddingVertical : widthToDp('2'),
        borderBottomWidth : 1
    },
    cardContainer : {
        padding : widthToDp('2'),
    }
})