/**
 * Sachintha & Chathushka — Wedding Invitation backend (Google Apps Script)
 *
 * Paste this whole file into Extensions > Apps Script of the spreadsheet:
 * https://docs.google.com/spreadsheets/d/1ZQmZb84YX_qjmk6xXVkG_BFg9bzTU10ddmsUyK-e4qE/edit
 *
 * - "RSVP" and "Wishes" sheets are created automatically with styled headers.
 * - POST  -> saves an RSVP or a Wish.
 * - GET ?sheet=Wishes -> returns the latest wishes (shown on the website).
 *   RSVP data is never returned publicly.
 */

const SPREADSHEET_ID = '1ZQmZb84YX_qjmk6xXVkG_BFg9bzTU10ddmsUyK-e4qE';
const TIMEZONE = 'Asia/Colombo';
const MAX_WISHES_RETURNED = 100;

const SHEETS = {
  RSVP: {
    name: 'RSVP',
    headers: ['Timestamp', 'Full Name', 'Phone', 'Attendance', 'Guests', 'Notes', 'Invited As'],
    widths: [170, 200, 140, 120, 80, 280, 200],
  },
  WISHES: {
    name: 'Wishes',
    headers: ['Timestamp', 'Name', 'Message', 'Invited As'],
    widths: [170, 200, 450, 200],
  },
};

const HEADER_BG = '#722F37'; // royal maroon
const HEADER_FG = '#FFFFFF';

/* ----------------------------- Web App entry points ----------------------------- */

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);

  try {
    const data = parsePayload_(e);
    const type = normaliseType_(data.sheet || data.type);

    if (type === 'RSVP') {
      const sheet = getOrCreateSheet_(SHEETS.RSVP);
      sheet.appendRow([
        new Date(),
        clean_(data.name),
        clean_(data.phone),
        clean_(data.attendance) || 'Attending',
        clean_(data.guests) || '1',
        clean_(data.notes || data.dietary),
        clean_(data.invitedAs),
      ]);
      return json_({ ok: true, sheet: SHEETS.RSVP.name, row: sheet.getLastRow() });
    }

    if (type === 'WISHES') {
      if (!clean_(data.name) || !clean_(data.message)) {
        return json_({ ok: false, error: 'Name and message are required.' });
      }
      const sheet = getOrCreateSheet_(SHEETS.WISHES);
      sheet.appendRow([new Date(), clean_(data.name), clean_(data.message), clean_(data.invitedAs)]);
      return json_({ ok: true, sheet: SHEETS.WISHES.name, row: sheet.getLastRow() });
    }

    return json_({ ok: false, error: 'Unknown sheet. Use "RSVP" or "Wishes".' });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    const type = normaliseType_(e && e.parameter ? e.parameter.sheet : '');

    if (type === 'WISHES') {
      const sheet = getOrCreateSheet_(SHEETS.WISHES);
      const lastRow = sheet.getLastRow();
      if (lastRow < 2) return json_({ ok: true, wishes: [] });

      const count = Math.min(MAX_WISHES_RETURNED, lastRow - 1);
      const startRow = lastRow - count + 1;
      const rows = sheet.getRange(startRow, 1, count, 3).getValues();

      const wishes = rows
        .filter(function (r) { return r[1] && r[2]; })
        .map(function (r) {
          return {
            timestamp: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
            name: String(r[1]),
            message: String(r[2]),
          };
        })
        .reverse(); // newest first

      return json_({ ok: true, wishes: wishes });
    }

    return json_({ ok: true, message: 'Sachintha & Chathushka wedding endpoint is running.' });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

/** Run once manually from the editor to create both sheets up-front (optional). */
function setup() {
  getOrCreateSheet_(SHEETS.RSVP);
  getOrCreateSheet_(SHEETS.WISHES);
}

/* ----------------------------------- Helpers ----------------------------------- */

function getOrCreateSheet_(config) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  if (ss.getSpreadsheetTimeZone() !== TIMEZONE) ss.setSpreadsheetTimeZone(TIMEZONE);

  let sheet = ss.getSheetByName(config.name);
  if (!sheet) sheet = ss.insertSheet(config.name);

  ensureHeaders_(sheet, config);
  return sheet;
}

function ensureHeaders_(sheet, config) {
  const headers = config.headers;
  const current = sheet.getLastRow() > 0
    ? sheet.getRange(1, 1, 1, headers.length).getValues()[0]
    : [];

  const matches = headers.every(function (h, i) { return current[i] === h; });
  if (matches) return;

  if (sheet.getLastRow() > 0 && String(current[0]) !== 'Timestamp') {
    sheet.insertRowBefore(1); // keep existing data, add header on top
  }

  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setFontWeight('bold')
    .setBackground(HEADER_BG)
    .setFontColor(HEADER_FG)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 32);
  config.widths.forEach(function (w, i) { sheet.setColumnWidth(i + 1, w); });
  sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');
}

function normaliseType_(value) {
  const v = String(value || '').trim().toUpperCase();
  if (v === 'RSVP') return 'RSVP';
  if (v === 'WISH' || v === 'WISHES') return 'WISHES';
  return '';
}

function parsePayload_(e) {
  const params = e && e.parameter ? e.parameter : {};
  if (Object.keys(params).length > 0) return params;

  const body = e && e.postData && e.postData.contents ? e.postData.contents : '';
  if (!body) return {};

  try {
    return JSON.parse(body);
  } catch (_) {
    const out = {};
    body.split('&').forEach(function (pair) {
      if (!pair) return;
      const idx = pair.indexOf('=');
      const key = decodeURIComponent((idx >= 0 ? pair.slice(0, idx) : pair).replace(/\+/g, ' '));
      const val = decodeURIComponent((idx >= 0 ? pair.slice(idx + 1) : '').replace(/\+/g, ' '));
      out[key] = val;
    });
    return out;
  }
}

/** Trims input and blocks spreadsheet formula injection (=, +, -, @). */
function clean_(value) {
  const s = String(value == null ? '' : value).trim().slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
