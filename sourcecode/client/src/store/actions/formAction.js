import { formType } from "../reducers/formReducer"
import store from '..'

export const SET_DATE = (date) => dispatch => {
    dispatch({
        type: formType.SET_DATE,
        payload: {
            date: date
        }
    })
}

export const SET_MONTH = (month) => dispatch => {
    const form = store.getState().form
    if (month === 1) {
        if (form.year % 4 === 0) {
            if (form.date > 29) {
                dispatch({
                    type: formType.SET_DATE,
                    payload: {
                        date: 29
                    }
                })
            }
            dispatch({
                type: formType.SET_DATE_COUNT,
                payload: {
                    date_count: 29
                }
            })
        } else {
            if (form.date > 28) {
                dispatch({
                    type: formType.SET_DATE,
                    payload: {
                        date: 28
                    }
                })
            }
            dispatch({
                type: formType.SET_DATE_COUNT,
                payload: {
                    date_count: 28
                }
            })
        }
    }
    else if (month === 0 || month === 2 || month === 4 || month === 7 || month === 9 || month === 11) {
        if (form.date > 31) {
            dispatch({
                type: formType.SET_DATE,
                payload: {
                    date: 31
                }
            })
        }
        dispatch({
            type: formType.SET_DATE_COUNT,
            payload: {
                date_count: 31
            }
        })
    } else {
        if (form.date > 30) {
            dispatch({
                type: formType.SET_DATE,
                payload: {
                    date: 30
                }
            })
        }
        dispatch({
            type: formType.SET_DATE_COUNT,
            payload: {
                date_count: 30
            }
        })
    }
    dispatch({
        type: formType.SET_MONTH,
        payload: {
            month: month
        }
    })
}

export const SET_YEAR = (year) => dispatch => {
    const form = store.getState().form
    if (year % 4 === 0) {

        if (form.month === 1) {
            dispatch({
                type: formType.SET_DATE_COUNT,
                payload: {
                    date_count: 29
                }
            })
            if (form.date > 29) {
                dispatch({
                    type: formType.SET_DATE,
                    payload: {
                        date: 29
                    }
                })
            }
        }
    } else {
        if (form.month === 1) {
            if (form.date > 28) {
                dispatch({
                    type: formType.SET_DATE,
                    payload: {
                        date: 28
                    }
                })
            }
            dispatch({
                type: formType.SET_DATE_COUNT,
                payload: {
                    date_count: 28
                }
            })
        }
    }
    dispatch({
        type: formType.SET_YEAR,
        payload: {
            year: year
        }
    })
}

export const SET_URI = (uri) => dispatch => {
    dispatch({
        type: formType.SET_URI,
        payload: {
            uri: uri
        }
    })
}

export const SET_FILE = (file) => dispatch => {
    dispatch({
        type: formType.SET_FILE,
        payload: {
            file: file
        }
    })
}

export const DELETE_FILE = (file) => dispatch => {
    dispatch({
        type : formType.DELETE_FILE,
        payload : {
            file : file
        }
    })
}

export const APPEND_FILE = (file) => dispatch => {
    dispatch({
        type : formType.APPEND_FILE,
        payload : {
            file : file
        }
    })
}

export const SET_DETAIL = (detail) => dispatch => {
    dispatch({
        type: formType.SET_DETAIL,
        payload: {
            detail: detail
        }
    })
}

export const SET_TYPE = (type) => dispatch => {
    dispatch({
        type: formType.SET_TYPE,
        payload: {
            type: type
        }
    })
}

export const SET_LOCATION = (lat, lng) => dispatch => {
    dispatch({
        type: formType.SET_LOCATION,
        payload: {
            location: {
                latitude: lat,
                longitude: lng,
            }
        }
    })
}

export const SET_HOUR = (hour) => dispatch => {
    dispatch({
        type: formType.SET_HOUR,
        payload: {
            hour: hour
        }
    })
}

export const SET_MINUTE = (minute) => dispatch => {
    dispatch({
        type: formType.SET_MINUTE,
        payload: {
            minute: minute
        }
    })
}

export const clear = () => dispatch => {
    dispatch({
        type : formType.CLEAR
    })
}

export const setLocationDescription = (location_description) = dispatch => {
    dispatch({
        type : formType.SET_LOCATION_DESCRIPTION,
        payload : {
            location_description
        }
    })
}