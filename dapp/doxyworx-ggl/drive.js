function sanitize_pathname(token) {
  return Utilities.base64Encode(token);
}

function get_folder_root(create = false, ...pathnames) {
  var folder = DriveApp.getRootFolder().getFoldersByName("readyvu").next();
  return folder;
}

function get_folder(create = false, ...pathnames) {
  var folder = get_folder_root();
  for(var pathname of pathnames){
    var it = folder.getFoldersByName(pathname)
    if(it.hasNext()) {
      folder = it.next();
    } else {
      if(create) {
        folder = folder.createFolder(pathname)
      } else {
        return null;
      }
    }
  }
  return folder;

}

function get_file(...pathnames) {
  var filename = pathnames.pop()
  var folder = get_folder(false, ...pathnames)
  if(!folder)
    return null
  var file = folder.getFilesByName(filename);
  file = file.hasNext() ? file.next() : null;
  return file
}

function make_file_copy(src, dst) {
  dst = dst.slice();
  var src_file = (Array === src.constructor) ? get_file(src) : src;
  var dst_filename = dst.pop();
  var dst_folder = get_folder(true, ...dst);
  var res = src_file.makeCopy(dst_filename, dst_folder);
  return res;
}

function make_folder_link(src, dst) {
  dst = dst.slice();
  var src_folder = get_folder(false, ...src);
  if(!src_folder)
    return null;
  var dst_name = dst.pop();
  var dst_folder = get_folder(true, ...dst);
  var dst_link = dst_folder.createShortcut(src_folder.getId());
  dst_link.setName(dst_name);
  return dst_link;
}

function drive_get_sibling(file_id, sibling_filename, create=false) {
  var parent = DriveApp.getFileById(file_id).getParents().next();
  var sibling = parent.getFilesByName(sibling_filename);
  if(sibling.hasNext()){
    sibling = sibling.next();
  } else {
    if(create) {
      sibling = parent.createFile(sibling_filename, "");
    } else {
      sibling = null;
    }
  }
  return sibling;
}

function test_drive() {
  var l = [1, 2];
  console.log;
}
