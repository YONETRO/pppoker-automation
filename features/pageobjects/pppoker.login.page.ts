import { browser } from '@wdio/globals';

class PPPokerLoginPage {

    public get inputEmail() {
        return $('input[formcontrolname="email"]');
    }

    public get inputPassword() {
        return $('.password-wrapper input');
    }

    public get btnIniciarSesion() {
        return $('button[type="submit"]');
    }

    public async login(email: string, password: string) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnIniciarSesion.click();
    }

    public open() {
        return browser.url('https://pokerchipmanager.com/login');
    }
}

export default new PPPokerLoginPage();
