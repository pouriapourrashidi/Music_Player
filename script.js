const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist:'Jacinto'
    },
    {
        name: 'jacinto-2',
        displayName: 'Electric Chill',
        artist:'Jacintoo'
    },
    {
        name: 'jacinto-3',
        displayName: 'Electric Chill Machine is',
        artist:'Jacintooo'
    },
    {
        name: 'metric-1',
        displayName: 'Electric',
        artist:'Jacintoooo'
    },
]


let isPlaying = false;

function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}

function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}

playBtn.addEventListener('click',()=>{isPlaying? pauseSong():playSong()});

function loadSong(song){
    title.textContent=song.displayName;
    artist.textContent=song.artist;
    music.src = `/music/${song.name}.mp3`;
    image.src = `/img/${song.name}.jpg`;
}

let songIndex = 0;

function nextSong(){
    songIndex++;
    if (songIndex > songs.length -1 ){
        songIndex=0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function preSong(){
    songIndex--;
    if (songIndex < 0 ){
        songIndex=songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

loadSong(songs[songIndex]);

function updateProgressBar(event){
    // console.log(event);
    if(isPlaying){
        const {duration, currentTime} = event.srcElement;
        const progressPercent = currentTime/duration * 100;
        progress.style.width = `${progressPercent}%`;
        const durationMin = Math.floor(duration/60);
        const durationSec = Math.floor(duration - (durationMin*60));
        if (durationSec){
            if (durationSec < 10){
                durationEl.textContent = `${durationMin}:0${durationSec}`;
            }else{
                durationEl.textContent = `${durationMin}:${durationSec}`;
            }
        }
        const currentTimeMin = Math.floor(currentTime/60);
        const currentTimeSec = Math.floor(currentTime - (currentTimeMin*60));
        if (currentTimeSec < 10){
            currentTimeEl.textContent = `${currentTimeMin}:0${currentTimeSec}`;
        }else{
            currentTimeEl.textContent = `${currentTimeMin}:${currentTimeSec}`;
        }

    }
}

function setProgressBar(event){
    // console.log(event);
    const width = event.srcElement.clientWidth;
    const clickX = event.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width)*duration;
    // console.log(width,clickX);
}

prevBtn.addEventListener('click', preSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate',updateProgressBar);
music.addEventListener('ended',nextSong);
progressContainer.addEventListener('click',setProgressBar);