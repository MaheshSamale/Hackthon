const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const pool = require('../utils/db')
const result = require('../utils/result')
const config = require('../utils/config')

const router = express.Router()

// ADD NEW CATEGORY

router.post('/add',(req,res)=>{
    const { title , description } = req.body
    const sql =`INSERT INTO categories(title,description) VALUES(?,?)`

    pool.query(sql,[title,description],(err, data)=>{
        res.send(result.createResult(err,data))
    })
})

router.get('/all',(req,res)=>{
    const sql =`SELECT * FROM categories`
    pool.query(sql,(err, data)=>{
        res.send(result.createResult(err,data))
    })
})

router.put('/update',(req,res)=>{
   const sql = 'UPDAT'
})


module.exports = router