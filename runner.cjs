const { execSync } = require('child_process');

const TAGS = '@navegacion or @chipIn or @chipOut';
const SPEC = 'features/PPPoker.feature';

console.log('\n PPPoker Monitor - Corriendo pruebas...\n');

try {
    execSync(
        `npx wdio run wdio.conf.ts --spec ${SPEC} --cucumberOpts.tagExpression="${TAGS}"`,
        { stdio: 'inherit' }
    );
    console.log('\n Todas las pruebas pasaron OK\n');
} catch (e) {
    console.error('\n FALLO detectado en las pruebas\n');
    process.exit(1);
}
