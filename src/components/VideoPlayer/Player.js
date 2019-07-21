import React from 'react'
import '../../styles/player.scss';

export class Player extends React.Component {
    constructor(props) {
        super(props)
        this.videoRef = React.createRef();
    }

    render() {
        return (
            <div className="video embed-responsive embed-responsive-16by9">
                <video ref={this.videoRef} id="video"
                    src={`${this.props.controls.url}#t=${this.props.playlist.videos[this.props.playlist.currentVideoIndex].currentTime}`}
                    onEnded={this.props.handleEnded}
                    onCanPlay={this.props.handleCanPlay}
                >
                </video>
            </div>
        )
    }

    componentDidMount() {
        this.props.setGetVideoObjectFunc(this.getVideoObject.bind(this));
    }

    getVideoObject() {
        return this.videoRef.current
    }
}