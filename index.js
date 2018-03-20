const electron = require('electron');
const url = require('url');
const path = require('path');
const firebase = require('./config');

const {app, BrowserWindow, Menu, ipcMain} = electron;

// SET ENV

// process.env.NODE_ENV = 'production';

let mainWindow;
let aslideShowWindow;

// Listen for the app to be ready

app.on('ready', function() {
	// Create new Window

	mainWindow = new BrowserWindow({
		fullscreen: true,
		backgroundColor: '#333',
		autoHideMenuBar: true
	});

	// Load html into window

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	// Quit App when closed

	mainWindow.on('closed', function() {
		app.quit();
	});

	// Build menu from template

	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

	// Insert Menu

	Menu.setApplicationMenu(mainMenu)

	// Change Menu Visibility

	let menuVisible = false;
	mainWindow.on('click', function() {
		if (menuVisible)
			mainMenu.hideWindow();
		else
			mainMenu.showWindow();
		menuVisible = !menuVisible;
	});
});

function createSlideShowWindow(posts) {

    slideShowWindow = new BrowserWindow({
        fullscreen: true,
        title: 'Slide Show',
        autoHideMenuBar: true,
        backgroundColor: '#333',
    });

    // Load html into window

    slideShowWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'slideshow.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Send posts on load finish

    slideShowWindow.webContents.on('did-finish-load', function() {
    	slideShowWindow.webContents.send("data:send", posts);
    });

    // Garbabe collection handle

    slideShowWindow.on('close', function() {
        slideShowWindow = null;
    });
}

ipcMain.on('window:slideShow', function(e, item) {
	createSlideShowWindow(item);
});

ipcMain.on("close:slideShow", function(e, item) {
	slideShowWindow.close();
});

function goToNextPic() {

}

function configureWifi() {

}

const mainMenuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Next Picture',
				accelerator: 'CommandOrControl+N',
				click() {
					goToNextPic();
				}
			},
			{
				label: 'Quit',
				accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
				click() {
					app.quit()
				}
			}
		]
	},
	{
		label: 'Options',
		submenu: [
			{
				label: 'Wifi Settings',
				click() {
					configureWifi();
				}
			}
		]
	}
];

// If mac, add empty object to menu

if (process.platform == "darwin") {
	mainMenuTemplate.unshift({});
}

// Add developer tools item if not in production

if(process.env.NODE_ENV !== 'production') {
	mainMenuTemplate.push({
		label: 'Developer Tools',
		submenu: [
			{
				label: 'Toggle Dev Tools',
				accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
				click(item, focussedWindow) {
					focussedWindow.toggleDevTools();
				}
			},
			{
				role: 'reload',
			}
		]
	});
}