class Biblioteca {
  constructor() {
    this.livros = [];
    this.autores = [];
    this.usuarios = [];
    this.carregarDados();
  }

  // Métodos para Livros
  cadastrarLivro(livro) {
    this.livros.push(livro);
    this.salvarDados();
  }

  editarLivro(index, livroAtualizado) {
    this.livros[index] = livroAtualizado;
    this.salvarDados();
  }

  excluirLivro(index) {
    this.livros.splice(index, 1);
    this.salvarDados();
  }

  listarLivros() {
    return this.livros;
  }

  // Métodos para Autores
  cadastrarAutor(autor) {
    this.autores.push(autor);
    this.salvarDados();
  }

  editarAutor(index, autorAtualizado) {
    this.autores[index] = autorAtualizado;
    this.salvarDados();
  }

  excluirAutor(index) {
    this.autores.splice(index, 1);
    this.salvarDados();
  }

  listarAutores() {
    return this.autores;
  }

  // Métodos para Usuários
  cadastrarUsuario(usuario) {
    this.usuarios.push(usuario);
    this.salvarDados();
  }

  editarUsuario(index, usuarioAtualizado) {
    this.usuarios[index] = usuarioAtualizado;
    this.salvarDados();
  }

  excluirUsuario(index) {
    this.usuarios.splice(index, 1);
    this.salvarDados();
  }

  listarUsuarios() {
    return this.usuarios;
  }

  // Métodos para Empréstimos
  realizarEmprestimo(usuario, livro) {
    if (!livro.isDisponivel()) {
      throw new Error("Livro não está disponível para empréstimo");
    }

    if (
      usuario instanceof UsuarioAluno ||
      usuario instanceof UsuarioProfessor
    ) {
      if (!usuario.podeRealizarEmprestimo()) {
        throw new Error("Usuário atingiu o limite de empréstimos");
      }
    }

    livro.setDisponivel(false);
    usuario.adicionarEmprestimo(livro, new Date());
    this.salvarDados();
  }

  realizarDevolucao(usuario, livro) {
    livro.setDisponivel(true);
    usuario.registrarDevolucao(livro, new Date());
    this.salvarDados();
  }

  // Métodos para persistência de dados
  salvarDados() {
    const dados = {
      livros: this.livros.map((livro) => ({
        titulo: livro.getTitulo(),
        autor: {
          nome: livro.getAutor().getNome(),
          nacionalidade: livro.getAutor().getNacionalidade(),
          anoNascimento: livro.getAutor().getAnoNascimento(),
        },
        ano: livro.getAno(),
        genero: livro.getGenero(),
        disponivel: livro.isDisponivel(),
      })),
      autores: this.autores.map((autor) => ({
        nome: autor.getNome(),
        nacionalidade: autor.getNacionalidade(),
        anoNascimento: autor.getAnoNascimento(),
      })),
      usuarios: this.usuarios.map((usuario) => {
        const dadosBase = {
          nome: usuario.getNome(),
          matricula: usuario.getMatricula(),
          historicoEmprestimos: usuario
            .getHistoricoEmprestimos()
            .map((emp) => ({
              livro: {
                titulo: emp.livro.getTitulo(),
                autor: {
                  nome: emp.livro.getAutor().getNome(),
                  nacionalidade: emp.livro.getAutor().getNacionalidade(),
                  anoNascimento: emp.livro.getAutor().getAnoNascimento(),
                },
                ano: emp.livro.getAno(),
                genero: emp.livro.getGenero(),
                disponivel: emp.livro.isDisponivel(),
              },
              dataEmprestimo: emp.dataEmprestimo,
              dataDevolucao: emp.dataDevolucao,
            })),
        };

        if (usuario instanceof UsuarioAluno) {
          return { ...dadosBase, tipo: "aluno", curso: usuario.curso };
        } else if (usuario instanceof UsuarioProfessor) {
          return {
            ...dadosBase,
            tipo: "professor",
            departamento: usuario.departamento,
          };
        }
        return dadosBase;
      }),
    };
    localStorage.setItem("bibliotecaDados", JSON.stringify(dados));
  }

  carregarDados() {
    const dados = JSON.parse(localStorage.getItem("bibliotecaDados"));
    if (dados) {
      // Recriar autores primeiro, pois os livros dependem deles
      this.autores = dados.autores.map(
        (autorDado) =>
          new Autor(
            autorDado.nome,
            autorDado.nacionalidade,
            autorDado.anoNascimento
          )
      );

      // Recriar livros
      this.livros = dados.livros.map((livroDado) => {
        const autorObj = this.autores.find(
          (a) => a.getNome() === livroDado.autor.nome
        );
        const livro = new Livro(
          livroDado.titulo,
          autorObj,
          livroDado.ano,
          livroDado.genero
        );
        livro.setDisponivel(livroDado.disponivel);
        return livro;
      });

      // Recriar usuários
      this.usuarios = dados.usuarios.map((usuarioDado) => {
        let usuario;
        if (usuarioDado.tipo === "aluno") {
          usuario = new UsuarioAluno(
            usuarioDado.nome,
            usuarioDado.matricula,
            usuarioDado.curso
          );
        } else if (usuarioDado.tipo === "professor") {
          usuario = new UsuarioProfessor(
            usuarioDado.nome,
            usuarioDado.matricula,
            usuarioDado.departamento
          );
        } else {
          usuario = new Usuario(usuarioDado.nome, usuarioDado.matricula);
        }

        // Recriar histórico de empréstimos
        usuarioDado.historicoEmprestimos.forEach((emp) => {
          const livroEmp = this.livros.find(
            (l) => l.getTitulo() === emp.livro.titulo
          );
          if (livroEmp) {
            usuario.adicionarEmprestimo(livroEmp, new Date(emp.dataEmprestimo));
            if (emp.dataDevolucao) {
              usuario.registrarDevolucao(livroEmp, new Date(emp.dataDevolucao));
            }
          }
        });

        return usuario;
      });
    }
  }

  // Métodos para relatórios
  getLivrosMaisEmprestados() {
    const emprestimos = {};
    this.usuarios.forEach((usuario) => {
      usuario.getHistoricoEmprestimos().forEach((emp) => {
        const titulo = emp.livro.getTitulo();
        emprestimos[titulo] = (emprestimos[titulo] || 0) + 1;
      });
    });
    return Object.entries(emprestimos)
      .sort(([, a], [, b]) => b - a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  }

  getUsuariosComMaisEmprestimos() {
    return this.usuarios
      .map((usuario) => ({
        nome: usuario.getNome(),
        quantidade: usuario.getHistoricoEmprestimos().length,
      }))
      .sort((a, b) => b.quantidade - a.quantidade);
  }

  // Métodos de busca
  buscarLivrosPorTitulo(titulo) {
    return this.livros.filter((livro) =>
      livro.getTitulo().toLowerCase().includes(titulo.toLowerCase())
    );
  }

  buscarLivrosPorAutor(nomeAutor) {
    return this.livros.filter((livro) =>
      livro.getAutor().getNome().toLowerCase().includes(nomeAutor.toLowerCase())
    );
  }
}
