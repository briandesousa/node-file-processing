import * as fs from 'fs';
import * as fsPromises from 'fs/promises';

async function openFile(path, flag) {
    let fileHandle;
    try {
        fileHandle = await fsPromises.open(path, flag);
        console.log(`opened ${path}, file descriptor is ${fileHandle.fd}`);
    } catch (err) {
        console.error(err.message);
    } finally {
        fileHandle?.close();
    }
}

async function readFile(path) {
    try {
        const data = await fsPromises.readFile(path);
        console.log(`content of ${path}: ${data}`);
    } catch (err) {
        console.error(err.message);
    }
}

async function readFileCreateFirst(path) {
    try {
        const data = await fsPromises.readFile(path, { flag: 'w'});
        console.log(`content of ${path}: ${data}`);
    } catch (err) {
        console.error(err.message);
    }
}

async function readFileAsBase64(path) {
    try {
        const data = await fsPromises.readFile(path, { encoding: 'base64' });
        const stringBuffer = Buffer.from(data, 'base64');
        console.log(`content of ${path}: ${data}`);
        console.log(`convert base64 file content back to an ASCII string: ${stringBuffer}`);
    } catch (err) {
        console.error(err.message);
    }
}

async function readFileAbort(path) {
    try {
        const controller = new AbortController();
        const { signal } = controller;
        const promise = fsPromises.readFile(path, { flag: 'r', signal: signal });
        console.log(`started reading file: ${path}`);
        controller.abort();      
        await promise;
    } catch (err) {
        console.error(err.message);
    }
}

async function copyFile(src, dest) {
    try {
        await fsPromises.copyFile(src, dest);
        console.log(`file copied from ${src} to ${dest}`);
    } catch (err) {
        console.error(err.message);
    }
}

async function copyFileExcl(src, dest) {
    try {
        await fsPromises.copyFile(src, dest, fs.constants.COPYFILE_EXCL)
        console.log(`file copied from ${src} to ${dest}`);
    } catch (err) {
        console.error(err.message);
    }
}

async function appendFile(path, data) {
    try {
        try {
            const existingData = await fsPromises.readFile(path);
            console.log(`file content before appending new data: ${existingData}`);
        } catch (err) {
            console.error(err.message);
        }
        await fsPromises.appendFile(path, data);
        const updatedData = await fsPromises.readFile(path);
        console.log(`updated file content after appending new data: ${updatedData}`);
    } catch (err) {
        console.error(err.message);
    }
}

async function writeFile(path, data) {
    try {
        await fsPromises.writeFile(path, data);
        console.log(`'${data}' written to ${path}`);
    } catch (err) {
        console.error(err.message);
    } 
}

async function writeFileOverwrite(path, data) {
    try {
        let fileContent = await fsPromises.readFile(path)
        console.log(`content of ${path} before write: ${fileContent}`);

        await fsPromises.writeFile(path, data);
        console.log(`'${data}' written to ${path}`);

        fileContent = await fsPromises.readFile(path)
        console.log(`content of ${path} after write: ${fileContent}`);
    } catch (err) {
        console.error(err.message);
    } 
}

async function truncateFile(path, length) {
    try {
        let fileContent = await fsPromises.readFile(path)
        console.log(`content of ${path} before truncate: ${fileContent}`);

        await fsPromises.truncate(path, length);
        console.log(`everything after first ${length} characters truncated from ${path}`);

        fileContent = await fsPromises.readFile(path)
        console.log(`content of ${path} after truncate: ${fileContent}`);
    } catch (err) {
        console.error(err.message);
    } 
}

async function watchFile(path, timeToWatch) {
    try {
        const abortController = new AbortController();
        const { signal } = abortController;
        setTimeout(() => abortController.abort(), timeToWatch);

        const watchEventAsyncIterator = fsPromises.watch(path, { signal });

        console.log('delete the watched file to trigger a watch event');
        setTimeout(() => fs.unlinkSync(path), 1000);

        for await (const event of watchEventAsyncIterator) {
            console.log(`'${event.eventType}' watch event was raised for ${event.filename}`);
        }
    } catch (err) {
        // abort signal is treated as an exception
        if (err.name === 'AbortError') {
            console.log(`watch on ${path} aborted`);
            return;
        }
        console.error(err.message);
    }
}

export { 
    openFile,
    readFile,
    readFileCreateFirst,
    readFileAsBase64,
    readFileAbort,
    copyFile,
    copyFileExcl,
    appendFile,
    writeFile,
    writeFileOverwrite,
    truncateFile,
    watchFile
}