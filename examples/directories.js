import * as fsPromises from 'fs/promises';

async function openDirectory(path) {
    try {
        const dir = await fsPromises.opendir(path);
        console.log(`opened directory ${dir.path}`);
    } catch (err) {
        console.error(err.message);
    }
}

async function readDirectory(path) {
    try {
        const dirContents = await fsPromises.readdir(path);
        console.log(`read contents of directory ${path}: ${dirContents}`);
    } catch (err) {
        console.error(err.message);
    }
}

async function readDirectoryWithFileTypes(path) {
    try {
        const dirContents = await fsPromises.readdir(path, { withFileTypes: true });
        console.log(`read contents of directory ${path}:`);
        console.log(dirContents);
    } catch (err) {
        console.error(err.message);
    }
}

async function createDirectory(path) {
    try {
        await fsPromises.mkdir(path);
        console.log(`created directory: ${path}`);
    } catch (err) {
        console.error(err.message);
    }
}

async function createDirectoryRecursively(path) {
    try {
        const firstDir = await fsPromises.mkdir(path, { recursive: true});
        console.log(`created directory recursively: ${path}, first directory created was: ${firstDir}`);
    } catch (err) {
        console.error(err.message);
    }
}

async function renameDirectory(oldPath, newPath) {
    try {
        await fsPromises.rename(oldPath, newPath);
        console.log(`renamed ${oldPath} to ${newPath}`);
    } catch (err) {
        console.error(err.message);
    }
}

async function removeDirectory(path) {
    try {
        await fsPromises.rmdir(path);
        console.log(`removed ${path}`);
    } catch (err) {
        console.error(err.message);
    }
}

async function removeDirectoryRecursively(path) {
    try {
        await fsPromises.rmdir(path, { recursive: true });
        console.log(`removed ${path} recursively`)
    } catch (err) {
        console.error(err.message);
    }
}

async function removeDirectoryRecursivelyWithoutWarning(path) {
    try {
        await fsPromises.rm(path, { recursive: true, force: true });
        console.log(`removed ${path} recursively and forcefully`)
    } catch (err) {
        console.error(err.message);
    }
}

export { 
    openDirectory,
    readDirectory,
    readDirectoryWithFileTypes,
    createDirectory,
    createDirectoryRecursively,
    renameDirectory,
    removeDirectory,
    removeDirectoryRecursively,
    removeDirectoryRecursivelyWithoutWarning
};