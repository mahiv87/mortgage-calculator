import xlsx from 'xlsx';
import path from 'path';
const exportExcel = (data, workSheetColumnNames, workSheetName, filePath) => {
    const workBook = xlsx.utils.book_new();
    const workSheetData = [workSheetColumnNames, ...data];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFile(workBook, path.resolve(filePath));
};
export default function exportScheduleToExcel(schedule, workSheetColumnNames, workSheetName, filePath) {
    const data = schedule.map((payment) => {
        return [payment.PAYMENT, payment.BALANCE];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
}
