import $ from 'jquery'


$.ajaxSetup({
    contentType: "application/json; charset=utf-8"
});

const BASE_URL = 'http://localhost:3001'

const SERVICE_CONSTANTS = {
    LAST_VISITED_VIDEOID: 'last_visited_videoid',
    BASE_URL: 'http://localhost:3001',
    END_POINT_GET_VIDEOS: BASE_URL + '/videos?_sort=id&_order=asc',
    END_POINT_UPDATE_VIDEO: BASE_URL + '/videos/',
    END_POINT_ADD_VIDEO: BASE_URL + '/videos',
}

export default {

    getVideos : () => {
        return $.get(SERVICE_CONSTANTS.END_POINT_GET_VIDEOS)
    },

    addVideo : (video) => {
        video.approved = false;
        return $.post(SERVICE_CONSTANTS.END_POINT_ADD_VIDEO,JSON.stringify(video))
    },

    updateVideo : (id, video) => {
        return $.ajax(SERVICE_CONSTANTS.END_POINT_UPDATE_VIDEO+id, {
            data: JSON.stringify(video),
            dataType: 'json',
            method: 'PUT'
        })
    },

    approveVideo: (id) => {
        return $.ajax(SERVICE_CONSTANTS.END_POINT_UPDATE_VIDEO+id, {
            data: JSON.stringify({ approved: true }),
            dataType: 'json',
            method: 'PATCH'
        })
    },


    deleteVideo : (id) => {
        return $.ajax(SERVICE_CONSTANTS.END_POINT_UPDATE_VIDEO+id, {
            method: 'DELETE'
        })
    },

    setLastVisitedVideoID: (id) => {
        localStorage.setItem(SERVICE_CONSTANTS.LAST_VISITED_VIDEOID, id.toString())
    },

    getLastVisitedVideoID: () => {
        let idString = localStorage.getItem(SERVICE_CONSTANTS.LAST_VISITED_VIDEOID)
        if(idString){
        return parseInt(idString)
        }
        return 0
    }

}