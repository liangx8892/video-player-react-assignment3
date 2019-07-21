import ActionTypes from "../constants/ActionTypes"

export const playVideo = () => ({ type: ActionTypes.VIDEO_PLAY })
export const pauseVideo = () => ({ type: ActionTypes.VIDEO_PAUSE })
export const stopVideo = () => ({ type: ActionTypes.VIDEO_STOP })
export const reloadVideo = () => ({ type: ActionTypes.VIDEO_RELOAD })
export const increaseVolume = () => ({ type: ActionTypes.VIDEO_VOLUME_UP })
export const decreaseVolume = () => ({ type: ActionTypes.VIDEO_VOLUME_DOWN })
export const changeVolume = ( volume ) => ({ type: ActionTypes.VIDEO_VOLUME_CHANGE, volume: volume })
export const toggleMute = () => ({ type: ActionTypes.VIDEO_TOGGLE_MUTE })
export const likeVideo = () => ({ type: ActionTypes.VIDEO_LIKE })
export const unlikeVideo = () => ({ type: ActionTypes.VIDEO_UNLIKE })
export const changeTime = ( currentTime ) => ({ type: ActionTypes.VIDEO_TIME_CHANGE, currentTime: currentTime })
export const changeDuration = ( duration ) => ({ type: ActionTypes.VIDEO_DURATION_CHANGE, duration: duration })
export const selectVideo = ( currentVideoIndex ) => ({ type: ActionTypes.VIDEO_SELECT, currentVideoIndex: currentVideoIndex })
export const changeVideoList = (videos) => ({ type: ActionTypes.VIDEO_LIST_CHANGE, videos: videos})
export const launchVideo = (video) => ({ type: ActionTypes.VIDEO_LAUNCH, video: video})
export const saveVideoState = (video) => ({ type: ActionTypes.VIDEO_SAVE_STATE, video: video})

export const changeTitle = (title) => ({ type: ActionTypes.EDITOR_TITLE_CHANGE, title: title})
export const changeUrl = (url) => ({ type: ActionTypes.EDITOR_URL_CHANGE, url: url})
export const addVideo = (video) => ({ type: ActionTypes.VIDEO_ADD, video: video})
export const deleteVideo = (videoId) => ({ type: ActionTypes.VIDEO_DELETE, videoId: videoId})
export const prepareEditVideo = (title, url) => ({ type: ActionTypes.VIDEO_PREPARE_EDIT, title: title, url: url})
export const approveVideo = (videoId) => ({ type: ActionTypes.VIDEO_APPROVE ,videoId: videoId})
export const updateVideo = (videoId, video) => (
    { 
        type: ActionTypes.VIDEO_UPDATE, 
        videoId: videoId, 
        video: video
    }
)
export const resetForm = () => ({ type: ActionTypes.VIDEO_RESET_FORM})
export const showAlert = (message) => ({ type: ActionTypes.ALERT_SHOW , message: message})
export const dismissAlert = () => ({ type: ActionTypes.ALERT_DISMISS})
export const showModal = () => ({ type: ActionTypes.MODAl_SHOW})
export const dismissModal = () => ({ type: ActionTypes.MODAl_DISMISS})
export const formValidate = (errors) => ({ type: ActionTypes.EDITOR_FORM_VALIDATE, errors: errors})