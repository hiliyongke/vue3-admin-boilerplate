import fs from 'fs';
import path from 'path';

interface FileInfo {
  [key: string]: string;
}

interface HostInfo {
  host: string;
}

// 文件/文件夹处理相关
const folderObj = {
  // 删除文件夹内的内容
  delDir: function (dirname: string): void {
    // 如果有这个文件夹
    if (fs.existsSync(dirname)) {
      const files = fs.readdirSync(dirname);
      for (const file of files) {
        const curPath = path.join(dirname, file);
        if (fs.statSync(curPath).isDirectory()) {
          // 递归删除文件夹
          this.delDir(curPath);
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
  writeFile: function (fileInfo: FileInfo, info: HostInfo, i: number): void {
    const dirname = `api${i}`;
    const dirPath = path.join(__dirname, '../', dirname);
    this.delDir(dirPath);
    // 如果没有该文件夹，创建文件夹；文件夹已存在什么都不做
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    let len = 0;
    for (const key in fileInfo) {
      if (Object.prototype.hasOwnProperty.call(fileInfo, key)) {
        const element = fileInfo[key];
        fs.writeFileSync(path.join(dirPath, key), element, {
          encoding: 'utf8'
        });
        len += 1;
      }
    }
    console.log(`${info.host} 一共 ${len} 个模块`);
  }
};

export default folderObj;
