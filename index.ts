import inquirer from 'inquirer';

// interface for Inquirer prompt response
interface MortageResponse {
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
const calculateMortgage = (data: MortageResponse): string => data.principal;

// Function to ask question, and pass data to calculateMortgage()
const mortgageQuestions = (): string => {
	inquirer.prompt(questions).then((responses: MortageResponse) => {
		// console.log(responses);
		calculateMortgage(responses);
	});

	return 'Questions';
};

// initiate app
mortgageQuestions();
