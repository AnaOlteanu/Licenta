function usersTable(users){

    var tableContainer = document.getElementById('table-container');
    var table = document.createElement('table');
    table.classList.add("table");
    var thead = document.createElement('thead');
    var trThead = document.createElement('tr');

    for(let i = 0; i < 3; i++){
        var thThead = document.createElement('th');
        thThead.setAttribute('scope', 'col');
        if(i == 0) thThead.innerHTML = '#';
        if(i == 1) thThead.innerHTML = 'Username';
        if(i == 2) thThead.innerHTML = 'Delete';
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
        var td_delete = document.createElement('td');

        var row_no = i;
        td_delete.innerHTML = `<button class="btn btn-outline-success" onclick="deleteUser('${username}', '${row_no}')">Delete</button>`;
        tr.appendChild(th);
        tr.appendChild(td_user);
        tr.appendChild(td_delete);
        tbody.appendChild(tr);
    }
 
    table.appendChild(tbody);
    tableContainer.appendChild(table)
    
}

function deleteUser(username, nr){

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

function setQuote(){
    var quote = document.getElementById('quote-text').value;
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