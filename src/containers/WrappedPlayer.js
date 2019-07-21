import { connect } from 'react-redux'
import { Player } from '../components/VideoPlayer/Player'

const mapStateToProps = (state, ownProps) => (
    { ...ownProps, ...state }
)

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player)