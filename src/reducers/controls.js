import ActionTypes from "../constants/ActionTypes";

const initialState = {
    playing: false,
    currentTime: 0,
    currentTimeLabel: '00:00:00',
    duration: 0,
    durationLabel: '00:00:00',
    volume: 1,
    muted: false,
    liked: false,
    unliked: false,
    likes: 1,
    unlikes: 0,
    ratio: 0,
    url: "http://www.w3school.com.cn/example/html5/mov_bbb.mp4"
}

function secondsToTimeString(seconds) {
    if (isNaN(seconds)) {
      seconds = 0
    }
    let sec_num = Math.floor(seconds)
    let hours = Math.floor(sec_num / 3600)
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60)
    sec_num = sec_num - (hours * 3600) - (minutes * 60)
    let hoursString = hours.toString()
    let minutesString = minutes.toString()
    let secondsString = sec_num.toString()
    if (hours < 10) { hoursString = "0" + hours; }
    if (minutes < 10) { minutesString = "0" + minutes; }
    if (sec_num < 10) { secondsString = "0" + sec_num; }
    return hoursString + ':' + minutesString + ':' + secondsString
  }

export default function controls(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.VIDEO_PLAY:
            return Object.assign({}, state, { playing: true })
        case ActionTypes.VIDEO_PAUSE:
            return Object.assign({}, state, { playing: false })
        case ActionTypes.VIDEO_STOP:
            return Object.assign({}, state, { playing: false })
        case ActionTypes.VIDEO_RELOAD:
            return Object.assign({}, state, { playing: true, currentTime: 0 })
        case ActionTypes.VIDEO_VOLUME_UP:
            return Object.assign({}, state, { volume: parseFloat((state.volume + 0.1).toFixed(2)) })
        case ActionTypes.VIDEO_VOLUME_DOWN:
            return Object.assign({}, state, { volume: parseFloat((state.volume - 0.1).toFixed(2)) })
        case ActionTypes.VIDEO_VOLUME_CHANGE:
            return Object.assign({}, state, { volume: parseFloat((action.volume / 100).toFixed(2)) })
        case ActionTypes.VIDEO_TOGGLE_MUTE:
            return Object.assign({}, state, { muted: !state.muted })
        case ActionTypes.VIDEO_LIKE:
            return Object.assign(
                {}, 
                state, 
                { 
                    liked: !state.liked, likes: state.liked ? parseInt(state.likes) - 1 : parseInt(state.likes) + 1
                })
        case ActionTypes.VIDEO_UNLIKE:
            return Object.assign(
                {}, 
                state, 
                { 
                    unliked: !state.unliked, unlikes: state.unliked ? parseInt(state.unlikes) - 1 : parseInt(state.unlikes) + 1
                })
        case ActionTypes.VIDEO_TIME_CHANGE:
            return Object.assign(
                {}, 
                state, 
                { 
                    currentTime: action.currentTime, 
                    currentTimeLabel: secondsToTimeString(action.currentTime), 
                    ratio: state.duration !== 0 ? parseFloat(action.currentTime / state.duration * 100) : 0
                }
            )
        case ActionTypes.VIDEO_DURATION_CHANGE:
            return Object.assign(
                {}, 
                state, 
                { 
                    duration: action.duration, 
                    durationLabel: secondsToTimeString(action.duration), 
                    ratio: parseFloat(state.currentTime / action.duration * 100)
                }
            )
        case ActionTypes.VIDEO_LAUNCH:
            return Object.assign(
                {}, 
                state, 
                action.video,
                {
                    playing: false,
                    liked: false,
                    unliked: false
                }
            )
        default:
            return state
    }
}