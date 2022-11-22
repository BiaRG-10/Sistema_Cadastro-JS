const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sEmpresa = document.querySelector('#m-empresa')
const sEmail = document.querySelector('#m-email')
const sTelPessoal = document.querySelector('#m-tel-pessoal')
const sTelComercial = document.querySelector('#m-tel-comercial')
const btnCadastro = document.querySelector('#btnCadastro')

let itens
let id

// Validação dos campos preenchidos pelo usuário

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sEmpresa.value = itens[index].empresa
    sEmail.value = itens[index].email
    sTelPessoal.value = itens[index].tel_pessoal
    sTelComercial.value = itens[index].tel_comercial
    id = index
  } else {
    sNome.value = ''
    sEmpresa.value = ''
    sEmail.value = ''
    sTelPessoal.value = ''
    sTelComercial.value = ''
  }
  
}

// Realiza operações a partir do armazenamento de dados (CRUD)

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  alert("Tem certeza de que deseja excluir permanentemente este registro?")
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.empresa}</td>
    <td>${item.email}</td>
    <td>${item.tel_pessoal}</td>
    <td>${item.tel_comercial}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button></a>     
    </td>   
  `
  tbody.appendChild(tr)
}

btnCadastro.onclick = e => {
  
  if (sNome.value == '' || sEmpresa.value == '' || sEmail.value == '' || sTelPessoal.value == '' || sTelComercial.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].empresa = sEmpresa.value
    itens[id].email = sEmail.value
    itens[id].tel_pessoal = sTelPessoal.value
    itens[id].tel_comercial = sTelComercial.value
  } else {
    itens.push({'nome': sNome.value, 'empresa': sEmpresa.value, 'email': sEmail.value, 'tel_pessoal': sTelPessoal.value, 'tel_comercial': sTelComercial.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [] 
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens)) 

loadItens()


// Filtro das informações contidas na tabela

const PESQUISA = document.getElementById('barraPesquisa');
const TABELA = document.getElementById('tabela');

PESQUISA.addEventListener('keyup', () => {
  let resultado = PESQUISA.value.toLowerCase();
  let linhas = TABELA.getElementsByTagName('tr');

  console.log(linhas);
  for(let posicao in linhas) {
    if (true === isNaN(posicao)){
      continue;
    }

    let conteudoLinha = linhas[posicao].innerHTML.toLowerCase();

    if (true === conteudoLinha.includes(resultado)){      
      linhas[posicao].style.display = '';      
    } else {
      
      linhas[posicao].style.display = 'none';    
    }

    console.log(posicao);
  }
})