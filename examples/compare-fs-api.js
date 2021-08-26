import * as fs from 'fs';
import * as fsPromises from 'fs/promises';

async function usingPromiseAPI(path) {
    const promise = fsPromises.readFile(path)
        .then(data => console.log(`content of ${path}: ${data}`))
        .catch(err => console.error('Error: ', err.message));

    console.log('do something else');
    return await promise;
}

function usingCallbackAPI(path, processFile) {
    fs.readFile(path, (err, data) => {
        if (err) {
            console.error('Error: ', err.message);
        } else {
            console.log(`content of ${path}: ${data}`);
        }
        processFile();
    });
}

function usingSyncApi(path) {
    try {
        const data = fs.readFileSync(path);
        console.log(`content of ${path}: ${data}`);
    } catch (err) {
        console.log('Error: ', err.message);
    }
}

export { 
    usingCallbackAPI,
    usingPromiseAPI,
    usingSyncApi  
};