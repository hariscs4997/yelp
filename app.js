var exp=require("express");
var app=exp();
var body=require("body-parser");
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true});
var camp=require("./models/campgrounds");
var seedDB=require("./seed");
var Comment=require("./models/comments");
seedDB();

/*camp.create({
    name:"lol",
    image:"https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    description:"nice place"
},function(err,camp){
if(err){
    console.log(err);
}
else{
    console.log(camp);
}
})
  */

app.use(body.urlencoded({extended:true}));
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home");
})


app.get("/campgrounds",function(req,res){
camp.find({},function(err,allcamp){
    if(err){
        console.log(err)
    }else{
            
        res.render("camp",{temp:allcamp})        
    }
})

})

app.post("/campgrounds",function(req,res){
var name=req.body.name;
var img=req.body.image;
var description=req.body.description;
var tem={name:name,image:img,description:description};
camp.create(tem,function(err,camp){
if(err){
    console.log(err);
}
else{
    res.redirect("/campgrounds");    
}
})

})

app.get("/new",function(req,res){
    res.render("new");
});
app.get("/campgrounds/:id",function(req,res){
    camp.findById(req.params.id).populate("comments").exec(function(err,camptemp){
        if(err){
            console.log(err);
        }
        else{
            console.log(camptemp);
           res.render("show",{temp:camptemp});
        }
    })
 
})
app.get("/campgrounds/:id/comments/new",function(req,res){
   camp.findById(req.params.id,function(err,found){
 if(err){
     console.log(err);
 }
 else{
    res.render("comments",{camp:found});
 }
   })

})
app.post("/campgrounds/:id/comments",function(req,res){
    camp.findById(req.params.id,function(err,found){
        if(err){
            console.log(err);
        }else{
            Comment.create(req.body.comment,function(err,com){
                if(err){
                    console.log(err)
                }
                else{
                    found.comments.push(com);
                    found.save();
                    console.log(found);
                    res.redirect("/campgrounds/"+found._id);
                    
                }
            })
           
            
        }
    })
})
app.listen(300);