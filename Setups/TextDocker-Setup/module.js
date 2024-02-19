/*
    ? Project Module Library
    * Reponsible For Engine Work
*/

// * Field Logger Loop
function FieldLogger(fieldObject, processorObject) 
{
    for (let item = 0; item < fieldObject.length; item++) {
        fieldObject[item].innerText = processorObject[item];
    }
}



// * Document Text Reader
function FileText(curFile_Object, prev_area) 
{
    const reader = new FileReader();
    reader.readAsText(curFile_Object);
    reader.onload = () => {
        prev_area.textContent = reader.result;
    }
}



// * Document Size Finder
function FileSize(curFile_Object) 
{
    let file_size = curFile_Object.size;

    if (file_size < 1000000) return file_size = `${(file_size / 1000)}`.slice(0,5) + ' KB';
    else if (file_size <= 10000000) return file_size = `${file_size / 1000000}`.slice(0,5) + ' MB';
    else return file_size = false;
}



// * Document Type Reader
function FileType(curFile_Object) 
{
    const type_Object = { txt  : 'TEXT File'}

    let file_name = curFile_Object.name,
        type_code = file_name.split('.')[1];

    return type_Object[`${type_code}`];
}



// * Document Analyser
function FileScanner(file_Object, text_box=false) 
{
    const curFile = file_Object.files[0],
        file_name = curFile.name,
        file_size = FileSize(curFile),
        file_type = FileType(curFile);

    let paras = 1, lines = 0;
    let letters = 0, words = 0, blank;

    if (text_box) {

        letters = text_box.textContent.length;

        if (!letters) paras = 0;

        if (letters) {
            lines = text_box.textContent.split('.').length - 1;
            words = text_box.textContent.split(' ').length;
            blank = text_box.textContent.split('\n');

            for (let item of blank) if (item == '\r') paras++;
        }

        if (letters && !(text_box.textContent.includes('.'))) {
            lines = 1; paras = 1;
        }
    }
    return { curFile, file_name, file_size, file_type, letters, words, lines, paras };
}



// * Document Preview Generator
function DocFileFill(file_name, upload_area) 
{
    const element = document.createElement('div');
    element.classList.add('doc_prev');

    element.innerHTML = `<i class="bi bi-file-earmark-text-fill"></i>
                        <span>${file_name}</span>
                        <i class="bi bi-trash3-fill" onclick="DelFile(this)"></i>`;

    (upload_area.children.length == 2) ? upload_area.children[1].replaceWith(element) : upload_area.appendChild(element);
}