import mongoose from 'mongoose'

const Schema = mongoose.Schema

const workSchema = new Schema({
  name: {
    type: String,
    required: [true, '作品名不能為空'],
    minlenght: [1, '格式不正確']
  },
  subject: {
    type: String
  },
  tools: {
    type: Array
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  sell: {
    type: Boolean,
    default: false
  }
}, { versionKey: false })

export default mongoose.model('works', workSchema)
