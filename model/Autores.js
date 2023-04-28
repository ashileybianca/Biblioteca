module.exports = class Autores { 
  constructor() {
    this.idautores = 0;
    this.nomeautor = "";
    this.nacionalidade = "";

  }

  setIdAutores(i){
    this.idautores = i;
  }
  getIdAutores() {
    return this.idautores;  
    }
    
  
  setNomeAutor(n) {
	this.nomeautor = n;
  }
  
  getNomeAutor() {
	return this.nomeautor;  
  }
  
  setNacionalidade(n) {
	this.nacionalidade = n;
  }
  
  getNacionalidade() {
	return this.nacionalidade;  
  }
  
  
  inserir(connection) {
	try {
		var sql = "INSERT INTO autores (nomeautor,nacionalidade) VALUES(?, ?)";

		connection.query(sql, [this.nomeautor, this.nacionalidade], function (err, result) {
		  if (err) throw "teste";
		  //if (err) console.error('err from callback: ' + err.stack);
		  });
	} catch (e) {
		console.error('err from callback: ' + e.stack);
		throw e;
	}
  }
  
  listar(connection, callback) {
    var sql = "SELECT * FROM autores";

    connection.query(sql, function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }

  pesquisar(connection, callback) {
    var sql = "SELECT * FROM autores WHERE nomeautor like ?";

    connection.query(sql, [this.nomeautor], function (err, result) {
        if (err) throw err;
        return callback(result);
    });    
}

deletar(connection) {
  var sql = "DELETE FROM autores WHERE idautores =  ?";

  connection.query(sql, [this.idautores], function (err, result) {
    if (err) throw "teste";
    //if (err) console.error('err from callback: ' + err.stack);
  });
}

consultarChave(connection, callback) {
  var sql = "SELECT * FROM autores WHERE idautores = ?";

  connection.query(sql, [this.idautores], function (err, result) {
      if (err) throw err;
      return callback(result);
  });    
} //Para gerenciamento de autor

atualizar(connection) {
try {
  var sql = "UPDATE autores SET nomeautor = ?, nacionalidade = ? WHERE idautores = ?";

  connection.query(sql, [this.nomeautor, this.nacionalidade, this.idautores], function (err, result) {
    //if (err) throw "teste";
    if (err) throw 'err from callback: ' + err.stack;
    });
} catch (e) {
  console.error('err from callback: ' + e.stack);
  throw e;
}
}


}