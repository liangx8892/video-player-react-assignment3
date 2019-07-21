import React from 'react'
import '../../styles/controls.scss';

const Controls = (props) => (
    <div className="controls">
        <progress id="progress"  value={props.controls.ratio} max="100"></progress>
        <button id="play" 
            className="player-btn" 
            title="Play" 
            disabled={props.controls.playing}
            onClick={props.handlePlay}
        >
            <i className="fas fa-play-circle"></i>
        </button>
        <button id="pause" 
            className="player-btn" 
            disabled={!props.controls.playing}
            onClick={props.handlePause}
            title="Pause"
        >
            <i className="fas fa-pause-circle"></i>
        </button>
        <button id="stop" 
            className="player-btn" 
            disabled={!props.controls.playing}
            onClick={props.handleStop}
            title="Stop"
            >
            <i className="fas fa-stop-circle"></i>
        </button>
        <button id="reload" 
            className="player-btn" 
            onClick={props.handleReload}
            title="Reload"
        >
            <i className="fas fa-undo-alt"></i>
        </button>

        <button id="minus" 
            className="player-btn" 
            onClick={props.handleVolumeDown}
            disabled={props.controls.volume<=0}
            title="Volume down"
        >
            <i className="fas fa-minus-circle"></i>
        </button>
        <input id="vol-control" 
            type="range" 
            min="0" 
            max="100" 
            step="10" 
            value={props.controls.volume * 100}
            onChange={props.handleVolumeChange}
        />
        <button id="plus" 
            className="player-btn" 
            title="Volume up"
            disabled={props.controls.volume>=1}
            onClick={props.handleVolumeUp}
        >
            <i className="fas fa-plus-circle"></i>
        </button>
        <button id="mute-toggle" 
            className="player-btn" 
            onClick={props.handleToggleMute} 
            title="Mute/Unmute" 
        >
            <i 
                className={`fas ${props.controls.muted ? 'fa-volume-mute' : 'fa-volume-down'}`}
            >
            </i>
        </button>

        <span className="control-right">
            <button id="like" 
                className="player-btn" 
                onClick={props.handleLike}
                title="Like"
            >
                <i className={`fa-thumbs-up ${props.controls.liked ? 'fas' : 'far'}`}></i>
                <span id="like-num" >{props.controls.likes}</span>
            </button>
            <button id="unlike" 
                className="player-btn" 
                onClick={props.handleUnlike}
                title="Unlike"
            >
                <i className={`fa-thumbs-down ${props.controls.unliked ? 'fas' : 'far'}`}></i>
                <span id="unlike-num">{props.controls.unlikes}</span>
            </button>

            <span className="time">
                <span id="currentTime" className="currentTime">{props.controls.currentTimeLabel}</span> /
                <span id="totalTime" className="totalTime">{props.controls.durationLabel}</span>
            </span>
        </span>
    </div>
)

export default Controls