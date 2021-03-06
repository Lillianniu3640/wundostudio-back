import works from '../models/works.js'

export const newWork = async (req, res) => {
  if (req.user.role !== 0) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400).send({ success: false, message: '資料格式不正確' })
    return
  }
  try {
    const result = await works.create({
      name: req.body.name,
      subject: req.body.subject,
      tools: req.body.tools,
      description: req.body.description,
      sell: req.body.sell,
      image: req.filepath
    })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message: message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const getWork = async (req, res) => {
  try {
    const result = await works.find({ sell: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const editWork = async (req, res) => {
  if (req.user.role !== 0) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400).send({ success: false, message: '資料格式不正確' })
    return
  }
  try {
    const data = {
      name: req.body.name,
      subject: req.body.subject,
      tools: req.body.tools,
      description: req.body.description,
      sell: req.body.sell,
      image: req.filepath
    }
    if (req.filepath) data.image = req.filepath
    const result = await works.findByIdAndUpdate(req.params.id, data, { new: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message: message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const delWork = async (req, res) => {
  if (req.user.role !== 0) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
}
