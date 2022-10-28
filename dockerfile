# 基础镜像使用Nginx
FROM nginx

# 添加时区环境变量，亚洲，上海
ENV TimeZone=Asia/Shanghai   

# 将前端dist文件中的内容复制到nginx目录
COPY dist/  /usr/share/nginx/html/

# 删除基础镜像中的Nginx配置文件替换成自己写的
RUN rm /etc/nginx/conf.d/default.conf 
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80
