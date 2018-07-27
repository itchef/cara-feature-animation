/*
 * Cara Feature Automation is the automation tool for Cara app to test the functionality and behaviour of the
 * application
 *
 * Copyright (c) 2018 ITChef.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 * along with this program.  If not, see [https://www.gnu.org/licenses/](https://www.gnu.org/licenses/).
 *
 * @author Kaustav Chakraborty
 */

import {Selector} from "testcafe";

export class LoginModel {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.usernameField = Selector('#login-username');
        this.passwordField = Selector('#login-password');
        this.loginButton = Selector('#login-button');
    }

    async login(t) {
        return t
            .typeText(this.usernameField, this.username)
            .typeText(this.passwordField, this.password)
            .click(this.loginButton)
    }

    async fillLoginForm(t) {
        return t
            .typeText(this.usernameField, this.username)
            .typeText(this.passwordField, this.password)
    }

    async logout(t) {
        return t
            .click(Selector("#user-menu"))
            .click(Selector("#logout-menu-item"))
    }
}