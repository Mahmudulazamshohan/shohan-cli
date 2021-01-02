import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path'
import ora from 'ora'
import { promisify } from 'util'

const access = promisify(fs.access)
const copy = promisify(ncp)
const Log =  console.log
export async function createProject(options) {
    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd(),
    }
    console.log('createProject',options)
    Log('DIR-->'+chalk.green(options.targetDirectory))
   var spining =  ora('Loading ....').start()
    
    setTimeout(()=>{
        spining.text = 'Javascript Loading....'
        
    },1000)
    setTimeout(()=>{
        spining.start()
    },2000)
}