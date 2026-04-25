import { browser, $ } from '@wdio/globals';
import Page from './page.js';

class PPPokerPage extends Page {

    // ── Dashboard ──────────────────────────────────────────────────────────
    public get btnChipIn() {
        return $('a[href="/chips"]');
    }

    public get btnChipOut() {
        return $('a[href="/chips?type=out"]');
    }

    public get btnHistorial() {
        return $('a[href="/history"]');
    }

    public get saldoDisponible() {
        return $('.stats-grid');
    }

    // ── Chip In / Out - toggle ─────────────────────────────────────────────
    public get btnModoChipIn() {
        return $('button.mode-btn.active-in');
    }

    public get btnModoChipOut() {
        return $('button.mode-btn.active-out');
    }

    public get btnSwitchAChipOut() {
        return $('button.mode-btn:not(.active-in)');
    }

    // ── Formulario ─────────────────────────────────────────────────────────
    public get inputCantidad() {
        return $('.chips-layout input[type="number"]');
    }

    public get btnConfirmarChipIn() {
        return $('button=Confirmar Chip In');
    }

    public get btnConfirmarChipOut() {
        return $('button=Confirmar Chip Out');
    }

    // ── Resultados y mensajes ──────────────────────────────────────────────
    public get mensajeConfirmacion() {
        return $('.toast-container');
    }

    public get mensajeError() {
        return $('.toast-container');
    }

    public get estadoUltimaTransaccion() {
        return $('.transaction-status');
    }

    public get historialTransacciones() {
        return $('a[href="/history"]');
    }

    public get fechaTransaccion() {
        return $('.transaction-date');
    }

    // ── Acciones ───────────────────────────────────────────────────────────
    public async irAChips() {
        await browser.url('https://pokerchipmanager.com/chips');
        await browser.pause(2000);
    }

    public async irAChipOut() {
        await browser.url('https://pokerchipmanager.com/chips?type=out');
        await browser.pause(2000);
    }

    public async chipIn(idUsuario: string, cantidad: string) {
        await this.irAChips();
        await this.inputCantidad.setValue(cantidad);
        await this.btnConfirmarChipIn.click();
    }

    public async chipOut(idUsuario: string, cantidad: string) {
        await this.irAChipOut();
        await this.inputCantidad.setValue(cantidad);
        await this.btnConfirmarChipOut.click();
    }

    public open() {
        return browser.url('https://pokerchipmanager.com/dashboard');
    }
}

export default new PPPokerPage();
