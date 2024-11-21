async function listarEmprestimos() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/emprestimos", { // Faz a requisição GET
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (!respostaServidor.ok) {
            throw new Error("Erro ao buscar dados da lista de empréstimos");
        }
    
        const emprestimos = await respostaServidor.json(); // Converte a resposta para JSON
        preencherTabela(emprestimos); // Chama a função para preencher a tabela com os dados
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

// Função para preencher a tabela com os dados recebidos
function preencherTabela(emprestimos) {
    const tabela = document.getElementById('tabelaEmprestimosCorpo');
    tabela.innerHTML = ''; // Limpa qualquer conteúdo existente na tabela

    // Itera sobre cada cliente no array de dados
    emprestimos.forEach(emprestimo => {
        // Cria uma nova linha da tabela
        const row = document.createElement('tr');

        // Cria e preenche cada célula da linha
        const cellIdEmprestimo = document.createElement('td');
        cellIdEmprestimo.textContent = emprestimo.idEmprestimo; // Preenche com o ID do cliente
        row.appendChild(cellIdEmprestimo);

        const cellIdAluno = document.createElement('td');
        cellIdAluno.textContent = emprestimo.idAluno; // Preenche com o Nome do cliente
        cellIdAluno.hidden = true;
        row.appendChild(cellIdAluno);

        const cellIdLivro = document.createElement('td');
        cellIdLivro.textContent = emprestimo.idLivro; // Preenche com o Nome do cliente
        cellIdLivro.hidden = true;
        row.appendChild(cellIdLivro);


        const cellNomeAluno = document.createElement('td');
        cellNomeAluno.textContent = emprestimo.nomeAluno;
        row.appendChild(cellNomeAluno); 

        const cellTituloLivro = document.createElement('td');
        cellTituloLivro.textContent = emprestimo.tituloLivro;
        row.appendChild(cellTituloLivro);

        const cellDataEmprestimo = document.createElement('td');
        cellDataEmprestimo.textContent = emprestimo.dataEmprestimo; // Preenche com o CPF do cliente
        row.appendChild(cellDataEmprestimo);

        const cellDataDevolucao = document.createElement('td');
        cellDataDevolucao.textContent = emprestimo.dataDevolucao; // Preenche com o CPF do cliente
        row.appendChild(cellDataDevolucao);

        const cellStatus = document.createElement('td');
        cellStatus.textContent = emprestimo.statusEmprestimo; // Preenche com o Telefone do cliente
        row.appendChild(cellStatus);

        // Cria célula para ações com ícones
        const tdAcoes = document.createElement('td');
        const iconAtualizar = document.createElement('img'); 
        iconAtualizar.src = 'assets/icon/pencil-square.svg'; 
        iconAtualizar.alt = 'Ícone de edição'; 
        tdAcoes.appendChild(iconAtualizar); 
        const iconExcluir = document.createElement('img'); 
        iconExcluir.src = 'assets/icon/trash-fill.svg'; 
        iconExcluir.alt = 'Ícone de excluir'; 
        tdAcoes.appendChild(iconExcluir);

        row.appendChild(tdAcoes);

        // Adiciona a linha preenchida à tabela
        tabela.appendChild(row);
    });
}
