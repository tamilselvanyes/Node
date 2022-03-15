// function sum() {
//   let sum = 0;
//   for (let i = 2; i < process.argv.length; i++) {
//     sum = sum + +process.argv[i];
//   }
//   return sum;
// }
// console.log(sum());

// const os = require("os");
// console.log("Free memory" + os.freemem() / 1024 / 1024 / 1024);
// console.log("Total memory" + os.totalmem() / 1024 / 1024 / 1024);
// console.log("OS version" + os.version());
// console.log("CPU " + os.cpus());

const fs = require("fs");
// const quote = "This is my file creation working";
// const quote_2 = "Happy Women's Day";
// const number_of_files = process.argv[2];

// for (let i = 0; i < number_of_files; i++) {
//   fs.writeFile(`./backup/textTest-${i + 1}.html`, quote, (err) =>
//     console.log("Complete writing")
//   );
// }

// fs.readFile("./quote.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// const quotes = "\nMake everyday little ahead of the previous day";
// fs.appendFile("./quote_1.txt", quotes, (res) => console.log(res));

fs.readdir("./backup", (err, files) => {
  console.log(files);
  for (let i = 0; i < files.length; i++) {
    fs.unlink(`./backup/${files[i]}`, (err) => console.log(err));
  }
});
