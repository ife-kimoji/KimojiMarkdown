# KimojiMarkdown db.js 接口说明
-----------
- **db.js**封装了存取markdown编辑器的接口，使用的是```HTML5 indexedDB```
- 接口封装在```DB```这个全局对象内，使用```DB.*()```方法调用
- **data.js**为预存的数据，引入一次即可
- 所有函数的返回值都至少包含```isSuccess```字段，标识此次操作是否成功,如果是查询操作并且成功的话返回的数据保存在```result```字段中，失败的信息保存在```message```字段中
# 
# 

### open()
> *开启数据库*
> 在操作数据前需要先调用此方法（调用一次即可）

# 
### fetchAllFolder(callback)
> *取回所有文件夹数据*
> callback-回调函数

# 
### addNewFolder(fname,callback)
> *增加新文件夹*
> fname-文件夹名
> callback-回调函数

# 
### removeFolderByFid(fid,callback)
> *删除文件夹*
> fid-文件夹id
> callback-回调函数

# 
### updateFolderByFid(fid,fname,callback)
> *更新文件夹信息*
> fid-文件夹id
> fname-文件夹名
> callback-回调函数

# 
### fetchAllFilesByFid(fid,callback)
> *取回文件夹下的文件*
> fid-文件夹id
> callback-回调函数

# 
### addNewFile(finame,content,fid,callback)
> *增加新文件*
> finame-文件名
> content-文件内容
> fid-所属文件夹id
> callback-回调函数

# 
### removeFileByFiid(fiid,callback)
> *删除文件*
> fiid-文件id
> callback-回调函数

# 
### updateFileByFiid(fiid,finame,content,fid,callback)
> *更新文件*
> fiid-文件id
> finame-文件名
> content-文件内容
> fid-所属文件夹id
> callback-回调函数

# 
### fetchFileByFiid(fiid,callback)
> *取回文件内容*
> fiid-文件id
> callback-回调函数




