var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/users');
var passport = require('passport');
var authenticate = require('../authenticate');
var cors = require('cors')
router.use(bodyParser.json());
router.use(cors())
router.use(passport.initialize())
router.get('/:id',function(req, res, next) {
       User.findOne({_id:req.params.id})
       .then((users)=>{
        res.statusCode = 200;
        
        res.setHeader('Content-Type','application/json');
        
       
        res.json(users)
       },err=>next(err))
       .catch(err=>next(err))
});

router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 200;
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.setHeader('Content-Type', 'application/json');
      res.json({err});
    }
    else {
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 200;
          res.header("Access-Control-Allow-Origin", "*");
          res.setHeader('Content-Type', 'application/json');
          
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'signup Successful!'});
        });
      });
    }
  });
});
router.post('/login',(req, res,next) => {
  passport.authenticate('local',(err,user,info)=>{
       if(err){
         return next(err)
       }
       if(!user){
         res.statusCode = 200;
         res.setHeader('Content-Type','application/json')
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         res.json({success:false,status:info})
       }
       req.logIn(user,(err)=>{
         if(err)
         {
          res.statusCode = 200;
          res.setHeader('Content-Type','application/json')
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          res.json({success:false,status:'could not log in'})
         }
        
     
       var token = authenticate.getToken({_id : req.user._id});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true,token : token, status: 'You are successfully logged in!',_id:req.user._id});
      
      })
  })(req,res,next)

 
 
});

router.get('/logout',(req,res,next)=>{
  req.session.destroy()

  res.redirect('/')
})
router.get('/validjwt',(req,res,next)=>{
  passport.authenticate('jwt',{session:false},(err,user,info)=>{
    if(err)
    {
      res.statusCode=200
      res.setHeader('Content-Type','application/json')
     return res.json({succes:false,status:info})
    }
    if(!user){
      res.statusCode=200
      res.setHeader('Content-Type','application/json')
     return res.json({succes:false,status:info})
    }
    else{
      res.statusCode=200
      res.setHeader('Content-Type','application/json')
     return res.json({success:true,status:'authentic JWT'})
    }
  })(req,res)
})

module.exports = router;
