const { execSync } = require('child_process');
const fs = require('fs');
const yaml = require('js-yaml');

// Leer configuracion
const config = yaml.load(fs.readFileSync('ejecucion.yml', 'utf8'));

// Leer argumento --suite
const args = process.argv.slice(2);
const suiteIndex = args.indexOf('--suite');
const suiteName = suiteIndex !== -1 ? args[suiteIndex + 1] : 'all';

// Buscar suite
const suite = config.suites[suiteName];
if (!suite) {
    console.error(`Suite "${suiteName}" no encontrada. Suites disponibles: ${Object.keys(config.suites).join(', ')}`);
    process.exit(1);
}

console.log(`\n Corriendo suite: ${suiteName}`);
console.log(` Descripcion: ${suite.descripcion}`);
console.log(` Spec: ${suite.spec}\n`);

// Construir comando
let cmd = `npx wdio run wdio.conf.ts --spec ${suite.spec}`;

if (config.navegador.headless) {
    process.env.HEADLESS = 'true';
}

// Ejecutar
try {
    execSync(cmd, { stdio: 'inherit' });
} catch (e) {
    process.exit(1);
}
