function modelerOpen(url, size) {
  var html = '<html> <head>' +
    '<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />'
    + '</head><body>'
    + '<p><a id="modeler_link" href="' + url + '" >🎞 Loading DoxyWorx ...</a>.</p> '
    + '<script> window.setTimeout(function (){ document.getElementById("modeler_link").click();}, 1000); </script> '
    + '</body></html>'
    ;

  ;

  if (undefined === undefined) {
    size = 800;
  } 
  var html_output = HtmlService.createTemplate(html);
  html_output = html_output.evaluate()
  // .setWidth(1024).setHeight(800)
  .setWidth(size * 1.25).setHeight(size)
  ;
  // html =  template.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);

  getUi().showModelessDialog(html_output, '🎞 DoxyWorx');
}

function get_modeler_url_start(id, fields, roles, email, account) {
  var req = {
    "cmd": "start",
    "doc": id,
    "user_email": email,
    "account": account,
    "fields": fields,
    "roles": roles 
  };
  console.log(req)
  req = JSON.stringify(req);
  req = encodeURIComponent(req);

  var result = BASE__MODELER_URL + "?req=" + req;

    // for (var i in notes) {
    //   for (var j in notes[i]) {
    //     var task = i + SEP + j + SEP + notes[i][j]
    //   result += "&task=" + task;
    //   }
    // }
  return result;
}

function get_modeler_url_step(id, fields, email, account, cell, val) {
  const SEP = "_";

  var req = {
    "cmd": "step",
    "doc": id,
    "user_email": email,
    "account": account,
    "fields": fields,
    "cell": cell,
    "val": val
    // "roles": roles 
  };
  console.log(req);
  req = JSON.stringify(req);
  req = encodeURIComponent(req);

  var result = BASE__MODELER_URL + "?req=" + req;

    // for (var i in notes) {
    //   for (var j in notes[i]) {
    //     var task = i + SEP + j + SEP + notes[i][j]
    //   result += "&task=" + task;
    //   }
    // }
  return result;
}
