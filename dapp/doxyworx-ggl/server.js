function doGet(e) {
  return doHandle(e, "GET")
}

function doPost(e) { 
  return doHandle(e, "POST")
}

function doHandle(e, method) {
  var route = e.parameter["route"]
  var endpoint = route;
  var result = this["api_" + endpoint](e, method);
  return ContentService.createTextOutput(JSON.stringify(result) ).setMimeType(ContentService.MimeType.JSON); 
}

function api_get_report(e, method) {
  var report_data = JSON.parse(e.postData.contents);
  var result = get_report(e.parameter["radcenterid"], e.parameter["study_iuid"], e.parameter["raddoc_email"], report_data);
  return result;
  // return JSON.stringify(result);
  // return ContentService.createTextOutput(JSON.stringify(result) ).setMimeType(ContentService.MimeType.JSON); 

}

function get_report(radcenter_id, study_iuid, raddoc_email, report_data) {
  var report_path = get_report_folder_path(radcenter_id, study_iuid, raddoc_email)
  report_path.push("report");
  var report = get_file(...report_path);
  if(!report) {
    var template = select_template(radcenter_id, study_iuid, raddoc_email);
    report = create_report_from_template(template, report_path);
    report_make_active_raddoc_email(radcenter_id, study_iuid, raddoc_email);
    report_set_data(report.getId(), report_data);
    report.addEditor(raddoc_email);
    report_data_fillin(report.getId());

    report.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW); //TODO, remove, added to show print icon
    report.getParents().next().setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW); //TODO, remove, added to show print icon
  }
  return {"study_iuid": study_iuid, "report_id": report.getId()};
}

function api_report_img(e, method) {
  var data = "";
  data = e.parameter["img"];
  data = Utilities.base64Decode(data, Utilities.Charset.UTF_8);
  // return data;
  var img = Utilities.newBlob(data, "image/png", 'img.png'); 
  return {"height": report_img(e.parameter["report_id"], img)};

}

function test_server_get_report() {

  var a = {}; //args
  a["route"] = "get_report";
  a["radcenterid"] = "Demo_radcenter";
  a["raddoc_email"] = "readyvu.com.raddoc.demo@gmail.com";
  a["study_iuid"] = "1.2.3.47";

  var p = test_report_data; //post data

  var e = Object();
  e.parameter = a;
  e.postData = Object();
  e.postData.contents = JSON.stringify(p)
  
  var result = doPost(e);
  log(result);
}

function test_server_upload_img() {  
  var a = {}; //args
  a["route"] = "report_img";
  a["report_id"] = "1aC0FRmDiUo8ZJrz0lpEatTX2xCna4YawGtdTKFelq0w";

  var p = {}; //post data

  var content_url = "http://pngimg.com/uploads/mario/mario_PNG125.png";

  var e = Object();
  e.parameter = a;
  e.postData = Object();
  e.postData.contents = UrlFetchApp.fetch(content_url).getBlob();
  
  var result = doGet(e);
  log(result);

}
