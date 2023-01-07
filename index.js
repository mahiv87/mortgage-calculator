import inquirer from 'inquirer';
import chalk from 'chalk';
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
const calculateBalance = (principal, apr, term, i) => {
    let rate = apr / 100 / 12;
    let numOfPayments = term * 12;
    const balance = (principal * (Math.pow(1 + rate, numOfPayments) - Math.pow(1 + rate, i))) /
        (Math.pow(1 + rate, numOfPayments) - 1);
    return balance;
};
// Print payment schedule
const paymentSchedule = (data) => {
    let principal = Number(data.principal);
    let apr = Number(data.apr);
    let term = Number(data.term);
    console.log('====================================');
    console.log('PAYMENT SCHEDULE');
    console.log('====================================');
    for (let i = 1; i <= term * 12; i++) {
        const balance = calculateBalance(principal, apr, term, i);
        console.log(`$${balance.toFixed(2)}`);
    }
};
// This function right here will calculate the mortgage
const calculateMortgage = (data) => {
    let principal = Number(data.principal);
    let apr = Number(data.apr);
    let term = Number(data.term);
    // Monthly interest rate
    let rate = apr / 100 / 12;
    // Total number of payments to be made
    let numOfPayments = term * 12;
    const mortgageFormula = (principal * (rate * Math.pow(1 + rate, numOfPayments))) /
        Math.pow(1 + rate, numOfPayments) -
        1;
    // Format the mortgage as USD
    const mortgage = `$${mortgageFormula.toFixed(2)}`;
    console.log('====================================');
    console.log(`${chalk.bold('MORTGAGE: ')} ${chalk.green(mortgage)}`);
    console.log('====================================');
    return `Mortgage: ${mortgage}`;
};
// Function to ask question, and pass data to calculateMortgage()
const mortgageQuestions = () => {
    console.log('====================================');
    console.log('MORTGAGE CALCULATOR');
    console.log('====================================');
    inquirer.prompt(questions).then((responses) => {
        // console.log(responses);
        calculateMortgage(responses);
        paymentSchedule(responses);
    });
    return 'Questions';
};
// initiate app
mortgageQuestions();
