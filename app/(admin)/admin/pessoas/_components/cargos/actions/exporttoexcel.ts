export default async function ExportCargosToExcel(cargos: Cargo[]) {
  //with ExcelJs create a report

  const Excel = require('exceljs');
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Lista de Ocorrências');

  // fit column width to content
  worksheet.getColumn('A').width = 5;
  worksheet.getColumn('B').width = 60;

  await setHeaders(worksheet);
  await setData(worksheet, cargos);

  await saveFile('Export_' + Math.floor(Math.random() * 100000), workbook);
}

async function saveFile(fileName: any, workbook: any) {
  const saveAs = (await import('file-saver')).default;
  const xls64 = await workbook.xlsx.writeBuffer({ base64: true });
  saveAs(
    new Blob([xls64], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }),
    fileName
  );
}

function setHeaders(worksheet: any) {
  worksheet.getCell('A1').value = 'ID';
  setHeaderStyle(worksheet.getCell('A1'));
  worksheet.getCell('B1').value = 'Cargo';
  setHeaderStyle(worksheet.getCell('B1'));
  worksheet.autoFilter = 'A1:B1';
}

const setData = (worksheet: any, cargos: Cargo[]) => {
  cargos.map((cargo) => {
    worksheet.addRow([cargo.id, cargo?.cargo]);
  });
};

const setHeaderStyle = (cell: any) => {
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',

    fgColor: { argb: 'FFC0C0C0' },
  };
  cell.font = { bold: true, size: 14 };
  setThinBorder(cell);
};

const setThinBorder = (cell: any) => {
  cell.border = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' },
  };
};
