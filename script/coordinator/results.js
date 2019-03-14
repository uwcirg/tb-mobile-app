const { openBrowser, goto, click, inputField, write, closeBrowser } = require('taiko');
(async () => {
    try {
        await openBrowser();
        await goto("http://localhost:3060");
        await click("TODO Coordinator Login");
        await write("grace.c.youngblood@gmail.com", inputField({ placeholder: "Email" }));
        await write("password", inputField({ placeholder: "Contraseña" }));
        await click("Iniciar sesión");
        await client().Page.reload()
        await click("Grace");
    } catch (e) {
        console.error(e);
    } finally {
        await closeBrowser();
    }
})();
