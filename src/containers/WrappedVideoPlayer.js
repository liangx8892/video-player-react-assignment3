import { connect } from 'react-redux'
import { VideoPlayer } from '../components/VideoPlayer/VideoPlayer'
import * as Actions from '../actions'

const mapStateToProps = (state, ownProps) => (
    {...ownProps, ...state }
)

const mapDispatchToProps = (dispatch, ownProps) => ({
    playVideo: () => {
        dispatch(Actions.playVideo())
    },
    pauseVideo: () => {
        dispatch(Actions.pauseVideo())
    },
    stopVideo: () => {
        dispatch(Actions.stopVideo())
    },
    reloadVideo: () => {
        dispatch(Actions.reloadVideo())
    },
    increaseVolume: () => {
        dispatch(Actions.increaseVolume())
    },
    decreaseVolume: () => {
        dispatch(Actions.decreaseVolume())
    },
    changeVolume: (volume) => {
        dispatch(Actions.changeVolume(volume))
    },
    toggleMute: ()=> {
        dispatch(Actions.toggleMute())
    },
    likeVideo: ()=> {
        dispatch(Actions.likeVideo())
    },
    unlikeVideo: () => {
        dispatch(Actions.unlikeVideo())
    },
    changeDuration: (duration) => {
        dispatch(Actions.changeDuration(duration))
    },
    changeTime: (currentTime) => {
        dispatch(Actions.changeTime(currentTime))
    },
    selectVideo: (index) => {
        dispatch(Actions.selectVideo(index))
    },
    launchVideo: (video) => {
        dispatch(Actions.launchVideo(video))
    },
    saveVideoState: (video) => {
        dispatch(Actions.saveVideoState(video))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoPlayer)