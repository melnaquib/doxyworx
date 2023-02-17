function getUi() {
  return SpreadsheetApp.getUi();
}

function gs_alert(prompt) {
  return getUi().alert(prompt);
}

function setupUi() {
  // addMenus_start();
  addMenus();
}

'📡 📠 👨‍⚕‍ 🔬 ⚗ c 🎞   🌐  🔐'
function addMenus() {
  var ui = getUi();

  var menuTasks = ui.createMenu("My Tasks")
      .addItem('🖄 Make Workflow', 'makeWorkflow')
      .addSeparator()
      .addItem('🖄 Make Workflow', 'make_workflow');

  var menuMain = ui.createMenu('🏗 DoxyWorx')
      .addItem('🏗 Doxy Worx', 'workflowMake')
      .addSeparator()
      .addSubMenu(menuTasks)
      .addItem('About DoxyWorx...', "show_about")
      .addToUi();
}
  
function addMenus_start() {
  var ui = getUi();

  ui.createMenu('👨‍⚕️ Doctor @ReadyVU')

      .addItem('🔐 Enter Access Code…', 'start_ui')
      .addSeparator()

      .addItem('Save Template', 'openSelectTemplate')
      .addSeparator()


      .addToUi();

}

function show_about() {

}

function show_contact() {
  
}
