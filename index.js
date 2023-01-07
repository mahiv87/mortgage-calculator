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
const calculateMortgage = (data) => data.principal;
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
