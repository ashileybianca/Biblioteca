DROP DATABASE biblioteca;
DROP USER 'bibliotecario'@'localhost';

CREATE DATABASE biblioteca;

use biblioteca;

create table tipodeusuario(
tipoid int not null auto_increment,
nome varchar(50) not null,
primary key(tipoid)
);

create table alunos(
   nome VARCHAR(45) NOT NULL,
   cpf VARCHAR(45) NOT NULL,  
   senha VARCHAR(45) NOT NULL, 
   tipo int not null,
   rg VARCHAR(20) NOT NULL, 
   telefonealuno VARCHAR(13) NOT NULL,  
   emailaluno VARCHAR(50) NOT NULL,   
   curso VARCHAR(45) NOT NULL,
   intcurso VARCHAR(45) NOT NULL,
   fincurso DATE NOT NULL,   
   estado VARCHAR(30) NOT NULL,   
   cidade VARCHAR(30) NOT NULL,
   bairro VARCHAR(20) NOT NULL,
   logradouro VARCHAR(30) NOT NULL,
   numerocasa VARCHAR(7) NOT NULL,
   PRIMARY KEY (cpf)
);

create table autores (
   idautores INT NOT NULL AUTO_INCREMENT,
   nomeautor VARCHAR(20) NOT NULL,
   nacionalidade VARCHAR(20) NOT NULL,
   PRIMARY KEY (idautores)
);

create table editoras (
   cnpj VARCHAR(14) NOT NULL,
   razaosocial VARCHAR(30) NOT NULL,
   telefoneeditora VARCHAR(13) NOT NULL,
   emaileditora VARCHAR(30) NOT NULL,
   PRIMARY KEY (cnpj)
);


create table classificacaoTabela(
	id varchar(3) not null,
    nome varchar (100) not null,
    primary key(id)
);

create table tipomidiaTabela(
	id varchar(3) not null,
    nome varchar(100) not null,
    primary key(id)
);

create table livros (
   idlivros INT NOT NULL AUTO_INCREMENT,
   tituloobra VARCHAR(50) NOT NULL,
   idioma VARCHAR(45) NOT NULL,
   classificacao varchar(3) not null,
   autorobra VARCHAR(20) NOT NULL,
   editora VARCHAR(20) NOT NULL,
   tipomidia VARCHAR(3) NOT NULL,
   PRIMARY KEY(idlivros),
   foreign key (tipomidia) references tipomidiaTabela(id),
   foreign key (classificacao) references classificacaoTabela(id)
);

select * from livros;

insert into tipomidiaTabela(id,nome) values 
("m1","Impressa"),
("m2","DVD"),
("m3","CD"),
("m4","Online"),
("m5","Outro");

insert into classificacaoTabela (id,nome) values 
("t1","Livros Científicos"),
("t2","Periódicos Científicos"),
("t3","Periódicos Informativos"),
("t4","Periódicos de entretenimento"),
("t5","Livros de Literatura"),
("t6","Outro");

create table emprestimos (
   idemprestimos INT NOT NULL AUTO_INCREMENT,
   usuario VARCHAR(45) NOT NULL, 
   obraretirada INT NOT NULL,
   dataretirada DATE NOT NULL,
   prazodevolucao DATE NOT NULL,
   PRIMARY KEY (idemprestimos)
);

create user 'bibliotecario'@'localhost' identified by '1234';
grant all privileges on *.* to 'bibliotecario'@'localhost';
flush privileges;

USE biblioteca;
ALTER TABLE emprestimos ADD FOREIGN KEY (usuario) REFERENCES alunos(cpf);

USE biblioteca;
ALTER TABLE emprestimos ADD FOREIGN KEY (obraretirada) REFERENCES livros(idlivros);


USE biblioteca;
INSERT INTO tipodeusuario (nome) VALUES ("Administrador");
INSERT INTO tipodeusuario (nome) VALUES ("Aluno");

INSERT INTO alunos 

   (nome,
   cpf,  
   senha,
   tipo,
   rg,
   telefonealuno,
   emailaluno,
   curso ,
   intcurso ,
   fincurso, 
   estado ,   
   cidade ,
   bairro ,
   logradouro ,
   numerocasa)
   
   values 
   ("Bibliotecario",
   "12345",
   "54321",
   (SELECT tipoid FROM tipodeusuario WHERE nome = "Administrador"),
   "0000000000",
   "51999999999",
   "bibliotecario@gmail.com",
   "Informática",
   "00-00-0000",
   "00-00-0000",
   "Rio Grande do Sul",
   "Porto Alegre",
   "Restinga",
   "Rua Alberto Hoffmann",
   "285"
   ),

   ("Ashiley",
   "10160119",
   "10160119",
   2,
   "",
   "",
   "",
   "",
   "00-00-0000",
   "00-00-0000",
   "",
   "",
   "",
   "",
   ""
   ),

   ("Gabriela",
   "10160204",
   "10160204",
   2,
   "",
   "",
   "",
   "",
   "00-00-0000",
   "00-00-0000",
   "",
   "",
   "",
   "",
   ""
   ),

   ("Francine",
   "10160108",
   "10160108",
   2,
   "",
   "",
   "",
   "",
   "00-00-0000",
   "00-00-0000",
   "",
   "",
   "",
   "",
   ""
   ),
   
   ("Larissa",
   "10160102",
   "10160102",
   2,
   "",
   "",
   "",
   "",
   "00-00-0000",
   "00-00-0000",
   "",
   "",
   "",
   "",
   ""
   ),

   ("Giovanna",
   "10160097",
   "10160097",
   2,
   "",
   "",
   "",
   "",
   "00-00-0000",
   "00-00-0000",
   "",
   "",
   "",
   "",
   ""
   );

INSERT INTO livros

   (tituloobra,
   idioma,
   classificacao,
   autorobra,
   editora,
   tipomidia)
   
   values
   ( 
   "Lisístrata",
   "Português",
   "t1",
   "Aristófanes",
   "",
   "m4"
   ),

   ( 
   "Várias histórias",
   "Português",
   "t2",
   "Machado de Assis",
   "",
   "m3"
   ),

   ( 
   "A falência",
   "Português",
   "t6",
   "Júlia Lopes de Almeida",
   "",
   "m1"
   ),

   ( 
   "Coral e outros poemas",
   "Português",
   "t5",
   "Sophia de Mello Breyner Andresen",
   "",
   "m5"
   ),

   ( 
   "Deixa o quarto como está",
   "Português",
   "t4",
   "Amílcar Bettega",
   "",
   "m4"
   ),

   ( 
   "Bagagem",
   "Português",
   "t3",
   "Adélia Prado",
   "",
   "m3"
   ),

   ( 
   "São Bernardo",
   "Português",
   "t2",
   "Graciliano Ramos",
   "",
   "m2"
   ),

   ( 
   "Feliz Ano Velho",
   "Português",
   "t1",
   "Marcelo Rubens Paiva",
   "",
   "m1"
   );




