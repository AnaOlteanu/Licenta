function usersTable(users){

    var tableContainer = document.getElementById('table-container');
    var table = document.createElement('table');
    table.classList.add("table");
    var thead = document.createElement('thead');
    var trThead = document.createElement('tr');

    for(let i = 0; i < 4; i++){
        var thThead = document.createElement('th');
        thThead.setAttribute('scope', 'col');
        if(i == 0) thThead.innerHTML = '#';
        if(i == 1) thThead.innerHTML = 'Username';
        if(i == 2) thThead.innerHTML = 'Warn user';
        if(i == 3) thThead.innerHTML = 'Delete user';
        trThead.appendChild(thThead);
    }

    thead.appendChild(trThead);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');
    

    for(let i = 0; i < users.length; i++){
        var tr = document.createElement('tr');
        tr.setAttribute('id', 'row' + `${i}`);

        var th = document.createElement('th');
        th.setAttribute('scope', 'row');
        var nr = i + 1;
        th.innerHTML = `${nr}`;

        var td_user = document.createElement('td');
        var username = users[i];
        td_user.innerHTML = `${username}`;

        var row_no = i;
        var td_warn = document.createElement('td');
        td_warn.setAttribute('id', `warn-${row_no}`)
        td_warn.innerHTML = `<button id="warn-button-${row_no}" class="btn btn-outline-success" onclick="warnUser('${username}','${row_no}')">Warn</button>`;

        var td_delete = document.createElement('td');
        td_delete.setAttribute('id', `delete-${row_no}`);
        
        td_delete.innerHTML = `<button id="delete-button-${row_no}" class="btn btn-outline-danger" onclick="deleteUser('${username}', '${row_no}')">Delete</button>`;
        

        tr.appendChild(th);
        tr.appendChild(td_user);
        tr.appendChild(td_warn);
        tr.appendChild(td_delete);

        tbody.appendChild(tr);
    }
 
    table.appendChild(tbody);
    tableContainer.appendChild(table)
    
}

function warnUser(username, nr){

    fetch('/admins/warnUser?username=' + username).then(res => res.json()).then(data =>{
        if(data.status == 'success'){
            var id = 'warn-button-' + nr;
            console.log(id);
            const warnButton = document.getElementById(id);
            warnButton.style.display = 'none';
            id = 'warn-' + nr; 
            const warn = document.getElementById(id);
            const message = document.createElement('div');
            message.innerHTML = 'Warn email sent!';
            warn.appendChild(message);

        }
     })
}

function deleteUser(username, nr){


    if (confirm("Do you really want to delete the user " + username + "?")) {
        txt = "yes";
      } else {
        txt = "no";
      }

      if(txt == 'yes'){
        fetch('/admins/deleteUser', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({ 
                username: username
            })
        }).then(res => res.json()).then(data =>{
            if(data.status == 'success'){
                var table = document.getElementsByClassName('table');
                document.getElementById("row" + nr + "").outerHTML = "";
            }
            
        })
      }

}

function setQuote(){
    var quote = document.getElementById('quote-text').value;
    document.getElementById('quote-text').value = "";
    fetch('/admins/setQuote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ 
            admin_id: admin_id,
            quote: quote
        })
    })
      
}