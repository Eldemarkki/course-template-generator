const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const template = fs.readFileSync("./template.md").toString();

const fileTypes = [
  {
    tag: "muistiinpano",
    title: "Muistiinpanot"
  },
  {
    tag: "tuntitehtävä",
    title: "Tuntitehtävät"
  },
  {
    tag: "kotitehtävä",
    title: "Kotitehtävät"
  }
]

const outputFolderName = "output";

rl.question("Enter the course names, separated by a space: ", coursesString => {
  const courses = coursesString.trim().split(" ").map(c => c.trim()).filter(c => c.length !== 0);

  if (courses.length !== 0 && !fs.existsSync(`./${outputFolderName}`)) {
    fs.mkdirSync(`./${outputFolderName}`);
  }

  courses.forEach(courseName => {
    fileTypes.forEach(fileType => {
      const fileContent = template
        .replace("$COURSE_NAME$", courseName)
        .replace("$FILE_TYPE_TAG$", fileType.tag)
        .replace("$FILE_TYPE_TITLE$", fileType.title);

      fs.writeFileSync(
        `./${outputFolderName}/${courseName} ${fileType.title.toLowerCase()}.md`,
        Buffer.from(fileContent)
      );
    })
  });

  rl.close();
});

rl.on("close", () => process.exit(0));