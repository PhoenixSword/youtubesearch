'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getVideoId = exports.getQuerySearch = exports.getQueryChannel = exports.getQueryVideo = exports.request = exports.YOUTUBE_API_KEY = undefined;

var _search = require('./search.js');

//export let YOUTUBE_API_KEY2 = 'AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk';
var YOUTUBE_API_KEY = exports.YOUTUBE_API_KEY = 'AIzaSyCoejMFrTxc93iRK2MkuaSwHQHdm2BvqsI';

var request = exports.request = function request(YOUTUBE_API_URL, query, callback) {
    $.getJSON(YOUTUBE_API_URL, query, callback);
};

var getQueryVideo = exports.getQueryVideo = function getQueryVideo(id) {
    var query = {
        key: YOUTUBE_API_KEY,
        id: id,
        part: 'snippet,statistics'
    };
    return query;
};

var getQueryChannel = exports.getQueryChannel = function getQueryChannel(channelid) {
    var query = {
        key: YOUTUBE_API_KEY,
        id: channelid,
        part: 'snippet, statistics'
    };
    return query;
};

var getQuerySearch = exports.getQuerySearch = function getQuerySearch(searchTerm, task) {
    var query = {
        part: 'snippet',
        key: YOUTUBE_API_KEY,
        q: searchTerm,
        maxResults: 10,
        type: 'video'
    };

    if (task === 'next') {
        query.pageToken = _search.NEXT_TOKEN;
    }

    if (task === 'prev') {
        query.pageToken = _search.PREV_TOKEN;
    }

    return query;
};

var getVideoId = exports.getVideoId = function getVideoId() {
    var results = new RegExp('[?&]v=([^&#]*)').exec(window.location.href);

    return !!results ? results[1] : 0;
};