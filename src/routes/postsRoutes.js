import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { atualizarPost, criarPost, listarPostId, listarPosts, uploadImagem } from '../controllers/postsController.js';

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
})

const upload = multer({dest: "./uploads"}, storage)

const routes = (app) => {
  //Devolve texto em formato json
  app.use(express.json())
  app.use(cors(corsOptions))

  app.post("/posts", criarPost);

  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id",atualizarPost);

  app.get("/posts", listarPosts);
  
  app.get("/posts/:id", listarPostId);
}

export default routes;
