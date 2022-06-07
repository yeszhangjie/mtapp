const { default: mongoose } = require("mongoose");
//利用schema方法创建数据模型
const restaurantSchema = mongoose.Schema({
    name: {
        type:String,
        required: true,
        default: '餐馆名称待定'
    },
    image: {
        type:String,
        required: true,
        default: 'restaurant.jpg'
    },
    stars: {
        type:Number,
        required: false,
        default: '4.0'
    },
    averageCost: {
        type:Number,
        required: true,
        default: '100'
    },
    distance: {
        type:Number,
        required: false,
        default: '2.1'
    },
    address: {
        type:String,
        required: true
    },
    featured: {
        type:String,
        required: true
    },
    promotion: {
        type:String,
        required: false
    },
    desc: {
        type:String,
        required: true
    },
    category: {
        type: String,
        catearr: ['火锅','海鲜','烤肉','甜点','西餐','饮品','自助','快餐'],
        required: true
    }
})

//创建索引检索查找
restaurantSchema.index({name:'text',desc: 'text'})
//参数1：构造函数：构造一个数据对象
module.exports = mongoose.model('Restaurant', restaurantSchema)