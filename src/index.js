#!/usr/bin/env node
const prompts = require("prompts");
const path = require("path");
const fs = require("fs-extra");

/**
 * @param {string} targetDir
 * @param {string} template
 */
async function readTemplate(targetDir, template) {
  const cwd = process.cwd();
  const root = path.join(cwd, targetDir);
  const renameFiles = {
    _gitignore: ".gitignore",
  };
  console.log(`Scaffolding project in ${root}...`);

  await fs.ensureDir(root);
  const existing = await fs.readdir(root);
  if (existing.length) {
    console.error(`Error: target directory is not empty.`);
    process.exit(1);
  }

  const templateDir = path.join(__dirname, `../template/${template}`);
  const write = async (file, content) => {
    const targetPath = renameFiles[file]
      ? path.join(root, renameFiles[file])
      : path.join(root, file);
    if (content) {
      await fs.writeFile(targetPath, content);
    } else {
      await fs.copy(path.join(templateDir, file), targetPath);
    }
  };

  const files = await fs.readdir(templateDir);
  for (const file of files.filter((f) => f !== "package.json")) {
    await write(file);
  }

  const pkg = require(path.join(templateDir, `package.json`));
  pkg.name = path.basename(root);
  await write("package.json", JSON.stringify(pkg, null, 2));

  console.log(`\nDone. Now run:\n`);
  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`);
  }
  console.log(`  npm install (or \`yarn\`)`);
  console.log(`  npm run dev (or \`yarn dev\`)`);
  console.log();
}

const init = async () => {
  const { projectName, type } = await prompts([
    {
      type: "text",
      name: "projectName",
      message: "请输入项目名称",
    },
    {
      type: "select",
      name: "type",
      message: "请选择创建的项目类型",
      choices: [
        {
          title: "basic-config",
          value: "basic-config",
        },
        {
          title: "webpack",
          value: "webpack",
        },
        {
          title: "webpack-react",
          value: "webpack-react",
        },
      ],
    },
  ]);
  readTemplate(projectName, type);
};

init().catch((e) => {
  console.error(e);
});
