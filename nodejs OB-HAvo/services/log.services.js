import chalk from "chalk"
import dedent from 'dedent-js'
import yargs from 'yargs';

const printError = error => {
    console.log(chalk.bgGreen("ERROR" + " " + error))
}


const printSuccess = message => {
    console.log(chalk.bgRed("SUCCESS" + " " + message));
}

const printHelp = () => {
    console.log(dedent
`${chalk.bgCyan("HELP")}
-s [CITY] for install city
-h for help
-t [API_KEY] for saving token
            `);
}

const printWeather = (response,icon) => {
   console.log((dedent`
   ${chalk.bgYellowBright("WEATHER")}CITY weather ${response.name}
   ${icon} ${response.weather[0].description}
   Temperature: ${response.main.temp} (feels like ${response.main.feels_like})
   Humidity: ${response.main.humidity}%
   Wind Speed: ${response.wind.speed}m/s
   Pressure: ${response.main.pressure} hpa
   `));
}

const argv = yargs(process.argv.slice(2))
    .option('s', {
        alias: 'city',
        describe: 'Shaharni belgilang',
        demandOption: true,
        type: 'string'
    })
    .help()
    .argv;

    const shahar = argv.city;
export {
printError,
printSuccess,
printHelp,
printWeather}