const accountDetails = document.querySelector('.account-details');
const supname = document.getElementById('showSupName');
const supname2 = document.getElementById('showSupName2');
const perc = document.getElementsByClassName('percentage');

function disp(data1,userid,bool){
    if(userid){
        //acount info
        db.collection(data1).doc(userid).get().then(doc => {
            var html;
            if(bool){
                supname.innerHTML=doc.data().name;
                supname2.innerHTML=doc.data().name;
                html =`
                    <div>Hi ${doc.data().name}</div>
                    <div>Logged in as ${doc.data().mail}</div>
                    <div>Designation: ${doc.data().designation}</div>
                    <div>Supervisor: ${doc.data().sup}</div>
                `;
            }
            else{
                supname.innerHTML=doc.data().name;
                supname2.innerHTML=doc.data().name;
                html =`
                    <div>Hi ${doc.data().name}</div>
                    <div>Logged in as ${doc.data().mail}</div>
                    <div>Designation: ${doc.data().designation}</div>
                `;
            }
            if(perc[0]){
            perc[0].innerHTML= doc.data().percentScore + "%";
            perc[1].innerHTML= doc.data().percentScore + "%";
            }
            accountDetails.innerHTML = html;
        }).catch(err => {
            console.log(err.message);
        })
    }
    else{
        accountDetails.innerHTML = '';
    }
}