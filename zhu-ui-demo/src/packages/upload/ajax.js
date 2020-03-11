export default function httpRequest(option){
    const xhr = new XMLHttpRequest();
    const action = option.action;
    xhr.upload.onprogress = function (e) {
        if(e.total> 0){
            e.percent = e.loaded / e.total  * 100
        }
        option.onProgress(e);
    }
    const formData = new FormData();
    formData.append(option.filename,option.file);

    xhr.onerror = function (err) {
        option.onError(err);
    }
    xhr.onload = function () {
        let text = xhr.responseText || xhr.response;
        option.onSuccess(JSON.parse(text));
    }

    xhr.open('post',action,true);
    xhr.send(formData);
    return xhr;
}