let {app,BrowserWindow,ipcMain,dialog} = require('electron')
let {DataStore} = require('./musicData')
let myData = new DataStore({name:'Music Data'})
class appWindow extends BrowserWindow {
  constructor(config, file){
    const basicConfig = {
      width: 800,
      height:600,
      webPreferences:{
        // 可以使用nodeAPI
        nodeIntegration: true
      }
    }
    const finalConfig = {...basicConfig, ...config}
    super(finalConfig)
    this.loadFile(file)
  }
}
app.on('ready',()=>{
    const MainWindow = new appWindow({},'./renderer/index.html')
 
   // MainWindow.loadURL('http://github.com')
    MainWindow.webContents.on('did-finish-load', ()=>{
        MainWindow.send('getTracks', myData.getTrack())
    })
    ipcMain.on('add_music',()=>{
      const addWindow = new appWindow({
        width: 500,
        height:400,
        parent: MainWindow
      },'./renderer/add.html')
    //  event.sender.send('reply','hello from main')
    })
    ipcMain.on('select_music', (event)=>{
      dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections'],
        filters: [{ name: 'Music', extensions: ['mp3']}],
      },(file)=>{
        // console.log(file)
        if(file){
          event.sender.send('selected_music', file)
        }
      })
    })
    ipcMain.on('export_music', (event,arg)=>{
       const updataTrack =  myData.addTrack(arg).getTrack()
       MainWindow.send('getTracks', updataTrack)
      //  console.log('app.getPath',app.getPath('userData'))
      //  console.log('updataTrack', updataTrack)
    })
    ipcMain.on('delMusic',(event,id)=>{
      let track = myData.deleteTrack(id).getTrack()
      MainWindow.send('getTracks', track)
    })
})