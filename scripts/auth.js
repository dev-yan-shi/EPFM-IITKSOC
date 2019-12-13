auth.onAuthStateChanged(user => {
    if(user){
        console.log('logged in as '+user.email);
        db.collection("employ").onSnapshot(snapshot => {
            if(snapshot.docs.length){
                snapshot.docs.forEach(doc => {
                    if(doc.data().mail==user.email){ 
                        disp("employ",doc.id,true);
                        assignemp(doc.id);
                        assignemp1(doc.id);
                    }
                });
            }
        })
        db.collection("super").onSnapshot(snapshot => {
            if(snapshot.docs.length){
                snapshot.docs.forEach(doc => {
                    if(doc.data().mail==user.email){ 
                        disp("super",doc.id,false);
                        assignsup(doc.id);
                        assignsup1(doc.id);
                    }
                });
            }
        })
        disp(col1,userid);
    }
    else{
        console.log('user logged out');
        disp();
    }
});

//signup
const signupForm = document.querySelector('.signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const userid = signupForm['employee-id'].value;
    const passcheck = signupForm['signup-password-check'].value;

    if(password == passcheck){
        signupForm.querySelector('.error').innerHTML = '';
        //verify employee/supervisors
        // userid == employee id
        db.collection("employ").doc(userid).get().then((doc) => {
            if(doc.data() && !(doc.data().exists)){
                auth.createUserWithEmailAndPassword(email, password).then(cred => {
                    // update mail id, exists and authid
                    return db.collection('employ').doc(userid).update({
                        mail: email,
                        exists: true,
                        authuid: cred.user.uid
                    });
                }).then(() => {
                    signupForm.reset();
                    signupForm.querySelector('.error').innerHTML = '';
                    window.location.href="dashboard.html";
                    set("employ",userid);
                }).catch(err => {
                    if(err.message=="set is not defined") signupForm.querySelector('.error').innerHTML = '';
                    else signupForm.querySelector('.error').innerHTML = err.message;
                });
            }
            else if(doc.data() && doc.data().exists) signupForm.querySelector('.error').innerHTML = 'User Already Exists';
            else{
                db.collection("super").doc(userid).get().then( (doc) => {    
                    if(doc.data() && !(doc.data().exists)){
                        auth.createUserWithEmailAndPassword(email, password).then(cred => {
                            return db.collection('super').doc(userid).update({
                                mail: email,
                                exists: true,
                                authuid: cred.user.uid
                            });
                        }).then(() => {
                            signupForm.reset();
                            signupForm.querySelector('.error').innerHTML = '';
                            window.location.href="sup_dashboard.html";
                            set("super",userid);
                        }).catch(err => {
                            signupForm.querySelector('.error').innerHTML = err.message;
                        });
                    }
                    else{
                        if(!(doc.data())) signupForm.querySelector('.error').innerHTML = 'Please enter a valid Employee ID';
                        else if(doc.data() && doc.data().exists) signupForm.querySelector('.error').innerHTML = 'User Already Exists';
                        else signupForm.querySelector('.error').innerHTML = '';
                    }
                  });
            }
          });
    }
    else {
        signupForm.querySelector('.error').innerHTML = 'Please type the same password in both fields';
    }
});

//login
const loginForm = document.querySelector('.login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    const userid = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    if(userid == "admin1"){
        db.collection('admin').doc(userid).get().then((doc) => {
            email = doc.data().mail;
            auth.signInWithEmailAndPassword(email, password).then(() => {
                //reset login form
                loginForm.reset();
                loginForm.querySelector('.error').innerHTML = '';
                window.location.href="admin.html";
            }).catch(err => {
                loginForm.querySelector('.error').innerHTML = err.message;
            });
        });
    }
    else if(userid){
        db.collection('employ').doc(userid).get().then((doc) => {
            if(doc.data()){
                email = doc.data().mail;
                auth.signInWithEmailAndPassword(email, password).then(() => {
                    //reset login form
                    loginForm.reset();
                    loginForm.querySelector('.error').innerHTML = '';
                    window.location.href="dashboard.html";
                    set("employ",userid);
                }).catch(err => {
                    if(err.message == "set is not defined") loginForm.querySelector('.error').innerHTML = '';
                    else loginForm.querySelector('.error').innerHTML = err.message;
                });
            }
            else{
                db.collection('super').doc(userid).get().then((doc) => {
                    if(doc.data()){
                        email = doc.data().mail;
                        auth.signInWithEmailAndPassword(email, password).then(() => {
                            //reset login form
                            loginForm.reset();
                            loginForm.querySelector('.error').innerHTML = '';
                            window.location.href="sup_dashboard.html";
                            set("super",userid);
                        }).catch(err => {
                            if(err.message == "set is not defined") loginForm.querySelector('.error').innerHTML = '';
                            else loginForm.querySelector('.error').innerHTML = err.message;
                        });
                    }
                    else{
                        if(!(doc.data())) loginForm.querySelector('.error').innerHTML = 'Please enter an Employee ID';
                        else loginForm.querySelector('.error').innerHTML = '';
                    }
                });
            }
        });
    }
    else loginForm.querySelector('.error').innerHTML = 'Please enter an Employee ID';
});

//logout
function logout(){
    console.log('logged out');
    auth.signOut();
    window.location.href="loginsignup.html";
}