module.exports = class Livros {

    constructor() {
        this.idlivros = 0;
        this.tituloobra = "";
        this.idioma = "";
        this.classificacao = "";
        this.autorobra = "";
        this.editora = "";
        this.tipomidia = "";
    }

    
    setIdLivros(i) {
        this.idlivros = i;
    }
            
    getIdLivros() {
        return this.idlivros;  
    }


    setTituloObra(to) {
        this.tituloobra = to;
    }
            
    getTituloObra() {
        return this.tituloobra;  
    }

    setIdioma(i) {
        this.idioma = i;
    }
            
    getIdioma() {
        return this.idioma;  
    }

    setClassificacao(c) {
        this.classificacao = c;
    }
    
            
    getClassificacao() {
       return this.classificacao;
}
    setAutorObra(ao) {
        this.autorobra = ao;
    }
            
    getAutorObra() {
        return this.autorobra;  
    }

    setEditora(e) {
        this.editora = e;
    }
            
    getEditora() {
        return this.editora;  
    }

    setTipoMidia(tm) {
        this.tipomidia = tm;
    }
            
    getTipoMidia() {
        return this.tipomidia;
}

    
    inserir(connection) {
        try {
            var sql = "INSERT INTO livros (tituloobra,idioma,classificacao,autorobra,editora,tipomidia) VALUES( ?, ?, ?, ?, ?, ?)";
            connection.query(sql, [this.tituloobra, this.idioma, this.classificacao, this.autorobra, this.editora, this.tipomidia], function (err, result) {
                //if (err) throw "teste";
                if (err) throw 'err from callback: ' + err.stack;
                });
            } 
              catch (e) {
                console.error('err from callback: ' + e.stack);
                throw e;
            }
      }

   /*listar(connection, callback) {
        var sql = "SELECT * FROM livros";
        
            connection.query(sql, function (err, result) {
                if (err) throw err;
                return callback(result);
        });    
    }*/

    listar(connection, callback) {
        var sql = "SELECT a.idlivros, a.tituloobra, a.idioma, c.nome as classificacao, "+
                         "a.autorobra, a.editora, b.nome as tipomidia "+
                    "FROM livros as a, tipomidiaTabela as b,classificacaoTabela as c "+
                   "WHERE a.tipomidia = b.id AND a.classificacao = c.id " ;
    
        connection.query(sql, function (err, result) {
            if (err) throw err;
            return callback(result);
        });    
      }

    /*pesquisar(connection, callback) {
        var sql = "SELECT * FROM livros WHERE tituloobra like ?";
    
        connection.query(sql, [this.tituloobra], function (err, result) {
            if (err) throw err;
            return callback(result);
        });    
    }*/

    pesquisar(connection, callback) {
        var sql = "SELECT a.idlivros, a.tituloobra, a.idioma, c.nome as classificacao, "+
                         "a.autorobra, a.editora, b.nome as tipomidia "+
                    "FROM livros as a, tipomidiaTabela as b, classificacaoTabela as c "+
                   "WHERE a.tipomidia = b.id "+
                     "AND a.classificacao = c.id "+
                     "AND a.tituloobra like ?";
                   
        connection.query(sql, [this.tituloobra], function (err, result) {
            if (err) throw err;
            return callback(result);
        });    
      }

    deletar(connection) {
        var sql = "DELETE FROM livros WHERE idlivros =  ?";
    
        connection.query(sql, [this.idlivros], function (err, result) {
          if (err) throw "teste";
          //if (err) console.error('err from callback: ' + err.stack);
        });
      }


      consultarChave(connection, callback) {
        var sql = "SELECT * FROM livros WHERE idlivros = ?";

        connection.query(sql, [this.idlivros], function (err, result) {
            if (err) throw err;
            return callback(result);
        });    
    } //Para gerenciamento de livros

  atualizar(connection) {
    try {
        var sql = "UPDATE livros SET tituloobra = ?, idioma = ?, classificacao = ?, autorobra = ?, editora = ?, tipomidia = ? WHERE idlivros = ?";

        connection.query(sql, [this.tituloobra, this.idioma, this.classificacao, this.autorobra, this.editora, this.tipomidia, this.idlivros], function (err, result) {
          //if (err) throw "teste";
          if (err) throw 'err from callback: ' + err.stack;
          });
    } catch (e) {
        console.error('err from callback: ' + e.stack);
        throw e;
    }
  }
}

