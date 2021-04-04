export const counterType = {}
counterType.INCREASE = 'INCREASE'
counterType.DECREASE = 'DECREASE'

const initialState = {
    count : 0
}

export default function counterReducer(state = initialState , action ) {
    switch (action.type) {
        case counterType.INCREASE:
            return{
                ...state,
                count: state.count + 1
            }            
        case counterType.DECREASE :
            return{
                ...state,
                count: state.count - 1
            }
        default:
            return state
    }
}