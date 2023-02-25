function getDoc() {
  return SpreadsheetApp.getActive();
}

function getSheet() {
  return getDoc().getActiveSheet();
}

function get_user_email() {
  var email = Session.getActiveUser().getEmail();
  return email;
}

function metadata_set_origin_id(id) {
  getDoc().addDeveloperMetadata("DOXYWORX_doc_origin", id);

}

function metadata_get_origin_id() {
  //TODO, lookup key
  return getDoc().getDeveloperMetadata()[0].getValue();
}

function get_user_account() {
  return contact_book_get_email_account(get_user_email());
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
