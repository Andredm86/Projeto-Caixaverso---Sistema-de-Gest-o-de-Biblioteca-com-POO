# Projeto-Caixaverso---Sistema-de-Gest-o-de-Biblioteca-com-POO
sistema completo de gestão de biblioteca utilizando Programação  Orientada a Objetos em JavaScript, aplicando todos os conceitos vistos ao  longo do módulo I do Caixaverso

## Objetivo

O sistema permite o gerenciamento completo de uma biblioteca, incluindo:

- Cadastro, edição e exclusão de livros, autores e usuários
- Controle de empréstimos e devoluções
- Histórico de empréstimos por usuário
- Relatórios de utilização

## Funcionalidades

### Principais recursos:

1. Gerenciamento de Livros

   - Cadastro com título, autor, ano e gênero
   - Controle de disponibilidade
   - Busca por título ou autor

2. Gerenciamento de Autores

   - Cadastro com nome, nacionalidade e ano de nascimento
   - Listagem de autores

3. Gerenciamento de Usuários

   - Suporte a diferentes tipos (Aluno e Professor)
   - Controle de limite de empréstimos
   - Histórico de empréstimos

4. Sistema de Empréstimos

   - Validação de disponibilidade
   - Controle de limites por tipo de usuário
   - Registro de devoluções

5. Relatórios
   - Livros mais emprestados
   - Usuários mais ativos

### Características técnicas:

- Uso de classes e objetos
- Encapsulamento com atributos privados
- Herança e polimorfismo
- Persistência de dados usando LocalStorage
- Interface gráfica em HTML/CSS

## Estrutura de Classes

### Autor

- Atributos: nome, nacionalidade, anoNascimento
- Métodos: getters e setters

### Livro

- Atributos: titulo, autor, ano, genero, disponivel
- Métodos: getters e setters

### Usuario (classe base)

- Atributos privados: #matricula, #historicoEmprestimos
- Métodos: gerenciamento de empréstimos

#### UsuarioAluno (herda de Usuario)

- Atributos adicionais: curso
- Limite de 3 empréstimos simultâneos

#### UsuarioProfessor (herda de Usuario)

- Atributos adicionais: departamento
- Limite de 5 empréstimos simultâneos

### Biblioteca

- Gerencia todas as operações do sistema
- Mantém as listas de livros, autores e usuários
- Implementa a persistência de dados

## Como usar

1. Abra o arquivo `index.html` em um navegador web
2. Use as diferentes seções da interface para:
   - Cadastrar autores
   - Cadastrar livros
   - Cadastrar usuários
   - Realizar empréstimos
   - Gerar relatórios

## Requisitos do Sistema

- Navegador web moderno com suporte a:
  - JavaScript ES6+
  - LocalStorage
  - CSS3
