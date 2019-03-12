const { openBrowser, goto, click, below, textField, write, inputField, closeBrowser } = require('taiko');
(async () => {
    try {
        await openBrowser();
        await goto("http://localhost:3060");
        await emulateDevice("Galaxy S5");
        await click("Registrarse");
        await write("Grace", textField(below("Nombre")));
        await write("2223334444", inputField(below("Número de teléfono")));
        await write("03/12/2019", inputField(below("Fecha de tratamiento")));
        await write("password", inputField(below("Contraseña")));
        await click("Registrarse");
    } catch (e) {
        console.error(e);
    } finally {
        await closeBrowser();
    }
})();
