module.exports = class Editoras {

    constructor() {
        this.cnpj = "";
        this.razaosocial = "";
        this.telefoneeditora = "";
        this.emaileditora = "";
    }

    setCnpj(cnpj) {
        this.cnpj = cnpj;
    }
            
    getCnpj() {
        return this.cnpj;  
    }

    setRazaoSocial(rs) {
        this.razaosocial = rs;
    }
            
    getRazaoSocial() {
        return this.razaosocial;  
    }

    setTelefoneEditora(t) {
        this.telefoneeditora = t;
    }
            
    getTelefoneEditora() {
        return this.telefoneeditora;  
    }

    setEmailEditora(eml) {
        this.emaileditora = eml;
    }
            
    getEmailEditora() {
        return this.emaileditora;  
    }
    
    inserir(connection) {
        try {
            var sql = "INSERT INTO editoras (cnpj,razaosocial,telefoneeditora,emaileditora) VALUES(?, ?, ?, ?)";
            connection.query(sql, [this.cnpj, this.razaosocial, this.telefoneeditora, this.emaileditora], function (err, result) {
                //if (err) throw "teste";
                if (err) throw 'err from callback: ' + err.stack;
                });
            } 
              catch (e) {
                console.error('err from callback: ' + e.stack);
                throw e;
            }
      }
    
    listar(connection, callback) {
        var sql = "SELECT * FROM editoras";
            connection.query(sql, function (err, result) {
                if (err) throw err;
                return callback(result);
        });   
    }

    pesquisar(connection, callback) {
        var sql = "SELECT * FROM editoras WHERE razaosocial like ?";
    
        connection.query(sql, [this.razaosocial], function (err, result) {
            if (err) throw err;
            return callback(result);
        });    
    }
    deletar(connection) {
        var sql = "DELETE FROM editoras WHERE cnpj =  ?";
    
        connection.query(sql, [this.cnpj], function (err, result) {
          if (err) throw "teste";
          //if (err) console.error('err from callback: ' + err.stack);
        });
      }


      consultarChave(connection, callback) {
        var sql = "SELECT * FROM editoras WHERE cnpj = ?";

        connection.query(sql, [this.cnpj], function (err, result) {
            if (err) throw err;
            return callback(result);
        });    
    } //Para gerenciamento de editora

  atualizar(connection) {
    try {
        var sql = "UPDATE editoras SET razaosocial = ?, telefoneeditora = ?, emaileditora = ? WHERE cnpj = ?";

        connection.query(sql, [this.razaosocial, this.telefoneeditora, this.emaileditora, this.cnpj], function (err, result) {
          //if (err) throw "teste";
          if (err) throw 'err from callback: ' + err.stack;
          });
    } catch (e) {
        console.error('err from callback: ' + e.stack);
        throw e;
    }
  }
}