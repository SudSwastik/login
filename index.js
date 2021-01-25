const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use('/public',express.static(path.join(__dirname,'static')));
app.set('view engine','ejs');
app.get('/login',(req,res)=>{
    res.render('index',{
        action: "sign In",
        loggedIn : true
                });
});

app.get('/consent', (req,res) => {
    res.render('consent', {appName: "SudApp" , })
});


app.post('/consent', (req,res) => {
        console.log("consent granted");

        if (req.body.submit != 'yes') {
            console.log('user has declined to grant permission');
            // ! request.body.redirect_uri.startsWith('oob') &&
            // ! request.body.redirect_uri.startsWith('urn:ietf:wg:oauth:2.0:oob')
            console.log('BODY: ' + JSON.stringify(req.body.email));
            // res.render('validate');
    
            res.status(302)
              .header('Location', 'https://www.google.com'+ '?error=access_denied')
              .end();
            return;
          }
        else{
            console.log("sign ");
            console.log(req.body.email);
            console.log(req.body.pwd);
            if ( ! req.body.email || ! req.body.pwd) {
                // missing form fields
                res.status(401);
                res.render('login', {
                  postback_url  : 'validate',
                  action        : 'Sign in',
                  
                });
            } else {
                res.status(200)
                    .render('consent', {
              action        : 'consent',
              postback_url  : 'consent',
              req_scope     : "READ WRITE",
              appName       : "TEST APP",
                });
            }
            
        }
});


app.post('/validate', (req,res)=>{

    if (req.body.submit != 'yes') {
        console.log('user has declined to login');
        // ! request.body.redirect_uri.startsWith('oob') &&
        // ! request.body.redirect_uri.startsWith('urn:ietf:wg:oauth:2.0:oob')
        console.log('BODY: ' + JSON.stringify(req.body.email));
        res.render('validate');

        // res.status(302)
        //   .header('Location', req.body.redirect_uri + '?error=access_denied')
        //   .end();
        // return;
      }
    else{
        console.log("sign ");
        console.log(req.body.email);
        console.log(req.body.pwd);
        if ( ! req.body.email || ! req.body.pwd) {
            // missing form fields
            res.status(401);
            res.render('login', {
              postback_url  : 'validate',
              action        : 'Sign in',
              
            });
        } else {
            res.status(200)
                .render('consent', {
          action        : 'consent',
          postback_url  : 'consent',
          req_scope     : "READ WRITE",
          appName       : "TEST APP",
            });
        }
        
    }
    // console.log('BODY: ' + JSON.stringify(req.body.email));
});

app.listen(3000);