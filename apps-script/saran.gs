// Google Apps Script untuk menerima kiriman "Saran & Masukan" dari website
// dan menuliskannya sebagai baris baru di spreadsheet ini.
//
// Cara pasang: lihat README.md bagian "Saran & Masukan ke Google Sheets".

// Ganti dengan kata rahasia buatan Anda sendiri (huruf dan angka, tanpa spasi).
// Kata yang sama harus diisi di Vercel sebagai SARAN_TOKEN.
const TOKEN = "GANTI-DENGAN-KATA-RAHASIA";

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const d = JSON.parse(e.postData.contents);
    if (d.token !== TOKEN) return keluar({ ok: false });

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const baris = sheet.getLastRow() + 1;
    const range = sheet.getRange(baris, 1, 1, 7);
    range.setNumberFormat("@"); // simpan sebagai teks biasa, tidak dibaca sebagai rumus
    range.setValues([[
      Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss"),
      d.jenis || "",
      d.nama || "",
      d.kontak || "",
      d.pesan || "",
      d.halaman || "",
      "Baru",
    ]]);
    return keluar({ ok: true });
  } catch (err) {
    return keluar({ ok: false });
  } finally {
    lock.releaseLock();
  }
}

function keluar(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
