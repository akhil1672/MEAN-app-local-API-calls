const express=require('express');
const app=express();
const body=require('body-parser');
const mongodb=require('mongodb').MongoClient;
const MONGODB_URI ="mongodb://akhil1672:akhil1672@ds247027.mlab.com:47027/students1672"
const path=require('path');
const studentsCol="students";
const ID=mongodb.ObjectID;

app.use(body.json());
app.use(body.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'dist')));

let db;
mongodb.connect(MONGODB_URI,function(err,database){
    if(err)
    {
        console.error(err);
        process.exit(1);
    }
    else{
        console.log("Database connected");
        db=database;
        app.listen(process.env.PORT||3000,()=>{
            console.log("App listening at 3000");
        })
    }
});

app.get('/',function(req,res){
    res.sendFile('index.html',{root:'src'});
})

app.get('/api/students',function(req,res){
    db.createCollection(studentsCol,{strict:true},function(err){
        db.collection(studentsCol).find({}).toArray((err,students)=>{
            if(err){
                console.error("Error in retrieving students");
                process.exit(1);
            }
            res.json(students);
        });
    });
});

app.post('/api/students',function(req,res){
    console.log(req.body);
    let newstudent=req.body;
    console.log(newstudent)
    // if(newstudent._id==''){
    //     newstudent._id=new ID;
    // }
    db.collection(studentsCol).insertOne(newstudent,function(err,student){
        if(err)
        {
            console.error("Error in inserting student");
            process.exit(1);
        }
        res.json(student.ops[0]);//check this by remving ops
    })
})

app.get('/api/students/:id',function(re,res){
    db.collection(studentsCol).findOne({_id:new ID(req.params.id)},function(err,student){
        if(err)
        {
            console.error("Error in finding student");
            process.exit(1);
        }
        res.json(student);
    })
})

app.delete('/api/students/:id',function(req,res){
    db.collection(studentsCol).deleteOne({ _id: new ID(req.params.id) }, function (err, student) {
        if (err) {
            console.error("Error in deleting student");
            process.exit(1);
        }
        res.json(student);//check 
    })
})

app.put('api/students/:id',function(req,res){
    let updatestudent=req.body;

    db.collection(studentsCol).findOne({ _id: ID(req.params.id) }, function (err, student) {
        if (err) {
            console.error("Error in updating student");
            process.exit(1);
        }
        res.json(student);//check
    })

})

