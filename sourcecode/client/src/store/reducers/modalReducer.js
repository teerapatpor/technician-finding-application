export const modalType = {}
modalType.OPEN_POST_MODAL = 'OPEN_POST_MODAL'
modalType.CLOSE_POST_MODAL = 'CLOSE_POST_MODAL'
modalType.OPEN_DATE_PICKER_MODAL = 'OPEN_DATE_PICKER_MODAL'
modalType.CLOSE_DATE_PICKER_MODAL = 'CLOSE_DATE_PICKER_MODAL'
modalType.OPEN_TIME_PICKER_MODAL = 'OPEN_TIME_PICKER_MODAL'
modalType.CLOSE_TIME_PICKER_MODAL = 'CLOSE_TIME_PICKER_MODAL'
modalType.OPEN_SELECT_TYPE_MODAL = 'OPEN_SELECT_TYPE_MODAL'
modalType.CLOSE_SELECT_TYPE_MODAL = 'CLOSE_SELECT_TYPE_MODAL'
modalType.OPEN_IMAGE_PICKER_MODAL = 'OPEN_IMAGE_PICKER_MODAL'
modalType.CLOSE_IMAGE_PICKER_MODAL = 'CLOSE_IMAGE_PICKER_MODAL'
modalType.OPEN_LOCATION_PICKER_MODAL = 'OPEN_LOCATION_PICKER_MODAL'
modalType.CLOSE_LOCATION_PICKER_MODAL = 'CLOSE_LOCATION_PICKER_MODAL'
modalType.OPEN_PRICE_INPUT_MODAL = 'OPEN_PRICE_INPUT_MODAL'
modalType.CLOSE_PRICE_INPUT_MODAL = 'CLOSE_PRICE_INPUT_MODAL'
modalType.OPEN_DETAIL_MODAL = 'OPEN_DETAIL_MODAL'
modalType.CLOSE_DETAIL_MODAL = 'CLOSE_DETAIL_MODAL'
modalType.OPEN_LOGOUT_CONFIRM_MODAL = 'OPEN_LOGOUT_CONFIRM_MODAL'
modalType.CLOSE_LOGOUT_CONFIRM_MODAL = 'CLOSE_LOGOUT_CONFIRM_MODAL'
modalType.SET_FORM_INFO = 'SET_FORM_INFO'

const initialState = {
    post_modal: false,
    date_picker: false,
    time_picker: false,
    select_type_modal: false,
    date_picker_modal: false,
    image_picker_modal: false,
    location_picker_modal: false,
    price_input_modal: false,
    detail_modal: false,
    logout_confirm_modal: false,
    order_id: '',
    formInfo: {
        _id: '',
        detail: '',
        date: '',
        techType: '',
        image: [],
        location: {
            lat : 0,
            lon : 0
        },
        userInfoID: {
            firstname: '',
            lastname: '',
            avatar: ''
        }
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case modalType.OPEN_DATE_PICKER_MODAL:
            return {
                ...state,
                date_picker_modal: true
            }
        case modalType.CLOSE_DATE_PICKER_MODAL:
            return {
                ...state,
                date_picker_modal: false
            }
        case modalType.OPEN_POST_MODAL:
            return {
                ...state,
                post_modal: true,
            }
        case modalType.CLOSE_POST_MODAL:
            return {
                ...state,
                post_modal: false,
            }
        case modalType.OPEN_TIME_PICKER_MODAL:
            return {
                ...state,
                time_picker: true,
            }
        case modalType.CLOSE_TIME_PICKER_MODAL:
            return {
                ...state,
                time_picker: false,
            }
        case modalType.OPEN_SELECT_TYPE_MODAL:
            return {
                ...state,
                select_type_modal: true,
            }
        case modalType.CLOSE_SELECT_TYPE_MODAL:
            return {
                ...state,
                select_type_modal: false,
            }
        case modalType.OPEN_IMAGE_PICKER_MODAL:
            return {
                ...state,
                image_picker_modal: true
            }
        case modalType.CLOSE_IMAGE_PICKER_MODAL:
            return {
                ...state,
                image_picker_modal: false
            }
        case modalType.OPEN_LOCATION_PICKER_MODAL:
            return {
                ...state,
                location_picker_modal: true
            }
        case modalType.CLOSE_LOCATION_PICKER_MODAL:
            return {
                ...state,
                location_picker_modal: false
            }
        case modalType.OPEN_PRICE_INPUT_MODAL:
            return {
                ...state,
                price_input_modal: true,
                order_id: action.payload.order_id
            }
        case modalType.CLOSE_PRICE_INPUT_MODAL:
            return {
                ...state,
                price_input_modal: false,
                order_id: ''
            }
        case modalType.OPEN_DETAIL_MODAL:
            return {
                ...state,
                detail_modal: true,
                order_id: action.payload.order_id
            }
        case modalType.CLOSE_DETAIL_MODAL:
            return {
                ...state,
                detail_modal: false,
            }
        case modalType.OPEN_LOGOUT_CONFIRM_MODAL:
            return {
                ...state,
                logout_confirm_modal: true
            }
        case modalType.CLOSE_LOGOUT_CONFIRM_MODAL:
            return {
                ...state,
                logout_confirm_modal: false
            }
        case modalType.SET_FORM_INFO:
            return {
                ...state,
                formInfo: action.payload
            }
        default:
            return state
    }
} 
