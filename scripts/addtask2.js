const mytasks = document.querySelector('#my-tasks-area');           
const ADDTASK = document.querySelector('#ADDTASK');

var empId;

function filluser(count){
    const adduid = document.querySelectorAll('#addtaskid');
    empId = adduid[count].innerHTML;
}

function assignemp1(employId){
    db.collection('employ').onSnapshot(snapshot => {
        let changes = snapshot.docChanges()
        changes.forEach(change => {
            if((change.doc.id == employId)){
                while(mytasks.firstChild){
                    mytasks.removeChild(mytasks.firstChild);
                }
                change.doc.data().taskArray.forEach(task => {
                    let card = document.createElement('div');
                    card.setAttribute('class','widget-area');

                    let head = document.createElement('div');
                    head.setAttribute('class','task-head');
                    head.innerHTML = task.taskName;

                    let br1 = document.createElement('br');
                    let br2 = document.createElement('br');
                    let br3 = document.createElement('br');

                    let content = document.createElement('div');
                    content.setAttribute('class','task-content');
                    content.innerHTML = task.taskDescription;

                    let center = document.createElement('center');

                    let button1 = document.createElement('button');
                    button1.setAttribute('class','task-button');
                    button1.innerHTML = "&#10004;";

                    let button2 = document.createElement('button');
                    button2.setAttribute('class','task-button');
                    button2.innerHTML = "&#10006;";


                    card.appendChild(head);
                    card.appendChild(br1);
                    card.appendChild(content);
                    card.appendChild(br2);
                    card.appendChild(br3);

                    mytasks.appendChild(card);

                    db.collection('Status').onSnapshot(snapshot => {
                        snapshot.docs.forEach(status => {
                            if(status.data().taskName == task.taskName && (status.data().givenToEmpId==employId)){
                                if(status.data().Completed == false && status.data().Rejected == false){
                                    center.appendChild(button1);
                                    center.appendChild(button2);
                                    card.appendChild(center);
                                }
                                else if(status.data().Rejected == true){
                                    center.innerHTML = `<b style = "font-family : 'Raleway', sans-serif; font-weight : 900; color : #FFFFFF; ">Task Rejected</b>`;
                                    card.appendChild(center); 
                                }
                                else if(status.data().Completed == true && status.data().Rejected == false && status.data().feedbackGiven == false){
                                    center.innerHTML = `<b style = "font-family : 'Raleway', sans-serif; font-weight : 900; color : #FFFFFF; ">Task Submitted</b>`;
                                    card.appendChild(center); 
                                }
                                else if((status.data().Completed == true)&&status.data().feedbackGiven == true){
                                    center.innerHTML = `
                                    <div style="padding-right:45px;">
                                    <button type="submit" class="btn btn-info four-button" data-toggle="modal" data-target="#${status.id}">View Feedback</button>
                                    </div>
                                    `;
                                    let div2 = document.createElement('div');
                                    var html;
                                    if(status.data().emojival == 1){
                                        html = `
                                        <div id="${status.id}" class="modal" role="dialog" tabindex="-1" aria-labelledby="exampleModalLongTitle"
                                        aria-hidden="true"
                                        style="position : fixed; margin : 0; width : auto; height : 100%; top:0; background : rgba(255,255,255,50%);">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content center-align" style="color:white;">
                                                    <div align="center" class="modal-header">
                                                        <h2 align="center" class="modal-title"><b>Task Details</b></h2>
                                                        <button type="button" class="close" data-dismiss="modal">
                                                            <span aria-hidden="true">&times;</span>
                                                    </div>
                                                    <div class="modal-body ${status.data().name} align="center">
                                                        <div align="center" class="form-style">
                                                            <div>Total Action Score : ${status.data().totalActionScore}</div><br>
                                                            <div>Accountability Score : ${status.data().ActionScore[0]}</div><br>
                                                            <div>Collaboration Score : ${status.data().ActionScore[1]}</div><br>
                                                            <div>Timeliness Score : ${status.data().ActionScore[2]}</div><br>
                                                            <div>Initiative Score : ${status.data().ActionScore[3]}</div><br>
                                                            <div>Objectivity Score : ${status.data().ActionScore[4]}</div><br>
                                                            <div>New Learning Score : ${status.data().ActionScore[5]}</div><br>
                                                            <div>Overall Supervisor Comments : ${status.data().overallSupervisorComments}</div>
                                                            <button type="button" class="emoji-buttons" style="font-size:40px">&#128525;</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        `;
                                    }
                                    else if(status.data().emojival == 2){
                                        html = `
                                        <div id="${status.id}" class="modal" role="dialog" tabindex="-1" aria-labelledby="exampleModalLongTitle"
                                            aria-hidden="true"
                                            style="position : fixed; margin : 0; width : auto; height : 100%; top:0; background : rgba(255,255,255,50%);">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content center-align" style="color:white;">
                                                    <div class="modal-header">
                                                        <h2 class="modal-title"><b>Task Details</b></h2>
                                                        <button type="button" class="close" data-dismiss="modal">
                                                            <span aria-hidden="true">&times;</span>
                                                    </div>
                                                    <div class="modal-body ${status.data().name} align=" center">
                                                        <div align="center" class="form-style">
                                                            <div>Total Action Score : ${status.data().totalActionScore}</div><br>
                                                            <div>Accountability Score : ${status.data().ActionScore[0]}</div><br>
                                                            <div>Collaboration Score : ${status.data().ActionScore[1]}</div><br>
                                                            <div>Timeliness Score : ${status.data().ActionScore[2]}</div><br>
                                                            <div>Initiative Score : ${status.data().ActionScore[3]}</div><br>
                                                            <div>Objectivity Score : ${status.data().ActionScore[4]}</div><br>
                                                            <div>New Learning Score : ${status.data().ActionScore[5]}</div><br>
                                                            <div>Overall Supervisor Comments : ${status.data().overallSupervisorComments}</div>
                                                            <button type="button" class="emoji-buttons" style="font-size:40px">&#128515;</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        `;
                                    }
                                    else if(status.data().emojival == 3){
                                        html = `
                                        <div id="${status.id}" class="modal" role="dialog" tabindex="-1" aria-labelledby="exampleModalLongTitle"
                                            aria-hidden="true"
                                            style="position : fixed; margin : 0; width : auto; height : 100%; top:0; background : rgba(255,255,255,50%);">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content center-align" style="color:white;">
                                                    <div class="modal-header">
                                                        <h2 class="modal-title"><b>Task Details</b></h2>
                                                        <button type="button" class="close" data-dismiss="modal">
                                                            <span aria-hidden="true">&times;</span>
                                                    </div>
                                                    <div class="modal-body ${status.data().name} align=" center">
                                                        <div align="center" class="form-style">
                                                            <div>Total Action Score : ${status.data().totalActionScore}</div><br>
                                                            <div>Accountability Score : ${status.data().ActionScore[0]}</div><br>
                                                            <div>Collaboration Score : ${status.data().ActionScore[1]}</div><br>
                                                            <div>Timeliness Score : ${status.data().ActionScore[2]}</div><br>
                                                            <div>Initiative Score : ${status.data().ActionScore[3]}</div><br>
                                                            <div>Objectivity Score : ${status.data().ActionScore[4]}</div><br>
                                                            <div>New Learning Score : ${status.data().ActionScore[5]}</div><br>
                                                            <div>Overall Supervisor Comments : ${status.data().overallSupervisorComments}</div>
                                                            <button type="button" class="emoji-buttons" style="font-size:40px">&#128522;</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        `;
                                    }
                                    else if(status.data().emojival == 4){
                                        html = `
                                        <div id="${status.id}" class="modal" role="dialog" tabindex="-1" aria-labelledby="exampleModalLongTitle"
                                            aria-hidden="true"
                                            style="position : fixed; margin : 0; width : auto; height : 100%; top:0; background : rgba(255,255,255,50%);">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content center-align" style="color:white;">
                                                    <div class="modal-header">
                                                        <h2 class="modal-title"><b>Task Details</b></h2>
                                                        <button type="button" class="close" data-dismiss="modal">
                                                            <span aria-hidden="true">&times;</span>
                                                    </div>
                                                    <div class="modal-body ${status.data().name} align=" center">
                                                        <div align="center" class="form-style">
                                                            <div>Total Action Score : ${status.data().totalActionScore}</div><br>
                                                            <div>Accountability Score : ${status.data().ActionScore[0]}</div><br>
                                                            <div>Collaboration Score : ${status.data().ActionScore[1]}</div><br>
                                                            <div>Timeliness Score : ${status.data().ActionScore[2]}</div><br>
                                                            <div>Initiative Score : ${status.data().ActionScore[3]}</div><br>
                                                            <div>Objectivity Score : ${status.data().ActionScore[4]}</div><br>
                                                            <div>New Learning Score : ${status.data().ActionScore[5]}</div><br>
                                                            <div>Overall Supervisor Comments : ${status.data().overallSupervisorComments}</div>
                                                            <button type="button" class="emoji-buttons" style="font-size:40px">&#128528;</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        `;
                                    }
                                    else if(status.data().emojival == 5){
                                        html = `
                                        <div id="${status.id}" class="modal" role="dialog" tabindex="-1" aria-labelledby="exampleModalLongTitle"
                                            aria-hidden="true"
                                            style="position : fixed; margin : 0; width : auto; height : 100%; top:0; background : rgba(255,255,255,50%);">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content center-align" style="color:white;">
                                                    <div class="modal-header">
                                                        <h2 class="modal-title"><b>Task Details</b></h2>
                                                        <button type="button" class="close" data-dismiss="modal">
                                                            <span aria-hidden="true">&times;</span>
                                                    </div>
                                                    <div class="modal-body ${status.data().name} align=" center">
                                                        <div align="center" class="form-style">
                                                            <div>Total Action Score : ${status.data().totalActionScore}</div><br>
                                                            <div>Accountability Score : ${status.data().ActionScore[0]}</div><br>
                                                            <div>Collaboration Score : ${status.data().ActionScore[1]}</div><br>
                                                            <div>Timeliness Score : ${status.data().ActionScore[2]}</div><br>
                                                            <div>Initiative Score : ${status.data().ActionScore[3]}</div><br>
                                                            <div>Objectivity Score : ${status.data().ActionScore[4]}</div><br>
                                                            <div>New Learning Score : ${status.data().ActionScore[5]}</div><br>
                                                            <div>Overall Supervisor Comments : ${status.data().overallSupervisorComments}</div>
                                                            <button type="button" class="emoji-buttons" style="font-size:40px">&#128533;</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        `;
                                    }
                                    div2.innerHTML=html;
                                    document.body.appendChild(div2);
                                    card.appendChild(center); 
                                }
                            }
                        })
                    }); 
                
                    button1.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if(confirm("Are You Sure")){
                            center.removeChild(button1);
                            center.removeChild(button2);
                            center.innerHTML = "Task Submitted";

                            db.collection('Status').doc(task.taskId).set({
                                Completed : true
                            },{merge:true});
                        }
                    });
                    button2.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if(confirm("Are You Sure")){
                            center.removeChild(button1);
                            center.removeChild(button2);
                            center.innerHTML = "Task Rejected";
                            db.collection('Status').doc(task.taskId).set({
                                Rejected : true
                            },{merge:true});
                        }
                    });
                })
            }  
        })
    })
}

