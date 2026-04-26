export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    specs: ['./features/**/*.feature'],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--start-maximized',
                ...(process.env.HEADLESS === 'true' ? ['--headless', '--no-sandbox', '--disable-dev-shm-usage'] : [])
            ]
        }
    }],
    logLevel: 'error',
    bail: 0,
    baseUrl: 'https://pokerchipmanager.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'cucumber',
    reporters: ['spec'],
    cucumberOpts: {
        require: ['./features/step-definitions/*.ts'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '@navegacion',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    }
}
