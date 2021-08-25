// models 定義有什麼資料
import mongoose from 'mongoose'
import md5 from 'md5'
import validator from 'validator'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  account: {
    type: String,
    minlength: [4, '帳號必須 4 個字以上'],
    maxlength: [20, '帳號不能超過 20 個字'],
    unique: true,
    required: [true, '帳號不能為空']
  },
  password: {
    type: String,
    minlength: [4, '密碼必須 4 個字以上'],
    maxlength: [20, '密碼不能超過 20 個字'],
    required: [true, '密碼不能為空']
  },
  email: {
    type: String,
    required: [true, '信箱不能為空'],
    unique: true,
    validator: {
      validator: (email) => {
        return validator.isEmail(email)
      },
      message: '信箱格式不正確'
    }
  },
  role: {
    type: Number,
    default: 0,
    required: [true, '沒有使用者分類']
  },
  tokens: {
    type: [String]
  }
}, { versionKey: false })

UserSchema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = md5(user.password)
  }
  next()
})

export default mongoose.model('users', UserSchema)
