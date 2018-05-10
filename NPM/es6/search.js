import {YOUTUBE_API_KEY, request, getQuerySearch} from './config.js';
export let PREV_TOKEN = '';
export let NEXT_TOKEN = '';
 
let YOUTUBE_API_URL_SEARCH = 'https://www.googleapis.com/youtube/v3/search/';

let keywords = '';

$(".search").on( 'click', '.search-button', 'click', function(event) { 
            event.preventDefault();
            keywords = $('input').val();
            request(YOUTUBE_API_URL_SEARCH, getQuerySearch(keywords, 'submit'), getSearchData);
            document.title = `YouTube Search - ${keywords}`;
        });
$(".container-fluid").on( 'click', '.btn-next', 'click', function(event) {  
            $('.btn-previous').removeAttr('disabled');
            request(YOUTUBE_API_URL_SEARCH, getQuerySearch(keywords, 'next'), getSearchData);
        });

$(".container-fluid").on( 'click', '.btn-previous', 'click', function(event) {  
            request(YOUTUBE_API_URL_SEARCH, getQuerySearch(keywords, 'prev'), getSearchData); 
        });

const getSearchData = (data) => {

    PREV_TOKEN = data.prevPageToken;
    NEXT_TOKEN = data.nextPageToken;
    if (PREV_TOKEN == undefined) {
                $('.btn-previous').attr('disabled', true);
            }
    if (data.items.length !== 0) {
        $('.not-found').removeClass('d-flex');
        $('.not-found').addClass('d-none');
        $('.content').removeClass('d-none');
        $('.content').addClass('d-flex');
        $('.content').empty();
        $('.btn-previous, .btn-next').removeClass('d-none');
        $('.btn-previous, .btn-next').addClass('d-flex');


        data.items.forEach(function(item, index) {
           
            $('.content').append(`<div class="d-flex mt-3 justify-content-center"> <div class="d-flex findresult bg-white border"> <div class="col-preview p-0"> <img class="img-fluid" src="${item.snippet.thumbnails.medium.url}"" alt="Preview"> </div> <div class="col col-title mt-1 pl-2"> <h5 class="my-h5"> <a href="video.html?v=${item.id.videoId}"> ${item.snippet.title} </a></h5> <h6 class="my-h6 col-title mb-1">${item.snippet.description}</h6> </div> </div> </div>`)
 
      
        });
    } else {
        $('.btn-previous, .btn-next').addClass('d-none');
        $('.btn-previous, .btn-next').removeClass('d-flex');
        $('.not-found').removeClass('d-none');
        $('.not-found').addClass('d-flex');
        $('.content').addClass('d-none');
        $('.content').removeClass('d-flex');
        $('body').css('height', '100vh');
    }
}



