import ActionTypes from "../constants/ActionTypes";

const initialState = {
    message: 'Test message',
    isAlertShow: false,
    isModalShow: false,
    formData: {
        title: undefined,
        url: undefined
    },
    errors: {
        titleRequired: false,
        urlRequired: false,
        urlInvalid: false
    },
    videos: []
}

export default function playlist(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.VIDEO_LIST_CHANGE:
            return Object.assign(
                {},
                state,
                {
                    videos: action.videos
                })
        case ActionTypes.EDITOR_TITLE_CHANGE:
            return Object.assign(
                {},
                state,
                {
                    formData: { ...state.formData, title: action.title }
                })
        case ActionTypes.EDITOR_URL_CHANGE:
            return Object.assign(
                {},
                state,
                {
                    formData: { ...state.formData, url: action.url }
                })
        case ActionTypes.VIDEO_ADD:
            return Object.assign(
                {},
                state,
                {
                    videos: [...state.videos, action.video]
                })
        case ActionTypes.VIDEO_DELETE:
            return Object.assign(
                {},
                state,
                {
                    videos: state.videos.filter(video => video.id.toString()!== action.videoId.toString())
                })
        case ActionTypes.VIDEO_APPROVE:
            return Object.assign(
                {},
                state,
                {
                    videos: state.videos.map(video => {
                        if(video.id === action.videoId){
                            return {...video, approved: true}
                        }
                        return video
                    })
                })
        case ActionTypes.VIDEO_UPDATE:
            return Object.assign(
                {},
                state,
                {
                    videos: state.videos.map(video => {
                        if(video.id === action.videoId){
                            return action.video
                        }
                        return video
                    })
                })
        case ActionTypes.VIDEO_PREPARE_EDIT:
            return Object.assign(
                {},
                state,
                {
                    formData: {
                        title: action.title, 
                        url: action.url
                    }
                })
        case ActionTypes.VIDEO_RESET_FORM:
            return Object.assign(
                {},
                state,
                {
                    formData: {
                        title: '', 
                        url: ''
                    }
                })
        case ActionTypes.ALERT_SHOW:
            return Object.assign(
                {},
                state,
                {
                    isAlertShow: true,
                    message: action.message
                })
        case ActionTypes.ALERT_DISMISS:
            return Object.assign(
                {},
                state,
                {
                    isAlertShow: false
                })
        case ActionTypes.MODAl_SHOW:
            return Object.assign(
                {},
                state,
                {
                    isModalShow: true
                })
        case ActionTypes.MODAl_DISMISS:
            return Object.assign(
                {},
                state,
                {
                    isModalShow: false
                })
        case ActionTypes.EDITOR_FORM_VALIDATE:
            return Object.assign(
                {},
                state,
                {
                    errors: action.errors
                })
        default:
            return state
    }
}