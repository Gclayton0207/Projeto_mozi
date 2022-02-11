// executar evento ao perder o foco do campo do input do CEP

document.querySelector('#cep').addEventListener('blur', (event) => {
    event.preventDefault();
    endereco();
});

function endereco() {
    const cep = document.querySelector('#cep').value.replace(/\D/g, "");
    const cidade = document.querySelector('#cidade');
    const logradouro = document.querySelector('#rua');
    const bairro = document.querySelector('#bairro');
    const estado = document.querySelector('#estado');
    const erro = document.querySelector('#erro-cep');
    const urlCep = "https://viacep.com.br/ws/" + cep + "/json";
    // preencher ... em todos os campos enquanto faz requisição da API.
    cidade.value = "...";
    logradouro.value = "...";
    bairro.value = "...";
    estado.value = "...";

        $.ajax({
            url: urlCep,

            success: (verifica) => {
                erro.style.display = 'none';
                logradouro.value = verifica.logradouro;
                bairro.value = verifica.bairro;
                cidade.value = verifica.localidade;
                estado.value = verifica.uf;
            },
            error: () => {
                erro.style.display = 'block';
                erro.innerText = 'CEP inválido';
            },
        })
};