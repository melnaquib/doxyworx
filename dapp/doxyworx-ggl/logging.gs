// Logger = null;

function logging_init() {
  BetterLog.useSpreadsheet("1BVzDrIDZ8XBHeSKlJ2R5ttpn5QJycBIvdER8SenC4BQ");
}

function log(msg) {
  console.log("LOG: " + Date());
  console.log(msg);
  Logger.log(msg);
}

function logging_not_used_noop_trigger_permission() {
  SpreadsheetApp.getActive();
}
