const input = document.querySelectorAll('.input');
const span = document.querySelectorAll('.erro');

const rg = document.querySelector('#rg');
const rgErro = document.querySelector('#rg-erro');

const senha = document.querySelector('#senha');
const confirmaSenha = document.querySelector('#confirmasenha');
const erroSenha = document.querySelector('#erro-senha');

const enviar = document.querySelector('#enviar');

let campoPreenchido;
let rgValido;
let rgNumrpt;
let senhaValida;

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
            if (input[i].value == '') {
                span[i].style.display = 'block';
                span[i].innerText = 'Preencha o campo acima';
                campoPreenchido = false;
                console.log('false campos vazio')
            } else {
                span[i].style.display = 'none';
                campoPreenchido = true;
                console.log('true campos vazios')
            }
       }
        catch {
            console.log('erro')
        }

    });
};

// trantando possiveis erros de RG.
rg.addEventListener('blur', () => {
    // se o dígito for menor do que 8 caractere e maior 9 será inválido.
    if (rg.value.length > 0 && rg.value.length < 7 || rg.value.length > 9) {
        rgErro.style.display = 'block';
        rgErro.innerText = 'Digite seu RG entre 8 a 9 dígitos';
        rgValido = false;
    } else {
        rgValido = true;
    }
    // laço de repetição para percorrer objeto e condição de invalidação para números repetidos.
    for (let i in numRepetidosRg) {
        if (rg.value == numRepetidosRg[i]) {
            rgErro.style.display = 'block';
            rgErro.innerText = 'RG inválido com números repetidos';
            rgNumrpt = false;
        } else {
            rgNumrpt = true;
        };
    };
});

// tratando senhas inválidas
confirmaSenha.addEventListener('blur', () => {
    if (senha.value != confirmaSenha.value) {
        erroSenha.style.display = 'block';
        erroSenha.innerText = 'Senhas não conferem';
        senhaValida = false;

    } else {
        erroSenha.style.display = 'none';
        senhaValida = true;

    };
});

enviar.addEventListener('click', (event) => {

    if (campoPreenchido == true && rgValido == true && senhaValida == true && rgNumrpt == true) {
        console.log('Home')
        location.replace('https://www.google.com/webhp?hl=pt-BR&sa=X&ved=0ahUKEwiAhq7I6vP1AhUSqpUCHX96B64QPAgI');
    } else {
        event.preventDefault();
        console.log('nop')
    }
});