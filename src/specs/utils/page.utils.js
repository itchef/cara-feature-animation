export class PageUtils {
    constructor(appUrl) {
        this.appUrl = appUrl;
    }

    getLogin() {
        return `${this.appUrl}/login`;
    }
}