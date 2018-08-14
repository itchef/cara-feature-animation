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

import { Selector } from "testcafe";
import * as faker from "faker";
import {SystemConfig} from "../config/system.config";
import {PageUtils} from "../utils/page.utils";
import {LoginModel} from "../models/login.model";
import {UserModel} from "../models/user.model";

const systemConfig = new SystemConfig();
const page = new PageUtils(systemConfig.getAppURL());

fixture("User")
    .beforeEach(async t => {
        let loginModel = new LoginModel(systemConfig.getAdminUserName(), systemConfig.getAdminPassword());
        t.ctx.loginModel = loginModel;
        await t.ctx.loginModel.login(t);
    })
    .afterEach(async t => {
        await t.ctx.loginModel.logout(t);
    })
    .page(page.dashboard());

test("should successfully create a user with valid data", async t => {
    let password = faker.internet.password(18);
    const newUserForm = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        password: password,
        passwordConfirmation: password,
        isAdmin: false
    };
    let successSnackBar = Selector(".mat-snack-bar-container").find('.mat-simple-snackbar');
    let userModel = new UserModel();
    await t
        .click(Selector("#admin-link"))
        .click(Selector(".floating-bottom-button").find("button"));
    await userModel.create(newUserForm, t);
    await t
        .expect(successSnackBar.innerText).eql(`${newUserForm.username} has been added`);
});