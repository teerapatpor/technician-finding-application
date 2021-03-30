export const techType = {}
techType.SET_SEARCH_KEY_WORD = 'SET_SEARCH_KEY_WORD'
techType.SET_TECHNICIAN_INFO = 'SET_TECHNICIAN_INFO'
techType.SET_TID = 'SET_TID'
techType.CLEAR = 'TECHNICIAN_REDUCER_CLEAR'

const initialState = {
    keyword : '',
    info : {
        aptitude : [],
        personalInfo : {},
        onSite : false,
        frontStore : false,
        bio : '',
        star : 0,
        workDay : [],
        workTime : {
        
        },
        description : '',
        comment : []
    },
    tid : ''
}

export default function technicianReducer (state = initialState , action) {
    switch (action.type) {
        case techType.SET_SEARCH_KEY_WORD:
            return {
                ...state,
                keyword : action.payload.keyword
            }
        case techType.SET_TID:
            return{
                ...state,
                tid : action.payload.tid
            }
        case techType.SET_TECHNICIAN_INFO:
            return{
                ...state,
                info : {
                    aptitude : action.payload.aptitude,
                    personalInfo : action.payload.personalInfo,
                    onSite : action.payload.onSite,
                    frontStore : action.payload.frontStore,
                    bio : action.payload.bio,
                    star : action.payload.star,
                    location : action.payload.location,
                    workDay : action.payload.workDay,
                    workTime : action.payload.workTime,
                    description : action.payload.description,
                    comment : action.payload.comment
                }
            }
        case techType.CLEAR :
            return state = initialState
        default:
            return state;
    }
}