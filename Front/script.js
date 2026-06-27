const API = "http://localhost:3000/produtos";

const form = document.getElementById("formProduto");

form.addEventListener("submit", salvarProduto);

async function salvarProduto(e){

    e.preventDefault();

    const id = document.getElementById("idProduto").value;

    const produto = {

        nome: document.getElementById("nome").value,
        categoria: document.getElementById("categoria").value,
        preco: document.getElementById("preco").value,
        quantidade: document.getElementById("quantidade").value
    };

    if(id){

        await fetch(`${API}/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(produto)
        });

    }else{

        await fetch(API,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(produto)
        });

    }

    form.reset();

    document.getElementById("idProduto").value = "";

    listarProdutos();
}

async function listarProdutos(){

    const resposta = await fetch(API);

    const produtos = await resposta.json();

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(produto => {

        lista.innerHTML += `
            <tr>
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>${produto.categoria}</td>
                <td>R$ ${produto.preco}</td>
                <td>${produto.quantidade}</td>

                <td>
                <button
                    class="editar"
                    onclick="editar(
                        ${produto.id},
                       '${produto.nome}',
                       '${produto.categoria}',
                        ${produto.preco},
                        ${produto.quantidade}
                    )">
                    Editar
                </button>

                <button
                    class="excluir"
                    onclick="excluir(${produto.id})">
                    Excluir
                </button>
                </td>
            </tr>
        `;
    });
}

function editar(id,nome,categoria,preco,quantidade){

    document.getElementById("idProduto").value = id;
    document.getElementById("nome").value = nome;
    document.getElementById("categoria").value = categoria;
    document.getElementById("preco").value = preco;
    document.getElementById("quantidade").value = quantidade;
}

async function excluir(id){

    await fetch(`${API}/${id}`,{
        method:"DELETE"
    });

    listarProdutos();
}

listarProdutos();