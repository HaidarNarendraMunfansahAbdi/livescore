function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('LIVE SCORE PASUKAN LASKAR 9')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getLiveData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0]; // Mengambil tab pertama (Sheet1)
  
  // Ambil seluruh matriks data A2:H35
  var data = sheet.getRange(2, 1, 34, 8).getValues();
  
  var purna = [];
  var smp = [];
  var sma = [];
  
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    
    // 1. PURNA / MANAGEMENT (Kolom A = row[0], Kolom B = row[1])
    if (row[0] && row[0].toString().trim() !== "") {
      purna.push({ 
        nama: row[0].toString().trim(), 
        poin: Number(row[1]) || 0 
      });
    }
    
    // 2. SMP / MTs (Kolom D = row[3], Kolom E = row[4])
    if (row[3] && row[3].toString().trim() !== "") {
      smp.push({ 
        nama: row[3].toString().trim(), 
        poin: Number(row[4]) || 0 
      });
    }
    
    // 3. SMA / SMK / MA (Kolom G = row[6], Kolom H = row[7])
    if (row[6] && row[6].toString().trim() !== "") {
      sma.push({ 
        nama: row[6].toString().trim(), 
        poin: Number(row[7]) || 0 
      });
    }
  }
  
  // Fungsi pengurutan dari poin tertinggi ke terendah
  var sortByScore = function(a, b) { return b.poin - a.poin; };
  
  return {
    purna: purna.sort(sortByScore),
    smp: smp.sort(sortByScore),
    sma: sma.sort(sortByScore)
  };
}