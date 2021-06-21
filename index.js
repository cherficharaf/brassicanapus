const express = require('express')
const bodyParser = require('body-parser')


let path = require('path')
let urlencodedparser = bodyParser.urlencoded({extended:false})
const app = express()


app.use(express.static(path.join(__dirname + '/public')))
app.set('view engine', 'ejs')


/*** connexion to db */
const ADODB = require('node-adodb');
const { url } = require('inspector')
const conn_gene = ADODB.open(`Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${path.join(__dirname)}\\Bnapus.accdb;Persist Security Info=False;`);




app.get('/', (req,res)=>{
    res.render('index', {home:"Home-Page"})
})



var current_research = []



curr_db = ''

app.post('/search', urlencodedparser, (req,res)=>{
    var recherche = req.body.family.toUpperCase()
    // fetch into db
    if(recherche == "HSF" || recherche == "AP2/ERF" || recherche == "NAC" || recherche == "MADS" || recherche == "WRKY"){
        if(recherche == "AP2/ERF"){
            recherche = recherche.slice(0,3)
        }
        conn_gene.query(`SELECT * FROM ${recherche}`).then((r)=>{
            
            current_research = r
            curr_db = recherche
            res.json({msg:"bon"})
        })
        .catch(err=>{console.log(err)})
    }
    else{
        res.json({msg:"pas bon"})

    }
    
    
})



app.get('/search', function(req,res){
    res.render('search', {data:JSON.stringify(current_research)})
})

app.post('/getcurdb', urlencodedparser, (req,res)=>{
    res.json({db:curr_db})
})

app.get('/add', function(req,res){
    res.render('form')
})

app.post('/additem', urlencodedparser, (req,res)=>{
    
    conn_gene.execute(`INSERT INTO ${req.body.db}(description, bnapus, lienbnapus, athaliana, lienathaliana, brapa, lienbrapa, blast, img)
                        VALUES('${req.body.description}', '${req.body.bnapus}', '${req.body.lienbnapus}', '${req.body.athaliana}',
                                    '${req.body.lienathaliana}', '${req.body.brapa}', '${req.body.lienbrapa}', '${req.body.blast}',
                                    '${req.body.img}' )
    `).then((r)=>{
        res.json({msg:'bon'})
    })  
    .catch((err)=>{
        console.log(err)
    })
})



app.get('/about', function(req,res){
    res.render('about')
})







app.post('/deleterecord', urlencodedparser, (req,res)=>{
    
    
    conn_gene.execute(`DELETE FROM ${curr_db.toLowerCase()} WHERE id  = ${req.body.id}`).then((r)=>{
        current_research.forEach((item, index)=>{
            if(item.id == req.body.id){
                current_research.splice(index, 1)
            }
        })
        res.json({msg:'bon'})
    })
    .catch((err)=>{console.log(err)})
    
})



app.use(function (req, res) {
    res.redirect('/')
})


app.listen(3000, ()=>{
    console.log('listening to port 3000')
})
