const fs = require("node:fs/promises");

(async () => {
  console.time("writeMany");
  const fileHandle = await fs.open("test.txt", "w");
  const stream = fileHandle.createWriteStream();
  console.log(stream.writableHighWaterMark);

  /*   for (let i = 0; i < 1000000; i++) {
      const buff = Buffer.from(` ${i} `, "utf-8");
      stream.write(buff)
    } */
  //console.timeEnd("writeMany");

/*   stream.on("drain", () => {
    console.log("We are safe to write more");
  }) */

    let i = 0;
    let maxI = 1000000;
    const writeMany = () => {
      while (i < maxI) {
        const buff = Buffer.from(` ${i} `, "utf-8");
        if (i === maxI - 1) {
          return stream.end(buff)
        }
        i++;
        if (!stream.write(buff)) break;
      }
    };

    writeMany();

    stream.on("drain", () => {
      writeMany();
    })

    stream.on("finish", () => {
      fileHandle.close()
      console.timeEnd("writeMany");
    })


})();
