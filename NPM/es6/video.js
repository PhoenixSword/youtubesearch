import {YOUTUBE_API_KEY, request, getQueryVideo, getQueryChannel, getVideoId} from './config';
 
const YOUTUBE_API_URL_VIDEO = 'https://www.googleapis.com/youtube/v3/videos';
const YOUTUBE_API_URL_CHANNEL = 'https://www.googleapis.com/youtube/v3/channels';

$(document).ready(function(){
    let result = getVideoId();
    if(result !== 0)
    {
        request(YOUTUBE_API_URL_VIDEO, getQueryVideo(result), getVideoData);
    }
});

const getVideoData = (data) => {

    if (data.items.length !== 0) {

        $('.not-found').attr('style', 'display:none');
        $('.content').removeAttr('style');
        document.title = data.items[0].snippet.title
        $('iframe').attr("src", `https://www.youtube.com/embed/${data.items[0].id}?autoplay=1`);
        $('h2').html(data.items[0].snippet.title)
        $('pre').html(data.items[0].snippet.localized.description)
        $('.viewCount').html(`👁 ${data.items[0].statistics.viewCount}`)
        $('.likedislikeCount').html(`👍 ${data.items[0].statistics.likeCount} 👎 ${data.items[0].statistics.dislikeCount}`)
        $('.commentsCount').html(`💬 ${data.items[0].statistics.commentCount}`)
        $('.breadcrumb-item.active').html(data.items[0].snippet.title)

        let channelId = data.items[0].snippet.channelId;
        request(YOUTUBE_API_URL_CHANNEL, getQueryChannel(channelId), getChannelData);
    }
    else {
        $('.not-found').removeAttr('style');
        $('.content').attr('style', 'display:none');
        $('.breadcrumb-item.active').html(`404`)

    }
}

const getChannelData = (data) => {
        $('.channel').attr('src', data.items[0].snippet.thumbnails.default.url)
        $('.channel-title').html(data.items[0].snippet.title)
        $('.channel-subscriberCount').html(data.items[0].statistics.subscriberCount);

}




