/** @license PMH @DiscordUser PMH Studio / PMH#7086 */

const electron = require('electron') //  electron 모듈을 불러옵니다
const app = electron.app // eletron을 실행합니다
let mainWindow // 나중에 여기에 창을 넣습니다

function createMainWindow () { // 창을 만드는 함수입니다 
  mainWindow = new electron.BrowserWindow({ // 새로운 창을 만듭니다
    webPreferences: {
      nodeIntegration: true // 새로운 창에서는 nodejs의 기능을 쓸수있습니다
    },
    autoHideMenuBar: true // 쓸모없는 상단 메뉴를 가립니다 ex) 파일, 편집, 선택영역, 보기, 이동, 디버그, 터미널, 도움말
  })
  mainWindow.loadFile('./src/index.html') // 새로운 창에 src/index.html를 로딩합니다
  mainWindow.on('closed', () => { // 만약 이 새로운 창이 꺼졌을때
    mainWindow = null // 메모리에 있는 걸 다 없에 버립니다 
  })
}

app.on('ready', () => { // 윈도우 혹은 리눅스에서 electron이 시작되었을때
  if (!mainWindow) { // 창이 없다면
    createMainWindow() // 위에 있는 함수를 실행합니다
  }
})

app.on('activate', () => { // 맥에서 electron이 시작되었을때
  if (!mainWindow) { // 창이 없다면
    createMainWindow() // 위에 있는 함수를 실행합니다 
  }
})

app.on('windows-all-closed', () => { // 창이 다 꺼지면
  if (process.platform !== 'darwin') { // 맥이 아니라면
    app.quit() // electron을 종료합니다
  }
})
