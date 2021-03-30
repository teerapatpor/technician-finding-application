import React, { } from 'react'

import { View, Text } from 'react-native'

import { technician } from '../../stylesheet'

const Location = () => {
    return (
        <>
            <View style={technician.locationContainer}>
                <View style={technician.locationHeader}>
                    <Text style={technician.locationText}>สถานที่ตั้งร้าน</Text>
                </View>
                <View style={technician.location}>
                    <View style={technician.map}>
                        {/* map */}
                    </View>
                </View>
            </View>
        </>
    )
}

export default Location