const notificationArea = document.querySelector('#notification-area')   
const form = document.getElementById('feedback-form');
const leftPart = document.getElementById('leftPart');
const empList = document.getElementById('empList');
const empList2 = document.getElementById('empList2');
const leaderboard = document.getElementById('leaderboard-area');
var taskId ;
function f(p){
    taskId = p;
}
var emojival;
function emoji(x){
    emojival=x;
}
var status;
$('#job').change(function() {
    var selected = $(':selected', this);
    status = selected.attr('value');
});

function assignsup(superId){
    db.collection('Status').onSnapshot(snapshot => {
        while(notificationArea.firstChild){
            notificationArea.removeChild(notificationArea.firstChild);
        }
        snapshot.docs.forEach(doc => {
            if(doc.data().givenBySup == superId){
                //add notif 
                let data = document.createElement('div');
                data.setAttribute('data-id', doc.id);
                data.setAttribute('class','long-widget-area');
                //task done, feedback done!
                if(doc.data().Completed == true && doc.data().feedbackGiven == true){
                    let b = document.createElement('b');
                    b.setAttribute('class','nf-head');
                    b.innerHTML = "Feedback Done! ";

                    span = document.createElement('div');
                    span.setAttribute('class','nf-content');
                    span.innerHTML = "You have given the feedback for task name: " + doc.data().taskName + " for employeeID: " + doc.data().givenToEmpId;

                    data.appendChild(b);
                    data.appendChild(span);
                    notificationArea.appendChild(data);

                }else if(doc.data().Completed == true && doc.data().feedbackGiven == false){
                    let data = document.createElement('div');
                    data.setAttribute('data-id', doc.id);
                    data.setAttribute('class','long-widget-area');
                    
                    let b = document.createElement('b');
                    b.setAttribute('class','nf-head');
                    b.innerHTML = "Task Completed! ";

                    span = document.createElement('div');
                    span.setAttribute('class','nf-content');
                    span.innerHTML = "Task name: "+doc.data().taskName+" has been completed be employeeId: "+doc.data().givenToEmpId+" Please provide your feedback";

                    button = document.createElement('div');

                    button.innerHTML = `<button type="submit" class="btn btn-info four-button" data-toggle="modal"
                    data-target="#myModal" id = "${doc.id}" onclick = "f('${doc.id}')">Give
                    Feedback</button>`;
                    data.appendChild(b);
                    data.appendChild(span);
                    data.appendChild(button);

                    notificationArea.appendChild(data);
                }else if(doc.data().Completed == false){
                    let b = document.createElement('b');
                    b.setAttribute('class','nf-head');
                    b.innerHTML = "Task pending to be completed! ";

                    span = document.createElement('div');
                    span.setAttribute('class','nf-content');
                    span.innerHTML = "Task name: " + doc.data().taskName + " to employeeID: " + doc.data().givenToEmpId+" has not yet been completed.";

                    data.appendChild(b);
                    data.appendChild(span);
                    notificationArea.appendChild(data);
                }
            }
        })
    })
    //LIST OF EMPLOYEES ON THE SIDE PARTITION
    db.collection('employ').onSnapshot(snapshot => {
            while(empList.firstChild){
                empList.removeChild(empList.firstChild);
            }
            while(empList2.firstChild){
                empList2.removeChild(empList2.firstChild);
            }
            var count = 0;
        snapshot.docs.forEach(doc => {
            if(doc.data().supid == superId){
                addEmp(doc,count);
                count++;
            }
        })
    })
    
    function addEmp(doc,count){
        let div = document.createElement('div');
        div.innerHTML = `<div class="centered-black">
                <div class="employee-name-heading">${doc.data().name}</div>
                <div class="designation">Designation : ${doc.data().designation} - Employee</div>
                <div class="designation">Employee id : <span id="addtaskid">${doc.id}</span></div><br>
                <button class="btn btn-info add-task four-button" data-toggle="modal" onclick="filluser(${count})" data-target="#modal-account">Add
                    Task</button><br><br><br>
            </div><br>`;
        empList.appendChild(div);
        empList2.appendChild(div);
    }
    

    //LEADERBOARD PE RANK
    db.collection('employ').orderBy('percentScore','desc').onSnapshot(snapshot => {
        while(leaderboard.firstChild){
            leaderboard.removeChild(leaderboard.firstChild);
        }
        var rank = 0;

        snapshot.docs.forEach(doc => {
            rank++;
            let data = document.createElement('div');
            data.setAttribute('data-id', doc.id);
            data.setAttribute('class','long-widget-area');

            let b = document.createElement('b');
            b.setAttribute('class','task-head');
            b.setAttribute('style','color : #E54363');
            b.innerHTML = "Rank: "+ rank;

            span = document.createElement('div');
            span.setAttribute('class','nf-content');
            span.innerHTML = `<span>Employee <b>${doc.data().name} (ID : ${doc.id})</b> with Average Percentage Score: <b>${doc.data().percentScore}</b></span>`;

            data.appendChild(b);
            data.appendChild(span);
            leaderboard.appendChild(data);
        })
    })
    form.addEventListener('submit',(event) => {
        event.preventDefault();
        var totalActionScore =  Number(form.Action.value)+
                                Number(form.aCtion.value)+
                                Number(form.acTion.value)+
                                Number(form.actIon.value)+
                                Number(form.actiOn.value)+
                                Number(form.actioN.value) ;
        var empId;
        var oldCount;
        var empname;
        db.collection('Status').doc(taskId).get().then(doc =>{
            empId = doc.data().givenToEmpId;
            db.collection('employ').doc(empId).get().then(doc =>{
                oldCount = doc.data().taskCount;
                empname = doc.data().name;
                var oldPercentScore = doc.data().percentScore;
                var newPercentScore = ((((oldPercentScore*45*oldCount)/100) + totalActionScore)/(45*(oldCount+1)))*100;
                newPercentScore = newPercentScore.toFixed(2);
                db.collection('Status').doc(taskId).set({
                    employeeName : empname,
                    actualOutcome : form.field3.value,
                    ActionScore : [
                                    form.Action.value,
                                    form.aCtion.value,
                                    form.acTion.value,
                                    form.actIon.value,
                                    form.actiOn.value,
                                    form.actioN.value
                                ],
                    totalActionScore :  totalActionScore,
                    overallSupervisorComments : form.field6.value,
                    comments : form.field7.value ,
                    feedbackGiven: true,
                    emojival: emojival,
                    statusOfGoal: status
                },{merge : true });
                
                db.collection('employ').doc(empId).set({
                    taskCount: oldCount+1,
                    percentScore: newPercentScore,
                },{merge : true});
    
            })
        })
        
    });

}
