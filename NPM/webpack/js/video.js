'use strict';

var _config = require('./config');

var YOUTUBE_API_URL_VIDEO = 'https://www.googleapis.com/youtube/v3/videos';
var YOUTUBE_API_URL_CHANNEL = 'https://www.googleapis.com/youtube/v3/channels';

$(document).ready(function () {
    var result = (0, _config.getVideoId)();
    if (result !== 0) {
        (0, _config.request)(YOUTUBE_API_URL_VIDEO, (0, _config.getQueryVideo)(result), getVideoData);
    }
});

var getVideoData = function getVideoData(data) {

    if (data.items.length !== 0) {

        $('.not-found').attr('style', 'display:none');
        $('.content').removeAttr('style');
        document.title = data.items[0].snippet.title;
        $('iframe').attr("src", 'https://www.youtube.com/embed/' + data.items[0].id + '?autoplay=1');
        $('h2').html(data.items[0].snippet.title);
        $('pre').html(data.items[0].snippet.localized.description);
        $('.viewCount').html('\uD83D\uDC41 ' + data.items[0].statistics.viewCount);
        $('.likedislikeCount').html('\uD83D\uDC4D ' + data.items[0].statistics.likeCount + ' \uD83D\uDC4E ' + data.items[0].statistics.dislikeCount);
        $('.commentsCount').html('\uD83D\uDCAC ' + data.items[0].statistics.commentCount);
        $('.breadcrumb-item.active').html(data.items[0].snippet.title);

        var channelId = data.items[0].snippet.channelId;
        (0, _config.request)(YOUTUBE_API_URL_CHANNEL, (0, _config.getQueryChannel)(channelId), getChannelData);
    } else {
        $('.not-found').removeAttr('style');
        $('.content').attr('style', 'display:none');
        $('.breadcrumb-item.active').html('404');
    }
};

var getChannelData = function getChannelData(data) {
    $('.channel').attr('src', data.items[0].snippet.thumbnails.default.url);
    $('.channel-title').html(data.items[0].snippet.title);
    $('.channel-subscriberCount').html(data.items[0].statistics.subscriberCount);
};