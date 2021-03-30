import React, { useState } from 'react'


import Footer from '../../components/Registor/Footer'
import MyButton from '../../components/MyButton'
import MyTextInput from '../../components/MyTextInput'
import { registor, color, content } from '../../stylesheet'


import { Text, SafeAreaView, View } from 'react-native'

import { connect } from 'react-redux'
import { setFirstname, setLastname } from '../../store/actions/regAction'

const mapStateToProps = (state) => ({
    firstname: state.reg.firstname,
    lastname: state.reg.lastname
})

const connector = connect(mapStateToProps, { setFirstname, setLastname })

const Name = (props) => {

    const [firstnameStatus, setFirstnameStatus] = useState(null)
    const [lastnameStatus, setLastnameStatus] = useState(null)

    const handleFirstname = () => {
        const check = /^([A-Z]|[a-z]|[ ]|[0-9]|[/]|[\\]|[\n]|[.]|[ๅภถุึคตจขชๆไำพะัีรนยบลฃฟหกดเ้่าสวงผปแอิืทมใฝ๑๒๓๔ู฿๕๖๗๘๙๐ฎฑธํ๊ณฯญฐฅฤฆฏโฌ็๋ษศซฉฮฺ์ฒฬฦ])+$/.test(props.firstname)
        setFirstnameStatus(check)
        return check
    }

    const handleLastname = () => {
        const check = /^([A-Z]|[a-z]|[ ]|[0-9]|[/]|[\\]|[\n]|[.]|[ๅภถุึคตจขชๆไำพะัีรนยบลฃฟหกดเ้่าสวงผปแอิืทมใฝ๑๒๓๔ู฿๕๖๗๘๙๐ฎฑธํ๊ณฯญฐฅฤฆฏโฌ็๋ษศซฉฮฺ์ฒฬฦ])+$/.test(props.lastname)
        setLastnameStatus(check)
        return check
    }

    return (
        <>
            <View style={[registor.container]}>
                <View style={{ marginBottom: 15, width: '100%', alignItems: 'center' }}>
                    <Text style={registor.whaturname}>
                        คุณชื่ออะไร ?
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, marginRight: 2 }}>
                        <MyTextInput
                            placeholder='ชื่อ'
                            onChangeText={(val) => props.setFirstname(val)}
                            value={props.firstname}
                            isOnBlur={true}
                            onBlur={() => handleFirstname()}
                            status={firstnameStatus}
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: 2 }}>
                        <MyTextInput
                            placeholder='นามสกุล'
                            onChangeText={(val) => props.setLastname(val)}
                            value={props.lastname}
                            isOnBlur={true}
                            onBlur={() => handleLastname()}
                            status={lastnameStatus}
                        />
                    </View>
                </View>
                <MyButton title='ถัดไป'
                    onPress={() => {
                        if (handleFirstname() && handleLastname()) {
                            props.navigation.navigate('reg_image')
                        }
                    }}
                />
            </View>
            <Footer navigation={props.navigation} />
        </>
    )
}

export default connector(Name)