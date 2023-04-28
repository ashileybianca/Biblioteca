const express = require('express');
const session = require('express-session');  /* npm i --s express-session */

const app = express();                 /* npm i --s ejs */


app.use(express.static(__dirname + '/views'));
app.use(session({secret:'palavrachave', saveUninitialized: true,resave: true}));

app.listen(3000, function(){
  console.log("Servidor no ar - Porta: 3000!")
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const Alunos = require('./model/Alunos');
const Autores = require('./model/Autores');
const Editoras = require('./model/Editoras');
const Emprestimos = require('./model/Emprestimos');
const Livros = require('./model/Livros');


var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "bibliotecario",
  password: "1234",
  database: "biblioteca"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Banco de dados conectado!");
  });

app.get('/inicio', function(req,res){
	if(req.session.usuario = req.session.usuario && req.session.tipo == 1){
		res.render('inicio.ejs'); /*O inicio.ejs é aquela tela em branco só com menu.*/
	}
})

app.get('/iniciousuario', function(req,res){
	if(req.session.usuario = req.session.usuario && req.session.tipo == 2){
		res.render('iniciousuario.ejs');
	}
})

/*-------------------------------------------

LOGIN E LOGOUT

---------------------------------------------*/

app.post('/login', function(req, res){
	
		var u = new Alunos();

		u.setCpf(req.body.usuario);
		u.setSenha(req.body.senha);

		tipo = u.getTipo;
		usuario = u.getNome;
		
		u.buscarUsuario(con, function(result){
			if (result[0].tipo == 1){
				req.session.usuario = req.body.usuario;
				req.session.nome = req.body.nome;
				req.session.tipo = 1;
				res.render('inicio.ejs');
			}
			if (result[0].tipo == 2){
				req.session.usuario = req.body.usuario;
				req.session.nome = req.body.nome;
				req.session.tipo = 2;
				res.render('iniciousuario.ejs');
			}
			
		});
	});

app.get('/sair', function(req,res){
	req.session.usuario = '';
	res.sendFile(__dirname + '/views/index.html');
})

/*-------------------------------------------

FUNÇÕES DISPONÍVEIS PARA O ADMINISTRADOR

---------------------------------------------*/

/*Cadastro de Alunos*/

app.get('/alunos', function(req,res){

	if(req.session.usuario = req.session.usuario && req.session.tipo == 1){

		var al = new Alunos();

			al.listar(con, function(result){
				res.render('aluno/lista.ejs', {alunos: result});
			});
	} else {
		res.sendFile(__dirname + '/views/index.html');
	}
});

 
app.get('/formAluno', function(req, res){

	if(req.session.usuario = req.session.usuario && req.session.tipo == 1){

		res.sendFile(__dirname + '/views/aluno/form.html');

	} else {
		res.sendFile(__dirname + '/views/index.html');
	}
});
 
app.post('/salvarAluno', function(req, res){
    try {
        var al = new Alunos();
       
        al.setNome(req.body.nome);
        al.setCpf(req.body.cpf);
		al.setSenha(req.body.senha);
		al.setTipo(req.body.tipo);
        al.setRg(req.body.rg);
        al.setTelefoneAluno(req.body.telefonealuno);
        al.setEmailAluno(req.body.emailaluno);
        al.setCurso(req.body.curso);
        al.setIntCurso(req.body.intcurso);
        al.setFinCurso(req.body.fincurso);
        al.setEstado(req.body.estado);
        al.setCidade(req.body.cidade);
        al.setBairro(req.body.bairro);
        al.setLogradouro(req.body.logradouro);
        al.setNumCasa(req.body.numerocasa);
       
        var retorno = al.inserir(con);
        console.log('Aqui: ' + retorno);
    } catch (e) {
        console.log('Erro: '+e.message);
    }
    res.render('aluno/resultado.ejs', {param: al ,msg : 'Aluno registrado com sucesso!'});
});

app.post('/filtrarAluno', function(req, res){
	var al = new Alunos();
	al.setNome(req.body.nome);
	
	if (al.getNome() == '') {
		al.setNome('%');
	}
	
	al.pesquisar(con, function(result){
		res.render('aluno/lista.ejs', {alunos: result});
	});
});

app.post('/gerenciarAluno', function(req, res){
	var al = new Alunos();
	if (req.body.acao == 'Excluir') {
		al.setCpf(req.body.cpf);
		al.deletar(con);
		res.render('aluno/resultado.ejs', {param: al, msg: 'Aluno excluido do sistema com sucesso!'});
	} else {
		al.setCpf(req.body.cpf);
		al.consultarChave(con, function(result){
			res.render('aluno/form.ejs', {alunos: result});
		});
	}	
});

