/**
 * Paste this into Extensions → Apps Script on your contact spreadsheet.
 *
 * Do not put sheet IDs or web app URLs in this file.
 * If the script is bound to the sheet, getActiveSpreadsheet() is enough.
 * Optional: Project Settings → Script properties → SPREADSHEET_ID = your sheet ID
 */

var SHEET_NAME = "Messages";
var HEADERS = ["Timestamp", "Name", "Email", "Subject", "Message"];

function getSpreadsheet(data) {
  var id =
    (data && data.spreadsheetId) ||
    PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");

  if (id) return SpreadsheetApp.openById(id);
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getOrCreateSheet(data) {
  var spreadsheet = getSpreadsheet(data);
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.getSheets()[0];
    sheet.setName(SHEET_NAME);
  }

  return sheet;
}

function setupSheet(data) {
  var sheet = getOrCreateSheet(data);

  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setFontWeight("bold")
    .setBackground("#9B5DE0")
    .setFontColor("#ffffff");
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 180);
  sheet.setColumnWidth(2, 160);
  sheet.setColumnWidth(3, 220);
  sheet.setColumnWidth(4, 200);
  sheet.setColumnWidth(5, 420);

  SpreadsheetApp.flush();
}

function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    var sheet = getOrCreateSheet(data);
    var firstCell = String(sheet.getRange(1, 1).getValue() || "").trim();
    if (firstCell !== HEADERS[0]) {
      setupSheet(data);
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.subject || "",
      data.message || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: "portfolio-contact" }))
    .setMimeType(ContentService.MimeType.JSON);
}
