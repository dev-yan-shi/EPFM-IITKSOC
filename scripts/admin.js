const adminForm = document.querySelector('.add-form');
const delForm = document.querySelector('.del-form');
const transForm = document.querySelector('.trans-form');
const upForm = document.querySelector('.up-form');

delForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userid = delForm['eid'].value;
    const name = delForm['remove-name'].value;
    if(document.querySelector('input[name="emptype"]:checked').value == "Employee"){
        var suplist = db.collection("super").doc(delForm['supeid'].value);
        suplist.get().then((doc) => {
            if(doc.data()){
                console.log(suplist);
                suplist.update({
                    emp: firebase.firestore.FieldValue.arrayRemove(userid)
                }).catch(err => {
                    delForm.querySelector('.error').innerHTML = err.message;
                });
                db.collection('employ').doc(userid).delete().then(() => {
                    delForm.querySelector('.error').innerHTML = "Deleted "+name+" from employees!";
                    delForm.reset();
                }).catch(err => {
                    delForm.querySelector('.error').innerHTML = err.message;
                });

            }
            else return delForm.querySelector('.error').innerHTML = "Please enter a valid supervisor id ";
        });
    }
    else if(document.querySelector('input[name="emptype"]:checked').value == "Supervisor"){
        db.collection('super').doc(userid).delete().then(() => {
            delForm.querySelector('.error').innerHTML = "Deleted "+name+" from supervisors!";
            delForm.reset();
        }).catch(err => {
            delForm.querySelector('.error').innerHTML = err.message;
        });
    }
});

adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userid = adminForm['eid'].value;
    const name = adminForm['add-name'].value;
    const type = document.querySelector('input[name="emptype"]:checked').value;
    const des = adminForm['desig'].value;
    
    if(type=="Employee"){
        var suplist = db.collection("super").doc(adminForm['supeid'].value);
        suplist.get().then((doc) => {
            if(doc.data()){
                suplist.update({
                    emp: firebase.firestore.FieldValue.arrayUnion(userid)
                }).catch(err => {
                    adminForm.querySelector('.error').innerHTML = err.message;
                });
                db.collection('employ').doc(userid).get().then((doc) => {
                    if(!doc.data()){
                        return db.collection('employ').doc(userid).set({
                            name: name,
                            mail:"",
                            percentScore: 0,
                            exists: false,
                            taskCount: 0,
                            taskArray: [],
                            designation: des,
                            authuid:"",
                            sup: adminForm['supname'].value,
                            supid: adminForm['supeid'].value
                        }).then(() => {
                            adminForm.reset();
                            adminForm.querySelector('.error').innerHTML = "Added "+name+" as employee!";
                        }).catch(err => {
                            adminForm.querySelector('.error').innerHTML = err.message;
                        });
                    }
                    else return adminForm.querySelector('.error').innerHTML = "User already exists with the same id!";
                });
            }
            else{
                return adminForm.querySelector('.error').innerHTML = "Please enter a valid supervisor id!";
            }
        })
    }
    else if(type=="Supervisor"){
        db.collection('super').doc(userid).get().then((doc) => {
            if(!doc.data()){
                return db.collection('super').doc(userid).set({
                    name: name,
                    exists: false,
                    mail:"",
                    authuid:"",
                    emp: [],
                    tasksGiven: [],
                    designation: des
                }).then(() => {
                    adminForm.reset();
                    adminForm.querySelector('.error').innerHTML = "Added "+name+" as supervisor!";
                }).catch(err => {
                    adminForm.querySelector('.error').innerHTML = err.message;
                });
            }
            else return adminForm.querySelector('.error').innerHTML = "User already exists with the same id!";
        });
    }
});

transForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userid = transForm['eid'].value;
    const name = transForm['transfer-name'].value;
    const oldid = transForm['oldeid'].value;
    const oldname = transForm['oldname'].value;
    const newid = transForm['neweid'].value;
    const newname = transForm['newname'].value;
    if(userid){
        var oldsuplist = db.collection("super").doc(oldid);
        oldsuplist.get().then((doc) => {
            if(doc.data()){
                oldsuplist.update({
                    emp: firebase.firestore.FieldValue.arrayRemove(userid)
                }).catch(err => {
                    transForm.querySelector('.error').innerHTML = err.message;
                });
                var newsuplist = db.collection("super").doc(newid);
                newsuplist.get().then((docnew) => {
                    if(docnew.data()){
                        newsuplist.update({
                            emp: firebase.firestore.FieldValue.arrayUnion(userid)
                        }).catch(err => {
                            transForm.querySelector('.error').innerHTML = err.message;
                        });
                        db.collection('employ').doc(userid).update({
                            sup: newname,
                            supid: newid
                        }).then(() => {
                            transForm.reset();
                            transForm.querySelector('.error').innerHTML = "Transferred "+name+" from "+oldname+" to "+newname+" !";
                        }).catch(err => {
                            transForm.querySelector('.error').innerHTML = err.message;
                        });
                    }
                    else return transForm.querySelector('.error').innerHTML = "Please enter a valid new supervisor id!";
                })
            }
            else return transForm.querySelector('.error').innerHTML = "Please enter a valid old supervisor id!";
        });
    }
    else return transForm.querySelector('.error').innerHTML = "Please enter a valid employee id!";
});

upForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userid = upForm['eid'].value;
    const name = upForm['promote-name'].value;
    const supname = upForm['supname'].value;
    const oldsupid = upForm['supeid'].value;
    const newid = upForm['neweid'].value;
    const newdes = upForm['newdes'].value;
    const type = document.querySelector('input[name="type"]:checked').value;
    if(userid){
        var suplist = db.collection("super").doc(upForm['supeid'].value);
        suplist.update({
            emp: firebase.firestore.FieldValue.arrayRemove(userid)
        }).catch(err => {
            upForm.querySelector('.error').innerHTML = err.message;
            console.log(err);
        });
        suplist.get().then((doc) => {
            if(doc.data()){
                console.log(suplist);
                db.collection('employ').doc(userid).delete().then(() => {
                    upForm.reset();
                }).catch(err => {
                    upForm.querySelector('.error').innerHTML = err.message;
                });
                if(type == "yes"){
                    db.collection('super').doc(newid).get().then((doc) => {
                        if(!doc.data()){
                            return db.collection('super').doc(newid).set({
                                name: name,
                                exists: false,
                                mail:"",
                                authuid:"",
                                emp: [],
                                designation: newdes
                            }).then(() => {
                                upForm.querySelector('.error').innerHTML = "Promoted "+name+" to supervisor!";
                                upForm.reset();
                            }).catch(err => {
                                upForm.querySelector('.error').innerHTML = err.message;
                            });
                        }
                        else return upForm.querySelector('.error').innerHTML = "User already exists with the same id!";
                    });
                }
                else if(type == "no"){
                    var suplist = db.collection("super").doc(oldsupid);
                    suplist.get().then((doc) => {
                        if(doc.data()){
                            suplist.update({
                                emp: firebase.firestore.FieldValue.arrayUnion(newid)
                            }).catch(err => {
                                upForm.querySelector('.error').innerHTML = err.message;
                            });
                            db.collection('employ').doc(newid).get().then((empdoc) => {
                                if(!empdoc.data()){
                                    return db.collection('employ').doc(newid).set({
                                        name: name,
                                        percentScore: 0,
                                        exists: false,
                                        taskCount: 0,
                                        mail:"",
                                        authuid:"",
                                        taskArray: [],
                                        designation: newdes,
                                        sup: oldsupid,
                                        supid: supname
                                    }).then(() => {
                                        upForm.reset();
                                    }).catch(err => {
                                        upForm.querySelector('.error').innerHTML = err.message;
                                    });
                                }
                                else return upForm.querySelector('.error').innerHTML = "User already exists with the same id!";
                            });
                        }
                        else return upForm.querySelector('.error').innerHTML = "Please enter a valid supervisor id!";
                    });
                }
            }
            else return upForm.querySelector('.error').innerHTML = "Please enter a valid supervisor id!";
        })
    }
});