import express from 'express'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'

import {
  newWork,
  getWork,
  editWork,
  delWork
} from '../controllers/works.js'

const router = express.Router()

router.post('/', auth, upload, newWork)
router.get('/', getWork)
router.patch('/:id', auth, upload, editWork)
router.delete('/:id', auth, delWork)

export default router
