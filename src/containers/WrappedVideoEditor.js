import { connect } from 'react-redux'
import { VideoEditor } from '../components/VideoEditor/VideoEditor'
import * as Actions from '../actions'

const mapStateToProps = (state, ownProps) => (
    { ...ownProps, ...state }
)

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeVideoList: (videos) => {
        dispatch(Actions.changeVideoList(videos))
    },
    changeTitle: (title) => {
        dispatch(Actions.changeTitle(title))
    },
    changeUrl: (url) => {
        dispatch(Actions.changeUrl(url))
    },
    addVideo: (video) => {
        dispatch(Actions.addVideo(video))
    },
    deleteVideo: (videoId) => {
        dispatch(Actions.deleteVideo(videoId))
    },
    approveVideo: (videoId) => {
        dispatch(Actions.approveVideo(videoId))
    },
    updateVideo: (videoId, video) => {
        dispatch(Actions.updateVideo(videoId, video))
    },
    prepareEditVideo: (title, url) => {
        dispatch(Actions.prepareEditVideo(title, url))
    },
    resetForm: () => {
        dispatch(Actions.resetForm())
    },
    showAlert: (message) => {
        dispatch(Actions.showAlert(message))
    },
    dismissAlert: () => {
        dispatch(Actions.dismissAlert())
    },
    showModal: () => {
        dispatch(Actions.showModal())
    },
    dismissModal: () => {
        dispatch(Actions.dismissModal())
    },
    formValidate: (errors) => {
        dispatch(Actions.formValidate(errors))
    }

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoEditor)