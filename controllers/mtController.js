require('../models/db')
//创建Category集合
const Category = require('../models/Category')
//利用数据模型实例化一个集合对象
const Restaurant = require('../models/Restaurant')

 exports.homepage = async(req,res) => {
    try {
        //从数据库读取Category集合里的数据：[] 数组
        const categories = await Category.find()
        res.render('index',{title: ' MT外卖 - 首页', categories})
    } catch ( error ){
        res.status(500).send(error.message)
    }
 }
 exports.loadmore = async(req,res) => {
    const skipNum = parseInt(req.body.skipNum)
    const restaurants = await Restaurant.find().skip(skipNum).limit(5)

    res.json(restaurants)
 }

 exports.addRestaurant = async(req,res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('add-restaurant', {title: '添加餐馆 - MT外卖',infoErrorsObj, infoSubmitObj })
 }
 exports.addRestaurantPost = async(req,res) => {
     //图片名称 图片路径
     let imageUploadFile, uploadPath, newImageName
        //获取图片原始名称
        imageUploadFile = req.files.photo
        // console.log(imageUploadFile)
        //重命名
        newImageName = Date.now() + imageUploadFile.name
        //确定图片存放的路径
        uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName
        //把上传的图片放入指定位置 mv:move 移动
        imageUploadFile.mv(uploadPath)
    try {
        const newRestaurant = new Restaurant({
            name: req.body.name,
            category: req.body.category,
            image: req.body.photo,
            desc: req.body.intro,
            averageCost: req.body.averageCost,
            promotion:req.body.promotion,
            featured: req.body.featured,
            address: req.body.address
        })
        await newRestaurant.save()
        req.flash('infoSubmit', '图片添加成功！')
        res.redirect('/add-restaurant');
    } catch (error){
        //res.json(error)
        req.flash('infoErrors', error)
        res.redirect('/add-restaurant')
        
    }
 }

 //sortRestaurant
 exports.sortRestaurant = async(req,res) => {
    try {
        // console.log(req.params.id)
        let categoryId = req.params.id
        res.render('restaurants',{title: ' MT外卖 - 首页', categoryId})
    } catch ( error ){
        res.status(500).send(error.message)
    }
 }
 //sortRestaurantPost
 exports.sortRestaurantPost = async(req,res) => {
    try {
        // console.log(req.params.id)
        let categoryId = req.params.id
        const skipNum = parseInt(req.body.skipNum)
        const restaurantList = await Restaurant.find({'category':categoryId }).skip(skipNum).limit(2)
        res.json(restaurantList)
    } catch ( error ){
        res.status(500).send(error.message)
    }
 }

 //showRestaurant
 exports.showRestaurant = async(req,res) => {
    try {
        // console.log(req.params)
        let categoryId = req.params.id
        const restaurant = await Restaurant.find({"_id": categoryId})
        res.render('restaurant',{title: ' MT外卖 - 首页', restaurant})
    } catch ( error ){
        res.status(500).send(error.message)
    }
 }

 //searchPost
 exports.searchPost = async(req,res) => {
    try {
        let keyword = req.body.mykeyword
        const searchResult = await Restaurant.find({ $text: {$search: keyword} })
        res.render('search', {title: '搜索结果', searchResult})
    } catch ( error ){
        res.status(500).send(error.message)
    }
 }