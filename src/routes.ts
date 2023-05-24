import { Router } from 'express'
import { SubjectController } from './controllers/SubjectController'
import { RoomController } from './controllers/RoomController'
import { VideoController } from './controllers/VideoController'

const routes = Router()

//subjects
routes.get('/subject', new SubjectController().list)
routes.get('/subject/:id', new SubjectController().show)
routes.post('/subject', new SubjectController().create)

//rooms
routes.get('/room', new RoomController().list)
routes.post('/room', new RoomController().create)
routes.post('/room/:id/subject', new RoomController().roomSubject)

//videos
routes.post('/room/:id/create', new VideoController().create)

export default routes