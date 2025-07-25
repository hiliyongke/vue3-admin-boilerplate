// gulpfile.config.ts

/**
 * SSH 连接配置
 */
interface SSHConnection {
  host: string;
  port: number;
  username: string;
  password?: string;
  privateKey?: string;
}

/**
 * SSH 任务配置
 */
interface SSHConfig {
  uploadFile: string;
  sshConfig: {
    remotePath: string;
    ssh: SSHConnection;
    commands: string[];
    backups: string[];
    rollback: string[];
    reload: string[];
  };
}

/**
 * Gulp 配置
 */
interface GulpConfig {
  devServerSShConfig: SSHConfig;
  proServerSShConfig: Partial<SSHConfig>; // 生产环境配置可以是部分的
}

/**
 * 远程服务器的配置文件
 */
const data = new Date();
const time =
  data.getFullYear() +
  '-' +
  (data.getMonth() + 1) +
  '-' +
  data.getDate() +
  '-' +
  data.getHours() +
  '-' +
  data.getMinutes();

// 项目存放路径,如果是docker,应存放在docker的数据卷
const remoteProjectPath = '/usr/local/webserver/nginx/';
const projectName = 'dist'; // 远程项目的名称，相当于dist
const historyProjectName = '2022-12-22-17-16'; // 这个在回滚上一个版本的时候需要手动修改，滚动的版本号，例如：2022-12-22

const gulpConfig: GulpConfig = {
  devServerSShConfig: {
    uploadFile: '../dist/**',
    sshConfig: {
      remotePath: remoteProjectPath + projectName, // 远程网站地址,会自动新建projectName文件夹
      ssh: {
        // 外网测试
        host: '192.168.1.1',
        port: 22,
        username: 'root',
        password: 'password'
      },
      commands: [
        // 删除现有文件
        'rm -rf ' + remoteProjectPath + projectName + '/*'
      ],
      backups: [
        // 2.进入项目目录
        'cd ' + remoteProjectPath + projectName + '/',
        // 3.压缩备份，不会自动创建备份目录
        'tar -zcvf ' +
          remoteProjectPath +
          projectName +
          '-copy/' +
          time +
          '.tar.gz *'
      ],
      rollback: [
        // 4.解压恢复
        'tar -zxvf ' +
          remoteProjectPath +
          projectName +
          '-copy/' +
          historyProjectName +
          '.tar.gz -C ' +
          remoteProjectPath +
          projectName +
          '/'
      ],
      // 只有修改nginx服务器的配置文件才需要重启nginx
      reload: [
        // /usr/local/webserver/nginx/sbin/nginx -s stop ( nginx -s stop  OR  nginx -s reload OR nginx -s start)
        // remoteNginxPath + 'sbin/nginx -s stop',

        // /usr/local/webserver/nginx/sbin/nginx -c /usr/local/webserver/nginx/conf/nginx.conf
        // remoteNginxPath + 'sbin/nginx -c /usr/local/nginx/conf/nginx.conf'

        'docker restart nginx' // 重启服务器 etc/nginx/nginx.conf
      ]
    }
  },

  proServerSShConfig: {}
};

export default gulpConfig;
