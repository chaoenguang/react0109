const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId;
const ObjectId = mongoose.Types.ObjectId;
mongoose.connect('mongodb://localhost/article',  { useUnifiedTopology: true, useNewUrlParser: true });

const ArticleSchema = mongoose.Schema({
    title: String,  // 标题
    content: String,   // 内容
    author: String, // 作者
});

const Article = mongoose.model('Article', ArticleSchema);


async function createArticle(articleObj) {
    return await Article.create(articleObj)
}

async function listArticle(pageno, pagesize) {
    pageno = Number(pageno) - 1;
    pagesize = Number(pagesize);
    let skip = pageno * pagesize;
    let count = await Article.find().count();
    console.log(count);
    return {
        total: count,
        list: await Article.find().skip(skip).limit(pagesize).exec()
    }
}

async function saveArtivle(articleObj) {
    let retObj = await Article.findOne({_id: ObjectId(articleObj._id)}).exec();
    retObj.title = articleObj.title;
    retObj.content = articleObj.content;
    retObj.author = articleObj.author;
    return await retObj.save()
}
async function deleteArticle (articleObj) {
    console.log({title: articleObj.title})
    await Article.deleteOne({title: articleObj.title}, err=>{
        if (err) {
            throw new Error(err)
        } else {
            console.log('删除成功')
        }
    })  
}
module.exports = {
    createArticle,
    listArticle,
    saveArtivle,
    deleteArticle
}


// Article.create({title: 'aaa', content: 'bbb', author: 'ccc'})

// mongoose.connection.close();