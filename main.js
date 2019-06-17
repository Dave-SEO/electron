let {app,BrowserWindow} = require('electron')
app.on('ready',()=>{
    const MainWindow = new BrowserWindow({
      width: 800,
      height:600,
      webPreferences:{
        // 可以使用nodeAPI
        nodeIntegration: true
      }
    })
    MainWindow.loadFile('index.html')
    const secondWindow = new BrowserWindow({
      width: 400,
      height: 300,
      webPreferences: {
        nodeIntegration: true
      },
      parent: MainWindow
    })
    secondWindow.loadFile('second.html')
})