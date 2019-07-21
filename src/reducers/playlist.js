import ActionTypes from "../constants/ActionTypes";

const initialState = {
    currentVideoIndex: 0,
    videos: [{
        id: 3,
        title: "Sample video 3",
        url: "http://www.w3school.com.cn/example/html5/mov_bbb.mp4",
        duration: "00:00:46",
        approved: true,
        likes: 1,
        unlikes: 1,
        currentTime: 0
    }]
}

export default function playlist(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.VIDEO_SELECT:
            return Object.assign({},
                state,
                { currentVideoIndex: action.currentVideoIndex }
            )
        case ActionTypes.VIDEO_DURATION_CHANGE:
            return Object.assign(
                {},
                state,
                {
                    videos: state.videos.map((video, index) => {
                        if (index === state.currentVideoIndex) {
                            return {
                                ...video,
                                duration: action.duration
                            }
                        } else {
                            return video
                        }
                    })
                })
        case ActionTypes.VIDEO_LIST_CHANGE:
            return Object.assign(
                {},
                state,
                {
                    videos: action.videos.filter(video => video.approved)
                })
        case ActionTypes.VIDEO_SAVE_STATE:
            return Object.assign(
                {},
                state,
                {
                    videos: state.videos.map((video, index) => {
                        if (index === state.currentVideoIndex) {
                            return {
                                ...video,
                                ...action.video
                            }
                        } else {
                            return video
                        }
                    })
                })
        default:
            return state
    }
}