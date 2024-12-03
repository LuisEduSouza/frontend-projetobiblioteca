async function enviarFormulario(){
    const livroDTO = {
        "titulo": document.querySelectorAll("input")[0].value,
        "autor": document.querySelectorAll("input")[1].value,
        "editora": document.querySelectorAll("input")[2].value,
        "anoPublicacao": document.querySelectorAll("input")[3].value,
        "isbn": document.querySelectorAll("input")[4].value,
        "quantTotal": Number(document.querySelectorAll("input")[5].value),
        "quantDisponivel": Number(document.querySelectorAll("input")[6].value),
        "valorAquisicao": Number(document.querySelectorAll("input")[7].value),
        "statusLivroEmprestado": document.querySelectorAll("input")[8].value
    }

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/livro",{
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(livroDTO)
        });
    
        if(!respostaServidor.ok){
            throw new Error("Erro ao enviar os dados ao servidor");
        }
    
        alert("Livro cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`)
    }
}

async function listarLivros() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/livros", { // Faz a requisição GET
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (!respostaServidor.ok) {
            throw new Error("Erro ao buscar dados da lista de livros");
        }
    
        const livros = await respostaServidor.json(); // Converte a resposta para JSON
        preencherTabela(livros); // Chama a função para preencher a tabela com os dados
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

// Função para preencher a tabela com os dados recebidos
function preencherTabela(livros) {
    const tabela = document.getElementById('tabelaLivroCorpo');
    tabela.innerHTML = ''; // Limpa qualquer conteúdo existente na tabela

    // Itera sobre cada livro no array de dados
    livros.forEach(livro => {
        // Cria uma nova linha da tabela
        const row = document.createElement('tr');

        // Cria e preenche cada célula da linha
        const cellId = document.createElement('td');
        cellId.textContent = livro.idLivro; 
        row.appendChild(cellId);

        const cellTitulo = document.createElement('td');
        cellTitulo.textContent = livro.titulo; 
        row.appendChild(cellTitulo);

        const cellAutor = document.createElement('td');
        cellAutor.textContent = livro.autor;
        row.appendChild(cellAutor); 

        const cellEditora = document.createElement('td');
        cellEditora.textContent = livro.editora; 
        row.appendChild(cellEditora);

        const cellAnoPublicacao = document.createElement('td');
        cellAnoPublicacao.textContent = livro.anoPublicacao; 
        row.appendChild(cellAnoPublicacao);

        const cellIsbn = document.createElement('td');
        cellIsbn.textContent = livro.isbn; 
        row.appendChild(cellIsbn);

        const cellQuantTotal = document.createElement('td');
        cellQuantTotal.textContent = livro.quantTotal;
        row.appendChild(cellQuantTotal);

        const cellQuantDispo = document.createElement('td');
        cellQuantDispo.textContent = livro.quantDisponivel; 
        row.appendChild(cellQuantDispo);

        const cellValorAquisicao = document.createElement('td');
        cellValorAquisicao.textContent = `R$ ${livro.valorAquisicao}`; 
        row.appendChild(cellValorAquisicao);


        const cellStatusEmprestimo = document.createElement('td');
        cellStatusEmprestimo.textContent = livro.statusLivroEmprestado; 
        row.appendChild(cellStatusEmprestimo);

        // Cria célula para ações com ícones
        const tdAcoes = document.createElement('td');
        const iconAtualizar = document.createElement('img'); 
        iconAtualizar.src = 'assets/icon/pencil-square.svg'; 
        iconAtualizar.alt = 'Ícone de edição'; 
        tdAcoes.appendChild(iconAtualizar); 
        const iconExcluir = document.createElement('img'); 
        iconExcluir.src = 'assets/icon/trash-fill.svg'; 
        iconExcluir.alt = 'Ícone de excluir'; 
        iconExcluir.addEventListener('click', () => excluirLivro(livro.idLivro));
        tdAcoes.appendChild(iconExcluir);

        row.appendChild(tdAcoes);

        // Adiciona a linha preenchida à tabela
        tabela.appendChild(row);
    });
}

async function excluirLivro(idLivro) {
    const url = `http://localhost:3333/delete/livro/${idLivro}`;

    try {
        const response = await fetch(url, { method: 'DELETE' });

        if (response.ok) {
            alert('Livro removido com sucesso');
            window.location.reload();
        } else {
            const error = await response.json();
            alert(`Erro: ${error}`);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao tentar excluir o livro.');
    }
}    
