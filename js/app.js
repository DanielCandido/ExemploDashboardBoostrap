var btnCadastrar = document.querySelector('#btn-cadastrar-usuario');
var tituloModalUsuario = document.querySelector('#title-modalUsuario h5');
var tituloModalPrestador = document.querySelector('#title-modalPrestador h5');
var btnExcluir = $(".btnExcluir");
var usuario = {};
var user = [];

function cadastrarUsuario() {
    console.log(usuario);
    usuario.Nome = document.getElementById('nome').value;
    usuario.Sobrenome = document.getElementById('sobrenome').value;
    usuario.Rg = document.getElementById('rg').value;
    var cpf = document.getElementById('cpf').value;
    var novoCPF = cpf.replace(/[\.-]/g, "");
    usuario.Cpf = novoCPF;
    usuario.Email = document.getElementById('email').value;
    usuario.Cep = document.getElementById('cep').value;
    usuario.Bairro = document.getElementById('bairro').value;
    usuario.Cidade = document.getElementById('cidade').value;
    usuario.Uf = document.getElementById('uf').value;
    usuario.Telefone = document.getElementById('telefone').value;
    usuario.Celular = document.getElementById('celular').value;
    usuario.Endereco = document.getElementById('rua').value;
    usuario.Numerocasa = document.getElementById('numerocasa').value;
    usuario.Complemento = document.getElementById('complemento').value;
    usuario.Senha = document.getElementById('senha').value;

	console.log(usuario);
    
    if (usuario.Id === undefined || usuario.Id === 0){
        salvarUsuario('POST',0, usuario);
        bootbox.alert({
                message: "Cadastro efetuado com sucesso!",
                size: 'small'
        });
    } else {
        salvarUsuario('PUT',usuario.Id, usuario);
         bootbox.alert({
                message: "Edição efetuado com sucesso!",
                size: 'small'
        })
    }
    
    listarUsuarios();
}   

function salvarUsuario(metodo, id, usuario){
	var xhr = new XMLHttpRequest();

	if (id === undefined || id === 0)
		id = "";

	xhr.open(metodo, `http://localhost:60806/api/Usuario/${id}`, false);

	if(usuario !== undefined){
		xhr.setRequestHeader('content-type','application/json');
		xhr.send(JSON.stringify(usuario));
	}
	
}

function verificaSenha(){

	var _senha = document.getElementById('senha').value;	
	var _confirme = document.getElementById('confirme').value;

		if (_senha === _confirme) {
			var senha = document.getElementById('senha');
            var confirme = document.getElementById('confirme');
            var cadastrar = $('#btn-cadastrar-usuario');
            cadastrar.prop('disable',true);
            senha.style.borderColor = "green";
            confirme.style.borderColor = "green";
		}
		else{
			alert('Nao ok');
		}
}

function editarUsuario(_usuario){
    document.getElementById('nome').value= _usuario.Nome;
    document.getElementById('sobrenome').value= _usuario.Sobrenome;
    document.getElementById('rg').value= _usuario.Rg;
    document.getElementById('cpf').value= _usuario.Cpf;
    document.getElementById('email').value= _usuario.Email;
    document.getElementById('telefone').value= _usuario.Telefone;
    document.getElementById('celular').value= _usuario.Celular;
    document.getElementById('cep').value = _usuario.Cep;
    document.getElementById('bairro').value = _usuario.Bairro;
    document.getElementById('cidade').value = _usuario.Cidade;
    document.getElementById('uf').value = _usuario.Uf;
    document.getElementById('rua').value= _usuario.Endereco;
    document.getElementById('numerocasa').value= _usuario.NumeroCasa;
    document.getElementById('complemento').value= _usuario.Complemento;
    document.getElementById('senha').value= _usuario.Senha;
    document.getElementById('confirme').value= _usuario.Senha;
    
      btnCadastrar.textContent = 'Editar Usuário';
    tituloModalUsuario.innerHTML = "Editar Usuário";
    
    btnExcluir.show();
    
    usuario = _usuario;
    console.log(usuario);
}

function excluirUsuario(id){
    var xhr = new XMLHttpRequest();

	xhr.open('DELETE', `http://localhost:60806/api/Usuario/${id}`, false);

	xhr.send();
}

function excluir(usuario){
    
    bootbox.confirm({
        message: `Tem certeza que deseja excluir o usuário ${usuario.Nome}`,
        buttons: {
            confirm: {
                label: "SIM",
                className: "btn-success"
            },
            cancel: {
                label: "NÃO",
                className: "btn-danger"
            }
        },
        callback: function(result){
            if(result){
                console.log(usuario.Id);
                excluirUsuario(usuario.Id);
                listarUsuarios();
            }
        }
    })
}

