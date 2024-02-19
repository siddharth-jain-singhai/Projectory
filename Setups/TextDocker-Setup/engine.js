/*
    ? Project TextDocker Engine
    * JavaScript Based Environment
*/

// * Variables Declarations
const fileInput = document.getElementById('FileInp'),
    uploader = document.getElementById('uploader'),
    processor = document.getElementById('process'),
    textArea = document.getElementById('textarea'),
    speakBtn = document.getElementById('speakBtn'),
    speech_cmd = window.speechSynthesis;

const fieldSet1 = document.querySelectorAll(".detailSet-1 span.answer"),
    fieldSet2 = document.querySelectorAll(".detailSet-2 span.answer"),
    processorObjectReset = ['', '', '', ''];



// * Clickable File-Input
fileInput.addEventListener('change', ({ target }) => {
    try{
        let file = FileScanner(target),
        fileName = file.file_name;

        if ((file.file_type == 'TEXT File') && file.file_size) {
            DocFileFill(fileName, uploader);
            FileText(file.curFile, textArea);
            StopAndReset();
        }
        else alert("Please, try .txt files upto 10 MB");
    }
    catch (e) { 
        StopAndReset();
        textArea.textContent = '';
        if (uploader.children.length == 2) uploader.lastElementChild.remove();
    }
})



// * Drag & Drop File Input
uploader.ondragover = e => e.preventDefault();
uploader.ondrop = e => {
    e.preventDefault();
    fileInput.files = e.dataTransfer.files;

    let file = FileScanner(fileInput),
        fileName = file.file_name;

    if ((file.file_type == 'TEXT File') && file.file_size) {
        DocFileFill(fileName, uploader);
        FileText(file.curFile, textArea);
        StopAndReset();
    }
    else alert("Please, try .txt files upto 10 MB");
}



// * Document Processor
processor.addEventListener('click', () => {

    if (fileInput.files.length > 0) {
        const file = FileScanner(fileInput, textArea);

        let processorObject1 = [
            file.file_name,
            file.file_size,
            file.file_type,
        ]

        let processorObject2 = [
            file.paras,
            file.lines,
            file.words,
            file.letters,
        ]

        if ((file.file_type == 'TEXT File') && file.file_size) {
            FieldLogger(fieldSet1, processorObject1);
            FieldLogger(fieldSet2, processorObject2);
        }
        else alert("Please, upload .txt file to process!");
    }
    else alert("Please, upload .txt file to process!");
})



// * File Content Reader
speakBtn.addEventListener('click', () => {

    if (fileInput.files[0]) {

        const file = FileScanner(fileInput, textArea);
        if ((file.file_type == 'TEXT File') && file.file_size) {

            if (textArea.textContent.length > 0) {
                (speech_cmd.speaking) ? SpeechStopper() : Speak(textArea.textContent);
            }
            else Speak("This File is Empty!");
        }
        else alert("Please, upload a text file . . .");
    }
    else alert("Please, upload a text file . . .");
})



// * Speech Stopper
function SpeechStopper() {
    speech_cmd.pause();
    speech_cmd.cancel();
}



// * Speech Bot
function Speak(any_text) {
    const speechText = new SpeechSynthesisUtterance(any_text);
    speechText.pitch = 2;
    speechText.rate = 1;
    speech_cmd.speak(speechText);
}



// * Stoppers & Reseters
function StopAndReset() {
    FieldLogger(fieldSet1, processorObjectReset);
    FieldLogger(fieldSet2, processorObjectReset);
    SpeechStopper();
}


// ? Window Load Event Programs
// * This Prevents error on Refresh Page or On load Page
window.onload = StopAndReset();