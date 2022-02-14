const inputEmail = document.querySelector('#email');
const msg = document.querySelector('#msg');
const btn = document.querySelector('#enviar');
const form =document.querySelector('#formulario');
let mailOk;
function email() {
    if(inputEmail.value == '') {
        msg.style.color = 'orange';
        msg.innerText = 'Por favor digite seu E-mail.';
        mailOk = false;
    } 
     else if(inputEmail.value.indexOf('@') > 0 && inputEmail.value.indexOf('.com') > 0) {
        msg.style.color = 'greenyellow';
        msg.innerText = `Email de recuperação enviado com sucesso.
        Aguarde 5 segundos que você será redirecionado para página inicial`;
        mailOk = true;
    } else{
        msg.style.color = 'red';
        msg.innerText = 'E-mail inválido.';
        mailOk = false; 
    }
};

btn.addEventListener('click', () => {
   return email();
});

form.addEventListener('submit', (e) => {
    if(mailOk == true) {
     setTimeout(() => { location.replace('../../models/html/index.html')}, 5000);
    }
    return e.preventDefault();
});