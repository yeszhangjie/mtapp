const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/meituan')
        .then( () => console.log('连接数据库成功...') )
        .catch( err => console.error('连接数据库失败') )

