$(document).ready(function () {
    hidebtnMusicInsert();
    hideMyMovie()
});

function mytitleEdit() {
    $('div.mytitle').css('height', '350px');
    $('p#weatherQuestion').css('font-size', '1.5em')
    $('p#weatherQuestion').css('margin-bottom', '20px')
    $('div#weatherWrap > img').css('width', '80px')
    $('div#weatherBottom').hide();
    showbtnMusicInsert()
}
function weatherImgToGray() {
    $('#imgSunny').css('content', "url('../static/src/img/gray-sunny.png')")
    $('#imgCloudy').css('content', "url('../static/src/img/gray-cloudy.png')")
    $('#imgRainy').css('content', "url('../static/src/img/gray-rainy.png')")
    $('#imgSnow').css('content', "url('../static/src/img/gray-snow.png')")
}
function sunnyClick() {
    mytitleEdit();
    weatherImgToGray();
    $('#imgSunny').css('content', "url('../static/src/img/color-sunny.png')");
    mList_select('sunny');
    $('#weatherLabel').text('sunny');
    hideMyMovie();
}
function cloudyClick() {
    mytitleEdit();
    weatherImgToGray();
    $('#imgCloudy').css('content', "url('../static/src/img/color-cloudy.png')");
    mList_select('cloudy');
    $('#weatherLabel').text('cloudy');
    hideMyMovie();
}
function rainyClick() {
    mytitleEdit();
    weatherImgToGray();
    $('#imgRainy').css('content', "url('../static/src/img/color-rainy.png')");
    mList_select('rainy');
    $('#weatherLabel').text('rainy');
    hideMyMovie();
}
function snowClick() {
    mytitleEdit();
    weatherImgToGray();
    $('#imgSnow').css('content', "url('../static/src/img/color-snow.png')");
    mList_select('snow');
    $('#weatherLabel').text('snow');
    hideMyMovie();
}

function showbtnMusicInsert() {
    $('#btnMusicInsert').show();
}

function hidebtnMusicInsert() {
    $('#btnMusicInsert').hide();
}

function open_box() {
    $('#post-box').show()
}

function close_box() {
    $('#post-box').hide()
}

function showMyMovie() {
    $('#mymovie').show();
}

function hideMyMovie() {
    $('#mymovie').hide();
}

function youtubePlay(value) {
    const EMBED = 'https://www.youtube.com/embed/'
    const ytbId = value;
    const ytbUrl = EMBED + ytbId;
    $('#mymovie iframe').attr('src', ytbUrl); // iframe의 src 속성 값에 동영상 URL 할당
    $('#ytbIdLabel').text(ytbId);
    showMyMovie()
    close_box()
    mCmt_select()
}

function imgClickMoviePlay(button) {
    var ytbId = $(button).siblings(".card-body").find(".ytbId").text();
    // console.log(ytbId);
    youtubePlay(ytbId);
}

function h5ClickMoviePlay(button) {
    var ytbId = $(button).siblings('p.card-text.ytbId').text();
    // console.log(ytbId);
    youtubePlay(ytbId);
}