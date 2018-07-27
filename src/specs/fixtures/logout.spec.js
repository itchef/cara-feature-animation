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
import { LoginModel } from "../models/login.model";
import { SystemConfig } from "../config/system.config";
import {PageUtils} from "../utils/page.utils";

const systemConfig = new SystemConfig();
const page = new PageUtils(systemConfig.getAppURL());

fixture("User logout")
    .beforeEach(async t => {
    })
    .page(page.getLogin());

test("should successfully logout admin user", async t => {
    let successSnackBar = Selector(".mat-snack-bar-container").find('.mat-simple-snackbar');
    let loginModel = new LoginModel(systemConfig.getAdminUserName(), systemConfig.getAdminPassword());
    await loginModel.login(t);
    await t.wait(5000);
    await loginModel.logout(t);
    await t.expect(successSnackBar.innerText).eql(`Thank you for using Cara. See you soon`);
});
