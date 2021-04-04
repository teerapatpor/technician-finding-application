import React, { } from 'react'

import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'

import { technician } from '../../stylesheet'

import Feather from 'react-native-vector-icons/Feather'

const PersonalInfo = (props) => {
    return (
        <>
            <View style={technician.infoContainer}>
                <View style={technician.imageContainer}>
                    <Image
                        style={technician.image}
                        source={{ uri: props.info.avatar }} />
                    <TouchableOpacity
                        style={technician.chatBtn}
                        onPress={() => props.navigation.navigate('chat')}>
                        <Text style={technician.chatText}>
                            ติดต่อสอบถาม
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={technician.textContainer}>
                    <View style={technician.lineContainer}>
                        <Text style={technician.nameText}>
                            {`${props.info.firstname} ${props.info.lastname}`}
                        </Text>
                    </View>
                    <View style={technician.aptitudeContainer}>
                        {
                            props.aptitude.map((item, index) => {
                                return (
                                    <View key={index} style={technician.aptitude}>
                                        <Text style={technician.aptitudeText}>{item.aptitude}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View style={technician.lineContainer}>
                        {
                            props.info.onSite ? (
                                <View style={technician.onsiteContainer}>
                                    <Text style={technician.onsiteText}>บริการนอกสถานที่</Text>
                                </View>
                            ) : null
                        }
                    </View>
                    <View style={[technician.lineContainer]}>
                        <TouchableOpacity style={technician.telBtn}>
                            <Feather name="phone" style={technician.telNum} />
                            <Text style={technician.telNum}>
                                092-234-1235
                                    </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

export default PersonalInfo