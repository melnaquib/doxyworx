function gs_alert(prompt) {
  return DocumentApp.getUi().alert(prompt);
}

function setupUi() {
  addMenus_start();
}

function ui_setup_side_panel() {
  var widget = HtmlService.createTemplateFromFile("ui_sidebar").evaluate();
  widget.setTitle("⚕️ ReadyDX©");
  DocumentApp.getUi().showSidebar(widget);
}

function ui_code_prompt() {
    var ui = DocumentApp.getUi();
    var rsp = ui.prompt('Ready Two-factor Auth.', 'Please Enter access code provided', ui.ButtonSet.OK_CANCEL);

    if(ui.Button.OK != rsp.getSelectedButton())
      return null;
      
    return "1111" == rsp.getResponseText();
}

function start_ui() {
  var rsp = ui_code_prompt();
  if(false == rsp)
    DocumentApp.getUi().alert("Wrong Code Entered!");

  if(true !== rsp)
    return;

  addMenus();
  ui_setup_side_panel();
  report_fill_content();
}

'📡 📠 👨‍⚕‍ 🔬 ⚗ c 🎞   🌐  🔐'
function addMenus() {
  var ui = DocumentApp.getUi();

  ui.createMenu('📠 ReadyVU')

      .addItem('🎞 Open Viewer', 'viewer_open')
      .addSeparator()

      .addItem('📇 Case Information', 'study_info')
      .addSeparator()

      .addItem('🎤  start record', 'record_start')
      .addItem('🎧 play record', 'record_play')
      .addItem('🚮 delete record', 'record_stop')
      .addSeparator()

      .addItem('📝 Send To Transcribe', 'transcribe_send')
      .addSeparator()

      .addItem('🔏 Sign and Send Report', 'report_finalize')
      .addSeparator()

      .addItem('📔 Select Template', 'openSelectTemplate')
      .addItem('🔄 Reload Study Information', 'resetStudyInfo')
      .addSeparator()

      .addItem('📠 About ReadyVU...', "readyvu_about")
      .addItem('📞 Contact ReadyVU...', "readyvu_contact")

      .addToUi();

  }
  
function addMenus_start() {
  var ui = DocumentApp.getUi();

  ui.createMenu('👨‍⚕️ Doctor @ReadyVU')

      .addItem('🔐 Enter Access Code…', 'start_ui')
      .addSeparator()

      .addItem('Save Template', 'openSelectTemplate')
      .addSeparator()

      .addItem('📞 Contact ReadyVU...', "readyvu_contact")

      .addToUi();

}

function show_about() {

}