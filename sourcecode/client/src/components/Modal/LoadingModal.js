import React from 'react'

import {ActivityIndicator} from 'react-native'
import Modal from 'react-native-modalbox'

import { LOADED } from '../../store/actions/authAction'
import { connect } from 'react-redux'
import { color } from '../../stylesheet'

const mapStateToProps = (state) => ({
    isLoading : state.auth.isLoading
})

const mapDispatchToProps = {
    LOADED
}

const LoadingModal = (props) => {
    return(
        <>
        <Modal
            isOpen={props.isLoading}
            onClosed={ () => props.LOADED()}
            swipeToClose={false}
            backButtonClose={false}
            backdropPressToClose={false}
            position='center'
            style={{
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'tranparent'
            }}
        >
            <ActivityIndicator size='small' color={color.WHITE} />
        </Modal>
        </>
    )
}

export default connect(mapStateToProps , mapDispatchToProps)(LoadingModal)