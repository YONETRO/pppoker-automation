import { browser, $ } from '@wdio/globals';
import { URL } from '../utils/constants.js';

class PPPokerLoginPage {

    get inputEmail()      { return $('input[formcontrolname="email"]'); }
    get inputPassword()   { return $('.password-wrapper input'); }
    get btnIniciarSesion(){ return $('button[type="submit"]'); }

    open() { return browser.url(URL.LOGIN); }
}

export default new PPPokerLoginPage();
