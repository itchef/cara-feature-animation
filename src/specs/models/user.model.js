/*
 * Cara Feature Automation is the automation tool for Cara app to test the functionality and behaviour of the application.
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

export class UserModel {
    constructor() {
        this.firstNameField = Selector('[formcontrolname="first_name"]');
        this.lastNameField = Selector('[formcontrolname="last_name"]');
        this.username = Selector('[formcontrolname="username"]');
        this.password = Selector('[formcontrolname="password"]');
        this.passwordConfirmation = Selector('[formcontrolname="password_confirmation"]');
    }

    async create(userForm, t) {
        return t
            .typeText(this.firstNameField, userForm.firstName)
            .typeText(this.lastNameField, userForm.lastName)
            .typeText(this.username, userForm.username)
            .typeText(this.password, userForm.password)
            .typeText(this.passwordConfirmation, userForm.passwordConfirmation)
            .click(Selector("#create-user"))
    }
}
