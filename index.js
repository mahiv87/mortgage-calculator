import inquirer from 'inquirer';
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
const calculateMortgage = (data) => {
    let principal = Number(data.principal);
    let apr = Number(data.apr);
    let term = Number(data.term);
    // Monthly interest rate
    let rate = apr / 100 / 12;
    // Total number of payments to be made
    let numOfPayments = term * 12;
    const mortgage = principal *
        ((rate * Math.pow(1 + rate, numOfPayments)) /
            Math.pow(1 + rate, numOfPayments) -
            1);
    console.log(`Mortgage: ${mortgage}`);
    return `Mortgage: ${mortgage}`;
};
// Function to ask question, and pass data to calculateMortgage()
const mortgageQuestions = () => {
    inquirer.prompt(questions).then((responses) => {
        // console.log(responses);
        calculateMortgage(responses);
    });
    return 'Questions';
};
// initiate app
mortgageQuestions();