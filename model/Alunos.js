module.exports = class Alunos {
 
    constructor() {
        this.nome = "";
        this.cpf = "";
        this.senha = "";
        this.tipo = 0;
        this.rg = "";
        this.telefonealuno = "";
        this.emailaluno = ""
        this.curso = "";
        this.intcurso = "";
        this.fincurso = "";
        this.estado = "";
        this.logradouro = "";
        this.cidade = "";
        this.bairro = "";
        this.numerocasa = "";
    }
 
    setNome(x) {
        this.nome = x;
    }
           
    getNome() {
        return this.nome;  
    }
 
    setCpf(x) {
        this.cpf = x;
    }
           
    getCpf() {
        return this.cpf;  
    }

    setSenha(s) {
        this.senha = s;
      }
      
    getSenha() {
        return this.senha;  
    }

    setTipo(x) {
        this.tipo = x;
    }
      
    getTipo() {
        return this.tipo;  
    }
 
    setRg(x) {
        this.rg = x;
    }
           
    getRg() {
        return this.rg;  
    }
 
    setTelefoneAluno(x){
        this.telefonealuno = x
    }
 
    getTelefoneAluno(){
        return this.telefonealuno;
    }
 
    setEmailAluno(x){
        this.emailaluno = x
    }
 
    getEmailAluno(){
        return this.emailaluno;
    }
 
    setCurso(x){
        this.curso = x
    }
 
    getCurso(){
        return this.curso;
    }
 
    setIntCurso(x){
        this.intcurso = x
    }
 
    getIntCurso(){
        return this.intcurso;
    }
 
    setFinCurso(x){
        this.fincurso = x
    }
 
    getFinCurso(){
        return this.fincurso;
    }
 
    setEstado(x){
        this.estado = x
    }
 
    getEstado(){
        if (this.estado =="1"){
            return 'AC'
        } else {
            if (this.estado =="2"){
                return 'AL'
            } else {
                if (this.estado =="3") {
                    return 'AP'
                } else {
                    if (this.estado =="4") {
                        return 'AM'
                    } else {
                        if (this.estado =="5") {
                            return 'BA'
                    } else {
                        if (this.estado =="6"){
                            return 'CE'
                        } else {
                            if (this.estado =="7"){
                                return 'DF'
                            } else {
                                if (this.estado =="8"){
                                    return 'ES'
                                } else {
                                    if (this.estado =="9"){
                                        return 'GO'
                                    } else {
                                        if (this.estado =="10"){
                                            return 'MA'
                                        } else {
                                            if (this.estado =="11"){
                                                return 'MT'
                                            } else {
                                                if (this.estado =="12"){
                                                    return 'MS'
                                                } else {
                                                    if (this.estado =="13"){
                                                        return 'MG'
                                                    } else {
                                                        if (this.estado =="14"){
                                                            return 'PA'
                                                        } else {
                                                            if (this.estado =="15"){
                                                                return 'PB'
                                                            } else {
                                                                if (this.estado =="16"){
                                                                    return 'PR'
                                                                } else {
                                                                    if (this.estado =="17"){
                                                                        return 'PE'
                                                                    } else {
                                                                        if (this.estado =="18"){
                                                                            return 'PI'
                                                                        } else {
                                                                            if (this.estado =="19"){
                                                                                return 'RJ'
                                                                            } else {
                                                                                if (this.estado =="20"){
                                                                                    return 'RN'
                                                                                } else {
                                                                                    if (this.estado =="21"){
                                                                                        return 'RS'
                                                                                    } else {
                                                                                        if (this.estado =="22"){
                                                                                            return 'RO'
                                                                                        } else {
                                                                                            if (this.estado =="23"){
                                                                                                return 'RR'
                                                                                            } else {
                                                                                                if (this.estado =="24"){
                                                                                                    return 'SC'
                                                                                                } else {
                                                                                                    if (this.estado =="25"){
                                                                                                        return 'SP'
                                                                                                    } else {
                                                                                                        if (this.estado =="26"){
                                                                                                            return 'SE'
                                                                                                        } else {
                                                                                                            if (this.estado =="27"){
                                                                                                                return 'TO'
                                                                                                            }
                    }}}}}}}}}}}}}}}}}}}}}}}
                }
            }
        }
    }
                                                                       
    setCidade(x){
        this.cidade = x
    }
 
    getCidade(){
        return this.cidade;
    } 

    setBairro(x){
        this.bairro = x
    }
 
    getBairro(){
        return this.bairro;
    }
     
    setLogradouro(x){
        this.logradouro = x
    }
 
    getLogradouro(){
        return this.logradouro;
    }
   
    setNumCasa(x){
        this.numerocasa = x
    }
 
    getNumCasa(x){
        return this.numerocasa;
    }
 
    
      

    inserir(connection) {
        try {
            var sql = "INSERT INTO alunos (nome,cpf,senha,tipo,rg,telefonealuno,emailaluno,curso,intcurso,fincurso,estado,cidade,bairro,logradouro,numerocasa) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            connection.query(sql, [this.nome, this.cpf, this.senha, this.tipo, this.rg, this.telefonealuno, this.emailaluno, this.curso,
                this.intcurso, this.fincurso, this.estado, this.cidade, this.bairro, this.logradouro, this.numerocasa],
                function (err, result) {
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
        var sql = "SELECT * FROM alunos";
    
        connection.query(sql, function (err, result) {
            if (err) throw err;
            return callback(result);
        });    
    }

    
    pesquisar(connection, callback) {
        var sql = "SELECT * FROM alunos WHERE nome like ?";
    
        connection.query(sql, [this.nome], function (err, result) {
            if (err) throw err;
            return callback(result);
        });    
    }
    deletar(connection) {
        var sql = "DELETE FROM alunos WHERE cpf =  ?";
    
        connection.query(sql, [this.cpf], function (err, result) {
          //if (err) throw "teste";
          if (err) throw 'err from callback: ' + err.stack;
        });
      }

    consultarChave(connection, callback) {
            var sql = "SELECT * FROM alunos WHERE cpf = ?";
    
            connection.query(sql, [this.cpf], function (err, result) {
                if (err) throw err;
                return callback(result);
            });    
        } //Para gerenciamento de aluno

      atualizar(connection) {
        try {
            var sql = "UPDATE alunos SET nome = ?, senha = ?, tipo = ?, rg = ?, telefonealuno = ?, emailaluno = ?, curso = ?, intcurso = ?, fincurso = ?, estado = ?, cidade = ?, bairro = ?, logradouro = ?, numerocasa = ? WHERE cpf = ?";
    
            connection.query(sql, [this.nome, this.senha, this.tipo, this.rg, this.telefonealuno, this.emailaluno, this.curso, this.intcurso, this.fincurso, this.estado, this.cidade, this.bairro, this.logradouro,this.numerocasa, this.cpf], function (err, result) {
              //if (err) throw "teste";
              if (err) throw 'err from callback: ' + err.stack;
              });
        } catch (e) {
            console.error('err from callback: ' + e.stack);
            throw e;
        }
      }

      buscarUsuario(connection, callback){
        var sql = "SELECT tipo FROM alunos WHERE cpf = ? AND senha = ?";
    
        connection.query(sql, [this.cpf, this.senha], function (err, result) {
            if (err) throw err;
            return callback(result);
        });    
      }

      buscar(connection, callback) {
        var sql = "SELECT * FROM emprestimos  INNER JOIN alunos ON usuario = cpf";
    
        connection.query(sql, function (err, result) {
            if (err) throw err;
            return callback(result);
        });    
    
      }
      
}






