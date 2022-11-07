const fs = require('fs');
const path = require('path');

// 文件/文件夹处理相关
const folderObj = {
  // 删除文件夹内的内容
  delDir: function (dirname) {
    let files;
    // 如果有这个文件夹
    if (fs.existsSync(dirname)) {
      files = fs.readdirSync(dirname);
      for (const file of files) {
        const curPath = `${dirname}/${file}`;
        if (fs.statSync(curPath).isDirectory()) {
          // 递归删除文件夹
          folder - obj.delDir(curPath);
        } else {
          // 删除文件
          fs.unlinkSync(curPath);
        }
      }
      // 删除当前文件夹（注释的原因是：如果这里删了，下一步还是需要创建文件夹）
      // fs.rmdirSync(dirname);
    }
  },
  // 将处理好的内容写入文件中
  writeFile: function (fileInfo, info, i) {
    const dirname = `api${i}`;
    folder - obj.delDir(dirname);
    // 如果没有该文件夹，创建文件夹；文件夹已存在什么都不做
    try {
      fs.statSync(path.join(__dirname, '../', dirname));
    } catch (error) {
      fs.mkdirSync(dirname);
    }
    let len = 0;
    for (const key in fileInfo) {
      const element = fileInfo[key];
      fs.writeFileSync(`./${dirname}/${key}`, element, {
        encoding: 'utf8'
      });
      len += 1;
    }
    console.log(`${info.host} 一共 ${len} 个模块`);
  }
};

module.exports = folder - obj;
