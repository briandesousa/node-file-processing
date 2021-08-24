import * as fsPromises from 'fs/promises';

async function createHardLink(existingPath, newPath) {
    try {
        await fsPromises.link(existingPath, newPath);
        console.log(`created a hard link at '${newPath}' linked to ${existingPath}`);
    } catch (err) {
        console.error(err.message);
    }
}

async function createSoftLink(targetPath, path) {
    try {
        await fsPromises.symlink(targetPath, path);
        console.log(`created a soft (symbolic) link at ${path} pointing to ${targetPath}`);
    } catch (err) {
        console.error(err.message);
    }
}

async function readSoftLink(path) {
    try {
        const linkString = await fsPromises.readlink(path);
        console.log(`symbolic link ${path} points to ${linkString}`);
    } catch (err) {
        console.error(err.message);
    }
}

async function updateSoftLinkTimestamp(path, accessTime, modifyTime) {
    try {
        let {atimeMs: originalAccessTime, mtimeMs: originalModifiedTime} = await fsPromises.lstat(path);
        console.log(`access time for ${path} before update: ${new Date(originalAccessTime)}`);
        console.log(`modify time for ${path} before update: ${new Date(originalModifiedTime)}`);

        await fsPromises.lutimes(path, accessTime, modifyTime);
        console.log(`updated access and modified timestamp on ${path} to ${accessTime} and ${modifyTime} respectively`);
    } catch (err) {
        console.error(err.message);
    }
}

async function updateLinkPermissions(path, mode) {
    try {
        console.log(`set ${mode} permissions on ${path}`);
        await fsPromises.lchmod(path, mode);
        const stat = await fsPromises.stat(path);
        const modeAsDecimal = parseInt(stat.mode.toString(8), 10);
        console.log(`mode for ${path}: ${modeAsDecimal}`);
    } catch (err) {
        // expect 'The lchmod() method is not implemented'error
        // POSIX doesn't require a lchmod function and Linux doesn't include one
        console.error(err.message);
    }
}

async function updateLinkOwner(path, uid, gid) {
    try {
        await fsPromises.lchown(path, uid, gid);
        console.log(`changed ownership of ${path}, uid = ${uid}, gid =${gid})`);
    } catch (err) {
        console.error(err.message);
    }
}

async function removeLink(path) {
    try {
        await fsPromises.unlink(path);
        console.log(`removed ${path}`);
    } catch (err) {
        console.error(err.message);
    }
}

export {
    createHardLink,
    createSoftLink,
    readSoftLink,
    updateSoftLinkTimestamp,
    updateLinkOwner,
    updateLinkPermissions,
    removeLink
};