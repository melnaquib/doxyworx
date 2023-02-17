function getDoc() {
  return SpreadsheetApp.getActive();
}

function getSheet() {
  return getDoc().getActiveSheet();
}

function getUserEmail() {
  var email = Session.getActiveUser().getEmail();
  return email;
}

function docProp(k) {
  return Drive.Properties.get(docId, k, {visibility: 'PUBLIC'}).value;
}

function get_deep(dict, path, sep='/') {
  if (typeof path === 'string') {
    path = path.split(sep);
  }
  var val = dict;
  for(k of path) {
    val = val[k];
  }
  return val;
}

function set_deep(dict, path, val, sep='/') {
  if (string === typeof(path)) {
    path = path.split(sep);
  }
  var last = path.pop();
  var key = dict;
  for(k of path) {
    key = key[k];
  }
  key[last] = val;
}

function include_server_file(server_file_name) {
  return HtmlService.createTemplateFromFile(server_file_name).getRawContent();
}
