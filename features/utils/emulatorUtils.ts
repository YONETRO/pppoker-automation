import { execSync } from 'child_process';

const ADB_PATH = 'C:\\Users\\User\\AppData\\Local\\Android\\Sdk\\platform-tools\\adb.exe';
const EMULATOR_HOST = '127.0.0.1:5555';
const APP_PACKAGE = 'com.lein.pppoker.android';

export function pingEmulator(): boolean {
    try {
        const result = execSync(`"${ADB_PATH}" connect ${EMULATOR_HOST}`, { encoding: 'utf-8' });
        return result.includes('connected');
    } catch {
        return false;
    }
}

export function isEmulatorOnline(): boolean {
    try {
        const result = execSync(`"${ADB_PATH}" -s ${EMULATOR_HOST} get-state`, { encoding: 'utf-8' });
        return result.trim() === 'device';
    } catch {
        return false;
    }
}

export function isAppInstalled(): boolean {
    try {
        const result = execSync(
            `"${ADB_PATH}" -s ${EMULATOR_HOST} shell pm list packages | findstr ${APP_PACKAGE}`,
            { encoding: 'utf-8' }
        );
        return result.includes(APP_PACKAGE);
    } catch {
        return false;
    }
}

export function getEmulatorStatus(): { connected: boolean; appInstalled: boolean; message: string } {
    const connected = isEmulatorOnline();
    const appInstalled = connected ? isAppInstalled() : false;

    return {
        connected,
        appInstalled,
        message: !connected
            ? `No se encontró dispositivo disponible en ${EMULATOR_HOST}`
            : !appInstalled
            ? `Emulador conectado pero ${APP_PACKAGE} no está instalada`
            : `Emulador online y PPPoker activo`
    };
}
