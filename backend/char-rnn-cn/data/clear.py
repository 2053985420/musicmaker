file1 = open('zhoujielun.txt', 'r', encoding='utf-8') # 要去掉空行的文件
file2 = open('zhoujielun.txt', 'w', encoding='utf-8') # 生成没有空行的文件
try:
    for line in file1.readlines():
        if line == '\n':
            line = line.strip("\n")
        file2.write(line)

    # for line in file1.read():
    #     if line == '　':
    #         line = '\n'
    #     file2.write(line)
finally:
    file1.close()
    file2.close()
