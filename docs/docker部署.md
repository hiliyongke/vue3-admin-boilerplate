> # Vue 项目打包部署到 docker

- 1，首先先进入 vue 项目中键入 pnpm build 打包项目

```
pnpm build
```

然后在项目的根目录下 dist 文件夹，里面通常有一个 static 文件夹及 index.html 页面也是项目的入口。

2，将项目 scp 到 linux 中，如果使用的 xshell 连接的虚拟机可以在下载个 xftp 连接一下传文件比较方便，如果没有即在 windows 环境下使用 cmd 命令连接虚拟机进行传输项目

```yml
scp workspace\vue root@192.168.1.1:/opt/nginx
#workspace\vue是你本地电脑下的vue项目存放路径，后面root@192.168.1.1:/opt/nginx则是虚拟机的ip:存放的位置
```

3，如果报错则证明是对的，因为 scp 传输文件夹的话需要加一个 -r ，也就变成了下面这样

```yml
scp -r workspace\vue root@192.168.1.1:/opt/nginx
```

4, 此时你的 vue 项目存放到 docker 中就完成了一半，下面进行 linux 中的操作

> # Docker 中配置部署运行项目

1，首先要下载个 nginx 镜像

```yml
docker pull nginx
#如果需要指定版本可以在nginx后面加上   :版本号
```

2，然后进入刚才存放 dist 目录中在我这也就是 /opt/nginx，编写一个 nginx 的默认文件。

```yml
#进入dist存放的目录
cd /opt/nginx

#写个nginx的配置文件
vim default.conf

#按照下方填写
server {
    listen       8081;# 配置端口
    server_name  192.168.1.1; # 修改为docker服务宿主机的ip

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html =404;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```

> # 3，在此目录下继续写一个 Dockerfile

```yml
FROM nginx #指定基础镜像

MAINTAINER ps #说明信息

RUN rm /etc/nginx/conf.d/default.conf

ADD default.conf /etc/nginx/conf.d/  #删除基础镜像中的Nginx配置文件替换成自己写的

COPY dist/ /usr/share/nginx/html/ #将打包好的vue项目复制到基础镜像中Nginx配置文件的指定路径下
```

> # 4，然后创建镜像

```yml
docker build -t distvue .\
#distvue就是镜像名，可以自行更改
#后面的那个点表示在当前目录下创建镜像，不要忘了
```

> # 5，查看下 docker 的镜像就多出了一个已经配置好的 distvue

```
docker images #查看镜像
bash-4.4# docker images
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
distvue       latest    068153ec6e2c   21 hours ago   147MB
```

> # 6，启动容器

```
docker run --name front -p 8081:8081 -d distvue
–name：指定容器名
-p：指定容器和宿主机之间的端口映射
-d：守护进程运行
distvue：指定启动 distvue 镜像
```

7，如果没报错的话可以访问一下项目是否正常进入

> # 配置容器自启动

1，每次重开机后需要手动 start 一下容器比较繁琐，可以将容器也设置为自启

```yml
systemctl enable docker.service #开机自启

然后docker ps -a 就能看到我们配置好8081端口的容器id
# 启动
docker start 容器id

# 自动启动
docker update --restart=always 容器id
```

这样就解决了 vue 项目部署到 nginx 中，顺便每次开机自启动。
