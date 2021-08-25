// 在 index.js 引用資料進去
import express from 'express'
import {
  register,
  login
} from '../controllers/users.js'

const router = express.Router()

router.post('/', register)
router.post('/login', login)

export default router
