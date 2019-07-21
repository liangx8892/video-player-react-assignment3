import React from 'react'
import VideoService from '../../services/VideoService'
import '../../styles/videoeditor.scss';
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


const MESSAGE = {
    ADD_SUCCESSFUL : "A video has been successfully added!",
    EDIT_SUCCESSFUL : "A video has been successfully updated!",
    DELETE_SUCCESSFUL : "A video has been successfully deleted!",
    APPROVE_SUCCESSFUL : "A video has been successfully approved!",
  };

export class VideoEditor extends React.Component {

    constructor(props) {
        super(props)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleUrlChange = this.handleUrlChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePreDelete = this.handlePreDelete.bind(this)
        this.handleApprove = this.handleApprove.bind(this)
        this.handlePreEdit = this.handlePreEdit.bind(this)
        this.handleAlertDismiss = this.handleAlertDismiss.bind(this)
        this.handleConfirmDelete = this.handleConfirmDelete.bind(this)
        this.handleModalDismiss = this.handleModalDismiss.bind(this)
        this.selectedVideo = null
        this.videoIdToBeDeleted = undefined
    }

    render() {
        return (
            <div className="container-fluid">
                <Modal show={this.props.editor.isModalShow}>
                    <Modal.Header>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>You are going to delete selected video.</p>
                        <p>Do you want to proceed?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModalDismiss}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={this.handleConfirmDelete}>
                            Confirm Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="card mb-2 m-1">
                    <div className="card-header"> Video Information </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group row">
                                <label htmlFor="title" className="col-md-2 col-form-label">Title:</label>
                                <div className="col-md-10">
                                    <input type="text" className="form-control" id="title"
                                        placeholder="Please enter title of video"
                                        autoComplete="off" 
                                        value={this.props.editor.formData.title}
                                        onChange={this.handleTitleChange}
                                    />
                                    <small 
                                        className={`text-danger ${this.props.editor.errors.titleRequired ? '' : 'hidden'}`}
                                    >
                                        Title is required
                                    </small>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="url" className="col-md-2 col-form-label">Video URL:</label>
                                <div className="col-md-10">
                                    <input type="text" className="form-control"
                                        id="url" placeholder="http://"
                                        autoComplete="off" 
                                        value={this.props.editor.formData.url}
                                        onChange={this.handleUrlChange}
                                    />
                                    <div>
                                        <small 
                                            className={`text-danger ${this.props.editor.errors.urlRequired ? '' : 'hidden'}`}
                                        >
                                                URL is required.
                                        </small>
                                        <small 
                                            className={`text-danger ${this.props.editor.errors.urlInvalid ? '' : 'hidden'}`}
                                        >
                                                URL is invalid.
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-md-10">
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Alert variant="success" 
                            onClose={this.handleAlertDismiss}
                            show={this.props.editor.isAlertShow} 
                            dismissible
                        >
                                {this.props.editor.message}
                        </Alert>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card m-1">
                            <div className="card-body">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col-md1">#</th>
                                            <th scope="col-md4">Title</th>
                                            <th scope="col-md4">URL</th>
                                            <th scope="col-md3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.editor.videos.map((video, i) => (
                                            
                                            <tr key={i}>
                                                <td>{video.id}</td>
                                                <td>
                                                    {video.title}
                                                </td>
                                                <td>{video.url}</td>
                                                <td>
                                                    <button type="button"
                                                        onClick={() => this.handlePreEdit(video)}
                                                        className="btn btn-primary mr-2"
                                                    >Edit</button>
                                                    <button type="button"
                                                        className="btn btn-danger mr-2"
                                                        onClick={() => this.handlePreDelete(video.id)}
                                                    >Delete</button>
                                                    <button type="button"
                                                        onClick={() => this.handleApprove(video.id)}
                                                        disabled={video.approved}
                                                        className="btn btn-success mr-2"
                                                    >Approve</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        VideoService.getVideos().then((videos) => {
            this.props.changeVideoList(videos)
        })
    }

    handleTitleChange(event) {
        this.props.changeTitle(event.target.value)
    }

    handleUrlChange(event) {
        this.props.changeUrl(event.target.value)
    }

    handleSubmit(event){
        event.preventDefault()
        let errors = this._validateForm()
        if(errors){
            this.props.formValidate(errors)
            return
        }

        this.props.formValidate({})

        if(this.selectedVideo){
            var videoToBeUpdated = {
                ...this.selectedVideo,
                ...this.props.editor.formData,
                approved: false
            }
            VideoService.updateVideo(videoToBeUpdated.id, videoToBeUpdated).then(() => {
                this.props.updateVideo(videoToBeUpdated.id, videoToBeUpdated)
                this._showAlert(MESSAGE.EDIT_SUCCESSFUL)
            })
        }else{
            let video = {
                id: this._getNextVideoID(),
                ...this.props.editor.formData, 
                duration: 0,
                durationLabel: "00:00:00",
                approved: false,
                likes: 0,
                unlikes: 0,
                currentTime: 0
            }

            VideoService.addVideo(video).then(() => {
                this.props.addVideo(video)
                this._showAlert(MESSAGE.ADD_SUCCESSFUL)
            })
        }
        this.selectedVideo = null
        this.props.resetForm()
    }

    handlePreDelete(id) {
        this.videoIdToBeDeleted = id
        this.props.showModal()
    }

    handleApprove(videoId) {
        VideoService.approveVideo(videoId).then(() => {
            this.props.approveVideo(videoId)
            this._showAlert(MESSAGE.APPROVE_SUCCESSFUL)
        })
    }

    handlePreEdit(video) {
        this.selectedVideo = video
        this.props.prepareEditVideo(this.selectedVideo.title, this.selectedVideo.url)
    }

    handleAlertDismiss() {
        this.props.dismissAlert()
    }

    handleConfirmDelete() {
        this.props.dismissModal()
        VideoService.deleteVideo(this.videoIdToBeDeleted).then(() => {
            this.props.deleteVideo(this.videoIdToBeDeleted)
            this._showAlert(MESSAGE.DELETE_SUCCESSFUL)
        })
    }

    handleModalDismiss() {
        this.props.dismissModal()
    }

    _validateForm() {
        let formData = {...this.props.editor.formData}
        let errors = null

        if(!formData.title || formData.title.trim().length === 0){
            errors = Object.assign({}, errors, { titleRequired: true })
        }
        if(!formData.url || formData.url.trim().length === 0){
            errors = Object.assign({}, errors, { urlRequired: true })
        }
        if(formData.url && !/https?:\/\/\w+/.test(formData.url)){
            errors = Object.assign({}, errors, { urlInvalid: true })
        }

        return errors
    }

    _showAlert(message) {
        this.props.showAlert(message)
        setTimeout(() => {
            this.props.dismissAlert()
        }, 3000);
    }

    _getNextVideoID() {
        let nextId = 0
        this.props.editor.videos.forEach(video => {
            if(video.id > nextId){
                nextId = video.id
            }
        });
        return ++nextId
    }
}  