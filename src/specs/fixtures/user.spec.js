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
const username = faker.internet.userName();

fixture("User")
    .beforeEach(async t => {
        let loginModel = new LoginModel(systemConfig.getAdminUserName(), systemConfig.getAdminPassword());
        t.ctx.loginModel = loginModel;
        t.ctx.userModel = new UserModel();
        await t.ctx.loginModel.login(t);
        await t
            .click(Selector("#admin-link"));
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
        username: username,
        password: password,
        passwordConfirmation: password,
        isAdmin: false
    };
    let successSnackBar = Selector(".mat-snack-bar-container").find('.mat-simple-snackbar');
    const addButton = Selector(".floating-bottom-button").find("button");
    await t
        .click(addButton);
    await t.ctx.userModel.create(newUserForm, t);
    await t
        .expect(successSnackBar.innerText).eql(`${newUserForm.username} has been added`);
});

test("should remain create button disabled for invalid data", async t => {
    const newUserForm = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: username,
        password: faker.internet.password(18),
        passwordConfirmation: faker.internet.password(18),
        isAdmin: false
    };
    const addButton = Selector(".floating-bottom-button").find("button");
    await t
        .click(addButton);
    await t.ctx.userModel.create(newUserForm, t);
    await t
        .expect(Selector("#create-user").hasAttribute("disabled")).ok()
        .click(Selector("#cancel-button"));
});

test("should successfully change a user's password", async t => {
    let password = faker.internet.password(18);
    const changePasswordForm = {
        password: password,
        passwordConfirmation: password
    };
    const successSnackBar = Selector(".mat-snack-bar-container").find('.mat-simple-snackbar');
    const userCard = Selector(".user-card").nth(1);
    await t
        .hover(userCard)
        .click(userCard.find(".user-menu"))
        .click(Selector(".mat-menu-item").nth(0));
    await t
        .ctx.userModel.changePassword(changePasswordForm, t);
    await t
        .expect(successSnackBar.innerText).eql(`${username} password has been updated`);
});

test("should remain update button disabled for invalid data", async t => {
    const changePasswordForm = {
        password: faker.internet.password(18),
        passwordConfirmation: faker.internet.password(18)
    };
    const userCard = Selector(".user-card").nth(1);
    await t
        .hover(userCard)
        .click(userCard.find(".user-menu"))
        .click(Selector(".mat-menu-item").nth(0));
    await t
        .ctx.userModel.changePassword(changePasswordForm, t);
    await t
        .expect(Selector("#update-password").hasAttribute("disabled")).ok()
        .click(Selector("#cancel-button"));
});

test("should successfully unsubscribe a user", async t => {
    const successSnackBar = Selector(".mat-snack-bar-container").find('.mat-simple-snackbar');
    const userCard = Selector(".user-card").nth(1);
    await t
        .hover(userCard)
        .expect(Selector(userCard.find(".mat-chip")).innerText).eql("Subscribed")
        .click(userCard.find(".user-menu"))
        .click(Selector(".mat-menu-item").nth(1))
        .expect(successSnackBar.innerText).eql(`${username} got unsubscribed successfully`);
});

test("should successfully unsubscribe a user", async t => {
    const successSnackBar = Selector(".mat-snack-bar-container").find('.mat-simple-snackbar');
    const userCard = Selector(".user-card").nth(1);
    await t
        .hover(userCard)
        .expect(Selector(userCard.find(".mat-chip")).innerText).eql("Unsubscribed")
        .click(userCard.find(".user-menu"))
        .click(Selector(".mat-menu-item").nth(1))
        .expect(successSnackBar.innerText).eql(`${username} got subscribed successfully`);
});

test("should successfully assign a user as an admin", async t => {
    const successSnackBar = Selector(".mat-snack-bar-container").find('.mat-simple-snackbar');
    const userCard = Selector(".user-card").nth(1);
    await t
        .hover(userCard)
        .click(userCard.find(".user-menu"))
        .click(Selector(".mat-menu-item").nth(2))
        .expect(successSnackBar.innerText).eql(`${username} is an admin`);
});

test("should successfully assign a user as non admin", async t => {
    const successSnackBar = Selector(".mat-snack-bar-container").find('.mat-simple-snackbar');
    const userCard = Selector(".user-card").nth(1);
    await t
        .hover(userCard)
        .click(userCard.find(".user-menu"))
        .click(Selector(".mat-menu-item").nth(2))
        .expect(successSnackBar.innerText).eql(`${username} is non admin`);
});

test("should successfully archive a user successfully", async t => {
    const successSnackBar = Selector(".mat-snack-bar-container").find('.mat-simple-snackbar');
    const userCard = Selector(".user-card").nth(1);
    await t
        .hover(userCard)
        .click(userCard.find(".user-menu"))
        .click(Selector(".mat-menu-item").nth(3))
        .expect(successSnackBar.innerText).eql(`${username} got archived successfully`);
});
