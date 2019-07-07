var tbody = document.querySelector('table tbody');
var info = document.querySelector('.card-user p');	

function listarUsuarios(){
    tbody.innerHTML = '';
    info.innerHTML = '';
	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'http://localhost:60806/api/Usuario/ListarUsuarios', true);
    
    xhr.onerror = function(){
        console.log("ERRO", xhr.readyState);
    }


	xhr.onreadystatechange = function (){
        if(this.readyState == 4){
            if(this.status == 200){
                var usuarios = JSON.parse(this.responseText);
                for(var i in usuarios){
                    montaTabela(usuarios[i]);
                }
                

                var total = usuarios.length;
                console.log(total);
                info.innerHTML += total;
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

function montaTabela(usuarios){
    

	var trow = `<tr>
					<td>${usuarios.Id}</td>
					<td>${usuarios.Nome}</td>
					<td>${usuarios.Sobrenome}</td>
					<td>${usuarios.Cpf}</td>
					<td>${usuarios.Email}</td>
					<td>${usuarios.Celular}</td>
					<td><button class="btn btn-primary" data-toggle="modal" data-target="#modal-usuario" onclick ='editarUsuario(${JSON.stringify(usuarios)})'>Visualizar</button></td>
				</tr>`
	tbody.innerHTML += trow;			
}


$(document).ready(function() {
        $('#example').dataTable();
} );

document.getElementById('search').addEventListener('keyup', pesquisaTabela());

function pesquisaTabela() {
    var filter, table, tr, td, i;
    table = document.getElementById("table-user");
    return function() {
        tr = table.querySelectorAll("tbody tr");
        filter = this.value.toUpperCase();
        for (i = 0; i < tr.length; i++) {
            var match = tr[i].innerHTML.toUpperCase().indexOf(filter) > -1;
            tr[i].style.display = match ? " table-row" : "none";
        }
    }
}

