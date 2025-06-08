const fs = require("fs/promises");


(async () => {
  const createFile = async (filePath) => {
    try {
      await fs.writeFile(filePath, "", { flag: "wx"});
    } catch (error) {
      console.log(`Failed to create: File ${filePath} already exists`)
    }
  }

  const deleteFile = async (filePath) => {
    try {
      await fs.rm(filePath);
    } catch (error) {
      console.log(`Failed to delete: File ${filePath} does not exist`);
    }
  }

  const renameFile = async (oldPath, newPath) => {
    try {
      await fs.rename(oldPath, newPath);
    } catch (e) {
      console.log(`Failed to rename: File ${newPath} exists elsewhere `);
    }
  }

  const addToFile = async (path, content) => {
    try {
      console.log(`this is the path from addToFile ${path}`)
      await fs.appendFile(path, content + "\n");
    } catch (e) {
      console.log(`Failed to add to file ${path} `);
    }
  }
  
  const CREATE_FILE = "create a file"
  const DELETE_FILE = "delete a file"
  const RENAME_FILE = "rename the file"
  const ADD_TO_FILE = "add to the file"

  const commandFileHandler = await fs.open("./command.txt", "r")
  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      const size = (await commandFileHandler.stat()).size;
      const buff = Buffer.alloc(size);
      const offset = 0;
      const length = buff.byteLength;
      const position = 0;

      await commandFileHandler.read(buff, offset, length, position);

      const command = buff.toString("utf-8");
      

      // create a file:
      // create a file <path>

      if (command.includes(CREATE_FILE)) {
        const filePath = command.substring(CREATE_FILE.length + 1);
        await createFile(filePath);
      }

      if (command.includes(DELETE_FILE)) {
        const filePath = command.substring(DELETE_FILE.length + 1);
        await deleteFile(filePath);
      }

      if (command.includes(RENAME_FILE)) {
        // rename the file <path> to <new-path>
        const _idx = command.indexOf(" to "); // gets the first index of " to "
        const filePath = command.substring(RENAME_FILE.length + 1, _idx);
        const newFilePath = command.substring(_idx + 4)
        await renameFile(filePath, newFilePath);
      }

      if (command.includes(ADD_TO_FILE)) {
        // add to the file <path> this content: <content>
        const _idx = command.indexOf(" this content: ")
        const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
        const newContent = command.substring(_idx + " this content: ".length);
      console.log(`this is the path from addToFile ${filePath}`)

        await addToFile(filePath, newContent);
      }
    }
  }
})();
