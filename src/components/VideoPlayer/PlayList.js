import React from 'react'
import '../../styles/playlist.scss';
import VideoService from '../../services/VideoService'

export class PlayList extends React.Component {
    
    render() {
        return (
            <div className="card mb-2 m-1 playlist">
            <div className="card-header"> Sample Online video playlist </div>
            <div className="card-body">
    
                <ul className="list-group list-group-flush">

                    {this.props.playlist.videos.map((video, i) => (
                        <li key={i} 
                            className={`list-group-item playback ${this.props.playlist.currentVideoIndex === i ? 'active' : ''}`}
                            onClick={() => this.props.handleSelectVideo(i)}
                        >
                            <i className="fab fa-youtube fa-2x"></i>
                            <h2>{video.title}</h2>
                            <p>{video.durationLabel}</p>
                        </li> 
                    ))}
                </ul>
            </div>
        </div>
        )
    }

    componentDidMount() {
        let lastVideoID = VideoService.getLastVisitedVideoID()
        
        VideoService.getVideos().then((videos)=>{
            this.props.changeVideoList(videos)
            if(!lastVideoID){
                lastVideoID = this.props.playlist.videos[0].id
                VideoService.setLastVisitedVideoID(lastVideoID)
            }
            this.props.playlist.videos.forEach((video, idx) => {
                if(video.id === lastVideoID){
                    this.props.selectVideo(idx)
                }
            });
            this.props.launchVideo(this.props.playlist.videos[this.props.playlist.currentVideoIndex])
        })
    }
}