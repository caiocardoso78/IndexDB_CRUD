/*inicio da funcão*/

	$(document).ready(function(){
	
	/*teste do banco*/

		request = window.indexedDB.open("Teste", 2);
		request.onerror = function(event){
			console.log("Erro ao abrir o banco de dados", event);
		}
	
		request.onupgradeneeded = function(event){
			console.log("Atualizando");
			db = event.target.result;
			var objectStore = db.createObjectStore("estudantes", { keyPath : "codigo" });
		};
		request.onsuccess = function(event){
			console.log("Banco de dados aberto com sucesso");
			db = event.target.result;
		}

	/*fim do teste do banco*/

	/*inico dos eventos de click*/

	$("#addBtn").click(function(){
		var nome = $("#nome").val();
		var codigo = $("#codigo").val();
		var transaction = db.transaction(["estudantes"],"readwrite");
		transaction.oncomplete = function(event) {
			console.log("Sucesso :)");
			$("#result").html("Aluno adicionado com Sucesso");
		};
		transaction.onerror = function(event) {
			console.log("Erro :( ");
			$("#result").html("Erro: Este código já exite");
		};
		var objectStore = transaction.objectStore("estudantes");
		objectStore.add({codigo: codigo, nome: nome});
	});
	
	$("#removeBtn").click(function(){
		var codigo = $("#codigo").val();
		db.transaction(["estudantes"],"readwrite").objectStore("estudantes").delete(codigo);
		transaction.oncomplete = function(event){
			console.log("Removido");
			$("#result").html("Código Removido !!!");
		};		
		var objectStore = transaction.objectStore("estudantes");
		objectStore.delete({codigo: codigo, nome: nome});
	});
	
	$("#getBtn").click(function(){
		var codigo = $("#codigo").val();
		var request = db.transaction(["estudantes"],"readwrite").objectStore("estudantes").get(codigo);
		request.onsuccess = function(event){
			$("#result").html("Nome : "+request.result.nome);};
	});

	$("#updateBtn").click(function(){
		var codigo = $("#codigo").val();
		var nome = $("#nome").val();
		var transaction = db.transaction(["estudantes"],"readwrite");
		var objectStore = transaction.objectStore("estudantes");
		var request = objectStore.get(codigo);
		request.onsuccess = function(event){
			$("#result").html("Atualizando : "+request.result.nome + " para " + nome);
			request.result.nome = nome;
			objectStore.put(request.result);};
	});
	/*Fim dos eventos de click*/
});

$("#result").html
/*Fim da Função*/
