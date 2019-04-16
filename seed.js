var mongoose=require("mongoose");
var camp=require("./models/campgrounds");
var comments=require("./models/comments");
var temp=[
    {
        name:"yes",
        image:"https://upload.wikimedia.org/wikipedia/commons/e/ef/Wilderness_Adventure_Camps.jpg",
        description:"blah blah blah"

    },
   
    {
    name:"no",
    image:"https://aff.bstatic.com/images/hotel/max1024x768/115/115450744.jpg",
    description:"uadafaf"
    }
]

function seedDB(){

camp.remove({},function(err,campground){
    if(err){
        console.log(err)
    }else{
        temp.forEach(function(cam){
          camp.create(cam,function(err,found){
              if(err){
                  console.log(err);
              }
              else{
                comments.create({
                    text:"blah balh bah",
                    author:"known"
                },function(err,comm){
                    if(err){
                        console.log(err);
                    }else{
                        found.comments.push(comm);
                        found.save();
                    }
                })
              }
         })
        })
    }
})
}

module.exports=seedDB;