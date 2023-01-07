import inquirer from 'inquirer';

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

// This function right here will calculate the mortgage
const calculateMortgage = (data: MortgageResponse): string => {
	let principal: number = Number(data.principal);
	let apr: number = Number(data.apr);
	let term: number = Number(data.term);

	// Monthly interest rate
	let rate: number = apr / 100 / 12;
	// Total number of payments to be made
	let numOfPayments: number = term * 12;

	const mortgage: number =
		principal *
		((rate * Math.pow(1 + rate, numOfPayments)) /
			Math.pow(1 + rate, numOfPayments) -
			1);

	console.log(`Mortgage: ${mortgage}`);

	return `Mortgage: ${mortgage}`;
};

// Function to ask question, and pass data to calculateMortgage()
const mortgageQuestions = (): string => {
	inquirer.prompt(questions).then((responses: MortgageResponse) => {
		// console.log(responses);
		calculateMortgage(responses);
	});

	return 'Questions';
};

// initiate app
mortgageQuestions();
