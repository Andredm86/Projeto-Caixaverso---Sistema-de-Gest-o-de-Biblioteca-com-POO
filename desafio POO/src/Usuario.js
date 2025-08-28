class Usuario {
  #matricula;
  #historicoEmprestimos;

  constructor(nome, matricula) {
    this.nome = nome;
    this.#matricula = matricula;
    this.#historicoEmprestimos = [];
  }

  getMatricula() {
    return this.#matricula;
  }

  getHistoricoEmprestimos() {
    return this.#historicoEmprestimos;
  }

  adicionarEmprestimo(livro, dataEmprestimo) {
    this.#historicoEmprestimos.push({
      livro: livro,
      dataEmprestimo: dataEmprestimo,
      dataDevolucao: null,
    });
  }

  registrarDevolucao(livro, dataDevolucao) {
    const emprestimo = this.#historicoEmprestimos.find(
      (emp) => emp.livro === livro && emp.dataDevolucao === null
    );
    if (emprestimo) {
      emprestimo.dataDevolucao = dataDevolucao;
    }
  }
}

class UsuarioAluno extends Usuario {
  constructor(nome, matricula, curso) {
    super(nome, matricula);
    this.curso = curso;
    this.limiteEmprestimos = 3;
  }

  podeRealizarEmprestimo() {
    const emprestimosAtivos = this.getHistoricoEmprestimos().filter(
      (emp) => emp.dataDevolucao === null
    ).length;
    return emprestimosAtivos < this.limiteEmprestimos;
  }
}

class UsuarioProfessor extends Usuario {
  constructor(nome, matricula, departamento) {
    super(nome, matricula);
    this.departamento = departamento;
    this.limiteEmprestimos = 10;
  }

  podeRealizarEmprestimo() {
    const emprestimosAtivos = this.getHistoricoEmprestimos().filter(
      (emp) => emp.dataDevolucao === null
    ).length;
    return emprestimosAtivos < this.limiteEmprestimos;
  }
}
