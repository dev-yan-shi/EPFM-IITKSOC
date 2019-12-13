const notificationArea = document.getElementsByName('employ-notification')[0];
//create a different id for my task area of notification tab.
const leaderboard = document.getElementById('leaderboard-area');

function assignemp(employId){
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
            b.setAttribute('style','color : #e54363;')
            b.innerHTML = "Rank: "+ rank;

            span = document.createElement('div');
            span.setAttribute('class','nf-content');
            span.innerHTML = `<span>Employee <b>${doc.data().name} (ID : ${doc.id})</b> with Average Percentage Score: <b>${doc.data().percentScore}</b></span>`;

            data.appendChild(b);
            data.appendChild(span);
            leaderboard.appendChild(data);
        })
    })
db.collection('Status').onSnapshot(snapshot => {
    while(notificationArea.firstChild){
        notificationArea.removeChild(notificationArea.firstChild);
    }
    snapshot.docs.forEach(doc => {
        if(doc.data().givenToEmpId == employId){
            //add notif 
            let data = document.createElement('div');
            data.setAttribute('data-id', doc.id);
            data.setAttribute('class','long-widget-area');
            //task done, feedback done!
            if(doc.data().Completed == true && doc.data().feedbackGiven == true){
                
                let b = document.createElement('b');
                b.setAttribute('class','nf-head');
                b.innerHTML = "Feedback Done!";

                span = document.createElement('span');
                span.setAttribute('class','nf-content');
                span.innerHTML = "Feedback given for task name : " + doc.data().taskName + " by Supervisor with Id : " + doc.data().givenBySup;

                data.appendChild(b);
                data.appendChild(span);
                notificationArea.appendChild(data);

            }
            else if(doc.data().Completed == true && doc.data().feedbackGiven == false){
                
                let b = document.createElement('b');
                b.setAttribute('class','nf-head');
                b.innerHTML = "Task Completed! ";

                span = document.createElement('span');
                span.setAttribute('class','nf-content');
                span.innerHTML = "You Have Succesfully Completed Task With name: "+doc.data().taskName+" given by Supervisor with Id : " + doc.data().givenBySup; 

                data.appendChild(b);
                data.appendChild(span);
                notificationArea.appendChild(data);
            }
            else if(doc.data().Completed == false){
                let b = document.createElement('b');
                b.setAttribute('class','nf-head');
                b.innerHTML = "New Task Added!\n";

                span = document.createElement('span');
                span.setAttribute('class','nf-content');
                span.innerHTML = "Task name: " + doc.data().taskName + " Given by Supervisor with Id : " + doc.data().givenBySup+"\n Check it Out!.";

                data.appendChild(b);
                data.appendChild(span);
                notificationArea.appendChild(data);
            }
        }
    })
})
}