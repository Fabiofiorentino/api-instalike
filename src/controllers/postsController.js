import fs from 'fs';
import { createPost, getAllPosts, getIndexPost, updatePost } from "../models/postsModel.js";
import gerarDescricaoComGemini from '../services/geminiService.js';

export async function criarPost(req, res) {
  const novoPost = req.body;
  try {
    const postCriado = await createPost(novoPost)
    res.status(200).json(postCriado);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({"Erro":"Falha na requisição"})
  }
}

export async function uploadImagem(req, res) {
  const novoPost = {
    titulo: "",
    descricao: "",
    imagem: req.file.originalname,
    alt: ""
  }
  try {
    const postCriado = await createPost(novoPost)
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(req.file.path, imagemAtualizada);
    res.status(200).json(postCriado);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({"Erro":"Falha na requisição"})
  }
}

export async function listarPosts(req, res) {
  const posts = await getAllPosts();
  res.status(200).json(posts);
}

export async function listarPostId(req, res) {
  const index = getIndexPost(req.params.id)
  res.status(200).json(posts[index]);
}

export async function atualizarPost(req, res) {
  const id = req.params.id;
  const urlImage = `http://localhost:3000/${id}.png`;
 
  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imageBuffer)

    const post = {
      titulo: req.body.titulo,
      descricao: descricao,
      imagem: urlImage,
      atl:  req.body.alt
    }

    const postAtualizado = await updatePost(id, post)
    res.status(200).json(postAtualizado);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({"Erro":"Falha na requisição"})
  }
}