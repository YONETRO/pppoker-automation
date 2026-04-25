import { browser } from '@wdio/globals';
import Page from './page.js';

class PPPokerPage extends Page {

    // ── Menú lateral (Dashboard) ───────────────────────────────────────────
    public get menuChipInOut() {
        return $('a[href="/chips"]');
    }

    public get menuHistorial() {
        return $('a[href="/history"]');
    }

    public get menuRecargar() {
        return $('a[href="/recharge"]');
    }

    // ── Toggle Chip In / Chip Out (dentro de /chips) ───────────────────────
    public get btnModoChipIn() {
        return $('button.mode-btn.active-in');
    }

    public get btnModoChipOut() {
        // segundo botón mode-btn (Chip Out)
        return $('button.mode-btn:not(.active-in)');
    }

    // ── Selector de nick ───────────────────────────────────────────────────
    // El dropdown de "Tu nick en el club"
    public get selectorNick() {
        return $('app-chips .chips-layout');
    }

    // ── Cantidad de fichas ─────────────────────────────────────────────────
    // Input numérico de cantidad
    public get inputCantidad() {
        return $('input[type="number"]');
    }

    // Botones rápidos de cantidad (10, 50, 100, 500, 1000)
    public async clickCantidadRapida(valor: string) {
        const botones = await $$('button.quick-amount');
        for (const btn of botones) {
            const texto = await btn.getText();
            if (texto.trim() === valor) {
                await btn.click();
                return;
            }
        }
    }

    // ── Botón Confirmar ────────────────────────────────────────────────────
    public get btnConfirmar() {
        return $('button=Confirmar');
    }

    // ── Mensajes de resultado ──────────────────────────────────────────────
    public get mensajeConfirmacion() {
        return $('.toast-container');
    }

    public get mensajeError() {
        return $('.toast-container');
    }

    // ── Historial ──────────────────────────────────────────────────────────
    public get historialTransacciones() {
        return $('app-history');
    }

    public get fechaTransaccion() {
        return $('.transaction-date');
    }

    public get estadoUltimaTransaccion() {
        return $('.transaction-status');
    }

    // ── Acciones completas ──────────────────────────────────────────────────
    public async chipIn(idUsuario: string, cantidad: string) {
        await this.irAChips();
        await this.inputCantidad.setValue(cantidad);
        await this.btnConfirmar.click();
    }

    public async chipOut(idUsuario: string, cantidad: string) {
        await this.irAChipOut();
        await this.btnModoChipOut.click();
        await this.inputCantidad.setValue(cantidad);
        await this.btnConfirmar.click();
    }

    // ── Navegación ─────────────────────────────────────────────────────────
    public async irAChips() {
        await browser.url('https://pokerchipmanager.com/chips');
    }

    public async irAChipOut() {
        await browser.url('https://pokerchipmanager.com/chips?type=out');
    }

    public open() {
        return browser.url('https://pokerchipmanager.com/dashboard');
    }
}

export default new PPPokerPage();
