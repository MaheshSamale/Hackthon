const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const pool = require('../utils/db')
const result = require('../utils/result')
const config = require('../utils/config')

const router = express.Router()

router.post('/login', (req, res) => {
    const { email, password } = req.body
    const sql = `SELECT * FROM users WHERE email = ?`
    pool.query(sql, [email], (err, data) => {
        if (err)
            res.send(result.createResult(err))
        else if (data.length == 0)
            res.send(result.createResult("Invalid Email"))
        else {
            bcrypt.compare(password, data[0].password, (err, passwordStatus) => {
                if (passwordStatus) {
                    const payload = {
                        user_id: data[0].user_id,
                    }
                    const token = jwt.sign(payload, config.SECRET)
                    const user = {
                        token,
                        full_name: data[0].full_name,
                        email: data[0].email,
                        phone_no: data[0].phone_no
                    }
                    res.send(result.createResult(null, user))
                }
                else
                    res.send(result.createResult('Invalid Password'))
            })
        }

    })
})

router.post('/register', (req, res) => {
    const { full_name, email, password, phone_no } = req.body
    const sql = `INSERT INTO users(full_name,email,password,phone_no,created_at) VALUES (?,?,?,?,now())`
    // create the hashedpassword
    bcrypt.hash(password, config.SALT_ROUND, (err, hashedPassword) => {
        if (hashedPassword) {
            pool.query(sql, [full_name, email, hashedPassword, phone_no], (err, data) => {
                res.send(result.createResult(err, data))
            })
        } else
            res.send(result.createResult(err))
    })
})

// give us all the users -> Admin API
router.get('/', (req, res) => {
    const sql = `SELECT * FROM users`
    pool.query(sql, (err, data) => {
        res.send(result.createResult(err, data))
    })
})

router.get('/profile', (req, res) => {
    const user_id = req.headers.user_id
    const sql = `SELECT * FROM users WHERE user_id = ?`
    pool.query(sql, [user_id], (err, data) => {
        if (err)
            res.send(result.createResult(err))
        else {
            const user = {
                full_name: data[0].full_name,
                email: data[0].email,
                phone_no: data[0].phone_no
            }
            res.send(result.createResult(null, user))
        }
    })

})


router.put('/', (req, res) => {
    const { phone_no } = req.body
    const user_id = req.headers.user_id
    const sql = `UPDATE users SET phone_no = ? WHERE user_id = ?`
    pool.query(sql, [phone_no, user_id], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

router.delete('/', (req, res) => {
    const user_id = req.body.user_id
    const sql = `DELETE FROM users WHERE user_id = ?`
    pool.query(sql, [user_id], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

module.exports = router
