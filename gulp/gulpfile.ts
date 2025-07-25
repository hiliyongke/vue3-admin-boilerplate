import gulpConfig from './gulpfile.config';
import gulp from 'gulp';
import GulpSSH from 'gulp-ssh';

// 需要上传到服务器的路径
const config = gulpConfig.devServerSShConfig.sshConfig;
// const config = systemConfig.proServerSShConfig.sshConfig;

const gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config.ssh
});

/**
 * 1.备份：tar -zcvf  备份后文件的存储路径和名称  这里*代表压缩该命令所在文件夹下的所有内容
 *   备份时最好要进入到指定的文件夹在开始压缩，这样压缩后的文件解压不会带路径目录
 *   备份的文件夹必须已经是存在，才能进行备份
 */
gulp.task('execSSHBackup', () => {
  console.log('**********开始备份服务器上现有文件**********');
  return gulpSSH
    .shell(config.backups, { filePath: 'log/commands-backup.log' })
    .pipe(gulp.dest('logs'));
});

/**
 * 2.解压: tar -zxvf  将这个文件夹下的压缩文件  解压到这个目录下
 * 执行这个脚本需要手动修改config/index 里面的historyProjectName属性，例如：2022-12-17-20，指定回滚到这个版本
 */
gulp.task('execSSHRollBack', () => {
  console.log('**********开始回滚上一个版本**********');
  return gulpSSH
    .shell(config.rollback, { filePath: 'log/commands-unZip.log' })
    .pipe(gulp.dest('logs')); // 会自动新建该目录
});

gulp.task('reloadNginx', () => {
  console.log('**********开始重启服务器**********');
  return gulpSSH
    .shell(config.reload, { filePath: 'log/commands-reloadNginx.log' })
    .pipe(gulp.dest('logs'));
});

/**
 *上传前先删除服务器上现有文件...
 */
gulp.task('execSSHDelete', () => {
  console.log('**********开始删除服务器上现有文件**********');
  return gulpSSH
    .shell(config.commands, { filePath: 'log/commands-delete.log' })
    .pipe(gulp.dest('logs'));
});

/**
 * publish 发布代码
 */
gulp.task('publish', () => {
  console.log('**********开始上传文件到服务器**********');
  return gulp
    .src([gulpConfig.devServerSShConfig.uploadFile])
    .pipe(gulpSSH.dest(config.remotePath));
});

/**
 * gulp自动化部署。gulp.series：按照顺序执行
 * 删除，发布，备份，重启
 * 'execSSHDelete', 'publish', 'execSSHBackup', 'reloadNginx'
 */
gulp.task(
  'default',
  gulp.series(
    'execSSHDelete',
    'publish',
    'execSSHBackup',
    'reloadNginx',
    done => {
      console.log(
        '**********发布完毕**********',
        'http://' + config.ssh.host + ':9090'
      );
      // Did you forget to signal async completion? 报错后需要调用done,以结束task
      done(); // 在不使用文件流的情况下，向task的函数里传入一个名叫done的回调函数，以结束task
    }
  )
);
