
$('#btnEntrar').mouseenter(function (){
    var email = $('#exampleInputEmail1').val()
    var senha = $('#exampleInputPassword1').val()
    console.log(email)
   if(email ==='emailteste@gmail.com' && senha ==='senhaCorreta' ){
    //console.log('funcionou')
     window.location.replace('./landing_Page.html') 
    }else{
        alert('Email ou senha incorretos!\nPara saber quais são os dados corretos\nconsulte a documentação!')
        
    }
})

