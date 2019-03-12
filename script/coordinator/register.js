const { openBrowser, goto, click, below, textField, write, inputField, closeBrowser } = require('taiko');
(async () => {
    try {
        await openBrowser();
        await goto("http://localhost:3060");
        await click("TODO Coordinator Login");
        await click("Registrarse");
        await write("Grace C Youngblood", textField(below("Nombre")));
        await write("grace.c.youngblood@gmail.com", inputField(below("Email")));
        await write("password", inputField(below("Contraseña")));
        await click("Registrarse");
    } catch (e) {
        console.error(e);
    } finally {
        await closeBrowser();
    }
})();
