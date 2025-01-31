async function enviarFormulario(){
    const alunoDTO = {
        "nome": document.querySelectorAll("input")[0].value,
        "sobrenome": document.querySelectorAll("input")[1].value,
        "dataNascimento": document.querySelectorAll("input")[2].value,
        "endereco": document.querySelectorAll("input")[3].value,
        "email": document.querySelectorAll("input")[4].value,
        "celular": document.querySelectorAll("input")[5].value
    }

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/aluno",{
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(alunoDTO)
        });
    
        if(!respostaServidor.ok){
            throw new Error("Erro ao enviar os dados ao servidor");
        }
    
        alert("Aluno cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`)
    }
}

async function listarAlunos() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/alunos", { // Faz a requisição GET
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (!respostaServidor.ok) {
            throw new Error("Erro ao buscar dados da lista de alunos");
        }
    
        const alunos = await respostaServidor.json(); // Converte a resposta para JSON
        preencherTabela(alunos); // Chama a função para preencher a tabela com os dados
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

// Função para preencher a tabela com os dados recebidos
function preencherTabela(alunos) {
    const tabela = document.getElementById('tabelaAlunoCorpo');
    tabela.innerHTML = ''; // Limpa qualquer conteúdo existente na tabela

    // Itera sobre cada aluno no array de dados
    alunos.forEach(aluno => {
        // Cria uma nova linha da tabela
        const row = document.createElement('tr');

        const cellId = document.createElement('td');
        cellId.textContent = aluno.idAluno; 
        row.appendChild(cellId);

        const cellRa = document.createElement('td');
        cellRa.textContent = aluno.ra; 
        row.appendChild(cellRa);

        const cellNome = document.createElement('td');
        cellNome.textContent = aluno.nome; 
        row.appendChild(cellNome);

        const cellSobrenome = document.createElement('td');
        cellSobrenome.textContent = aluno.sobrenome; 
        row.appendChild(cellSobrenome);

        const cellDataNascimento = document.createElement('td');
        cellDataNascimento.textContent = new Date(aluno.dataNascimento).toLocaleDateString('pt-BR');
        row.appendChild(cellDataNascimento);

        const cellEndereco = document.createElement('td');
        cellEndereco.textContent = aluno.endereco; 
        row.appendChild(cellEndereco);

        const cellEmail = document.createElement('td');
        cellEmail.textContent = aluno.email; 
        row.appendChild(cellEmail);

        const cellCelular = document.createElement('td');
        cellCelular.textContent = aluno.celular; 
        row.appendChild(cellCelular);

        const tdAcoes = document.createElement('td');
        const iconAtualizar = document.createElement('img'); 
        iconAtualizar.src = 'assets/icon/pencil-square.svg'; 
        iconAtualizar.alt = 'Ícone de edição'; 
        tdAcoes.appendChild(iconAtualizar); 
        const iconExcluir = document.createElement('img'); 
        iconExcluir.src = 'assets/icon/trash-fill.svg'; 
        iconExcluir.alt = 'Ícone de excluir'; 
        iconExcluir.addEventListener('click', () => excluirAluno(aluno.idAluno));
        tdAcoes.appendChild(iconExcluir);

        row.appendChild(tdAcoes);

        // Adiciona a linha preenchida à tabela
        tabela.appendChild(row);
    });
}

async function excluirAluno(idAluno) {
    const url = `http://localhost:3333/delete/aluno/${idAluno}`;

    try {
        const response = await fetch(url, { method: 'DELETE' });

        if (response.ok) {
            alert('Aluno removido com sucesso');
            window.location.reload();
        } else {
            const error = await response.json();
            alert(`Erro: ${error}`);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao tentar excluir o aluno.');
    }
}    



