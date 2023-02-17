function get_radcenter_path(radcenterid) {
  return Array("radcenters", radcenterid);
}

function get_study_path(radcenterid, study_iuid) {
  var res = get_radcenter_path(radcenterid)
  res.push("studies", study_iuid);
  return res;
}

function get_study_raddoc_path(radcenterid, study_iuid, raddoc_email) {
  var res = get_study_path(radcenterid, study_iuid);
  res.push("raddocs", raddoc_email);
  return res;
}

function get_report_folder_path(radcenterid, study_iuid, raddoc_email) {
  var res = get_study_raddoc_path(radcenterid, study_iuid, raddoc_email);
  res.push("report");
  return res;
}

function get_active_report_folder_path(radcenterid, study_iuid, raddoc_email) {
  var res = get_study_raddoc_path(radcenterid, study_iuid, "__ACTIVE__");
  res.push("report");
  return res;
}

function get_report_study(report_id) {
  var report_data = report_get_data(report_id);
  return report_data["study"];
}

function test_report() {
  var report_id = "1aC0FRmDiUo8ZJrz0lpEatTX2xCna4YawGtdTKFelq0w";
  get_report_study(report_id);
}