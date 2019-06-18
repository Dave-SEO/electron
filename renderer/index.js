const {ipcRenderer} = require('electron')
let {$} = require('./helps')
$('add_music').addEventListener('click',()=>{
    ipcRenderer.send('add_music')
})