import xlsx from 'xlsx';
import path from 'path';

const exportExcel = (
	data: string[][],
	workSheetColumnNames: string[],
	workSheetName: string,
	filePath: string
) => {
	const workBook = xlsx.utils.book_new();
	const workSheetData = [workSheetColumnNames, ...data];
	const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
	xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
	xlsx.writeFile(workBook, path.resolve(filePath));
};

export default function exportScheduleToExcel(
	schedule: { PAYMENT: string; BALANCE: string }[],
	workSheetColumnNames: string[],
	workSheetName: string,
	filePath: string
) {
	const data: string[][] = schedule.map((payment) => {
		return [payment.PAYMENT, payment.BALANCE];
	});
	exportExcel(data, workSheetColumnNames, workSheetName, filePath);
}
