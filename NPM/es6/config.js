import {PREV_TOKEN, NEXT_TOKEN} from './search.js';
//export let YOUTUBE_API_KEY2 = 'AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk';
export let YOUTUBE_API_KEY = 'AIzaSyCoejMFrTxc93iRK2MkuaSwHQHdm2BvqsI';

export const request = (YOUTUBE_API_URL, query, callback) => {
    $.getJSON(YOUTUBE_API_URL, query, callback);

}

export const getQueryVideo = (id) =>  {
    let query = {
        key: YOUTUBE_API_KEY,
        id: id,
        part: 'snippet,statistics'
    }
    return query;
}

export const getQueryChannel = (channelid) => {
    let query = {
        key: YOUTUBE_API_KEY,
        id: channelid,
        part: 'snippet, statistics'
    }
    return query;
}

export const getQuerySearch = (searchTerm, task) => {
    let query = {
        part: 'snippet',
        key: YOUTUBE_API_KEY,
        q: searchTerm,
        maxResults: 10,
        type: 'video'
    }

    if (task === 'next') {
        query.pageToken = NEXT_TOKEN;
    }

    if (task === 'prev') {
        query.pageToken = PREV_TOKEN;
    }

    return query;
}

export const getVideoId = () => {
    var results = new RegExp(`[\?&]v=([^&#]*)`).exec(window.location.href);

    return !!results ? results[1] : 0;
}