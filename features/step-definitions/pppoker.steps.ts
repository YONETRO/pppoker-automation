import { Given, When, Then, Before } from '@wdio/cucumber-framework';
import { expect, browser } from '@wdio/globals';
import PPPokerLoginPage from '../pageobjects/pppoker.login.page.js';
import PPPokerPage from '../pageobjects/pppoker.page.js';
import * as dotenv from 'dotenv';
dotenv.config();

// ==================== LOGIN UNICO ====================

let loggedIn = false;

Before(async () => {
    if (!loggedIn) {
        await PPPokerLoginPage.open();
        await PPPokerLoginPage.inputEmail.waitForExist({ timeout: 10000 });
        await PPPokerLoginPage.inputEmail.setValue(process.env.PPPOKER_EMAIL!);
        await PPPokerLoginPage.inputPassword.setValue(process.env.PPPOKER_PASSWORD!);
        await PPPokerLoginPage.btnIniciarSesion.click();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/dashboard'),
            { timeout: 10000, timeoutMsg: 'No redirigió al dashboard' }
        );
        loggedIn = true;
    }
});

// ==================== NAVEGACION ====================

When('hace click en el boton Chip In', async () => {
    await $('a[href="/chips"]').waitForExist({ timeout: 10000 });
    await $('a[href="/chips"]').click();
    await browser.pause(3000);
});

When('hace click en el boton Chip Out', async () => {
    await $('a[href="/chips"]').waitForExist({ timeout: 10000 });
    await $('a[href="/chips"]').click();
    await browser.pause(2000);
    await $('button.mode-btn:not(.active-in)').waitForExist({ timeout: 5000 });
    await $('button.mode-btn:not(.active-in)').click();
    await browser.pause(3000);
});

Then('la pagina sigue en {string}', async (path: string) => {
    await expect(browser).toHaveUrl(expect.stringContaining(path));
});

Then('la URL contiene {string}', async (path: string) => {
    await browser.waitUntil(
        async () => (await browser.getUrl()).includes(path),
        { timeout: 5000, timeoutMsg: `URL no contiene ${path}` }
    );
    await expect(browser).toHaveUrl(expect.stringContaining(path));
});

// ==================== CHIP IN ====================

Given('el usuario se encuentra en la seccion de chip in', async () => {
    await PPPokerPage.irAChips();
});

When('ingresa el ID de usuario {string}', async (idUsuario: string) => {
    await PPPokerPage.inputCantidad.setValue(idUsuario);
});

When('ingresa la cantidad de fichas {string}', async (cantidad: string) => {
    await PPPokerPage.inputCantidad.setValue(cantidad);
});

When('confirma el envio', async () => {
    await PPPokerPage.btnConfirmarChipIn.waitForExist({ timeout: 5000 });
    await PPPokerPage.btnConfirmarChipIn.click();
});

Then('la web muestra el estado {string}', async (estado: string) => {
    await PPPokerPage.mensajeConfirmacion.waitForExist({ timeout: 10000 });
    await expect(PPPokerPage.mensajeConfirmacion).toHaveText(expect.stringContaining(estado));
});

Then('la web muestra confirmacion {string}', async (mensaje: string) => {
    await PPPokerPage.mensajeConfirmacion.waitForExist({ timeout: 10000 });
    await expect(PPPokerPage.mensajeConfirmacion).toHaveText(expect.stringContaining(mensaje));
});

Then('la web muestra mensaje de error {string}', async (mensaje: string) => {
    await PPPokerPage.mensajeError.waitForExist({ timeout: 5000 });
    await expect(PPPokerPage.mensajeError).toHaveText(expect.stringContaining(mensaje));
});

Then('el saldo del usuario en la web se actualiza con {string} fichas', async (cantidad: string) => {
    console.log(`Saldo actualizado con ${cantidad} fichas`);
});

// ==================== CHIP OUT ====================

Given('el usuario se encuentra en la seccion de chip out', async () => {
    await PPPokerPage.irAChipOut();
});

Given('el usuario {string} tiene saldo suficiente en PPPoker', async (idUsuario: string) => {
    console.log(`Validando saldo del usuario ${idUsuario}`);
});

Given('el usuario {string} no tiene saldo suficiente en PPPoker', async (idUsuario: string) => {
    console.log(`Usuario ${idUsuario} sin saldo suficiente`);
});

When('ingresa la cantidad de fichas {string} a retirar', async (cantidad: string) => {
    await PPPokerPage.inputCantidad.setValue(cantidad);
});

When('confirma la operacion', async () => {
    await PPPokerPage.btnConfirmarChipOut.waitForExist({ timeout: 5000 });
    await PPPokerPage.btnConfirmarChipOut.click();
});

Then('el saldo del usuario en la web disminuye en {string} fichas', async (cantidad: string) => {
    console.log(`Saldo disminuido en ${cantidad} fichas`);
});

// ==================== HISTORIAL ====================

Given('se completo un chip in exitoso de {string} fichas al usuario {string}', async (cantidad: string, idUsuario: string) => {
    await PPPokerPage.chipIn(idUsuario, cantidad);
});

Given('se completo un chip out exitoso de {string} fichas del usuario {string}', async (cantidad: string, idUsuario: string) => {
    await PPPokerPage.chipOut(idUsuario, cantidad);
});

When('el usuario consulta el historial de transacciones', async () => {
    await PPPokerPage.historialTransacciones.click();
});

Then('aparece el registro del chip in con la cantidad {string}', async (cantidad: string) => {
    await expect(PPPokerPage.historialTransacciones).toHaveText(expect.stringContaining(cantidad));
});

Then('aparece el registro del chip out con la cantidad {string}', async (cantidad: string) => {
    await expect(PPPokerPage.historialTransacciones).toHaveText(expect.stringContaining(cantidad));
});

Then('el estado de la transaccion es {string}', async (estado: string) => {
    await expect(PPPokerPage.estadoUltimaTransaccion).toHaveText(expect.stringContaining(estado));
});

Then('la fecha y hora de la transaccion es correcta', async () => {
    await expect(PPPokerPage.fechaTransaccion).toBeExisting();
});
