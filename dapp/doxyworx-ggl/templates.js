function select_template(radcenter, study_iuid, raddoc_email) {
  var result = get_file("templates", "default", "report");
  return result;
}

function template_get_data_for_report(report_id) {
  var dataFile = drive_get_sibling(report_id, "template.json", true);
  var content = dataFile.getAs("application/json");
  var res = JSON.parse(content.getDataAsString());
  return res;  
}
