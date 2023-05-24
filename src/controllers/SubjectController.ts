import { Request, Response } from "express";
import { subjectRepository } from "../repositories/SubjectRepository";

export class SubjectController {
  async create(req: Request, res: Response) {
    //criar disciplina
    const { name } = req.body

    if (!name) {
      return res.status(400).json({message: 'O nome é obrigatório'})
    }

    try {
      const newSubject = subjectRepository.create({ name })
      await subjectRepository.save(newSubject)
      return res.status(201).json(newSubject)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async list(req: Request, res: Response) {
    try {
      const subjects = await subjectRepository.find()
      return res.status(200).json(subjects)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params

      const numberId = Number(id)

      if (!numberId) {
        return res.status(400).json({message: 'ID inválido'})
      }

      try {
        const subject = await subjectRepository.find({
          where: {
            id: Number(id)
          }
        })

        if (subject.length) {
          return res.status(200).json(subject)
        }
        return res.status(404).json({message: "Nenhum item corresponde ao ID da busca"})
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
      }

      return res.status(200).json('teste')
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}