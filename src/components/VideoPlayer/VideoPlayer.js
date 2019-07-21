import React from 'react'
import WrappedPlayer from '../../containers/WrappedPlayer'
import WrappedControls from '../../containers/WrappedControls'
import WrappedPlayList from '../../containers/WrappedPlayList'
import VideoService from '../../services/VideoService'
import '../../styles/videoplayer.scss'

const VOLUME_STEP = 0.1;

export class VideoPlayer extends React.Component {
    video = null;
    intervalId = 0;
    constructor(props) {
        super(props)
        this.handlePlay = this.handlePlay.bind(this)
        this.handlePause = this.handlePause.bind(this)
        this.handleStop = this.handleStop.bind(this)
        this.handleReload = this.handleReload.bind(this)
        this.handleVolumeUp = this.handleVolumeUp.bind(this)
        this.handleVolumeDown = this.handleVolumeDown.bind(this)
        this.handleVolumeChange = this.handleVolumeChange.bind(this)
        this.handleToggleMute = this.handleToggleMute.bind(this)
        this.handleLike = this.handleLike.bind(this)
        this.handleUnlike = this.handleUnlike.bind(this)
        this.handleEnded = this.handleEnded.bind(this)
        this.handleCanPlay = this.handleCanPlay.bind(this)
        this.handleSelectVideo = this.handleSelectVideo.bind(this)
        this.handleUnload = this.handleUnload.bind(this)
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 player">
                        <WrappedPlayer 
                            handleEnded={this.handleEnded}
                            handleCanPlay={this.handleCanPlay}
                            setGetVideoObjectFunc=
                                {
                                    func => this.getVideoObject = func
                                }
                        />
                        <WrappedControls 
                            handlePlay={this.handlePlay}
                            handlePause={this.handlePause}
                            handleStop={this.handleStop}
                            handleReload={this.handleReload}

                            handleVolumeUp={this.handleVolumeUp}
                            handleVolumeDown={this.handleVolumeDown}
                            handleVolumeChange={this.handleVolumeChange}
                            handleToggleMute={this.handleToggleMute}
                            handleLike={this.handleLike}
                            handleUnlike={this.handleUnlike}
                        />
                    </div>
                    <div className="col-md-4">
                        <WrappedPlayList 
                            handleSelectVideo={this.handleSelectVideo}
                        />
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.handleUnload)
        this.video = this.getVideoObject()
        this.intervalId = setInterval(() => {
            this.handleTimeChange(this.video.currentTime)
        }, 10);
    }

    componentWillUnmount() {
        this._saveCurrentVideoState()
        clearInterval(this.intervalId)
        window.removeEventListener("beforeunload", this.handleUnload)
    }

    handlePlay() {
        this.video.play()
        this.props.playVideo()
    }

    handlePause() {
        this.video.pause()
        this.props.pauseVideo()
    }

    handleStop() {
        this.video.pause()
        this.video.currentTime = 0
        this.props.changeTime(0)
        this.props.stopVideo()
    }

    handleReload() {
        this.video.src = this.props.playlist.videos[this.props.playlist.currentVideoIndex].url
        this.video.currentTime = 0
        this.video.load()
        this.video.play()
        this.props.reloadVideo()
    }

    handleVolumeUp() {
        if(this.video.volume < 1){
            this.video.volume = this.video.volume + VOLUME_STEP
            this.props.increaseVolume()
        }
    }

    handleVolumeDown() {
        if(this.video.volume > 0){
            this.video.volume = (this.video.volume - VOLUME_STEP).toFixed(2)
            this.props.decreaseVolume()
        }
    }

    handleVolumeChange(event) {
        this.video.volume = event.target.value / 100
        this.props.changeVolume(event.target.value)
    }

    handleToggleMute() {
        this.video.muted = !this.video.muted
        this.props.toggleMute()
    }

    handleLike() {
        this.props.likeVideo()
    }
    
    handleUnlike() {
        this.props.unlikeVideo()
    }

    handleEnded() {
        this.video.load()
        this.props.changeTime(0)
        this.props.stopVideo()
        this.video.src = this.props.controls.url
    }

    handleCanPlay() {
        this.props.changeDuration(this.video.duration)
    }

    handleTimeChange(currentTime) {
        this.props.changeTime(currentTime)
    }

    handleSelectVideo(index) {
        if(this.props.playlist.currentVideoIndex !== index){
            this._saveCurrentVideoState()
            this.props.selectVideo(index)
            let newVideo = this.props.playlist.videos[index]
            VideoService.setLastVisitedVideoID(newVideo.id)
            this.props.launchVideo(newVideo)
        }
    }

    _saveCurrentVideoState() {
        let changedProps = {
            currentTime: this.video.currentTime,
            likes: this.props.controls.likes,
            unlikes: this.props.controls.unlikes
        }
        this.props.saveVideoState(changedProps)
        let currentVideoInState = this.props.playlist.videos[this.props.playlist.currentVideoIndex]
        VideoService.updateVideo(
            currentVideoInState.id,
            {
                ...currentVideoInState, 
                ...changedProps
            }
        )
    }

    handleUnload(event) {
        this._saveCurrentVideoState()
        event.returnValue = true;
    }
}