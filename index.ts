import inquirer from 'inquirer';
import chalk from 'chalk';

// interface for Inquirer prompt response
interface MortgageResponse {
	principal: string;
	apr: string;
	term: string;
}

// Array of questions from Inquirer prompt
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

// Print payment schedule
const paymentSchedule = (principal: number, apr: number, term: number) => {
	console.log('====================================');
	console.log('PAYMENT SCHEDULE');
	console.log('====================================');
	for (let i = 1; i <= term * 12; i++) {
		const balance: number = calculateBalance(principal, apr, term, i);
		console.log(`$${balance.toFixed(2)}`);
	}
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
			Math.pow(1 + rate, numOfPayments) -
		1;

	// Format the mortgage as USD
	const mortgage: string = `$${mortgageFormula.toFixed(2)}`;

	console.log(
		`==================== \n ${chalk.bold('Mortgage:')} ${chalk.green(
			mortgage
		)} \n====================`
	);

	return `Mortgage: ${mortgage}`;

	paymentSchedule(principal, apr, term);
};

// Function to ask question, and pass data to calculateMortgage()
const mortgageQuestions = (): string => {
	console.log(
		chalk.bgGreen(`
	                           
	MORTGAGE CALCULATOR        
                                   
`)
	);

	inquirer.prompt(questions).then((responses: MortgageResponse) => {
		// console.log(responses);
		calculateMortgage(responses);
	});

	return 'Questions';
};

// initiate app
mortgageQuestions();
