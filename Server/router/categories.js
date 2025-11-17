const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const pool = require('../utils/db')
const result = require('../utils/result')
const config = require('../utils/config')

const router = express.Router()

// ADD NEW CATEGORY
//  {
//     "title":"Technology23",
//     "description":"new te2ch ai"
// }

router.post('/add',(req,res)=>{
    const { title , description } = req.body
    const sql =`INSERT INTO categories(title,description) VALUES(?,?)`

    pool.query(sql,[title,description],(err, data)=>{
        res.send(result.createResult(err,data))
    })
})


// get all


router.get('/all',(req,res)=>{
    const sql =`SELECT * FROM categories`
    pool.query(sql,(err, data)=>{
        res.send(result.createResult(err,data))
    })
})


// update title by id

// {
//     "category_id":1,
//     "title":"new TECH"
// }

router.put('/update',(req,res)=>{
    const { category_id,title } =  req.body;
   const sql = 'UPDATE categories SET title = ? WHERE category_id = ?'

   pool.query(sql, [title,category_id], (err, data) => {
    res.send(result.createResult(err, data))
    })
})


// // delete by id
// {
//     "category_id":1
// }


router.delete('/delete',(req,res)=>{
    const { category_id,title } =  req.body;
   const sql = 'DELETE FROM categories WHERE category_id = ?'

   pool.query(sql, [category_id], (err, data) => {
    res.send(result.createResult(err, data))
    })
})

module.exports = router