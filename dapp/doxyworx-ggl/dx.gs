function dx_templates() {
  var report_forms_folder = get_folder(false, "report_contents", "default");
  // report_forms_folder = DriveApp.getFolderById("");

  var res = [];
  var file_i = report_forms_folder.getFiles();
  while(file_i.hasNext()) {
    var file = file_i.next();


    res.push({
      "id": file.getId(),
      "name": file.getName(),
      // "blob": file.getBlob(),
      // "html": HtmlService.createHtmlOutput(file.getBlob()),
      "html": getGoogleDocumentAsHTML(file.getId()),
    });

  }
  // Logger.log(res[0].html);

  res = [
    res[0],
    res[1],
    res[2],
  ]

  return res;
}

function addDx(docId) {
  insertDocinCurrentDoc(docId);
  return true;
}

function getGoogleDocumentAsHTML(fileId){
  // var forDriveScope = DriveApp.getStorageUsed(); //needed to get Drive Scope requested
  var url = "https://docs.google.com/feeds/download/documents/export/Export?id=" + fileId + "&exportFormat=html";
  var param = {
    method      : "get",
    // headers     : {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
    muteHttpExceptions:true,
  };
  var html = UrlFetchApp.fetch(url,param).getContentText();
  return html;
}

function insertDocAtPosition(srcDoc, dstPos, dstBody) {
  var dstE = null;
  var dstP = dstPos.getElement();
  var t = dstP.getType().toString();
  while(null != dstP && DocumentApp.ElementType.BODY_SECTION != dstP.getType()) {
    dstE = dstP;
    dstP = dstE.getParent();
  }
  var dstIdx = dstBody.getChildIndex(dstE) + 1;

  dstBody.insertParagraph(dstIdx, "\n");

  var srcBody = srcDoc.getBody();
  for(var i = srcBody.getNumChildren() - 1; i >= 0; --i){ //run through the elements of the template doc's Body.
    var e = srcBody.getChild(i).copy();
    body_insert_e(dstBody, dstIdx, e)
  }
}

function body_insert_e(body, index, e) {
  switch (e.getType()) { //Deal with the various types of Elements we will encounter and append.
    case DocumentApp.ElementType.PARAGRAPH:
      body.insertParagraph(index, e);
      break;
    case DocumentApp.ElementType.LIST_ITEM:
      body.insertListItem(index, e);
      break;
    case DocumentApp.ElementType.TABLE:
      body.insertTable(index, e);
      break;
    case DocumentApp.ElementType.HORIZONTAL_RULE:
      insertHorizontalRule(childIndex, e)
      break;
    case DocumentApp.ElementType.PAGE_BREAK:
      body.insertPageBreak(index, e);
      break;
    case DocumentApp.ElementType.INLINE_IMAGE:
      body.insertImage(index, e);
      break;
  }
}

function insertDocinCurrentDoc(srcDocId) {
  var dstDoc = DocumentApp.getActiveDocument();
  var dstBody = dstDoc.getBody();
  var pos = dstDoc.getCursor();
  Logger.log(pos);
  if(!pos) {
    pos = dstDoc.newPosition(dstBody.getChild(dstDoc.getBody().getNumChildren() - 1), 0);
  }
  Logger.log(pos);
  insertDocAtPosition(DocumentApp.openById(srcDocId), pos, dstBody);
}

function test_insertDocAtCurrentDoc() {
  var srcDocId = "1799Wuk0JyqeikramFjILrorVDiZ39gytvY5sI137LrA";
  insertDocAtCurrentDoc(srcDocId);

}
