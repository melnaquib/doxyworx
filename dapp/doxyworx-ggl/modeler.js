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
    size = 10000;
  } 
  var html_output = HtmlService.createTemplate(html);
  html_output = html_output.evaluate()
  // .setWidth(1024).setHeight(800)
  .setWidth(size).setHeight(size)
  ;
  // html =  template.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);

  getUi().showModelessDialog(html_output, '🎞 DoxyWorx');
}

function get_modeler_url(id, fields, roles) {
  const SEP = "_";

  var email = getUserEmail();

  var req = {
    "cmd": "start",
    "doc": id,
    "user_email": email,
    "fields": fields,
    "roles": roles 
  };
  req = JSON.stringify(req);
  req = encodeURIComponent(req);

  var base_url = "http://192.168.1.100:8080/";

  var result = base_url + "?req=" + req;

    // for (var i in notes) {
    //   for (var j in notes[i]) {
    //     var task = i + SEP + j + SEP + notes[i][j]
    //   result += "&task=" + task;
    //   }
    // }
  return result;
}
