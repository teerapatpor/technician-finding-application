import React from 'react'
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { global } from '../../stylesheet'
import Feather from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux';
import { LOADED } from '../../store/actions/authAction';
import { useNavigation } from '@react-navigation/native'

const mapStateToProps = (state) => ({
    uid: state.auth.userInfo.uid,
    badge: state.chat.badge
})

const mapDispatchToProsp = {
    LOADED
}

const Header = ({ page, isRadius, ...props }) => {
    const { goBack, navigate } = useNavigation()
    return (
        <>
            <View style={[global.header, isRadius ? global.headerBorderRadius : null]}>
                <Text style={global.headerText}>
                    {page}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigate('message')
                    }}
                    style={global.chatIconContainer}
                >
                    <Feather name="mail" style={global.chatIcon} />
                    {
                        props.badge ? (
                            <View style={global.badges}>
                                <Text style={global.badgesText}>
                                    {props.badge}
                                </Text>
                            </View>
                        ) : null
                    }
                </TouchableOpacity>
                <TouchableOpacity style={global.backIconContainer}
                    onPress={() => {
                        navigate('userInfo')
                    }}
                >
                    <Feather name="chevron-left" style={global.backIcon} />
                    {/* <View style={global.backTextContainer}>
                                    <Text style={global.backText}>
                                        ย้อนกลับ
                                    </Text>
                                </View> */}
                </TouchableOpacity>
            </View>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProsp)(Header)