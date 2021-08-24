# Comprehensive Guide to File Processing in Node

Blog structure:

1. Intro - all examples demonstrated in Linux, some differences with windows (see later)
1. 3 ways to work with files (compare-fs-apis.js) - readFile examplese for promise, callback and sync APIs
1. Files (files.js) - open, readFile, copyFile, appendFile, writeFile, truncate, watch
1. File Metadata (file-metadata.js) - file size, stats, timestamp, real path
1. Links (links.js) -
1. Directories (directories.js) - 
1. Handling different OSes - chmod, chown, file access
1. Using streams to process files - createReadStream, createWriteStream

All API demo sections structured like this:

* first row is description of what we are doing
* second row is code sample:
    * full example using promise API
    * comments indicating equivalent callback and sync API if applicable
* third column is file/folder state screenshot before and after code execution

## About Examples

* sample example execution: `./create-data.sh && sleep 2 && node index.js`
* generate test files with the `create-data.sh` script
* run `node index.js` to execute all examples
* solution is built as Node ES6 modules
* assuming running on a Linux system (some functions don't apply on windows)


## Using the built-in Node FS module

The FS module allows interacting with the file system in a way modeled on POSIX functions. POSIX is a set of computing standards that includes a standard file system definition to ensure file system operations are portable between operating systems. 

(Reference: https://parallelstorage.com/2017/12/29/posix-file-system-basics/)

Despite being based on POSIX standards, there are still nuances to working with files and directories between operating systems like Windows and Linux. A little later on, we will take a look at some examples of what happens when you use a function that doesn't apply to the operating system it is being executed from.

### Traditional File Processing

Traditional file processing refers to CRUD operations on a file where the file is loaded into memory in its entirety.

The FS module exposes a few different APIs to work with files:

1. Promise-based API: `import * as fs from 'fs/promises';`
1. Callback-based APIs: `import * as fs from 'fs';`
1. Synchronous APIs: `import * as fs from 'fs;`

#### Promise-based API

* introduced with Node 10 (experimental with 10.0.0, stable with 10.17.0 LTS in Oct 2019)
* not threadsafe (be careful when modifying the same file multiple times concurrently)
* some functions can be initiated directly from a FileHandle while others are only available as standalone functions in the fsPromises sub-module (ex. write)
* truncate() function can be used to trim the file to a specific size or extend it (fills remaining space with '\0')
* appendFile() accepts a file path or an existing FileHandle object
* chown() requires Node to be run as a privleged process (i.e. sudo)
* chown(), chmod() and access() exhibit differnet behaviours when run on Windows vs. Linux

#### Callback-based API

* preferred over promse-based API when maximum performance (execution time and memory) is required


#### Synchronous APIs

* block the event look (avoid!)
* methods typically contain the word "Sync"


### Using streams to process files

* good for dealing with large files without the memory implications of loading the entire files contents into memory
* `createReadStream` and `createWriteStream`