function assignsup1(superId){
    ADDTASK.addEventListener('submit',(event) => {
        event.preventDefault();
        console.log(empId);
        var name = ADDTASK.addTask.value;
        var desc = ADDTASK.taskDesc.value ;
        db.collection('employ').doc(empId).get().then((doc) => {
            if(doc.exists){

                db.collection('Status').doc().set({
                    taskName: ADDTASK.addTask.value,
                    Completed : false,
                    Rejected : false,
                    feedbackGiven : false,
                    givenToEmpId: empId,
                    givenBySup: superId,
                },{merge:true});

                db.collection("Status").onSnapshot(snapshot => {
                    let changes = snapshot.docChanges();
                    changes.forEach(change => {
                        if(change.doc.data().taskName == name && (change.doc.data().givenToEmpId==empId)){
                            db.collection('employ').doc(empId).set({
                                taskArray : firebase.firestore.FieldValue.arrayUnion({
                                    taskName: name,
                                    taskDescription: desc,
                                    taskId: change.doc.id,
                                })
                            },{merge : true});

                            db.collection('super').doc(superId).set({
                                tasksGiven : firebase.firestore.FieldValue.arrayUnion(change.doc.id)
                            },{merge : true});
                        }
                    })
                })

                ADDTASK.addTask.value = "";
                ADDTASK.taskDesc.value = "";           
            }
        })
    });
}