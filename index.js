#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 50000;
let myPin = 4321;
console.log(chalk.yellow("\n \t(^___^) WELCOME TO TZ - ATM MACHINE (^___^)\n"));
let userPinAnswers = await inquirer.prompt([
    {
        name: "PIN",
        type: "number",
        message: chalk.blueBright("Enter your Pin Code"),
    },
]);
if (userPinAnswers.PIN === myPin) {
    console.log(chalk.greenBright("Your Pin is correct, Login Successfully!"));
    let operationAnswers = await inquirer.prompt([
        {
            name: "operations",
            type: "list",
            message: chalk.blueBright("Select an Operation"),
            choices: ["Withdraw Amount", "Check Balance", "Exit"],
        },
    ]);
    if (operationAnswers.operations === "Withdraw Amount") {
        let withdrawAnswers = await inquirer.prompt([
            {
                name: "WithdrawMethod",
                type: "list",
                message: chalk.blueBright("Choose a Withdrawl Method"),
                choices: ["Fast Cash", "Enter Your Amount"],
            }
        ]);
        if (withdrawAnswers.WithdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastcash",
                    type: "list",
                    message: chalk.blueBright("Select Your Amount"),
                    choices: [1000, 2000, 5000, 10000, 20000, 50000],
                }
            ]);
            if (fastCashAns.fastcash > "myBalance") {
                console.log(chalk.redBright("Insufficient Balance"));
            }
            else {
                myBalance -= fastCashAns.fastcash;
                console.log(chalk.green(`${fastCashAns.fastcash} Withdraw Successfully`));
                console.log(chalk.blue(`Your remaining balance is ${myBalance}`));
            }
        }
        else if (withdrawAnswers.WithdrawMethod === "Enter Your Amount") {
            let amountAnswers = await inquirer.prompt([
                {
                    name: "Amount",
                    type: "number",
                    message: chalk.blue("Enter the amount to Withdraw:"),
                }
            ]);
            if (amountAnswers.Amount > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= amountAnswers.Amount;
                console.log(chalk.greenBright(`${amountAnswers.Amount},Withdraw Successful`));
                console.log(chalk.blue(`Your remaining account balance is: ${myBalance}`));
            }
        }
    }
    else if (operationAnswers.operations === "Check Balance") {
        console.log(chalk.yellow(`Your Account Balance is ${myBalance}`));
    }
    else if (operationAnswers.operations === "Exit") {
        console.log(chalk.greenBright("EXIT Successfully!"));
    }
}
else {
    console.log(chalk.red("Your Pin is Incorrect, Please Try Again."));
}
