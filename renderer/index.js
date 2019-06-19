const {ipcRenderer} = require('electron')
let {$,cordtime} = require('./helps')
let tracksall = []
$('add_music').addEventListener('click',()=>{
    ipcRenderer.send('add_music')
})
console.log(window.navigator)

const runderMainHtml = (file)=>{
   let contentMain = $('contentMain')
   let fileCOntent = file.reduce((html, list)=>{
        html += `<li  class="row list-group-item d-flex justify-content-center align-items-center">
            <div class="col-10">
                  <i class="fas fa-music mr-2 text-primary"></i>
                  <span>${list.fileName}</span>
            </div>
            <div class="col-2">
                <i class="fas fa-play mr-2 text-primary" data-id = ${list.id}></i>
                <i class="fas fa-trash-alt text-primary" data-id = ${list.id}></i>
            </div>
        </li>`
        return html
    }, '')
    contentMain.innerHTML = `<ul class="list-group">${fileCOntent}</ul>`
}
ipcRenderer.on('getTracks',(event, arg)=>{
    console.log('event--->',arg)
    runderMainHtml(arg)
    tracksall = arg
})
const musicAudio = new Audio()
let currenttrack

const rederPlayerHtml = (name, duration)=>{
    const player = $('player-status')
    const html = `<div class="col font-weight-bold">
                    正在播放：${name}
                </div>
                <div class="col">
                    <span id ="current-seeker">00:00</span> / ${cordtime(duration)}
                </div>`
    player.innerHTML = html
}
const updateprogressHTML = (current,duration)=>{
   const seeker = $('current-seeker')
   const bar = $('progress_bar_id')
   const progress = Math.floor(current / duration * 100)
   seeker.innerHTML = cordtime(current)
   //console.log(progress)
   bar.innerHTML = progress + '%'
   bar.style.width = progress + '%'
}
musicAudio.addEventListener('loadedmetadata',()=>{
    // 渲染播放器状态
    rederPlayerHtml(currenttrack.fileName, musicAudio.duration)
})
musicAudio.addEventListener('timeupdate',()=>{
    // 更新播放器状态
    updateprogressHTML(musicAudio.currentTime, musicAudio.duration)
})
$('contentMain').addEventListener('click', (event)=>{
    event.preventDefault()
    const {classList, dataset} = event.target
    const id = dataset && dataset.id
    if(id && classList.contains('fa-play')){
        if(currenttrack && currenttrack.id === id){
            musicAudio.play()
            classList.replace('fa-play','fa-pause')
        }else{
            currenttrack = tracksall.find(track =>track.id === id)
            musicAudio.src = currenttrack.path
            musicAudio.play()
            let restIcon = document.querySelector('.fa-pause')
            if(restIcon){
                restIcon.classList.replace('fa-pause','fa-play')
            }
            classList.replace('fa-play','fa-pause')
        }
    }else if(id && classList.contains('fa-pause')){
        musicAudio.pause()
        classList.replace('fa-pause','fa-play')
    }else if(id && classList.contains('fa-trash-alt')){
        // 发送事件，删除音乐    
        ipcRenderer.send('delMusic',id)
    }
})