const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const pool = require('../utils/db')
const result = require('../utils/result')
const config = require('../utils/config')

const router = express.Router()

// ADD BLOG

router.post('/post',(req,res)=>{
    const {title,contents , category_id} = req.body
    const user_id = req.headers.user_id
    const sql =`INSERT INTO blogs(title,contents,created_time,user_id,category_id) VALUES(?,?,now(),?,?)`

    pool.query(sql,[title,contents,user_id,category_id],(err,data)=>{
        res.send(result.createResult(err,data))
    })
})


// GET ALL BLOGS

router.get('/all',(req,res)=>{
    const sql =`SELECT * FROM blogs`

    pool.query(sql,(err,data)=>{
        res.send(result.createResult(err,data))
    })
})

// update by ID



router.put('/update',(req,res)=>{
    const {blog_id, title } =  req.body;
   const sql = 'UPDATE blogs SET title = ? WHERE blog_id = ?'

   pool.query(sql, [title,blog_id], (err, data) => {
    res.send(result.createResult(err, data))
    })
})


// // delete by id

router.delete('/delete/:cid',(req,res)=>{
    const blog_id  =  req.params.cid
 const sql = 'DELETE FROM blogs WHERE blog_id = ?'

 pool.query(sql, [blog_id], (err, data) => {
  res.send(result.createResult(err, data))
  })
})


// find by title

router.post('/find', (req, res) => {
    const { title } = req.body;

    const sql = `SELECT * FROM blogs WHERE title LIKE ?`;

    pool.query(sql, [`%${title}%`], (err, data) => {
        res.send(result.createResult(err, data));
    });
});


router.get('/byuser',(req,res)=>{
    const sql =`SELECT * FROM blogs WHERE user_id =?`
        const user_id = req.headers.user_id
    pool.query(sql,[user_id],(err,data)=>{
        res.send(result.createResult(err,data))
    })
})


module.exports = router