let YOUTUBE_API_URL_SEARCH = 'https://www.googleapis.com/youtube/v3/search/';
//let YOUTUBE_API_KEY = 'AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk';
let YOUTUBE_API_KEY = 'AIzaSyCoejMFrTxc93iRK2MkuaSwHQHdm2BvqsI';
let PREV_TOKEN = '';
let NEXT_TOKEN = '';
let keywords = '';
let querySearch = '';

$(".search-button").click(function(event) {
	        event.preventDefault();
	        keywords = $('input').val();
	        requestSearch(getQuerySearch(keywords, 'submit'), getSearchData);
	        document.title = `YouTube Search - ${keywords}`;

		});

 $('.btn-next').click(function() {
            $('.btn-previous').removeAttr('disabled');
            requestSearch(getQuerySearch(keywords, 'next'), getSearchData);
        });

 $('.btn-previous').click(function() {
            requestSearch(getQuerySearch(keywords, 'prev'), getSearchData);
            if (PREV_TOKEN == undefined) {
                $('.btn-previous').attr('disabled', true);
            }
        });

function getQuerySearch(searchTerm, task) {
    querySearch = {
        part: 'snippet',
        key: YOUTUBE_API_KEY,
        q: searchTerm,
        maxResults: 10,
        type: 'video'
    }

    if (task === 'next') {
        querySearch.pageToken = NEXT_TOKEN;
    }

    if (task === 'prev') {
        querySearch.pageToken = PREV_TOKEN;
    }

    return querySearch;
}

function requestSearch(query, callback) {
    $.getJSON(YOUTUBE_API_URL_SEARCH, query, callback);
}

function getSearchData(data) {

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



