const form = document.querySelector("#form")
const nomeInput = document.querySelector("#name")
const cnpjInput = document.querySelector("#cnpj")
const emailInput = document.querySelector("#email")
const motivoSelect = document.querySelector("#motivo")
const messageTextArea = document.querySelector("#message")

form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Verifica se o nome da empresa esta vazio
    if (nomeInput.value === "") {
        alert("Por favor, preencha o nome da empresa");
        return;
    };

    // Verifica se o cnpj está vazio
    if (cnpjInput.value === "" || !validCNPJ(cnpjInput.value)) {
        alert("Cnpj informado é inválido");
        return;
    };    

    // Verifica se o e-mail é valido
    if (emailInput.value === "" || !validEmail(emailInput.value)) {
        alert("Por favor, preencha com um e-mail válido")
        return;
    };

    // Verifica se o clinte selecionou as opções
    if (motivoSelect.value = "") {
        alert("Por favor, selecione um motivo.");
        return;
    };

    // verifica se todos os campos estão corretamente preenchidos
    form.submit();
});

function validEmail(email) {
    const emailRegex = new RegExp(
        // usuario12@host.com.br
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
    )

    if (emailRegex.test(email)) {
        return true;
    };

    return false;
}

function validCNPJ(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;

}