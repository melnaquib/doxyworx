function viewerUi() {
  var htmlOutput = HtmlService
    .createHtmlOutput('<p>A change of speed, a change of style...</p>')
    .setWidth(250)
    .setHeight(300);

  return htmlOutput;
}

// Ui.showModalDialog


function test(){
showURL("http://www.google.com")
}
//
function showURL(href){
  var app = UiApp.createApplication().setHeight(50).setWidth(200);
  app.setTitle("Show URL");
  var link = app.createAnchor('open ', href).setId("link");
  app.add(link);  
  var doc = SpreadsheetApp.getActive();
  doc.show(app);
  }

function viewer_open() {

  // showURL("http://www.google.com")

  //  var html = HtmlService.createHtmlOutputFromFile('ohif_viewer').setHeight(600).setWidth(800);
  // DocumentApp.getUi().showModalDialog(html.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME), 'View Images...');

  // var html_file = 'ohif_viewer';
  var report_id = DocumentApp.getActiveDocument().getId();
  // var study_iuid = get_report_study(report_id);
  var study_iuid = get_report_study(report_id)["study_iuid"];

  // gs_alert(DocumentApp.getActiveDocument().getId());
  // gs_alert(study_iuid);
  var url = 'http://localhost/api/static/viewer/index.html/viewer/' + study_iuid + '/?report_id=' + report_id;
  var html_file = "https://unpkg.com/@ohif/viewer@4.12.7/dist/index.html/";
  // var html = '<p><a href="' + url + '" target="_blank">Open Viewer 🎞 </a>.</p>';
  var html = '<p><a id="viewer_link" href="' + url + '" >🎞 Loading ReadyVUR ...</a>.</p> ' +
  '<script> window.setTimeout(function (){ document.getElementById("viewer_link").click();}, 1000); </script> '
  ;
  var html_output = HtmlService.createTemplate(html);
  html_output = html_output.evaluate()
  // .setWidth(1024).setHeight(800)
  .setWidth(10000).setHeight(10000)
  ;
  // html =  template.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);

  DocumentApp.getUi().showModalDialog(html_output, '🎞 ReadyVUR');
  

}

function get_viewer_url() {

  var report_id = DocumentApp.getActiveDocument().getId();
  var study_iuid = get_report_study(report_id)["study_iuid"];

  var url = 'http://localhost/api/static/viewer/index.html/viewer/' + study_iuid + '/?report_id=' + report_id;
  return url;
}
