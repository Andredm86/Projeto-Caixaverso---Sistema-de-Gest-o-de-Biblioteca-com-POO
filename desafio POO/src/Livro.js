class Livro {
  #disponivel;

  constructor(titulo, autor, ano, genero) {
    this.titulo = titulo;
    this.autor = autor;
    this.ano = ano;
    this.genero = genero;
    this.#disponivel = true;
  }

  isDisponivel() {
    return this.#disponivel;
  }

  setDisponivel(disponivel) {
    this.#disponivel = disponivel;
  }
}
