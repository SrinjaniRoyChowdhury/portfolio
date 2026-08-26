const fs = require("fs");
const path = require("path");
const ExcelJS = require("exceljs");

const SHEET_PATH = path.join(process.cwd(), "Portfolio Contact.xlsx");
const HEADERS = ["Timestamp", "Name", "Email", "Subject", "Message"];

function cellText(value) {
  if (value == null) return "";
  if (typeof value === "object" && value.text) return String(value.text);
  return String(value).trim();
}

function ensureHeaders(sheet) {
  const row = sheet.getRow(1);
  const existing = HEADERS.map((_, index) => cellText(row.getCell(index + 1).value));
  const empty = existing.every((value) => value === "");
  const matches = HEADERS.every(
    (header, index) => existing[index].toLowerCase() === header.toLowerCase(),
  );

  if (!matches && empty) {
    HEADERS.forEach((header, index) => {
      row.getCell(index + 1).value = header;
    });
    row.font = { bold: true };
    row.commit();
  }

  sheet.getColumn(1).width = 28;
  sheet.getColumn(2).width = 22;
  sheet.getColumn(3).width = 32;
  sheet.getColumn(4).width = 28;
  sheet.getColumn(5).width = 60;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeWithRetry(workbook) {
  let lastError;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      await workbook.xlsx.writeFile(SHEET_PATH);
      return;
    } catch (error) {
      lastError = error;
      if (error.code !== "EBUSY" && error.code !== "EPERM") throw error;
      await sleep(200 * (attempt + 1));
    }
  }
  throw lastError;
}

async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const payload = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");

  const workbook = new ExcelJS.Workbook();
  if (fs.existsSync(SHEET_PATH)) {
    await workbook.xlsx.readFile(SHEET_PATH);
  } else {
    workbook.addWorksheet("Messages");
  }

  const sheet = workbook.worksheets[0] || workbook.addWorksheet("Messages");
  if (sheet.name === "Sheet1") sheet.name = "Messages";
  ensureHeaders(sheet);

  sheet.addRow([
    payload.timestamp || new Date().toISOString(),
    payload.name || "",
    payload.email || "",
    payload.subject || "",
    payload.message || "",
  ]);

  await writeWithRetry(workbook);
}

main().catch((error) => {
  console.error(error && error.message ? error.message : error);
  process.exit(1);
});