app.post('/atualizarAluno', function(req, res){
	try {
		var al = new Alunos();
		
		al.setNome(req.body.nome);
		al.setCpf(req.body.cpf);
		al.setSenha(req.body.senha);
		al.setTipo(req.body.tipo);
		al.setRg(req.body.rg);
		al.setTelefoneAluno(req.body.telefonealuno);
		al.setEmailAluno(req.body.emailaluno);
		al.setCurso(req.body.curso);
		al.setIntCurso(req.body.intcurso);
		al.setFinCurso(req.body.fincurso);
		al.setEstado(req.body.estado);
		al.setCidade(req.body.cidade);
		al.setBairro(req.body.bairro);
		al.setLogradouro(req.body.logradouro);
		al.setNumCasa(req.body.numerocasa);

		
		var retorno = al.atualizar(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('aluno/resultado.ejs', {param: al, msg: 'Aluno atualizado com sucesso!!!'});
});


/*Cadastro de Autores*/

app.get('/autores', function(req, res){

	if(req.session.usuario = req.session.usuario && req.session.tipo == 1){

	var a = new Autores();  
    a.listar(con, function(result){
		res.render('autor/lista.ejs', {autores: result});
	})
	} else {
		res.sendFile(__dirname + '/views/index.html');
	};
	  
});

app.get('/formAutores', function(req, res){
	if(req.session.usuario = req.session.usuario && req.session.tipo == 1){
	res.sendFile(__dirname + '/views/autor/form.html');
	}
	else {
		res.sendFile(__dirname + '/views/index.html');
	}
});

app.post('/salvarAutor', function(req, res){
	try {
		var a = new Autores();

		a.setNomeAutor(req.body.nomeautor);
		a.setNacionalidade(req.body.nacionalidade);
		
		var retorno = a.inserir(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('autor/resultado.ejs', {param: a, msg: 'Autor registrado com sucesso!'});
});

app.post('/filtrarAutor', function(req, res){
	var a = new Autores();
	a.setNomeAutor(req.body.nomeautor);
	
	if (a.getNomeAutor() == '') {
		a.setNomeAutor('%');
	}
	
	a.pesquisar(con, function(result){
		res.render('autor/lista.ejs', {autores: result});
	});
});

app.post('/excluirAutor', function(req, res){
	var a= new Autores();
	a.setIdAutores(req.body.idautores);
	a.deletar(con);
	res.render('autor/resultado.ejs', {param: a});
});

app.post('/gerenciarAutor', function(req, res){
	var a = new Autores();
	if (req.body.acao == 'Excluir') {
		a.setIdAutores(req.body.idautores);
		a.deletar(con);
		res.render('autor/resultado.ejs', {param: a, msg: 'Autor excluido do sistema com sucesso!'});
	} else {
		a.setIdAutores(req.body.idautores);
		a.consultarChave(con, function(result){
			res.render('autor/form.ejs', {autores: result});
		});
	}	
});

app.post('/atualizarAutor', function(req, res){
	try {
		var a = new Autores();

		a.setIdAutores(req.body.idautores);
		a.setNomeAutor(req.body.nomeautor);
		a.setNacionalidade(req.body.nacionalidade);
		
		var retorno = a.atualizar(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('autor/resultado.ejs', {param: a, msg: 'Autor atualizado com sucesso!!!'});
});


/*Cadastro de Editoras*/

app.get('/editoras', function(req, res){
	
	if(req.session.usuario = req.session.usuario && req.session.tipo == 1){

	var e = new Editoras();  
    e.listar(con, function(result){
		res.render('editora/lista.ejs', {editoras: result});
	});
	} else {
		res.sendFile(__dirname + '/views/index.html');
	}
	  
});

app.get('/formEditoras', function(req, res){

	if(req.session.usuario = req.session.usuario && req.session.tipo == 1){

	res.sendFile(__dirname + '/views/editora/form.html');
	}
	else {
		res.sendFile(__dirname + '/views/index.html');
	}
});


app.post('/salvarEditora', function(req, res){
	try {
		var e = new Editoras();
		
		e.setCnpj(req.body.cnpj);
		e.setRazaoSocial(req.body.razaosocial);
		e.setTelefoneEditora(req.body.telefoneeditora);
		e.setEmailEditora(req.body.emaileditora);
		
		var retorno = e.inserir(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('editora/resultado.ejs', {param: e ,msg: 'Editora registrada com sucesso!'});
});

app.post('/filtrarEditora', function(req, res){
	var e = new Editoras();
	e.setRazaoSocial(req.body.razaosocial);
	
	if (e.getRazaoSocial() == '') {
		e.setRazaoSocial('%');
	}
	
	e.pesquisar(con, function(result){
		res.render('editora/lista.ejs', {editoras: result});
	});
});

app.post('/excluirEditora', function(req, res){
	var e = new Editoras();
	e.setCnpj(req.body.cnpj);
	e.deletar(con);
	res.render('editora/resultado.ejs', {param: e});
});

app.post('/gerenciarEditora', function(req, res){
	var e = new Editoras();
	if (req.body.acao == 'Excluir') {
		e.setCnpj(req.body.cnpj);
		e.deletar(con);
		res.render('editora/resultado.ejs', {param: e, msg: 'Editora excluida do sistema com sucesso!'});
	} else {
		e.setCnpj(req.body.cnpj);
		e.consultarChave(con, function(result){
			res.render('editora/form.ejs', {editoras: result});
		});
	}	
});

app.post('/atualizarEditora', function(req, res){
	try {
		var e = new Editoras();
		
		e.setCnpj(req.body.cnpj);
		e.setRazaoSocial(req.body.razaosocial);
		e.setTelefoneEditora(req.body.telefoneeditora);
		e.setEmailEditora(req.body.emaileditora);
		
		var retorno = e.atualizar(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('editora/resultado.ejs', {param: e, msg: 'Editora atualizada com sucesso!!!'});
});



/*Cadastro de Empréstimos*/

app.get('/emprestimos', function(req, res){
	
	if(req.session.usuario = req.session.usuario && req.session.tipo == 1){
	var em = new Emprestimos();  
    em.listar(con, function(result){
		res.render('emprestimo/lista.ejs', {emprestimos: result});
	});	  
	}
	else{
		res.sendFile(__dirname + '/views/index.html');
	}
});

app.get('/formEmprestimos', function(req, res){
	if(req.session.usuario = req.session.usuario && req.session.tipo == 1){
	res.sendFile(__dirname + '/views/emprestimo/form.html');
	}
	else{
		res.sendFile(__dirname + '/views/index.html');	
	}
});

app.post('/salvarEmprestimo', function(req, res){
	try {
		var em = new Emprestimos();
		
		em.setUsuario(req.body.usuario);		
		em.setObraRetirada(req.body.obraretirada);
		em.setDataRetirada(req.body.dataretirada);
		em.setPrazoDevolucao(req.body.prazodevolucao);
		
		var retorno = em.inserir(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('emprestimo/resultado.ejs', {param: em, msg: 'Empréstimo registrado com sucesso!'});
});

app.post('/filtrarEmprestimo', function(req, res){
	var em = new Emprestimos();
	em.setUsuario(req.body.usuario);
	
	if (em.getUsuario() == '') {
		em.setUsuario('%');
	}
	
	em.pesquisar(con, function(result){
		res.render('emprestimo/lista.ejs', {emprestimos: result});
	});
});

app.post('/excluirEmprestimo', function(req, res){
	var em= new Emprestimos();
	em.setIdEmprestimos(req.body.idemprestimos);
	em.deletar(con);
	res.render('emprestimo/resultado.ejs', {param: em});
});



app.post('/gerenciarEmprestimo', function(req, res){
	var em = new Emprestimos();
	if (req.body.acao == 'Excluir') {
		em.setIdEmprestimos(req.body.idemprestimos);
		em.deletar(con);
		res.render('emprestimo/resultado.ejs', {param: em, msg: 'Empréstimo excluido do sistema com sucesso!'});
	} else {
		em.setIdEmprestimos(req.body.idemprestimos);
		em.consultarChave(con, function(result){
			res.render('emprestimo/form.ejs', {emprestimos: result});
		});
	}	
});

app.post('/atualizarEmprestimo', function(req, res){
	try {
		var em = new Emprestimos();
		
		em.setUsuario(req.body.usuario);
		em.setObraRetirada(req.body.obraretirada);
		em.setDataRetirada(req.body.dataretirada);
		em.setPrazoDevolucao(req.body.prazodevolucao);
		
		var retorno = em.atualizar(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('emprestimo/resultado.ejs', {param: em, msg: 'Empréstimo atualizado com sucesso!!!'});
});

/*Cadastro de Livros*/

app.get('/livros', function(req, res){

	if(req.session.usuario = req.session.usuario && req.session.tipo == 1){
	
	var li = new Livros();  
    li.listar(con, function(result){
		res.render('livro/lista.ejs', {livros: result});
	});
	}
	else{
		res.sendFile(__dirname + '/views/index.html');
	}
	  
});



app.get('/formLivros', function(req, res){
	if(req.session.usuario = req.session.usuario && req.session.tipo == 1){
	res.sendFile(__dirname + '/views/livro/form.html');
	}
	else{
	res.sendFile(__dirname + '/views/index.html');		
	}

});

app.post('/salvarLivro', function(req, res){
	try {
		var li = new Livros();
		
		li.setTituloObra(req.body.tituloobra);
		li.setIdioma(req.body.idioma);
		li.setClassificacao(req.body.classificacao);
		li.setAutorObra(req.body.autorobra);
		li.setEditora(req.body.editora);
		li.setTipoMidia(req.body.tipomidia);
		
		var retorno = li.inserir(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('livro/resultado.ejs', {param: li, msg: 'Livro registrado com sucesso!!!'});
});

app.post('/filtrarLivro', function(req, res){
	var li = new Livros();
	li.setTituloObra(req.body.tituloobra);
	
	if (li.getTituloObra() == '') {
		li.setTituloObra('%');
	}
	
	li.pesquisar(con, function(result){
		res.render('livro/lista.ejs', {livros: result});
	});
});


app.post('/filtrarLivroAluno', function(req, res){
	var li = new Livros();
	li.setTituloObra(req.body.tituloobra);
	
	if (li.getTituloObra() == '') {
		li.setTituloObra('%');
	}
	
	li.pesquisar(con, function(result){
		res.render('aluno/lista_aluno.ejs', {livros: result});
	});
});


app.post('/excluirLivro', function(req, res){
	var li= new Livros();
	li.setIdLivros(req.body.idlivros);
	li.deletar(con);
	res.render('livro/resultado.ejs', {param: li});
});

app.post('/gerenciarLivro', function(req, res){
	var li = new Livros();
	if (req.body.acao == 'Excluir') {
		li.setIdLivros(req.body.idlivros);
		li.deletar(con);
		res.render('livro/resultado.ejs', {param: li, msg: 'Livro excluido do sistema com sucesso!'});
	} else {
		li.setIdLivros(req.body.idlivros);
		li.consultarChave(con, function(result){
			res.render('livro/form.ejs', {livros: result});
		});
	}	
});

app.post('/atualizarLivro', function(req, res){
	try {
		var li = new Livros();
		
		li.setIdLivros(req.body.idlivros);
		li.setTituloObra(req.body.tituloobra);
		li.setIdioma(req.body.idioma);
		li.setClassificacao(req.body.classificacao);
		li.setAutorObra(req.body.autorobra);
		li.setEditora(req.body.editora);
		li.setTipoMidia(req.body.tipomidia);
		
		var retorno = li.atualizar(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('livro/resultado.ejs', {param: li, msg: 'Livro atualizado com sucesso!!!'});
});



/*-------------------------------------------

FUNÇÕES DISPONÍVEIS NO MENU DO USUÁRIO

---------------------------------------------*/

/*1) Mostrar livros cadastrados*/

app.get('/livrosusuario', function(req, res){

	if(req.session.usuario = req.session.usuario && req.session.tipo == 2){
	
	var li = new Livros();  
    li.listar(con, function(result){
		res.render('aluno/lista_aluno.ejs', {livros: result});
	});
	}
	else{
		res.sendFile(__dirname + '/views/index.html');
	}
	  
});



app.get('/emprestimosusuario', function(req, res){

	if(req.session.usuario = req.session.usuario && req.session.tipo == 2){
  
	var u = new Alunos();
	 

    u.buscar(con, function(result){
		res.render('aluno/aluno_emprestimo.ejs', {emprestimos: result}); 
	});
	} 
	else{
		res.sendFile(__dirname + '/views/index.html');
	}
	  
});


/*Exibir Histórico de Empréstimos*/

app.post('/emprestimoLivro', function(req, res){

	if(req.session.usuario = req.session.usuario && req.session.tipo == 2){
	
	var em = new Emprestimos();  
	em.setObraRetirada(req.body.idlivros);
    em.exibir(con, function(result){
		res.render('livro/historico.ejs', {emprestimos: result});
	});
	}
	else{
		res.sendFile(__dirname + '/views/index.html');
	}
	  
});


