import { Given, When, Then, Before } from '@wdio/cucumber-framework';
import { expect, browser, $ } from '@wdio/globals';
import PPPokerLoginPage from '../pageobjects/pppoker.login.page.js';
import PPPokerPage from '../pageobjects/pppoker.page.js';
import { TIMEOUT } from '../utils/constants.js';
import * as dotenv from 'dotenv';
dotenv.config();

let loggedIn = false;

Before(async () => {
    if (loggedIn) return;
    await PPPokerLoginPage.open();
    await PPPokerLoginPage.inputEmail.waitForExist({ timeout: TIMEOUT.MEDIUM });
    await PPPokerLoginPage.inputEmail.setValue(process.env.PPPOKER_EMAIL!);
    await PPPokerLoginPage.inputPassword.setValue(process.env.PPPOKER_PASSWORD!);
    await PPPokerLoginPage.btnIniciarSesion.click();
    await browser.waitUntil(
        async () => (await browser.getUrl()).includes('/dashboard'),
        { timeout: TIMEOUT.MEDIUM }
    );
    loggedIn = true;
});

When('hace click en el boton Chip In', async () => {
    const btn = $('a[href="/chips"]');
    await btn.waitForExist({ timeout: TIMEOUT.MEDIUM });
    await btn.click();
    await browser.waitUntil(
        async () => (await browser.getUrl()).includes('/chips'),
        { timeout: TIMEOUT.SHORT }
    );
});

When('hace click en el boton Chip Out', async () => {
    const btn = $('a[href="/chips"]');
    await btn.waitForExist({ timeout: TIMEOUT.MEDIUM });
    await btn.click();
    const btnOut = $('button.mode-btn:not(.active-in)');
    await btnOut.waitForExist({ timeout: TIMEOUT.SHORT });
    await btnOut.click();
});

Then('el modo activo es {string}', async (modo: string) => {
    const selector = modo === 'Chip In' ? 'button.modo-btn.active-in-falso' : 'button.modo-btn.active-out-falso';
    await $(selector).waitForExist({ timeout: TIMEOUT.SHORT });
});

Given('el usuario se encuentra en la seccion de chip in', async () => {
    await PPPokerPage.irAChips();
});

Given('el usuario se encuentra en la seccion de chip out', async () => {
    await PPPokerPage.irAChipOut();
});

When('ingresa la cantidad de fichas {string}', async (cantidad: string) => {
    await PPPokerPage.inputCantidad.setValue(cantidad);
});

When('confirma el envio', async () => {
    await PPPokerPage.btnConfirmarChipIn.click();
});

When('confirma la operacion', async () => {
    await PPPokerPage.btnConfirmarChipOut.click();
});

Then('la web muestra confirmacion {string}', async (mensaje: string) => {
    await PPPokerPage.mensajeConfirmacion.waitForExist({ timeout: TIMEOUT.MEDIUM });
    await expect(PPPokerPage.mensajeConfirmacion).toHaveText(expect.stringContaining(mensaje));
});

Then('la web muestra mensaje de error {string}', async (mensaje: string) => {
    await PPPokerPage.mensajeError.waitForExist({ timeout: TIMEOUT.SHORT });
    await expect(PPPokerPage.mensajeError).toHaveText(expect.stringContaining(mensaje));
});
