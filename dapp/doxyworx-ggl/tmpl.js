function tmpl_apply(tmpl_id) {

  var tmpl = DriveApp.getFileById(tmpl_id);
  tmpl.getBlob();
  doc.getBlob().setBytes(tmpl.getBlob().getBytes());

  var bm = doc.getBookmarks()[0];

  var body = doc.getBody();
  var nc = body.getNumChildren();
  var last = body.getChild(nc - 1);
  var reportOnly_range = doc.newRange().addElementsBetween(bm.getPosition().getElement(), last).build();

  var newbody = body.copy();
  newbody.removeChild
  // bm.getPosition().getElement;



  // doc.getBody().get = bm.getPosition().;

  
}
