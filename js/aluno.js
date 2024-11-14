async function enviarFormulario(){
    const alunoDTO = {
        "nome": document.querySelectorAll("input")[0].value,
        "sobrenome": document.querySelectorAll("input")[1].value,
        "data_nascimento": document.querySelectorAll("input")[2].value,
        "endereco": document.querySelectorAll("input")[3].value,
        "email": document.querySelectorAll("input")[4].value,
        "calular": document.querySelectorAll("input")[5].value
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

    // Itera sobre cada cliente no array de dados
    alunos.forEach(aluno => {
        // Cria uma nova linha da tabela
        const row = document.createElement('tr');

        // Cria e preenche cada célula da linha
        const cellId = document.createElement('td');
        cellId.textContent = aluno.idAluno; // Preenche com o ID do cliente
        row.appendChild(cellId);

        const cellRa = document.createElement('td');
        cellRa.textContent = aluno.ra; // Preenche com o Nome do cliente
        row.appendChild(cellRa);

        const cellNome = document.createElement('td');
        cellNome.textContent = aluno.nome; // Preenche com o Nome do cliente
        row.appendChild(cellNome);

        const cellSobrenome = document.createElement('td');
        cellSobrenome.textContent = aluno.sobrenome; // Preenche com o CPF do cliente
        row.appendChild(cellSobrenome);

        const cellDataNascimento = document.createElement('td');
        cellDataNascimento.textContent = aluno.dataNascimento; // Preenche com o Telefone do cliente
        row.appendChild(cellDataNascimento);

        const cellEndereco = document.createElement('td');
        cellEndereco.textContent = aluno.endereco; // Preenche com o Telefone do cliente
        row.appendChild(cellEndereco);

        const cellEmail = document.createElement('td');
        cellEmail.textContent = aluno.email; // Preenche com o Telefone do cliente
        row.appendChild(cellEmail);

        const cellCelular = document.createElement('td');
        cellCelular.textContent = aluno.celular; // Preenche com o Telefone do cliente
        row.appendChild(cellCelular);

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
