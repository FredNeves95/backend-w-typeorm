import { Request, Response } from "express";
import { roomRepository } from "../repositories/RoomRepository";
import { subjectRepository } from "../repositories/SubjectRepository";

export class RoomController {
  async create(req: Request, res: Response) {
    const { name, description } = req.body

    if (!name) {
      return res.status(400).json({ message: 'O nome é obrigatório' })
    }

    try {
      const newRoom = roomRepository.create({ name, description })
      await roomRepository.save(newRoom)

      return res.status(201).json(newRoom)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async roomSubject(req: Request, res: Response) {
    const { subject_id } = req.body
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ message: 'O id da aula é obrigatório' })
    }

    const roomId = Number(id)

    if(!roomId) {
      return res.status(400).json({ message: 'ID inválido' })
    }

    if (!subject_id) {
      return res.status(400).json({ message: 'O id da disciplina é obrigatório' })
    }

    const subjectId = Number(subject_id)

    if(!subjectId) {
      return res.status(400).json({ message: 'ID inválido' })
    }

    try {
      const room = await roomRepository.findOneBy({
        id: roomId
      })

      if(!room) {
        return res.status(404).json({message: "Nenhuma sala corresponde ao ID da busca"})
      }

      const subject = await subjectRepository.findOneBy({id: subject_id})

      if(!subject) {
        return res.status(404).json({message: "Nenhuma disciplina corresponde ao ID da busca"})
      }

      const roomUpdate = {
        ...room,
        subjects: [subject]
      }

      await roomRepository.save(roomUpdate)

      return res.status(200).json(roomUpdate)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async list(req: Request, res: Response) {
    try {
      const rooms = await roomRepository.find({
        relations: {
          subjects: true
        }
      })
      return res.status(200).json(rooms)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}