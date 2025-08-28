class Autor {
  constructor(nome, nacionalidade, anoNascimento) {
    this.nome = nome;
    this.nacionalidade = nacionalidade;
    this.anoNascimento = anoNascimento;
  }

  // Getters
  getNome() {
    return this.nome;
  }

  getNacionalidade() {
    return this.nacionalidade;
  }

  getAnoNascimento() {
    return this.anoNascimento;
  }

  // Setters
  setNome(nome) {
    this.nome = nome;
  }

  setNacionalidade(nacionalidade) {
    this.nacionalidade = nacionalidade;
  }

  setAnoNascimento(anoNascimento) {
    this.anoNascimento = anoNascimento;
  }
}
