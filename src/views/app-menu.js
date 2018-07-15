const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;

module.exports = class AppMenu {
  static setup() {
    const template = AppMenu.getBasicTemplate();
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }

  static getBasicTemplate() {
    const template = [
      { label: 'Edit',    submenu: [
        { role: 'undo' }
      , { role: 'redo' }
      , { type: 'separator' }
      , { role: 'cut' }
      , { role: 'copy' }
      , { role: 'paste' }
      , { role: 'pasteandmatchstyle' }
      , { role: 'delete' }
      , { role: 'selectall' } ] }
    , { label: 'View',    submenu: [
        { role: 'reload'
        , accelerator: 'CmdOrCtrl+R'
        , click(item, focusedWindow) { if (focusedWindow) focusedWindow.reload(); } }
      , { role: 'togglefullscreen'} ] }
    , { role: 'Window', submenu: [
        { role: 'minimize' }
      , { role: 'close' } ] }
    ];

    if (process.platform === 'darwin') {
      template.unshift({
        label: app.getName(),
        submenu: [
          { role: 'about' }
        , { type: 'separator' }
        , { role: 'services', submenu: [] }
        , { type: 'separator' }
        , { role: 'hide' }
        , { role: 'hideothers' }
        , { role: 'unhide' }
        , { type: 'separator' }
        , { role: 'quit' }
        ]
      });

      template[3].submenu = [
        { label: 'Close',               role: 'close'    },
        { label: 'Minimize',            role: 'minimize' },
        { label: 'Zoom',                role: 'zoom'     },
        { type: 'separator' },
        { label: 'Bring All to Front',  role: 'front'    }
      ];
    }

    return template;
  }
};
