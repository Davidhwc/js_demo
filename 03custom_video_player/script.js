//获取节点
const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

//点击播放或暂停
function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

//点击Video图标的更新
function updatePlayIcon() {
    if (video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}
//点击video更新进度条和时间戳
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;

    //获取分钟数
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }

    //获取秒数
    let secs = Math.floor(video.currentTime % 60)
    if (secs < 10) {
        secs = '0' + String(secs);
    }
    timestamp.innerText = `${mins}:${secs}`;
}

//停止视频
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

//拖动进度条时改变播放内容和时间戳
function setVideoProgress(e) {
    if (e.type == 'mousedown') {
        video.pause();
    } else if (e.type == 'mouseup') {
        video.play();
    } else if (e.type == 'change') {
        video.currentTime = progress.value * video.duration / 100;
    }
}

//添加事件监听
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);
progress.addEventListener('mousedown', setVideoProgress);
progress.addEventListener('mouseup', setVideoProgress);
