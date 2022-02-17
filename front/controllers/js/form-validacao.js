const formulario = document.querySelector('.form');
const input = document.querySelectorAll('.input');
const span = document.querySelectorAll('.erro');

const rg = document.querySelector('#rg');
const rgErro = document.querySelector('#rg-erro');

const senha = document.querySelector('#senha');
const confirmaSenha = document.querySelector('#confirmasenha');
const erroSenha = document.querySelector('#erro-senha');

const checkbox = document.querySelector('#gridCheck');
const erroGeral = document.querySelector('.erro-geral');
const enviar = document.querySelector('#enviar');

let formOk = false;

// objeto para invalidar numeros repetidos no RG.
const numRepetidosRg = {
    '0': '0000000000',
    '1': '1111111111',
    '2': '2222222222',
    '3': '3333333333',
    '4': '4444444444',
    '5': '5555555555',
    '6': '6666666666',
    '7': '7777777777',
    '8': '8888888888',
    '9': '9999999999',
};

// tratando erro para campos vazios.
for (let i = 0; i < input.length; i++) {
    input[i].addEventListener('blur', () => {
        try {
            if (input[i].value == 0) {
                span[i].style.display = 'block';
                span[i].innerText = 'Preencha o campo acima';
            } else {
                span[i].style.display = 'none';
            }
        }
        catch {
            span[3].innerText = 'Por favor digite sua senha'; 
        }
    });
};

// trantando possiveis erros de RG.
rg.addEventListener('blur', () => {
    // se o dígito for menor do que 8 caractere e maior 9 será inválido.
    if (rg.value.length >= 0 && rg.value.length < 8 || rg.value.length > 9) {
        rgErro.style.display = 'block';
        rgErro.innerText = 'Digite seu RG entre 8 a 9 dígitos';

    } else {
        rgErro.style.display = 'none';
    }
    // laço de repetição para percorrer objeto e condição de invalidação para números repetidos.
    for (let i in numRepetidosRg) {
        if (rg.value == numRepetidosRg[i]) {
            rgErro.style.display = 'block';
            rgErro.innerText = 'RG inválido com números repetidos';
        }
    };
});

// tratando senhas inválidas
confirmaSenha.addEventListener('blur', () => {
    if (senha.value != confirmaSenha.value) {
        erroSenha.style.display = 'block';
        erroSenha.innerText = 'Senhas não conferem';
        senha.value = '';
        confirmaSenha.value = '';
    } else {
        erroSenha.style.display = 'none';
    };
});

// evento que verifica se o input checkbox está marcado
enviar.addEventListener('click', () => {
    if (checkbox.checked == false) {
        return alert('Preencha todos os campos');
    };
    formOk = true;
});
// evento que encaminha para a página index
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if (formOk == true) {
        erroGeral.style.display = 'block';
        erroGeral.style.color = 'greenyellow';
        erroGeral.innerText = 'Cadastrado com sucesso. Você será redirecionado para página inicial em 5 segundos';
        setTimeout(() => { location.replace('../../models/html/index.html')}, 5000);
    };
});