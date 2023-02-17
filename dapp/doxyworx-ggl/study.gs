// const doc = DocumentApp.getActiveDocument();
// const docId = doc.getId();

// const stiuid = docProp("stiuid");
// const tmpl_id = docProp("tmpl_id");
// const author_email = docProp("author_email");
// var study_info = getStudyInfo(stiuid);



function load_docStudyInfo() {
  docStudyInfo = JSON.parse(docProps().getProperty("docStudyInfo"));
  if (!docStudyInfo)
    resetStudyInfo();
}

function resetStudyInfo() {
  docStudyInfo = getStudyInfo(stuid);
}

function save_docStudyInfo() {
  docProps().setProperty("docStudyInfo", JSON.stringify(docStudyInfo));
}


// function getStudyInfo(stuid) {
//   var cfg = CFG['ris']['api'];

//   var query = '"Apps Script" stars:">=100"';
//   var url = 'https://' + cfg['host'] + '/api/v1/study?stuid=' + stuid + '&useremail=' + useremail;
//   var rsp = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
//   Logger.log(rsp);
//   var res = JSON.parse(rsp.getContentText());
//   Logger.log(res);
//   return res;
// }

function getStudyInfo(astiuid) {
  if (!astiuid) {
    astiuid = stiuid;
  }
  return _mock_be_api_getStudyInfo(astiuid);
}
