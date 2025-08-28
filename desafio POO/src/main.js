// Instância global da biblioteca
const biblioteca = new Biblioteca();

// Funções auxiliares para manipulação do DOM
function atualizarTabelas() {
  atualizarTabelaAutores();
  atualizarTabelaLivros();
  atualizarTabelaUsuarios();
  atualizarSelects();
}

function atualizarSelects() {
  // Atualizar select de autores
  const selectAutor = document.getElementById("livroAutor");
  selectAutor.innerHTML = '<option value="">Selecione um autor</option>';
  biblioteca.listarAutores().forEach((autor) => {
    const option = document.createElement("option");
    option.value = autor.getNome();
    option.textContent = autor.getNome();
    selectAutor.appendChild(option);
  });

  // Atualizar select de usuários
  const selectUsuario = document.getElementById("emprestimoUsuario");
  selectUsuario.innerHTML = '<option value="">Selecione um usuário</option>';
  biblioteca.listarUsuarios().forEach((usuario) => {
    const option = document.createElement("option");
    option.value = usuario.getMatricula();
    option.textContent = `${usuario.getNome()} (${usuario.getMatricula()})`;
    selectUsuario.appendChild(option);
  });

  // Atualizar select de livros
  const selectLivro = document.getElementById("emprestimoLivro");
  selectLivro.innerHTML = '<option value="">Selecione um livro</option>';
  biblioteca.listarLivros().forEach((livro) => {
    const option = document.createElement("option");
    option.value = livro.getTitulo();
    option.textContent = `${livro.getTitulo()} - ${livro.getAutor().getNome()}`;
    option.disabled = !livro.isDisponivel();
    selectLivro.appendChild(option);
  });
}

// Funções para Autores
function cadastrarAutor() {
  const nome = document.getElementById("autorNome").value;
  const nacionalidade = document.getElementById("autorNacionalidade").value;
  const anoNascimento = parseInt(
    document.getElementById("autorAnoNascimento").value
  );

  if (nome && nacionalidade && anoNascimento) {
    const autor = new Autor(nome, nacionalidade, anoNascimento);
    biblioteca.cadastrarAutor(autor);
    atualizarTabelas();
    limparCamposAutor();
  } else {
    alert("Por favor, preencha todos os campos!");
  }
  const autor = new Autor(nome, nacionalidade, anoNascimento);
  biblioteca.cadastrarAutor(autor);
  atualizarTabelas();
  limparCamposAutor();
}

