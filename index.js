#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import {createSpinner} from 'nanospinner';


let playerName;

const sleep = (ms=2000)=> new Promise((r)=> setTimeout(r,ms))
async function welcome(){
    const indiancolors=gradient('orange','white','green')
    console.log(indiancolors('Independence Day 2022 Quiz!!'))
    // const rainbowTitle=chalkAnimation.rainbow(
    //     'Independence Day 2022 Quiz!! \n'
    // )
    await sleep()
    // rainbowTitle.stop()
    console.log(`
    ${chalk.bgBlue('HOW TO PLAY')}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRedBright('killed')}
    So get all the questions right...
    `)

}

async function handleAnswer(isCorrect){
    const spinner=createSpinner('Checking answer...').start()
    await sleep()
    if(isCorrect){
        spinner.success({text:`Nice work ${playerName}.That's a legit answer`})
    } else{
        spinner.error({ text: `💀💀💀 Game over, you lose ${playerName }!`})
        process.exit(1)
    }
}

async function askName(){
    const answers=await inquirer.prompt({
        name:'player_name',
        type:'input',
        message:'What is your name?',
        default(){
            return 'Player'
        },
    });
    playerName=answers.player_name;
}

function winner(){
    console.clear()
    figlet(`Congrats,${playerName}!\n`,(err,data)=>{
        console.log(gradient.pastel.multiline(data)+'\n')
        console.log(
            chalk.green(
                `Congratulations, Happy Independence Day to you, and best of luck in continuing to follow your dependent routine`
            )
        )
        process.exit(0)
    })
}

async function question1(){
    const answers=await inquirer.prompt({
        name:'question_1',
        type:'list',
        message:'Which year did we gain Independence? \n',
        choices:[
            '1965',
            '2022',
            '1947',
            '1776',
        ],
    })

    return handleAnswer(answers.question_1 === '1947')
}

async function question2(){
    const answers=await inquirer.prompt({
        name:'question_2',
        type:'list',
        message:'Whom did we gain independence from? \n',
        choices:['The British','The Dutch','The Spanish','Ourselves'],
    })
    return handleAnswer(answers.question_2==='The British');
}

async function question3(){
    const answers=await inquirer.prompt({
        name:'question_3',
        type:'list',
        message:`Who was India's first Prime Minister?\n`,
        choices:[
            'Narendra Modi',
            'Narendra Modi',
            'Jawaharlal Nehru',
            'Narendra Modi',
        ],
    })
    return handleAnswer(answers.question_3==='Jawaharlal Nehru')
}

async function question4(){
    const answers=await inquirer.prompt({
        name:'question_4',
        type:'list',
        message:"How many countries did India partition into?\n",
        choices:[
            '2',
            '3',
            '193',
            '1'
        ],
    })
    return handleAnswer(answers.question_4==='2')
}

async function question5(){
    const answers=await inquirer.prompt({
        name:'question_5',
        type:'list',
        message:'How many states and union territories does India have?\n',
        choices:[
            '28 and 9',
            '29 and 8',
            '29 and 9',
            '28 and 8'
        ],
    })
    return handleAnswer(answers.question_5==='28 and 8')
}

console.clear()
await welcome()
await askName()
await question1()
await question2()
await question3()
await question4()
await question5()
winner()