function getFields() {
  var fields = SpreadsheetApp.getActive().getDataRange().getNotes();
  const sheet = getSheet();
  notes = notes.reduce( (map, row, i ) => {
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
  return notes;
}

function workflowMake() {
  var notes = sheetNotes();
  var roles = {};
  // roles = {
  //   "buyer": "BUYER1",
  //   "seller": "SELLER1",
  //   "shipping": "SHIPPING1",
  // }

  for(var i in notes) {
    for(var j in notes[i]) {
      var role = notes[i][j];
      if(!(role in roles)) {
        var account = getUi().prompt("Who is " + role +"?");
        roles[role] = account;
      }      
    }    
  }
  
  var id = SpreadsheetApp.getActive().getId();

  getDoc().getRange(1, 1).setNote(id);
  metadata_set_origin_id(id);

  var url = get_modeler_url(id, notes, roles);
  console.log(url);

  modelerOpen(id, notes);
}

function workflowStep() {
  var fields = getFields();

  var roles = {};
  // roles = {
  //   "buyer": "BUYER1",
  //   "seller": "SELLER1",
  //   "shipping": "SHIPPING1",
  // }

  for(var i in fieilds) {
    for(var j in fieilds[i]) {
      var role = fieilds[i][j][0];
      if(!(role in roles)) {
        var account = getUi().prompt("Who is " + role +"?");
        roles[role] = account;
      }      
    }    
  }
  
  var id = SpreadsheetApp.getActive().getId();

  getDoc().getRange(1, 1).setNote(id);
  metadata_set_origin_id(id);

  var url = get_modeler_url(id, fields, roles);
  console.log(url);

  modelerOpen(id, notes);
}
