import { connect } from 'react-redux'
import * as Actions from '../actions'
import Controls from '../components/VideoPlayer/Controls'

const mapStateToProps = (state, ownProps) => (
    { ...ownProps, ...state }
)

const mapDispatchToProps = (dispatch, ownProps) => ({
    playVideo: () => {
        dispatch(Actions.playVideo())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Controls)