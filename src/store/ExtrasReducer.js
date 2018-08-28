const initialState = {
    wideSelected : false,
    noBallSelected : false,
    byeSelected : false,
    legByeSelected : false
};

const ExtrasReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_WIDE.type:
            return {...state,wideSelected: !state.wideSelected}
        case ACTION_NO_BALL.type:
            return {...state,noBallSelected: !state.noBallSelected}
        case ACTION_BYE.type:
            return {...state,byeSelected: !state.byeSelected}
        case ACTION_LEG_BYE.type:
            return {...state,legByeSelected: !state.legByeSelected}

        default:
            return state;
    }

};

const ACTION_WIDE = {
    type : 'WIDE'
}

const ACTION_NO_BALL = {
    type : 'NB'
}

const ACTION_BYE = {
    type : 'BYE'
}

const ACTION_LEG_BYE = {
    type : 'LB'
}

export {
    ExtrasReducer, ACTION_WIDE,ACTION_NO_BALL, ACTION_BYE, ACTION_LEG_BYE
}
