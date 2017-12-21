const Dialogs = require('dialogs')

let defaultOpts = {cancel: "Anuluj"};

exports.alert = (message, opts) => {
  opts = opts || defaultOpts;
  let dialogs = Dialogs(opts);
  return new Promise((resolve) => {
    dialogs.alert(message, (response) => resolve(response));
  });
};

exports.error = (message, title) => {
  return dialog.showErrorBox(title, message);
};

exports.confirm = (message, opts) => {
  opts = opts || defaultOpts;
  let dialogs = Dialogs(opts);
  return new Promise((resolve) => {
    dialogs.confirm(message, (response) => resolve(response));
  });
};

exports.prompt = (message, default_) => {
  let dialogs = Dialogs(defaultOpts);
  return new Promise((resolve) => {
    if(default_ == undefined)
      dialogs.prompt(message, (response) => resolve(response));
    else
      dialogs.prompt(message, default_, (response) => resolve(response));
  });
};
