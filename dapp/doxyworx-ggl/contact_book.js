contact_book_email_account = {
    "doxyworx.test.bob@gmail.com": ["//Bob"],
    "doxyworx.test.charlie@gmail.com": ["//Charlie"],
    "doxyworx.test.davebob@gmail.com": ["//Dave"],
}

function get_email_account(email) {
    return contact_book_email_account[email][0];
}

