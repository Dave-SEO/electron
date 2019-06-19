const {ipcRenderer} = require('electron')
let {$} = require('./helps')
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
                <i class="fas fa-trash-alt text-primary"></i>
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
$('contentMain').addEventListener('click', (event)=>{
    event.preventDefault()
    const {classList, dataset} = event.target
    const id = dataset && dataset.id
    if(id && classList.contains('fa-play')){
       const currenttrack = tracksall.find(track =>track.id === id)
       musicAudio.src = currenttrack.path
       musicAudio.play()
       classList.replace('fa-play','fa-pause')
    }
})