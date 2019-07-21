import { connect } from 'react-redux'
import { PlayList } from '../components/VideoPlayer/PlayList'
import * as Actions from '../actions'

const mapStateToProps = (state, ownProps) => (
    {...ownProps, ...state }
)

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeVideoList: (videos) => {
        dispatch(Actions.changeVideoList(videos))
    },
    selectVideo: (index) => {
        dispatch(Actions.selectVideo(index))
    },
    launchVideo: (video) => {
        dispatch(Actions.launchVideo(video))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayList)