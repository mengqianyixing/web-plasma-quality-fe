#!/bin/bash

# 获取当前位置路径
current_path=$(pwd)

# 退出当前容器
exit

docker cp (docker ps -q | grep 4c):${current_path}/dist/* /home/demo
