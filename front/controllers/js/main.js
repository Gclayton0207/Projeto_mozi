$('#btnEntrar').click(function (event) {
    event.preventDefault();
    var email = $('#exampleInputEmail1').val();
    var senha = $('#exampleInputPassword1').val();
    //console.log(email)
    if (email === 'emailjunior@gmail.com' && senha === 'senhaCorreta') {
        //console.log('funcionou')
        window.location.replace('./perfil_Junior.html');
    } else if (email === 'emailmaster@gmail.com' && senha === 'senhaCorreta') {
        window.location.replace('./perfil_Master.html');
    } else if (email === 'emailsenior@gmail.com' && senha === 'senhaCorreta') {
        window.location.replace('./perfil_Senior.html');
    } else {
        alert('Email ou senha incorretos!\nPara saber quais são os dados corretos\nconsulte a documentação!');
    };
});

$('#infos button').click(function () {
    window.location.replace('./landing_Page.html');

})

