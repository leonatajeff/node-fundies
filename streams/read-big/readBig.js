const fs = require("node:fs/promises");

(async () => {
  const fileHandleRead = await fs.open("iliad.txt", "r");
  const fileHandleWrite = await fs.open("dest.txt", "w");

  const streamRead = fileHandleRead.createReadStream({
    highWaterMark: 64 * 1024,
  });
  const streamWrite = fileHandleWrite.createWriteStream();

  streamRead.on("data", (chunk) => {
    const words = chunk.toString("utf-8").split(" ");
    console.log(words);

    if (!streamWrite.write(chunk)) {
      streamRead.pause();
    }
  });
})();
