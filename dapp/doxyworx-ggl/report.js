
function getStudyInfo(astiuid) {
  if (!astiuid) {
    astiuid = stiuid;
  }
  return _mock_be_api_getStudyInfo(astiuid);
}

function be_bm_fields(atmpl_id){
  return _mock_be_bm_fields(atmpl_id);
}

function create_report_from_template(template, report_path) {
  var report =  make_file_copy(template, report_path);
  var file = null;

  file = drive_get_sibling(template.getId(), "template.json");
  report_path.pop();
  report_path.push("template.json");
  make_file_copy(file, report_path);

  file = drive_get_sibling(template.getId(), "content");
  report_path.pop();
  report_path.push("content");
  make_file_copy(file, report_path);

  // file = drive_get_sibling(template.getId(), "data.json");
  // report_path.pop();
  // report_path.push("data.json");
  // make_file_copy(file, report_path);

  return report;
}

function report_make_active_raddoc_email(radcenter, study_iuid, raddoc_email) {
  var raddoc_path = get_study_raddoc_path(radcenter, study_iuid, raddoc_email);
  var active_link = [...raddoc_path];
  active_link.pop();
  active_link.push("__ACTIVE__");
  return make_folder_link(raddoc_path, active_link);
}

function report_img(report_id, img) {
  var report = DocumentApp.openById(report_id);
  var body = report.getBody();
  // return "12";
  var img = body.appendImage(img);
  return img.getHeight();
}

function study_active_report_img(study_iuid, img) {
  var report = get_study_active_raddoc_path(ACCOUNT.radcenter_id, study_iuid, "__ACTIVE__");
  var report = DocumentApp.openById(report_id);
  var body = report.getBody();
  // return "12";
  var img = body.appendImage(img);
  return img.getHeight();
}

function report_get_data(report_id) {
  var dataFile = drive_get_sibling(report_id, "data.json", true);
  var content = dataFile.getAs("application/json");
  var res = JSON.parse(content.getDataAsString());
  return res;  
}

function report_set_data(report_id, report_data) {
  var dataFile = drive_get_sibling(report_id, "data.json", true);
  var content = JSON.stringify(report_data);
  return dataFile.setContent(content);
}

function report_data_fillin(report_id) {
  var contentDoc = DocumentApp.openById(drive_get_sibling(report_id, "content", true).getId());
  var report_doc = DocumentApp.openById(report_id);
  // var report_data = report_get_data(report_id);
  var template_data = template_get_data_for_report(report_id);

  for(var place in template_data["bookmarks"]) {
    var value = get_deep(report_data, place);
    if(!value)
      continue;

    var bookmark_id = template_data["bookmarks"][place];
    var bookmark = contentDoc.getBookmark(bookmark_id);
    bookmark.getPosition();
    bookmark.getPosition().insertText(value);
  }
}

function test_report_data_fillin() {
  var report_id = "1_bKRgqCmL4tH-0g27b1sgCp_gPcU7JY3cZN8MEKKqPE";
  return report_data_fillin(report_id);
}

function test_report_get_data() {
  var report_id = "1_bKRgqCmL4tH-0g27b1sgCp_gPcU7JY3cZN8MEKKqPE";
  return report_get_data(report_id);
}

function test_report_set_data() {
  var report_id = "1_bKRgqCmL4tH-0g27b1sgCp_gPcU7JY3cZN8MEKKqPE";
  var report_data = {
    "report_id": report_id,
    "k1": "v1",
  };
  return report_set_data(report_id, report_data);
}

function test_create_report_from_template() {
  var template = select_template("", "", "");
  report_path = ["tmp", "f1", "f2", "report"];
  create_report_from_template(template, report_path);
}

function copy_content(src_id, dst_id) {
  var content = DriveApp.getFileById(src_id).getBlob();
  var file = {
    id: dst_id,
  };

  file = Drive.Files.update(file, dst_id, content);
  Logger.log('ID: %s, File size (bytes): %s', file.id, file.fileSize);

}

function report_fill_content() {
  var dst_id = DocumentApp.getActiveDocument().getId();
  var src_id = drive_get_sibling(dst_id, "content").getId();
  return copy_content(src_id, dst_id);
}


function test_copy_content() {
  var src_id = "18wiFWpXEMtsm5YKCi_n-wVTFGmknDuzfcF7LRg92_WE";
  var dst_id = "1_bKRgqCmL4tH-0g27b1sgCp_gPcU7JY3cZN8MEKKqPE";
  copy_content(DriveApp.getFileById(src_id), DriveApp.getFileById(dst_id))
}
