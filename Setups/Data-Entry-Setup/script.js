/*
    ? Data Entry | JS Engine File
    * Responsible for Functional Behaviour behind the Scenes
*/

// * Variable Creation
import * as mod from './module.js';
const insert = document.getElementById('add_data'),
      close = document.getElementById('close');

const databox = document.getElementById('entrys'),
      profile = document.getElementById('picture_prev');

const user_name = document.getElementById('name'),
      user_addr = document.getElementById('addr'),
      user_age = document.getElementById('age'),
      user_phone = document.getElementById('call'),
      user_email = document.getElementById('email');

let fill_pic = document.getElementById('fill_pic');



// * Data Preview Panel Controls
databox.addEventListener('click', (e) => {
    if (e.target.id == 'entry') {

        // * Updating Values
        e.target.oninput = () => {
            const token = e.target.parentElement.getAttribute('data-token'),
                  local = JSON.parse(localStorage.getItem(token)),
                  currItem = e.target.name;
                  
            local[currItem] = e.target.value;
            localStorage.setItem(token,JSON.stringify(local));
        }

        // * Key Functions
        e.target.onkeydown = (k) => {
            if (k.key == 'Enter') {
                const token = e.target.parentElement.getAttribute('data-token'),
                      local = JSON.parse(localStorage.getItem(token));
                document.getElementById('user_pic').src = local.pic;
                mod.ShowOffP(profile);
            }

            if (k.key == 'Delete') {
                mod.DelData(e.target);
                mod.ReCount(databox);
            }
        }
    }
}, false)



// * Some Buttons AddOns
close.onclick = () => mod.ShowOffP(profile);
fill_pic.onchange = () => {
    const reader = new FileReader();
    reader.readAsDataURL(fill_pic.files[0]);
    reader.onload = () => fill_pic.nextElementSibling.src = reader.result;
}



// * Add Button AddOn
insert.onclick = () => {
    let user_data = [user_name,user_email,user_phone,user_age,user_addr,fill_pic],
        reset_data = user_data, check = 0, token, item, data_values;

    // * Check filled values
    for (item of user_data) {
        if (!item.value == '') check+=1;
    }

    // * Confirm Form filling
    if (check == user_data.length) {
        data_values = {
            name : user_data[0].value,
            email : user_data[1].value,
            phone : user_data[2].value,
            addr : user_data[4].value,
            age : user_data[3].value,
        }

        // * Data Validation
        user_data = mod.GetForm(data_values);
        if (user_data) {

            // * Read Image URL
            const reader = new FileReader();
            reader.readAsDataURL(fill_pic.files[0]);
            reader.onload = () => {
                user_data.pic = reader.result;
                token = user_data.token;
                // * Storing to Local Server
                localStorage.setItem(token,JSON.stringify(user_data));
            }

            // * Manage cells in UI
            mod.AddData(databox,user_data);
            mod.ReCount(databox);

            // * Reseting values
            for (item of reset_data) item.value = '';
            fill_pic.nextElementSibling.src = "./Media/user.png";
        }
        else new Audio("./Media/error.mp3").play();
    }
    else new Audio("./Media/error.mp3").play();
}



// * Storage Facthing from Local Server
window.onload = function(){
    mod.FetchStorage(databox);
    mod.ReCount(databox);
}