import dayjs from 'dayjs';

var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

export default async function ExportViagensToExcel(viagens: Viagem[]) {
  //with ExcelJs create a report

  const Excel = require('exceljs');
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Lista de Ocorrências');

  // fit column width to content
  worksheet.getColumn('A').width = 5;
  worksheet.getColumn('B').width = 60; //Data de Partida
  worksheet.getColumn('C').width = 60; //Data de Chegada
  worksheet.getColumn('D').width = 60; //Data Rio
  worksheet.getColumn('E').width = 60; //Dias de Viagem
  worksheet.getColumn('F').width = 60; //Tripulacao
  worksheet.getColumn('G').width = 60; //Passageiros
  worksheet.getColumn('H').width = 60; //Porto de Origem
  worksheet.getColumn('I').width = 60; //Dias no porto de origem
  worksheet.getColumn('J').width = 60; //Porto de Destino
  worksheet.getColumn('K').width = 60; //Dias no porto de destino
  worksheet.getColumn('L').width = 60; //Nome da Embacacao
  worksheet.getColumn('M').width = 60; //Tipo de Embacacao
  worksheet.getColumn('N').width = 60; //Descrição
  worksheet.getColumn('O').width = 60; //Observações
  worksheet.getColumn('P').width = 60; //Comandante
  worksheet.getColumn('Q').width = 60; //Capitão
  worksheet.getColumn('R').width = 60; //Armador
  worksheet.getColumn('S').width = 60; //Mestre
  worksheet.getColumn('T').width = 60; //Referência Documental
  worksheet.getColumn('U').width = 60; //Notícias

  await setHeaders(worksheet);
  await setData(worksheet, viagens);

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
  worksheet.getCell('B1').value = 'Data de Partida';
  setHeaderStyle(worksheet.getCell('B1'));
  worksheet.getCell('C1').value = 'Data de Chegada';
  setHeaderStyle(worksheet.getCell('C1'));
  worksheet.getCell('D1').value = 'Data Rio';
  setHeaderStyle(worksheet.getCell('D1'));
  worksheet.getCell('E1').value = 'Dias de Viagem';
  setHeaderStyle(worksheet.getCell('E1'));
  worksheet.getCell('F1').value = 'Tripulacao';
  setHeaderStyle(worksheet.getCell('F1'));
  worksheet.getCell('G1').value = 'Passageiros';
  setHeaderStyle(worksheet.getCell('G1'));
  worksheet.getCell('H1').value = 'Porto de Origem';
  setHeaderStyle(worksheet.getCell('H1'));
  worksheet.getCell('I1').value = 'Dias no porto de origem';
  setHeaderStyle(worksheet.getCell('I1'));
  worksheet.getCell('J1').value = 'Porto de Destino';
  setHeaderStyle(worksheet.getCell('J1'));
  worksheet.getCell('K1').value = 'Dias no porto de destino';
  setHeaderStyle(worksheet.getCell('K1'));
  worksheet.getCell('L1').value = 'Nome da Embacacao';
  setHeaderStyle(worksheet.getCell('L1'));
  worksheet.getCell('M1').value = 'Tipo de Embacacao';
  setHeaderStyle(worksheet.getCell('M1'));
  worksheet.getCell('N1').value = 'Descrição';
  setHeaderStyle(worksheet.getCell('N1'));
  worksheet.getCell('O1').value = 'Observações';
  setHeaderStyle(worksheet.getCell('O1'));
  worksheet.getCell('P1').value = 'Comandante';
  setHeaderStyle(worksheet.getCell('P1'));
  worksheet.getCell('Q1').value = 'Capitão';
  setHeaderStyle(worksheet.getCell('Q1'));
  worksheet.getCell('R1').value = 'Armador';
  setHeaderStyle(worksheet.getCell('R1'));
  worksheet.getCell('S1').value = 'Mestre';
  setHeaderStyle(worksheet.getCell('S1'));
  worksheet.getCell('T1').value = 'Referência Documental';
  setHeaderStyle(worksheet.getCell('T1'));
  worksheet.getCell('U1').value = 'Notícias';
  setHeaderStyle(worksheet.getCell('U1'));
  worksheet.autoFilter = 'A1:U1';
}

const setData = (worksheet: any, viagens: Viagem[]) => {
  viagens.map((viagem) => {
    worksheet.addRow([
      viagem.id,
      (viagem?.data_viagem &&
        dayjs(viagem?.data_viagem).format('DD/MM/YYYY')) ||
        '',
      (viagem?.data_chegada &&
        dayjs(viagem?.data_chegada).format('DD/MM/YYYY')) ||
        '',
      (viagem.data_rio && dayjs(viagem?.data_rio).format('DD/MM/YYYY')) || '',
      viagem?.dias_viagem,
      viagem?.tripulacao,
      viagem?.total_passageiros,
      viagem?.porto_origem?.nome,
      viagem?.dias_porto_origem,
      viagem?.porto_destino?.nome,
      viagem?.dias_porto_destino,
      viagem?.embarcacao?.nome,
      viagem?.embarcacao?.tipo_embarcacao?.tipo,
      viagem?.embarcacao?.tipo_embarcacao?.texto_descritivo,
      viagem?.embarcacao?.observacao,
      viagem?.comandante?.nome,
      viagem?.capitao?.nome,
      viagem?.armador?.nome,
      viagem?.mestre?.nome,
      viagem?.relac_viagem_referencia_doc
        ?.map((relac) => relac.referencia_documental?.nome_periodico)
        .join(', ') || '',
      viagem?.noticia?.map((noticia) => noticia.assunto).join(', ') || '',
    ]);
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
