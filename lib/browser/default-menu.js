'use strict'

const { shell, Menu } = require('electron')
const v8Util = process.atomBinding('v8_util')

const isMac = process.platform === 'darwin'

const setDefaultApplicationMenu = () => {
  if (v8Util.getHiddenValue(global, 'applicationMenuSet')) return

  const helpMenu = {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () {
          shell.openExternal('https://electronjs.org')
        }
      },
      {
        label: 'Documentation',
        click () {
          shell.openExternal(
            `https://github.com/electron/electron/tree/v${process.versions.electron}/docs#readme`
          )
        }
      },
      {
        label: 'Community Discussions',
        click () {
          shell.openExternal('https://discuss.atom.io/c/electron')
        }
      },
      {
        label: 'Search Issues',
        click () {
          shell.openExternal('https://github.com/electron/electron/issues')
        }
      }
    ]
  }

  const template = [
    ...(isMac ? [{ role: 'appMenu' }] : []),
    { role: 'fileMenu' },
    { role: 'editMenu' },
    { role: 'viewMenu' },
    { role: 'windowMenu' },
    helpMenu
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

module.exports = {
  setDefaultApplicationMenu
}
