function doc_add_doxyworx_ui() {
  var srcId = getUi().prompt("Enter Source Document ID");

  var dstId = doc_add_doxyworx(srcId);

  var dstId = getUi().prompt("Enter Source Document ID");
  const dstUrl = "https://docs.google.com/spreadsheets/d/" + dstId + "/edit";

  getUi().alert("Created New Doxy Worx Document: \n" + dstUrl);
  ui_openNewTab(dstUrl);


}

function doc_add_doxyworx(srcId) {
  var srcFile = DriveApp.getFileById(srcId);
  if("application/vnd.google-apps.spreadsheet" !=  srcFile.getMimeType()) {
    getUi().alert("Couldn't find Google Spreadsheet with id; " + targetId);
    return;
  }
  var srcDoc = SpreadsheetApp.openById(srcId);
  var src = srcDoc.getDataRange();

  var dstDoc = getDoc().copy(srcDoc.getName());
  const dstDocId = dstDoc.getId();
  dstDoc.getDataRange().clearFormat();
  dstDoc.getDataRange().clearNote();
  dstDoc.getDataRange().clearContent();
  dstDoc.getDataRange().clear();
  var dst = dstDoc.getRange(src.getA1Notation());

  // src.copyFormatToRange(dst);
  // src.copyValuesToRange(dst);
  // src.copyTo(dst);

  dst.setBackgrounds(src.getBackgrounds());
  dst.setBackgroundObjects(src.getBackgroundObjects());
  dst.setTextStyles(src.getTextStyles());
  dst.setBackgroundObjects(src.getBackgroundObjects());
  dst.setFormulas(src.getFormulas());
  // dst.setValues(src.getValues());
  dst.setValues(src.getValues());
  dst.setNotes(src.getNotes());

  console.log("COPY ", dstDocId);
  return dstDocId;
  // ui_openNewTab(dstDocUrl)

}

function test_doc_add_doxyworx() {
  var targetId = "18mjc_HwHpfYhgInVbrecOTFqmWqUj9FN7hmDp_Y9fSI";
  // var targetId = "1tzLFqegPE8bpwWoWXLg37DhOJDNS7b26h0qEIOfiLJc";
  doc_add_doxyworx(targetId);
}