function listarUsuarios(){
	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'http://localhost:60806/api/Usuario/ListarUsuarios', true);
    
    xhr.onerror = function(){
        console.log("ERRO", xhr.readyState);
    }


	xhr.onreadystatechange = function (){
        if(this.readyState == 4){
            if(this.status == 200){
                var usuarios = JSON.parse(this.responseText);
            } else if(this.status == 500){
                var erro = JSON.parse(this.responseText);
                console.log(erro);
                bootbox.alert({
                message: erro.Message + ' : ' + erro.ExceptionMessage,
                size: 'large'
        });
            }
        }
	}
	xhr.send();
}

listarUsuarios();


function mostrarTabela(tipoTabela){
    
    if(tipoTabela === '.table-user'){
	   $(tipoTabela).show();
        $('.fechar-usuarios').show();
        $('#cadastrar-usuario').show();
        $('#cadastrar-prestador').hide();
        $('.table-worker').hide();
        $('.fechar-prestadores').hide();
    }
    
    if(tipoTabela === '.table-worker'){
        $(tipoTabela).show();
        $('.fechar-prestadores').show();
        $('#cadastrar-prestador').show();
        $('#cadastrar-usuario').hide();
        $('.table-user').hide();
        $('.fechar-usuarios').hide();
    }
}

function fechaTabela(){
	$('table').hide();
	$('.fechar-usuarios').hide();
    $('.fechar-prestadores').hide();
    $('#cadastrar-usuario').hide();
    $('#cadastrar-prestador').hide();
}

function fecharModal(){
    document.getElementById('nome').value='';
    document.getElementById('sobrenome').value='';
    document.getElementById('rg').value='';
    document.getElementById('cpf').value='';
    document.getElementById('email').value='';
    document.getElementById('telefone').value='';
    document.getElementById('celular').value='';
    document.getElementById('cep').value='';
    document.getElementById('bairro').value='';
    document.getElementById('cidade').value='';
    document.getElementById('uf').value='';
    document.getElementById('rua').value='';
    document.getElementById('numerocasa').value='';
    document.getElementById('complemento').value='';
    document.getElementById('senha').value='';
    document.getElementById('confirme').value='';
    
    usuario = {};
}

function limparModal(){
    cadastrarUsuario();
    fecharModal();
}

function abrirModalCadastro(tipo){
    
    document.getElementById('nome').value='';
    document.getElementById('sobrenome').value='';
    document.getElementById('rg').value='';
    document.getElementById('cpf').value='';
    document.getElementById('email').value='';
    document.getElementById('telefone').value='';
    document.getElementById('celular').value='';
    document.getElementById('cep').value='';
    document.getElementById('bairro').value='';
    document.getElementById('cidade').value='';
    document.getElementById('uf').value='';
    document.getElementById('rua').value='';
    document.getElementById('numerocasa').value='';
    document.getElementById('complemento').value='';
    document.getElementById('senha').value='';
    document.getElementById('confirme').value='';
    
    usuario = {};
    
    if (tipo === 'modalUsuario'){
        $('#modal-usuario').modal('show');
        btnCadastrar.textContent = "Cadastrar";
        tituloModalUsuario.innerHTML = "Cadastrar Usuário";
        
        btnExcluir.hide();
    }
    if (tipo === 'modalPrestador'){
        $('#modal-prestador').modal('show');
        btnCadastrar.textContent = "Cadastrar";
        tituloModalPrestador.innerHTML = "Cadastrar Prestador";
        
        btnExcluir.hide();
    }
}

function formataCampo(usuario){
    var cpf = $('#cpf');
    var telefone = $('#telefone');
    var celular = $('#celular');
    var cep = $('#cep');
    
    cpf.mask('000.000.000-00', {reverse: true});
    telefone.mask('(00)0000-0000', {reverse: false});
    celular.mask('(00)0000-0000', {reverse: false});
    cep.mask('00.000-000', {reverse: false});
}

formataCampo();

function montaGrafico(){
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'bar',
         data: {
        labels: ["Sul","Suldeste","Centro-Oeste","Nordeste","Norte"],
        datasets: [{
            label: 'N° Usuarios por região',
            data: [3, 2, 2, 1, 1],
            backgroundColor: ['rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    });
}


/*function populaGrafico(){
    var ctx = document.getElementById('myChart');
     var estados = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO"];
    var data = new Dataset();
    for(let i =0; i < estados.length; i++){
        data.dataset.label = estados[i];
        myChart.data.datasets.push(data);
    }

    myChart.update();
   
}
populaGrafico();

function Dataset() {
    this.dataset = {
        label: '',
        data: [],
        backgroundColor: '',
        borderColor: '',
        borderWidth: 1
    }
    
}*/


$(document).ready(function() {

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
    }

    //Quando o campo cep perde o foco.
    $("#cep").blur(function() {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#rua").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#uf").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#rua").attr('disable','disable');
                        $("#rua").val(dados.logradouro);
                        $("#bairro").attr('disable','disable');
                        $("#bairro").val(dados.bairro);
                        $("#cidade").attr('disable','disable');
                        $("#cidade").val(dados.localidade);
                        $("#uf").attr('disable','disable');
                        $("#uf").val(dados.uf);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });
});
