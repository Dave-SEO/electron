const {ipcRenderer} = require('electron')
let {$} = require('./helps')
const path = require('path')

$('select_music').addEventListener('click',()=>{
    ipcRenderer.send('select_music')
})
let musicData = []
$('export_music').addEventListener('click',()=>{
    ipcRenderer.send('export_music', musicData)
})

const renderHTMList = (file)=>{
    let container = $('container-my')
   let musicItem =  file.reduce((html, music)=>{
        html+= ` <li class="list-group-item">${path.basename(music)}</li>`
        return html
    },'')
    container.innerHTML = `<ul class="list-group">${musicItem}</ul>`
}
ipcRenderer.on('selected_music', (event,arg)=>{
    //console.log(arg)
    if(Array.isArray(arg)){
        renderHTMList(arg)
        musicData = arg
    }
})