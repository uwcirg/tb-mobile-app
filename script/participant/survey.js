const { openBrowser, goto, inputField, write, click, above, below, image, toRightOf, prompt, to, fileField, attach, closeBrowser } = require('taiko');
(async () => {
    try {
        await openBrowser();
        await goto("http://localhost:3060");
        await emulateDevice("Galaxy S5");
        await write("54-911-0000-2222", inputField({ placeholder: "El numero del telefono" }));
        await write("password", inputField({ placeholder: "Contraseña" }));
        await click("Iniciar sesión");
        await click("Control de la medicacion");
        await click("Sí");
        await write("06:00 AM", inputField(above("Confirmar")));
        await click("Confirmar");
        await click("Sí");
        await click("Náuseas o vómitos");
        await click(image(below("Náuseas o vómitos")));
        await write("Numbness", inputField(above("Confirmar")));
        await click("Confirmar");
        await click("Haga clic aquí para tomar una foto.");
        await attach("src/images/strip_report.jpg", fileField());
        await click("Confirmar");
    } catch (e) {
        console.error(e);
    } finally {
        await closeBrowser();
    }
})();
