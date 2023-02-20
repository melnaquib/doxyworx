function getFields() {
  var fields = SpreadsheetApp.getActive().getDataRange().getNotes();
  const sheet = getSheet();
  fields = fields.reduce( (map, row, i ) => {
    return row.reduce( (map, note, j ) => {
      if(note && !(0 == i && 0 == j) ) {
        var k = String.fromCharCode('A'.charCodeAt() + j);
        if(!(i in map )) {
          map[k] = {};
        }
        var val = sheet.getRange(i + 1, j + 1).getValue();
        map[k][i + 1] = [note.trim(), val];
      }
      return map;
    }, map);
    return map;
  }, {});
  return fields;
}

function workflowMake() {
  var fields = getFields();
  var roles = {};
  // roles = {
  //   "buyer": "BUYER1",
  //   "seller": "SELLER1",
  //   "shipping": "SHIPPING1",
  // }

  for(var i in fields) {
    for(var j in fields[i]) {
      var role = fields[i][j][0];
      if(!(role in roles)) {
        var account = getUi().prompt("Who is " + role +"?").getResponseText();
        roles[role] = account;
      }      
    }    
  }
  
  var id = SpreadsheetApp.getActive().getId();
  metadata_set_origin_id(id);

  var url = get_modeler_url_start(id, fields, roles, get_user_email(), get_user_account());
  console.log(url);

  modelerOpen(url);
}

function workflowStep() {
  var fields = getFields();

  var email = get_user_email();
  var account = get_user_account();

  var id = metadata_get_origin_id();

  const cell = getDoc().getCurrentCell();
  var y = cell.getRow();
  var x = cell.getColumn();
  var x = String.fromCharCode('A'.charCodeAt() + x - 1);
  console.log(x, y);
  const value = cell.getDisplayValue();

  var url = get_modeler_url_step(id, fields, email, account, [x, y], value);
  console.log(url);
  Logger.log(url);

  modelerOpen(url, 10);
}
