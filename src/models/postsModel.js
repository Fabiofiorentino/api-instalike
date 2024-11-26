import 'dotenv/config';
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/db.js';

const conexao = await conectarAoBanco(process.env.STRING_CONNECTION)
const db = conexao.db('instalike')

const posts = [
  {
    id: 1,
    titulo: "Meu primeiro post",
    descricao: "Uma breve descrição sobre este post.",
    imagem: "https://source.unsplash.com/random/?nature,landscape", // Substitua por uma imagem específica se desejar
    autor: "João Silva",
    dataCriacao: "2023-11-22",
    categoria: "Tecnologia",
    curtidas: 10,
    comentarios: 5
  },
  {
    id: 2,
    titulo: "Receita de bolo de chocolate",
    descricao: "A receita mais deliciosa de bolo de chocolate que você vai encontrar.",
    imagem: "https://source.unsplash.com/random/?food,chocolate",
    autor: "Ana Maria",
    dataCriacao: "2023-11-21",
    categoria: "Culinária",
    curtidas: 25,
    comentarios: 12
  },
  {
    id: 3,
    titulo: "Dicas para viajar pela Europa",
    descricao: "Um guia completo para planejar sua viagem pela Europa.",
    imagem: "https://source.unsplash.com/random/?travel,europe",
    autor: "Pedro Santos",
    dataCriacao: "2023-11-20",
    categoria: "Viagem",
    curtidas: 15,
    comentarios: 8
  },
  {
    id: 4,
    titulo: "Novidades sobre o lançamento do novo smartphone",
    descricao: "Tudo o que você precisa saber sobre o lançamento do novo smartphone.",
    imagem: "https://source.unsplash.com/random/?technology,smartphone",
    autor: "Tech News",
    dataCriacao: "2023-11-19",
    categoria: "Tecnologia",
    curtidas: 30,
    comentarios: 15
  },
  {
    id: 5,
    titulo: "Exercícios para iniciantes na academia",
    descricao: "Uma rotina de exercícios completa para quem está começando na academia.",
    imagem: "https://source.unsplash.com/random/?fitness,gym",
    autor: "Personal Trainer",
    dataCriacao: "2023-11-18",
    categoria: "Saúde",
    curtidas: 20,
    comentarios: 10
  }
];

export async function createPost(novoPost) {
  const posts = db.collection('posts');
  return posts.insertOne(novoPost)
}

export async function getAllPosts() {
  const posts = db.collection('posts');
  return posts.find().toArray()
}

export function getIndexPost(id) {
  return posts.findIndex((post) => {
    return post.id === Number(id)
  })
}

export async function updatePost(id, novoPost) {
  console.log("id caracter", id.length);
  
  const posts = db.collection('posts');
  const objectId = ObjectId.createFromHexString(id)
  return posts.updateOne({_id: new ObjectId(objectId)}, {$set: novoPost})
}