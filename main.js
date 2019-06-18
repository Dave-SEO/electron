let {app,BrowserWindow,ipcMain,dialog} = require('electron')

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
})