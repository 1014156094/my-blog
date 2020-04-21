// 当前用户模块

import { SET_USER_INFO } from '../types'
import cookie from 'js-cookie'

const initialState = {
    info: cookie.get('user_info') || '' // 当前用户信息
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            cookie.set('user_info', JSON.stringify(action.info), {
                expires: 3
            })
            
            return {
                ...state,
                info: action.info
            }
        default:
            return state
    }
}

export default {
    initialState,
    reducer
}