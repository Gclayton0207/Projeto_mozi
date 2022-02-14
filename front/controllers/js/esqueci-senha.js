const inputEmail = document.querySelector('#email');
const msg = document.querySelector('#msg');
const btn = document.querySelector('#enviar');
function email() {
    if(inputEmail.value == '') {
        msg.style.color = 'orange'
        msg.innerHTML = 'Por favor digite seu E-mail.'
    } 
     else if(inputEmail.value.indexOf('@') > 0 && inputEmail.value.indexOf('.com') > 0) {
        msg.style.color = 'greenyellow';
        msg.innerHTML = 'Email de recuperação enviado com sucesso.';
    } else{
        msg.style.color = 'red'
        msg.innerHTML = 'E-mail inválido.' 
    }
};

btn.addEventListener('click', (e) => {
    e.preventDefault();
    email();

});