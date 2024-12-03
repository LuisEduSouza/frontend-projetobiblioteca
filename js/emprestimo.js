async function listarEmprestimos() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/emprestimos", { 
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (!respostaServidor.ok) {
            throw new Error("Erro ao buscar dados da lista de empréstimos");
        }
    
        const emprestimos = await respostaServidor.json(); 
        preencherTabela(emprestimos); 
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}


function preencherTabela(emprestimos) {
    const tabela = document.getElementById('tabelaEmprestimosCorpo');
    tabela.innerHTML = ''; 


    emprestimos.forEach(emprestimo => {

        const row = document.createElement('tr');

        const cellIdEmprestimo = document.createElement('td');
        cellIdEmprestimo.textContent = emprestimo.idEmprestimo; 
        row.appendChild(cellIdEmprestimo);

        const cellIdAluno = document.createElement('td');
        cellIdAluno.textContent = emprestimo.idAluno; 
        cellIdAluno.hidden = true;
        row.appendChild(cellIdAluno);

        const cellIdLivro = document.createElement('td');
        cellIdLivro.textContent = emprestimo.idLivro; 
        cellIdLivro.hidden = true;
        row.appendChild(cellIdLivro);


        const cellNomeAluno = document.createElement('td');
        cellNomeAluno.textContent = `${emprestimo.nomeAluno} ${emprestimo.sobrenomeAluno}`;
        row.appendChild(cellNomeAluno); 

        const cellTituloLivro = document.createElement('td');
        cellTituloLivro.textContent = emprestimo.tituloLivro;
        row.appendChild(cellTituloLivro);

        const cellDataEmprestimo = document.createElement('td');
        cellDataEmprestimo.textContent = new Date(emprestimo.dataEmprestimo).toLocaleDateString('pt-br');
        row.appendChild(cellDataEmprestimo);

        const cellDataDevolucao = document.createElement('td');
        cellDataDevolucao.textContent = new Date (emprestimo.dataDevolucao).toLocaleDateString('pt-br');
        row.appendChild(cellDataDevolucao);

        const cellStatus = document.createElement('td');
        cellStatus.textContent = emprestimo.statusEmprestimo;
        row.appendChild(cellStatus);

        const tdAcoes = document.createElement('td');
        const iconAtualizar = document.createElement('img'); 
        iconAtualizar.src = 'assets/icon/pencil-square.svg'; 
        iconAtualizar.alt = 'Ícone de edição'; 
        iconAtualizar.addEventListener('click', () => {
            window.location.href = 'cadastro-emprestimos.html';
        });        
        tdAcoes.appendChild(iconAtualizar); 
        const iconExcluir = document.createElement('img'); 
        iconExcluir.src = 'assets/icon/trash-fill.svg'; 
        iconExcluir.alt = 'Ícone de excluir';
        iconExcluir.addEventListener('click', () => excluirEmprestimo(emprestimo.idEmprestimo)); 
        tdAcoes.appendChild(iconExcluir);

        row.appendChild(tdAcoes);

        tabela.appendChild(row);
    });
}

async function excluirEmprestimo(idEmprestimo) {
    const url = `http://localhost:3333/delete/emprestimo/${idEmprestimo}`;

    try {
        const response = await fetch(url, { method: 'DELETE' });

        if (response.ok) {
            alert('Emprestimo removido com sucesso');
            window.location.reload();
        } else {
            const error = await response.json();
            alert(`Erro: ${error}`);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao tentar excluir o emprestimo.');
    }
}    