function atualizarTabelaAutores() {
  const tbody = document.querySelector("#tabelaAutores tbody");
  tbody.innerHTML = "";

  biblioteca.listarAutores().forEach((autor, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${autor.getNome()}</td>
      <td>${autor.getNacionalidade()}</td>
      <td>${autor.getAnoNascimento()}</td>
      <td>
        <button onclick="excluirAutor(${index})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function excluirAutor(index) {
  biblioteca.excluirAutor(index);
  atualizarTabelas();
}

function limparCamposAutor() {
  document.getElementById("autorNome").value = "";
  document.getElementById("autorNacionalidade").value = "";
  document.getElementById("autorAnoNascimento").value = "";
}

function limparCamposAutor() {
  document.getElementById("autorNome").value = "";
  document.getElementById("autorNacionalidade").value = "";
  document.getElementById("autorAnoNascimento").value = "";
}

// Funções para Livros
function cadastrarLivro() {
  const titulo = document.getElementById("livroTitulo").value;
  const autorIndex = document.getElementById("livroAutor").value;
  const autor = biblioteca.listarAutores()[autorIndex];
  const ano = parseInt(document.getElementById("livroAno").value);
  const genero = document.getElementById("livroGenero").value;

  const livro = new Livro(titulo, autor, ano, genero);
  biblioteca.cadastrarLivro(livro);
  atualizarTabelas();
  limparCamposLivro();
}

function atualizarTabelaLivros() {
  const tbody = document.querySelector("#tabelaLivros tbody");
  tbody.innerHTML = "";

  biblioteca.listarLivros().forEach((livro, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${livro.getTitulo()}</td>
      <td>${livro.getAutor().getNome()}</td>
      <td>${livro.getAno()}</td>
      <td>${livro.getGenero()}</td>
      <td>${livro.isDisponivel() ? "Disponível" : "Emprestado"}</td>
      <td>
        <button onclick="excluirLivro(${index})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function buscarLivros() {
  const termo = document.getElementById("buscaLivro").value.toLowerCase();
  const livrosEncontrados = biblioteca.buscarLivrosPorTitulo(termo);
  atualizarTabelaLivrosFiltrados(livrosEncontrados);
}

function atualizarTabelaLivrosFiltrados(livros) {
  const tbody = document.querySelector("#tabelaLivros tbody");
  tbody.innerHTML = "";

  livros.forEach((livro, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${livro.getTitulo()}</td>
            <td>${livro.getAutor().getNome()}</td>
            <td>${livro.getAno()}</td>
            <td>${livro.getGenero()}</td>
            <td>${livro.isDisponivel() ? "Sim" : "Não"}</td>
            <td>
                <button onclick="excluirLivro(${index})">Excluir</button>
            </td>
        `;
    tbody.appendChild(tr);
  });
}

function excluirLivro(index) {
  biblioteca.excluirLivro(index);
  atualizarTabelas();
}

function limparCamposLivro() {
  document.getElementById("livroTitulo").value = "";
  document.getElementById("livroAutor").selectedIndex = 0;
  document.getElementById("livroAno").value = "";
  document.getElementById("livroGenero").value = "";
}

// Funções para Usuários
function cadastrarUsuario() {
  const nome = document.getElementById("usuarioNome").value;
  const matricula = document.getElementById("usuarioMatricula").value;
  const tipo = document.getElementById("usuarioTipo").value;

  let usuario;
  if (tipo === "aluno") {
    const curso = document.getElementById("usuarioCurso").value;
    usuario = new UsuarioAluno(nome, matricula, curso);
  } else {
    const departamento = document.getElementById("usuarioDepartamento").value;
    usuario = new UsuarioProfessor(nome, matricula, departamento);
  }

  biblioteca.cadastrarUsuario(usuario);
  atualizarTabelas();
  limparCamposUsuario();
}

function atualizarTabelaUsuarios() {
  const tbody = document.querySelector("#tabelaUsuarios tbody");
  tbody.innerHTML = "";

  biblioteca.listarUsuarios().forEach((usuario, index) => {
    const tr = document.createElement("tr");
    const tipo = usuario instanceof UsuarioAluno ? "Aluno" : "Professor";
    const detalhes =
      usuario instanceof UsuarioAluno
        ? `Curso: ${usuario.curso}`
        : `Departamento: ${usuario.departamento}`;

    tr.innerHTML = `
      <td>${usuario.getNome()}</td>
      <td>${usuario.getMatricula()}</td>
      <td>${tipo}</td>
      <td>${detalhes}</td>
      <td>
        <button onclick="excluirUsuario(${index})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function excluirUsuario(index) {
  biblioteca.excluirUsuario(index);
  atualizarTabelas();
}

function limparCamposUsuario() {
  document.getElementById("usuarioNome").value = "";
  document.getElementById("usuarioMatricula").value = "";
  document.getElementById("usuarioTipo").selectedIndex = 0;
  atualizarCampoExtra();
}

// Funções para Empréstimos
function realizarEmprestimo() {
  const usuarioIndex = document.getElementById("emprestimoUsuario").value;
  const livroIndex = document.getElementById("emprestimoLivro").value;

  const usuario = biblioteca.listarUsuarios()[usuarioIndex];
  const livro = biblioteca.listarLivros()[livroIndex];

  try {
    biblioteca.realizarEmprestimo(usuario, livro);
    atualizarTabelas();
    alert("Empréstimo realizado com sucesso!");
  } catch (error) {
    alert(error.message);
  }
}

// Funções para Relatórios
function gerarRelatorioLivros() {
  const livrosMaisEmprestados = biblioteca.getLivrosMaisEmprestados();
  let html = "<h3>Livros Mais Emprestados</h3><ul>";

  for (const [titulo, quantidade] of Object.entries(livrosMaisEmprestados)) {
    html += `<li>${titulo}: ${quantidade} empréstimos</li>`;
  }

  html += "</ul>";
  document.getElementById("relatorios").innerHTML = html;
}

function gerarRelatorioUsuarios() {
  const usuariosAtivos = biblioteca.getUsuariosComMaisEmprestimos();
  let html = "<h3>Usuários Mais Ativos</h3><ul>";

  usuariosAtivos.forEach((usuario) => {
    html += `<li>${usuario.nome}: ${usuario.quantidade} empréstimos</li>`;
  });

  html += "</ul>";
  document.getElementById("relatorios").innerHTML = html;
}

// Funções auxiliares para selects
function atualizarSelectAutores() {
  const select = document.getElementById("livroAutor");
  select.innerHTML = '<option value="">Selecione um autor</option>';

  biblioteca.listarAutores().forEach((autor, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = autor.getNome();
    select.appendChild(option);
  });
}

function atualizarSelectLivros() {
  const select = document.getElementById("emprestimoLivro");
  select.innerHTML = '<option value="">Selecione um livro</option>';

  biblioteca
    .listarLivros()
    .filter((livro) => livro.isDisponivel())
    .forEach((livro, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `${livro.getTitulo()} - ${livro
        .getAutor()
        .getNome()}`;
      select.appendChild(option);
    });
}

function atualizarSelectUsuarios() {
  const select = document.getElementById("emprestimoUsuario");
  select.innerHTML = '<option value="">Selecione um usuário</option>';

  biblioteca.listarUsuarios().forEach((usuario, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${usuario.getNome()} (${usuario.getMatricula()})`;
    select.appendChild(option);
  });
}

// Função para atualizar campo extra baseado no tipo de usuário
function atualizarCampoExtra() {
  const tipo = document.getElementById("usuarioTipo").value;
  const campoExtra = document.getElementById("campoExtra");

  if (tipo === "aluno") {
    campoExtra.innerHTML = `
            <label for="usuarioCurso">Curso:</label>
            <input type="text" id="usuarioCurso" required>
        `;
  } else {
    campoExtra.innerHTML = `
            <label for="usuarioDepartamento">Departamento:</label>
            <input type="text" id="usuarioDepartamento" required>
        `;
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("usuarioTipo")
    .addEventListener("change", atualizarCampoExtra);
  atualizarTabelas();
  atualizarCampoExtra();
});
