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
        var th = document.createElement('th');
        th.setAttribute('scope', 'row');
        var nr = i + 1;
        th.innerHTML = `${nr}`;
        var td_user = document.createElement('td');
        var username = users[i];
        td_user.innerHTML = `${username}`;
        var td_delete = document.createElement('td');
        td_delete.innerHTML = `<button class="btn btn-outline-success" onclick="deleteUser(${username})">Delete</button>`;
        tr.appendChild(th);
        tr.appendChild(td_user);
        tr.appendChild(td_delete);
        tbody.appendChild(tr);
    }


    
    table.appendChild(tbody);
    tableContainer.appendChild(table)
    
}