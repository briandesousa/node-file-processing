import * as fsPromises from 'fs/promises';

async function createLink(path, linkName) {
    try {
        await fsPromises.createLink(path, linkName);
        console.log(`created a hard link named '${linkName}' linked to ${path}`);
    } catch (err) {
        console.error(err.message);
    }
}

async function createSymbolicLink(targetPath, path) {
    try {
        await fsPromises.symlink(targetPath, path);
        console.log(`created a soft (symbolic) link from ${targetPath} to ${path}`);
    } catch (err) {
        console.error(err.message);
    }
}

async function readLink(fileURL) {
    try {
        //TODO
        // read a soft and/or hard link?
        linkString = await fsPromises.readLink(fileURL, 'r');
    } catch (err) {
        console.error('Error: ', err.message);
    }
}

async function updateLinkTimestamp(fileURL) {
    try {
        //TODO
        // update hard and/or soft link timestamp?
        //fileHandle.lutimes()
    } catch (err) {
        console.error('Error: ', err.message);
    }
}

async function updateLinkOwnership(fileURL) {
    try {
        //TODO
        // update hard and/or soft link timestamp?
        //fsPromises.lchown()
    } catch (err) {
        console.error('Error: ', err.message);
    }
}

async function updateLinkPermissions(fileURL) {
    try {
        //TODO
        // update hard and/or soft link permissions?
        //fsPromise.lchmod()
    } catch (err) {
        console.error('Error: ', err.message);
    }
}

async function removeLink(target, path) {
    try {
        //TODO
        //fsPromises.unlink(target, path)
    } catch (err) {
        console.error('Error: ', err.message);
    }
}

export {
    createLink,
    createSymbolicLink,
    readLink,
    updateLinkTimestamp,
    updateLinkOwnership,
    updateLinkPermissions,
    removeLink
};