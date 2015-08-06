# package-node-tongwen
Nodejs 繁簡轉換 - 使用新同文堂(TongWen)

## 如何安裝

執行

```
$ git clone https://github.com/foreachsam/package-node-tongwen.git
```

執行

```
$ cd package-node-tongwen
$ ./install.sh
```



## 使用方法

### 觀看指令使用說明

執行

``` sh
$ tongwen -h
```

顯示

```

  Usage: tongwen [options] [command]


  Commands:

    s2t <dir> [otherDirs...]  undefined
    t2s <dir> [otherDirs...]  undefined

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

```

### 簡轉繁

執行

```
$ tongwen s2t file
```

結果

```
會將「file」這個檔案的檔案內容，從「簡體」轉為「繁體」。
```

執行

```
$ tongwen s2t dir
```

結果

```
會將「dir」這個「資料夾」底下的所有檔案內容，從「簡體」轉為「繁體」。
```

執行

```
$ tongwen s2t dir1 file1 dir2 file2
```

結果

```
會將「dir1」這個「資料夾」底下的所有檔案內容，從「簡體」轉為「繁體」。
會將「dir2」這個「資料夾」底下的所有檔案內容，從「簡體」轉為「繁體」。
會將「file1」這個檔案的檔案內容，從「簡體」轉為「繁體」。
會將「file2」這個檔案的檔案內容，從「簡體」轉為「繁體」。
```

### 繁轉簡

執行

```
$ tongwen t2s file
```

結果

```
會將「file」這個檔案的檔案內容，從「繁體」轉為「簡體」。
```

執行

```
$ tongwen t2s dir
```

結果

```
會將「dir」這個「資料夾」底下的所有檔案內容，從「繁體」轉為「簡體」。
```

執行

```
$ tongwen t2s dir1 file1 dir2 file2
```

結果

```
會將「dir1」這個「資料夾」底下的所有檔案內容，從「繁體」轉為「簡體」。
會將「dir2」這個「資料夾」底下的所有檔案內容，從「繁體」轉為「簡體」。
會將「file1」這個檔案的檔案內容，從「繁體」轉為「簡體」。
會將「file2」這個檔案的檔案內容，從「繁體」轉為「簡體」。
```


## 注意事項

* 目前只有針對檔案編碼是「utf-8」的檔案做轉換。
