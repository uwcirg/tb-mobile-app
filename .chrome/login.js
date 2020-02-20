document.querySelector("#Patient").click()

window.setTimeout(() => {

    let inputs = document.querySelectorAll('input')

    inputs[0].select();
    document.execCommand('insertText', false, '123456789');

    inputs[1].select();
    document.execCommand('insertText', false, 'password');

    document.querySelector('#login').click()

}, 1000)