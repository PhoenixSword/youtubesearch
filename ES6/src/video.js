
$(document).ready(function(){
    var pageHref=location.toString();
    var result = pageHref.slice(pageHref.search(/v=/)+2);
    requestVideo(getQueryVideo(result), getVideoData);
});


let YOUTUBE_API_URL_VIDEO = 'https://www.googleapis.com/youtube/v3/videos';
let YOUTUBE_API_URL_CHANNEL = 'https://www.googleapis.com/youtube/v3/channels';
//let YOUTUBE_API_KEY = 'AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk';
let YOUTUBE_API_KEY = 'AIzaSyCoejMFrTxc93iRK2MkuaSwHQHdm2BvqsI';
let temp = 0;

function getQueryVideo(id) {
    let queryVideo = {
        key: YOUTUBE_API_KEY,
        id: id,
        part: 'snippet,statistics'
    }
    return queryVideo;
}

function requestVideo(query, callback) {
    $.getJSON(YOUTUBE_API_URL_VIDEO, query, callback);
}

function getVideoData(data) {

    if (data.items.length !== 0) {

        $('.not-found').attr('style', 'display:none');
        $('.content').removeAttr('style');
        document.title = data.items[0].snippet.title
        $('iframe').attr("src", `https://www.youtube.com/embed/${data.items[0].id}`);
        $('h2').html(data.items[0].snippet.title)
        $('pre').html(data.items[0].snippet.localized.description)
        $('.viewCount').html(`👁Views: ${data.items[0].statistics.viewCount}`)
        $('.likedislikeCount').html(`👍${data.items[0].statistics.likeCount} 👎${data.items[0].statistics.dislikeCount}`)
        $('.commentsCount').html(`💬Comments: ${data.items[0].statistics.commentCount}`)
        $('.breadcrumb-item.active').html(data.items[0].snippet.title)

        let channelId = data.items[0].snippet.channelId;
        requestChannel(channelId);
    }
    else {
        $('.not-found').removeAttr('style');
        $('.content').attr('style', 'display:none');
        $('.breadcrumb-item.active').html(`404`)

    }

    function getChannelData(data) {
        $('.channel').attr('src', data.items[0].snippet.thumbnails.default.url)
        $('.channel-title').html(data.items[0].snippet.title)
        $('.channel-subscriberCount').html(data.items[0].statistics.subscriberCount);

    }

    function requestChannel(channelid) {
    let queryChannel = {
        key: YOUTUBE_API_KEY,
        id: channelid,
        part: 'snippet, statistics'}
    $.getJSON(YOUTUBE_API_URL_CHANNEL, queryChannel, getChannelData);
}

}



