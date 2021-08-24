import * as fs from 'fs';
import * as fsPromises from 'fs/promises';

async function usingPromiseAPI(path) {
    return fsPromises.readFile(path)
        .then(data => console.log(`content of ${path}: ${data}`))
        .catch(err => console.error('Error: ', err.message));
}

function usingCallbackAPI(path, resolve) {
    fs.readFile(path, (err, data) => {
        if (err) {
            console.error('Error: ', err.message);
        } else {
            console.log(`content of ${path}: ${data}`);
        }
        resolve();
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