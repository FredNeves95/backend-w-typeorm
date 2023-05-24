import { Request, Response } from "express";
import { videoRepository } from "../repositories/VideoRepository";
import { roomRepository } from "../repositories/RoomRepository";

export class VideoController {
  async create(req: Request, res: Response) {
    const { title, url } = req.body
    const { id } = req.params

    if (!title) {
      return res.status(400).json({ message: 'O título é obrigatório' })
    }

    if (!url) {
      return res.status(400).json({ message: 'A url é obrigatória' })
    }

    if (!id) {
      return res.status(400).json({ message: 'O id da aula é obrigatório' })
    }

    const roomId = Number(id)

    if(!roomId) {
      return res.status(400).json({ message: 'ID inválido' })
    }

    try {
      const room = await roomRepository.findOneBy({
        id: roomId
      })

      if(!room) {
        return res.status(404).json({message: "Nenhum item corresponde ao ID da busca"})
      }

      const newVideo = videoRepository.create({ title, url, room })
      await videoRepository.save(newVideo)
      return res.status(201).json(newVideo)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}