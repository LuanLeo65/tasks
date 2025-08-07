//controller/comments.ts
import { Response, Request } from "express";
import commentRepository from "../model/comments/commentsRepository";
import { IComments } from "src/model/comments/comments";

async function getAllComments(req: Request, res: Response, next: any) {
  try {
    const comments = await commentRepository.findAll();
    if(comments.length === 0 || !comments){
      return res.status(404).json({erro: 'Nao foi possivel encontrar nenhum comentario'})
    }
    return res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ erro: "Erro ao retornar todos os comentarios" });
  }
}

async function getCommentsOfTask(req: Request, res: Response, next: any) {
  try {
    const id = parseInt(req.params.taskId);
    if (!id) {
      res.status(400).json({ erro: "Id invalido" });
      return;
    }

    const commentsTask = await commentRepository.findAllbyTask(id);
    if(commentsTask.length === 0 || !commentsTask){
      return res.status(404).json({erro: 'Task nao encontrada'})
    }

    return res.status(200).json(commentsTask);
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ erro: "Erro ao retornar o comentario dessa task" });
  }
}

async function addComment(req: Request, res: Response, next: any) {
  try {
    const id = parseInt(req.params.taskId);
    if (!id) {
      res.status(400).json({ erro: "Id invalido" });
      return;
    }

    const commentsParams = req.body;
    if (!commentsParams) {
      res.status(400).json({ erro: "Informações invalidas" });
      return;
    }
    const comment = await commentRepository.addComment(id, commentsParams);

    return res.status(201).json(comment);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ erro: "Erro ao adicionar o comentario" });
  }
}

async function deleteComment(req: Request, res: Response, next: any){
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      res.status(400).json({ erro: "Id invalido" });
      return;
    }

    
    await commentRepository.deleteComment(id)
  

    return res.sendStatus(204)
  } catch (error) {
     console.log(error);
    return res.status(500).json({ erro: "Erro ao deletar o comentario" });
  }
}

async function setComment(req: Request, res: Response, next: any){
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      res.status(400).json({ erro: "Id invalido" });
      return;
    }

    const commentsParams = req.body as IComments
    if(!commentsParams){
      return res.status(400).json({erro: 'Informacoes invalidas'})
    }

    const commentUpdated = await commentRepository.setComment(id, commentsParams )
    
    if(commentUpdated === null){
      return res.status(404).json({erro: "Comentario nao encontrado"})
    }
    return res.status(201).json(commentUpdated)


  } catch (error) {
    console.log(error);
    return res.status(500).json({ erro: "Erro ao deletar o comentario" });
  }
}

export default { addComment, getCommentsOfTask, getAllComments, deleteComment, setComment };
