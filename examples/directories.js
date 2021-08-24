import * as fsPromise from 'fs/promises';

async function openDirectory(directoryURL) {
    try {
        //TODO
        const dir = await fsPromise.openDir(directoryURL, 'r');
    } catch (err) {
        console.error('Error: ', err.message);
    }
}

async function readDirectory(directoryURL) {
    try {
        //TODO
        const dir = await fsPromise.readDir(directoryURL, 'r');
    } catch (err) {
        console.error('Error: ', err.message);
    }
}


async function createDirectory(path) {
    let fileHandle;
    try {
        //TODO
        //fsPromise.mkdir(path)
        //fsPromise.mkdtemp(path) to create unique temp directory
    } catch (err) {
        console.error('Error: ', err.message);
    } finally {
        fileHandle?.close();
    }
}

async function renameDirectory(oldPath, newPath) {
    try {
        //TODO
        // can be used to rename directories and files
        await fsPromise.rename(oldPath, newPath);
    } catch (err) {
        console.error('Error: ', err.message);
    }
}

async function removeDirectory(path) {
    try {
        //TODO
        await fsPromise.rmdir(path);
        await fsPromise.rmdir(path, { recursive: true, force: true }); // simulate rm -rf
    } catch (err) {
        console.error('Error: ', err.message);
    }
}

async function removeFileOrDirectory(path) {
    try {
        //TODO
        await fsPromise.rm(path);
        await fsPromise.rm(path, { recursive: true, force: true }); // simulate rm -rf
    } catch (err) {
        console.error('Error: ', err.message);
    }
}


export { 
    openDirectory,
    readDirectory,
    createDirectory,
    renameDirectory,
    removeDirectory,
    removeFileOrDirectory
};