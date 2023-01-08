import inquirer from 'inquirer';
import chalk from 'chalk';
import 'console.table';

import exportScheduleToExcel from './utils/exportService.js';

// interface for Inquirer prompt response
interface MortgageResponse {
	principal: string;
	apr: string;
	term: string;
}

// Array of questions for Inquirer prompt
const questions = [
	{
		type: 'input',
		name: 'principal',
		message: 'What is the Principal?'
	},
	{
		type: 'input',
		name: 'apr',
		message: 'What is the Annual Interest Rate?'
	},
	{
		type: 'input',
		name: 'term',
		message: 'How long is the loan term (years)?'
	}
];

const excelExport = (exportData: { PAYMENT: string; BALANCE: string }[]) => {
	const workSheetColumnNames = ['PAYMENT', 'BALANCE'];
	const workSheetName = 'Payment Schedule';
	const filePath = './payment-schedule.xlsx';

	exportScheduleToExcel(
		exportData,
		workSheetColumnNames,
		workSheetName,
		filePath
	);
};

// Calculate the remaining balance
const calculateBalance = (
	principal: number,
	apr: number,
	term: number,
	i: number
): number => {
	let rate: number = apr / 100 / 12;
	let numOfPayments: number = term * 12;

	const balance: number =
		(principal * (Math.pow(1 + rate, numOfPayments) - Math.pow(1 + rate, i))) /
		(Math.pow(1 + rate, numOfPayments) - 1);

	return balance;
};

// Displays payment schedule
const paymentSchedule = async (data: MortgageResponse) => {
	let principal: number = Number(data.principal);
	let apr: number = Number(data.apr);
	let term: number = Number(data.term);

	// Array to hold payment schedule data
	let schedule: { PAYMENT: string; BALANCE: string }[] = [];
	let exportData: { PAYMENT: string; BALANCE: string }[] = [];

	console.log('====================================');
	console.log(chalk.cyan('PAYMENT SCHEDULE'));
	console.log('====================================\n');
	for (let i = 1; i <= term * 12; i++) {
		const balance: number = calculateBalance(principal, apr, term, i);
		schedule.push({
			PAYMENT: `${i}/${term * 12}`,
			BALANCE: chalk.green(`$${balance.toFixed(2)}`)
		});
		exportData.push({
			PAYMENT: `${i}/${term * 12}`,
			BALANCE: `$${balance.toFixed(2)}`
		});
	}

	// Format payment schedule into a table
	console.table([...schedule]);

	excelExport(exportData);
	return `Payment Schedule`;
};

// This function right here will calculate the mortgage
const calculateMortgage = (data: MortgageResponse): string => {
	let principal: number = Number(data.principal);
	let apr: number = Number(data.apr);
	let term: number = Number(data.term);

	// Monthly interest rate
	let rate: number = apr / 100 / 12;
	// Total number of payments to be made
	let numOfPayments: number = term * 12;

	const mortgageFormula: number =
		(principal * (rate * Math.pow(1 + rate, numOfPayments))) /
		(Math.pow(1 + rate, numOfPayments) - 1);

	// Format the mortgage as USD
	const mortgage: string = `$${mortgageFormula.toFixed(2)}`;
	console.log('\n====================================');
	console.log(`${chalk.cyan('MORTGAGE')}`);
	console.log('====================================');
	console.log(`Monthly Payment: ${chalk.green(mortgage)}\n`);

	return `Mortgage: ${mortgage}`;
};

// Function to ask question, and pass data to calculateMortgage()
const mortgageQuestions = (): string => {
	console.log('====================================');
	console.log(chalk.cyan('MORTGAGE CALCULATOR'));
	console.log('====================================');

	inquirer.prompt(questions).then((responses: MortgageResponse) => {
		// console.log(responses);
		calculateMortgage(responses);
		paymentSchedule(responses);
	});

	return 'Questions';
};

// initiate app
mortgageQuestions();
