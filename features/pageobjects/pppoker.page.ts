import { browser, $ } from '@wdio/globals';
import { URL, TIMEOUT } from '../utils/constants.js';

class PPPokerPage {

    get inputCantidad()      { return $('.chips-layout input[type="number"]'); }
    get btnConfirmarChipIn() { return $('button=Confirmar Chip In'); }
    get btnConfirmarChipOut(){ return $('button=Confirmar Chip Out'); }
    get mensajeConfirmacion(){ return $('.toast-container'); }
    get mensajeError()       { return $('.toast-container'); }

    async irAChips() {
        await browser.url(URL.CHIPS);
        await this.inputCantidad.waitForExist({ timeout: TIMEOUT.SHORT });
    }

    async irAChipOut() {
        await browser.url(URL.CHIPS);
        const btnChipOut = $('button.mode-btn:not(.active-in)');
        await btnChipOut.waitForExist({ timeout: TIMEOUT.SHORT });
        await btnChipOut.click();
        await this.inputCantidad.waitForExist({ timeout: TIMEOUT.SHORT });
    }
}

export default new PPPokerPage();
