import { access, appendFile, readFile, writeFile } from "fs/promises";
import { spawn } from "node:child_process";
import path from "path";
import type { ContactPayload } from "@/lib/contact";

export const CONTACT_SHEET_FILENAME = "Portfolio Contact.xlsx";
export const CONTACT_CSV_FILENAME = "Portfolio Contact.csv";

const HEADERS = ["Timestamp", "Name", "Email", "Subject", "Message"] as const;

export function contactSheetPath() {
  return path.join(process.cwd(), CONTACT_SHEET_FILENAME);
}

export function contactCsvPath() {
  return path.join(process.cwd(), CONTACT_CSV_FILENAME);
}

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) return `"${value.replaceAll('"', '""')}"`;
  return value;
}

async function appendContactToCsv(data: ContactPayload, timestamp: string) {
  const filePath = contactCsvPath();
  const row = [
    timestamp,
    data.name,
    data.email,
    data.subject,
    data.message,
  ]
    .map(csvEscape)
    .join(",");

  try {
    await access(filePath);
    const existing = await readFile(filePath, "utf8");
    if (!existing.trim()) {
      await writeFile(filePath, `${HEADERS.join(",")}\n${row}\n`, "utf8");
      return;
    }
    await appendFile(filePath, `${row}\n`, "utf8");
  } catch {
    await writeFile(filePath, `${HEADERS.join(",")}\n${row}\n`, "utf8");
  }
}

function appendContactToXlsx(data: ContactPayload, timestamp: string) {
  const script = path.join(process.cwd(), "scripts", "append-contact.cjs");
  const payload = JSON.stringify({ ...data, timestamp });

  return new Promise<void>((resolve, reject) => {
    const child = spawn(process.execPath, [script], {
      cwd: process.cwd(),
      stdio: ["pipe", "pipe", "pipe"],
    });

    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(stderr.trim() || `Spreadsheet script exited with ${code}`));
    });

    child.stdin.write(payload);
    child.stdin.end();
  });
}

export async function appendContactToWorkbook(data: ContactPayload) {
  const timestamp = new Date().toISOString();

  try {
    await appendContactToXlsx(data, timestamp);
  } catch (error) {
    console.error("Excel workbook write failed, saving CSV instead", error);
    await appendContactToCsv(data, timestamp);
  }
}
