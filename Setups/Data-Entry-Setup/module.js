/*
    ? Data Entry | JS Module File
    * Responsible for all the Functions granted to Script File
*/

// * Token API
function MyToken() {
    return Math.floor(Math.random()*10);
}



// * Re-Count API
function ReCount(item_set) 
{
    let count = 1;
    const data_array = Array.from(item_set.children);
    for (let item of data_array) item.children[0].value = count++;
}



// * Delete Data Entry Button
function DelData(target) 
{
    const tokenID = target.parentElement.getAttribute('data-token');
    localStorage.removeItem(tokenID);
    target.parentElement.remove();
}



// * Show / Off Profile Button
function ShowOffP(target) 
{
    target.classList.toggle('hide');
}



// * Data Validation API
function GetForm(data_set) 
{
    const Validator = [
        "^[a-zA-Z]+( [a-zA-Z]+){1}(( [a-zA-Z]+)?)$",
        "^[a-z]+[.+_-]?[a-z0-9]+(@gmail.com)$",
        "^[+]{1}[0-9]{1,2}( )?[0-9]{10}$",
        "^[0-9]{1,2}$",
        "^(([a-zA-Z,.]+( )*)+)$",
    ]

    if (data_set.name.match(Validator[0]) && data_set.email.match(Validator[1]) && data_set.phone.match(Validator[2]) && data_set.age.match(Validator[3]) && data_set.addr.match(Validator[4])) {
        return {
            token : `de_${MyToken()}${MyToken()}${MyToken()}`,
            name : data_set.name,
            phone : data_set.phone,
            email : data_set.email,
            addr : data_set.addr,
            age : data_set.age,
        }
    } else false;
}



// * Data Entry Generator API
function AddData(prev_area,data) 
{
    const newEntry = document.createElement('div');
    newEntry.setAttribute('data-token',data.token);
    newEntry.innerHTML =   `<input autocomplete="off" type="text" name="s_no" id="entry" class="entry">
                            <input autocomplete="off" type="text" name="name" value="${data.name}" id="entry" class="entry">
                            <input autocomplete="off" type="text" name="email" value="${data.email}" id="entry" class="entry">
                            <input autocomplete="off" type="text" name="phone" value="${data.phone}" id="entry" class="entry">
                            <input autocomplete="off" type="text" name="age" value="${data.age}" id="entry" class="entry">
                            <input autocomplete="off" type="text" name="addr" value="${data.addr}" id="entry" class="entry">`;
    
    newEntry.setAttribute('id','wrapper');
    newEntry.setAttribute('class','wrapper');
    prev_area.appendChild(newEntry);
}



// * Storage Fetcher API
function FetchStorage(prev_sec) 
{
    let all_data = Object.keys(localStorage);
    for (let item of all_data) {

        if (item.includes('de_')) {
            all_data = JSON.parse(localStorage.getItem(item));
            all_data['token'] = item;
            AddData(prev_sec,all_data);
        }
    }
}


// Exporting all Modules
export { ReCount,DelData,ShowOffP,FetchStorage,GetForm,AddData };