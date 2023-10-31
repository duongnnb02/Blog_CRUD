const express = require('express');
const router = express.Router();
const Blog = require('../models/blogs');

//Thêm blog mới
router.post('/add', async (req, res) => {
    const newBlog = new Blog({
        name: req.body.name,
        mssv: req.body.mssv,
        mess: req.body.mess,
    });
    try {
        await newBlog.save();
        console.log(req.body);
        res.redirect('/');
    } catch (err) {
        res.status(500).send({
            message: err.message,
        })
    }
});

router.get('/add', (req, res) => {
    res.render('add_blogs', { title: "Thêm blog" });
})

//Trích xuất blog trong db
router.get('/', async (req, res) => {
    const blogs = await Blog.find();
    res.render("index", {
        title: "Trang chủ",
        blogs: blogs
    })
})

//Sửa blog
router.get('/edit/:id', async (req, res) => {
    let id = req.params.id;
    let blog = await Blog.findOne({ _id: id });
    res.render('edit_blogs', {
        title: "Sửa blog",
        blog: blog
    })
})

router.post("/update/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const blog = await Blog.updateOne({ _id: id }, data)
    res.redirect('/');
});

//Xóa blog
router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.deleteOne({ _id: id });
    res.redirect('/');
})

module.exports = router;