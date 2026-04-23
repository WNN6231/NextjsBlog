---
title: BanGDream is MYGO!!!!!
category: Study
description: "笔者学习Go语言时的一些记录"
author: Wm1NlkN
date: 2026-03-26
cover: /PostImages/go.webp
readtime: 1 hour read
---

![Go的吉祥物！](/PostImages/go.webp)

# 优势
**极简单的部署方式** ，可直接编译成机器码、不依赖其他库、直接运行即可部署。
**静态类型语言**：编译的时候检查出来隐藏的大多数问题。
**语言层面的并发**：原始语法支持并发，充分利用多核。
```
package main

import (
	"fmt"
	"time"
)

func goFunc(i int) {
	fmt.Println("goroutine", i, "...")
}

func main(){
	for i := 0; i < 10000; i++ {
		go goFunc(i) // 开启一个并发进程
	}
	time.Sleep(time.Second)
}
```
**强大的标准库**：runtime系统调度机制、高效的GC垃圾回收、丰富的标准库
**简单易学**：25关键词、内嵌C语法支持、面向对象继承（继承、多态、封装）、跨平台
# 强项
1、**云计算基础设施领域**
代表项目：docker、kubernetes、etcd、consul、cloudflare CDN、七牛云存储等。
2、**基础后端软件**
代表项目：tidb、influxdb、cockroachdb等。
3、**微服务**
代表项目：go-kit、micro、monzo bank的typhon、bilibili等。
4、**互联网基础设施代表项目**：以太坊、hyperledger等。

# 缺点
1. 包管理
2. 无泛化类型
3. 所有的Excepiton都用Error来处理
4. 对C的降级处理

# 1. 从一个main函数初见Go语法
```
package main // 程序包名

import (
	"fmt"
	"time"
) // 导入包

func main() { // 函数的“{”一定要和函数名同一行，否则编译错误
	fmt.Println("Hello, GO!")
	time.Sleep(1 * time.Second)
}
```

# 2. 常见四种变量声明方式
![变量声明](/PostImages/Pasted%20image%2020260318201322.webp)
```
// 四种变量的声明方式
package main

import "fmt"

// 方法123可用于全局变量
var gA int = 100
var gB = 200

// 方法4不可用于全局变量
// gC := 300 // 错误：无法在函数外使用 := 声明变量



func main() {
    // 1. 声明一个变量，不赋值
    var a int // 声明一个整数变量a，默认为0
    fmt.Println("a:", a)
    fmt.Printf("Type of a is %T\n", a)

    // 2. 声明一个变量，赋值
    var b int = 10
    fmt.Println("b:", b)
    fmt.Printf("Type of b is %T\n", b)

    // 3. 声明一个变量，类型由编译器推断
    var c = 100
    fmt.Println("c:", c)
    fmt.Printf("Type of c is %T\n", c)

    // 4.省略 var 关键字，使用 := 声明并赋值 （最常用）
    d := 1000
    fmt.Println("d:", d)
    fmt.Printf("Type of d is %T\n", d)

    i := 3.14
    fmt.Println("i:", i)
    fmt.Printf("Type of i is %T\n", i)

    J := "Hello"
    fmt.Println("J:", J)
    fmt.Printf("Type of J is %T\n", J)

    // 全局变量输出
    fmt.Println("gA:", gA, ", gB:", gB)

    // 声明多个变量
    var e, f int = 1, 2
    fmt.Println("e:", e, ", f:", f)
    var g, h = 110, "World"
    fmt.Println("g:", g, ", h:", h)

    // 多行多变量声明
    var (
        x int    = 42
        y string = "Go"
        z bool   = true
    )
    fmt.Println("x:", x, ", y:", y, ", z:", z)

}
```

# 3. const与iota知识点注意事项
```
package main

import (
    "fmt"
)

  

const (
    BEIJING = 10 * iota// iota 是一个特殊的常量生成器，在 const 块中使用时会自动递增，只能在const中使用
    SHANGHAI
    GUANGZHOU
    SHENZHEN
)

const (
    a, b = iota + 1, iota + 2
    c, d
    e, f

    g, h = iota * 2, iota * 3
    i, j
)

func main() {

    // 常量（只读属性）
    const pi = 3.14
    fmt.Println("The value of pi is:", pi)

    fmt.Println("BEIJING:", BEIJING)
    fmt.Println("SHANGHAI:", SHANGHAI)
    fmt.Println("GUANGZHOU:", GUANGZHOU)
    fmt.Println("SHENZHEN:", SHENZHEN)

  

    fmt.Println("a:", a, ", b:", b)
    fmt.Println("c:", c, ", d:", d)
    fmt.Println("e:", e, ", f:", f)

    fmt.Println("g:", g, ", h:", h)
    fmt.Println("i:", i, ", j:", j)
}
```

# 4. Go中函数的多返回职三种写法
```
package main

import (
    "fmt"
)

func fool(a string, b int) int {
    fmt.Println("a = ", a)
    fmt.Println("b = ", b)

    c := 100
    return c

}

// 返回多个返回值，匿名
func foo2(a string, b int) (int, int) {
    fmt.Printf("---foo2---")
    fmt.Println("a = ", a)
    fmt.Println("b = ", b)
    return 100, 200
}

  

// 返回多个返回值，有形参名称

func foo3(a string, b int) (r1 int, r2 int) {
    fmt.Printf("---foo3---")
    fmt.Println("a = ", a)
    fmt.Println("b = ", b)

    r1 = 100
    r2 = 200
    return
}

  

func foo4(a string, b int) (r1 ,r2 int) {
    fmt.Printf("---foo4---\n")
    fmt.Println("a = ", a)
    fmt.Println("b = ", b)

    r1 = 100
    r2 = 200
    return
}

  

func main() {
    d := fool("abc", 555)
    fmt.Println("d = ", d)

    e, f := foo2("def", 666)
    fmt.Println("e = ", e)
    fmt.Println("f = ", f)

    ret1 , ret2 := foo3("foo3", 325)
    fmt.Println("ret1 = ", ret1)
    fmt.Println("ret2 = ", ret2)

    ret1, ret2 = foo4("foo4", 325)
    fmt.Println("ret1 = ", ret1)
    fmt.Println("ret2 = ", ret2)
}
```
# 5. Import导包路径问题与init方法

![Import的实际导包路径](/PostImages/Pasted%20image%2020260319144458.webp)
项目总体文件目录
```powershell
(base) PS D:\goproject\src\gostudy> tree
卷 Data 的文件夹 PATH 列表
卷序列号为 DEAF-7D9D
D:.
├─1-firstG
├─2-var
├─3-const_iota
├─4-function
└─5-init
    ├─lib1
    └─lib2
```
import导包路径问题
```powershell
(base) PS D:\goproject\src\gostudy\5-init> ls
    目录: D:\goproject\src\gostudy\5-init

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         2026/3/19     14:49                lib1
d-----         2026/3/19     14:50                lib2
-a----         2026/3/19     14:56            131 main.go
```
若在lib1.go中
```
package lib1

import "fmt"

func Lib1Test() { // 导出函数，首字母大写，外部包可以调用（若小写则不能被外部包调用）
    fmt.Println("lib1Test() ...")
}

func init() {
    fmt.Println("lib1. init() ...")
}
```
项目main.go文件调包则为：
```
package main

import (
    "gostudy/5-init/lib1"
    "gostudy/5-init/lib2"
)

func main() {
    lib1.Lib1Test()
    lib2.Lib2Test()
}
```
运行go run main.go，终端输出：
```powershell
(base) PS D:\goproject\src\gostudy\5-init> go run main.go
lib1. init() ...
lib2. init() ...
lib1Test() ...
lib2Test() ...
```

# 6. import匿名及别名导包方式
![import匿名及别名导包](/PostImages/Pasted%20image%2020260319151356.webp)
```
package main

import (
    _ "gostudy/5-init/lib1"      // 导入lib1包，但不直接使用它的函数，所以加上_，表示只执行lib1包中的init函数
    mylib2 "gostudy/5-init/lib2" // 导入lib2包，并给它起一个别名mylib2，这样在调用lib2中的函数时就要使用mylib2.Lib2Test()，而不是lib2.Lib2Test()
    // . "gostudy/5-init/lib2" // 导入lib2包，并使用.，表示直接使用lib2包中的函数时不需要加上包名，可以直接调用Lib2Test()，而不是lib2.Lib2Test()
)

  

func main() {
    // lib1.Lib1Test()
    // lib2.Lib2Test()
    mylib2.Lib2Test()
    // Lib2Test()
}
```

# 7. Go指针速通
无指针
![无指针状况下的内存示例](/PostImages/Pasted%20image%2020260319151857.webp)
有指针
![有指针状况下的内存示例](/PostImages/Pasted%20image%2020260319152245.webp)
```
package main

import (
    "fmt"
)

func swap(px *int, py *int) {
    var temp int
    temp = *px // temp保存px指针指向的值
    *px = *py // 将py指针指向的值赋给px指针指向的值
    *py = temp // 将temp的值赋给py指针指向的值
}


func main() {
    var a int = 10
    var b int = 20
    
    swap(&a, &b)

    fmt.Println("a = ", a, "b = ", b)

    // 二级指针
    var p *int
    p = &a

    fmt.Println(&a)
    fmt.Println(p)

    var pp **int
    pp = &p
    fmt.Println(&p)
    fmt.Println(pp)
}
```
# 8. defer语句调用顺序
![defer语句执行遵循栈方式](/PostImages/Pasted%20image%2020260319161742.webp)
```
package main

import (
    "fmt"
)

func deferFunc() int {
    fmt.Println("deferFunc() ...")
    return 0
}

func returnFunc() int {
    fmt.Println("returnFunc() ...")
    return 0
}

func returnAndDefer() int {
    defer deferFunc() // defer语句会将deferFunc函数压栈，等到returnAndDefer函数执行完毕后再执行deferFunc函数
    return returnFunc() // return语句会先执行returnFunc函数，然后再执行deferFunc函数，最后将returnFunc函数的返回值返回给调用者
}

func main() {
    defer fmt.Println("main end1")
    defer fmt.Println("main end2") // 遵循先进后出原则，压栈

    fmt.Println("main::hello go 1")
    fmt.Println("main::hello go 2")

    returnAndDefer();
}
```
Output:
```powershell
(base) PS D:\goproject\src\gostudy\7-defer> go run defer.go
main::hello go 1
main::hello go 2
returnFunc() ...
deferFunc() ...
main end2
main end1
```
# 9. Go中数组和动态数组区别
![数组和slice](/PostImages/Pasted%20image%2020260319170723.webp)
数组
```
package main

import "fmt"

func main() {
    var myArray1 [10]int
    myArray2 := [10]int{1, 2, 3, 4}

    for i := 0; i < len(myArray1); i++ {
        fmt.Println(myArray1[i])
    }

    for index, value := range myArray2 {
        fmt.Println("index = ", index, ", value = ", value)
    }

    testslice()
}
```
动态数组slice
```
package main


import "fmt"


func printArray(arr []int) {
    for _, value := range arr{
        fmt.Println("value = ", value)
    }

    arr[0] = 100 // 修改切片中的元素，切片是引用类型，修改切片中的元素会影响到原数组中的元素
}

func testslice() {
    myArray := []int{1, 2, 3, 4}
    fmt.Printf("myArray type is %T\n", myArray)
    printArray(myArray)

    fmt.Println(" ==== ")

    for _, value := range myArray {
        fmt.Println("value = ", value)
    }
}
```


# 10. slice切片中4种声明方式
![slice的4种声明方式](/PostImages/Pasted%20image%2020260319172147.webp)
```
package main

import "fmt"

func main() {
    // 声明slice1是一个切片并且初始化，默认值是1，2，3，长度len是3
    // slice1 := []int{1, 2, 3}
    
    // 声明slice1是一个切片，但是没有给slice1分配空间
    // var slice1 []int
    // slice1 = make([]int, 3)

    // 声明slice1是一个切片，同时给slice分配空间，3个空间初始化为0
    // var slice1 []int = make([]int, 3)

    // 声明slice1是一个切片，同时给slice分配空间，3个空间初始化为0，通过:=推导出slice为一个切片
    slice1 := make([]int, 3)

    // 判断一个slice是否为0
    if slice1 == nil {
        fmt.Println("slice1是一个空切片")
    }else {
        fmt.Println("slice1是有空间的")
    }

    fmt.Printf("len = %d, slice = %v\n", len(slice1), slice1)
}
```

# 11. slice切片追加与截取
**slice切片追加**
![slice切片关于num、len、cap的区别示例](/PostImages/Pasted%20image%2020260319194014.webp)
```
package main

import "fmt"

func main(){
	var numbers = make([]int, 3, 5)
		
	// 向numbers切片追加一个元素1，numbers len = 4, numbers cap = 5
	numbers = append(numbers, 1)
	numbers = append(numbers, 2)

	// 向cap满的slice追加
	numbers = append(numbers, 1)

	var numbers2 = make([]int, 3)
	numbers2 = append(numbers2, 1)


	fmt.Printf("len = %d, cap = %d, slice = %v\n", len(numbers), cap(numbers), numbers)
	fmt.Printf("len = %d, cap = %d, slice = %v", len(numbers2), cap(numbers2), numbers2)

}
```
Output:
```shell
(base) PS D:\goproject\src\gostudy> go run . 
len = 6, cap = 10, slice = [0 0 0 1 2 1]
len = 4, cap = 6, slice = [0 0 0 1]
```
**slice截取**
```
package main

import "fmt"

func main(){
	s := []int{1, 2, 3} 

	// [0, 2)
	s1 := s[0:2] // [1, 2]

	fmt.Println(s1)

	//copy 可将底层数组的slice一起进行拷贝
	s2 := make([]int, 3)

	copy(s2, s) // 将s中的值依次copy到s2
	fmt.Println(s2)
}
```
Output：
```powershell
(base) PS D:\goproject\src\gostudy> go run .
[1 2]
[1 2 3]
```
# 12. map的三种声明方式
![map的三种声明](/PostImages/Pasted%20image%2020260319200437.webp)
```
package main

import "fmt"

func main() {

	// =>第一种
	var myMap1 map[string]string
	if myMap1 == nil {
		fmt.Println("myMap1 是一个空map")
	}

	// 在使用map前，需要先用make给map分配数据空间
	myMap1 = make(map[string]string, 10)

	myMap1["one"] = "java"
	myMap1["two"] = "c++"
	myMap1["three"] = "python"

	fmt.Println(myMap1)

	// =>第二种
	myMap2 := make(map[int]string)
	myMap2[1] = "java"
	myMap2[2] = "c++"
	myMap2[3] = "python"

	fmt.Println(myMap2)

	// =>第三种
	myMap3 := map[string]string{
		"one": "php",
		"two": "c++",
		"three": "python",
	}
	fmt.Println(myMap3)


}
```
Output:
```powershell
(base) PS D:\goproject\src\gostudy\9-map> go run .
myMap1 是一个空map
map[one:java three:python two:c++]
map[1:java 2:c++ 3:python]
map[one:php three:python two:c++]
```
# 13. map的使用方式
**增删改**
```
package main

import "fmt"

func printMap(cityMap map[string]string) {
	// cityMap是一个引用传递，指向同一块内存空间
	for key, value := range cityMap {
		fmt.Println("key = ", key)
		fmt.Println("value = ", value)
	}
}

func ChangeValue(cityMap map[string]string) {
	cityMap["England"] = "London"
}

func map2() {
	cityMap := make(map[string]string)

	cityMap["China"] = "Beijing"
	cityMap["Japan"] = "Tokyo"
	cityMap["USA"] = "NewYork"

	delete(cityMap, "China")

	ChangeValue(cityMap)

	printMap(cityMap)
}
```
# 14. struct的基本定义与使用
```
package main

import "fmt"

type myint int

type Book struct {
	title string
	auth  string
}

func changeBook(book Book) {
	// 传递一个book的副本
	book.auth = "666"
}

func changeBook2(book *Book) {
	book.auth = "777"
}

func main() {
	// 	var a myint = 10
	// 	fmt.Println("a = ", a)
	// 	fmt.Printf("type of a = %T\n", a)

	var book1 Book
	book1.title = "Golang"
	book1.auth = "zhang3"

	fmt.Printf("%v\n", book1)
	
	changeBook(book1)
	fmt.Printf("%v\n", book1)
	
	changeBook2(&book1)
	fmt.Printf("%v\n", book1)

}
```
Output:
```powershell
(base) PS D:\goproject\src\gostudy\10-OOP> go run .
{Golang zhang3}
{Golang zhang3}
{Golang 777
```
# 15. Go面对对象类的表示与封装
![Go面对对象类的封装](/PostImages/Pasted%20image%2020260319210913.webp)
```
package main

import "fmt"

type Hero struct {
	Name string
	Ad   int
	Level int
}

func (this *Hero) Show() {
	fmt.Println("Name = ", this.Name)
	fmt.Println("Ad = ", this.Ad)
	fmt.Println("Level = ", this.Level)
}

func (this *Hero) GetName() string{
	return this.Name
}

func (this *Hero) SetName(newName string) {
	this.Name = newName
}



func main() {
	hero := Hero{Name : "zhang3", Ad : 100, Level:1}
	hero.SetName("li4")
	hero.Show()

}
```
Output:
```powershell
(base) PS D:\goproject\src\gostudy> go run .
Name =  li4
Ad =  100
Level =  1
```

# 16. Go面对对象继承
![Go面对对象类的继承](/PostImages/Pasted%20image%2020260319212624.webp)
```
package main

import "fmt"

type Human struct {
	name string
	sex  string
}

func (this *Human) Eat() {
	fmt.Println("Human.Eat()...")
}

func (this *Human) Walk() {
	fmt.Println("Human.Walk()...")
}

type SuperMan struct {
	Human
	level int
}

// 重定义父类方法
func (this *SuperMan) Eat() {
	fmt.Println("SuperMan.Eat()...")
}

// 子类新方法
func (this *SuperMan) Fly() {
	fmt.Println("SuperMan.Fly()...")
}

func (this *SuperMan) Print() {
	fmt.Println("name = ", this.name)
	fmt.Println("sex = ", this.sex)
	fmt.Println("level = ", this.level)
	
}

func main(){
	h := Human{"zhang3", "female"}
	h.Eat()
	h.Walk()

	// 定义一个子类对象
	// s := SuperMan{Human{"WNN", "male"}, 88}
	var s SuperMan
	s.name = "WNN"
	s.sex = "real man"
	s.level = 88

	s.Walk()
	s.Eat()
	s.Fly()
	s.Print()
}
```
Output:
```powershell
(base) PS D:\goproject\src\gostudy> go run .
Human.Eat()...
Human.Walk()...
Human.Walk()...
SuperMan.Eat()...
SuperMan.Fly()...
name =  WNN
sex =  real man
level =  88
```
# 17. Go面对对象多态的实现与基本要素
![Go面对对象多态的实现](/PostImages/Pasted%20image%2020260320121706.webp)
```
package main

import "fmt"

// 本质是一个指针
type AnimalIF interface {
	Sleep()
	GetColor() string
	GetType() string
}

// 具体的类
type Cat struct {
	color string
}

func (this *Cat) Sleep() {
	fmt.Println("Cat is Sleep")
}

func (this *Cat) GetColor() string{
	return this.color
}

func (this *Cat) GetType() string{
	return "Cat"
}

type Dog struct {
	color string
}

func (this *Dog) Sleep() {
	fmt.Println("Dog is Sleep")
}

func (this *Dog) GetColor() string{
	return this.color
}

func (this *Dog) GetType() string{
	return "Dog"
}

func showAnimal(animal AnimalIF) {
	animal.Sleep() //多态
	fmt.Println("color = ", animal.GetColor())
	fmt.Println("color = ", animal.GetType())
}

func main() {
	// var animal AnimalIF //接口的数据类型，父类指针
	// animal = &Cat{"Green"}

	// animal.Sleep() // 调用的就是Cat的Sleep()方法

	// animal = &Dog{"Yellow"}

	// animal.Sleep()

	cat := Cat{"Green"}
	dog := Dog{"Yellow"}

	showAnimal(&cat)
	showAnimal(&dog)
}
```
Output:
```powershell
(base) PS D:\goproject\src\gostudy> go run .
Cat is Sleep
color =  Green
color =  Cat
Dog is Sleep
color =  Yellow
color =  Dog
```
# 18. interface空接口万能类型与类型断言机制
![interface空接口](/PostImages/Pasted%20image%2020260320122826.webp)
```
package main

import "fmt"

func myFunc(arg interface{}) {
	fmt.Println("myFunc is called...")
	fmt.Println(arg)

	// interface{} 改如何区分 此时引用的底层数据类型到底是什么？

	// 给 interface{}提供"类型断言"机制
	value, ok := arg.(string)
	if !ok {
		fmt.Println("arg is not a string")
	} else {
		fmt.Println("arg is string type, value = ", value)
		fmt.Printf("value type is %T\n ", value)
	}
}

type Book struct {
	auth string
}

func main() {
	book := Book{"golang"}

	myFunc(book)
	myFunc(100)
	myFunc("abc")
	myFunc(3.14)
}
```
Output:
```powershell
(base) PS D:\goproject\src\gostudy> go run .
myFunc is called...
{golang}
arg is not a string
myFunc is called...
100
arg is not a string
myFunc is called...
abc
arg is string type, value =  abc
value type is string
 myFunc is called...
3.14
arg is not a string
```
# 19. 变量的内置pair结构详细说明
![关于变量的内置pair结构的详细说明](/PostImages/Pasted%20image%2020260320124202.webp)
```
package main

import "fmt"

func main() {
	var a string
	// pair<staticType:string, value:"aceld">
	a = "aceld"

	// pair<type:string, value:"aceld">
	var allType interface{}
	allType = a

	str, _ := allType.(string)
	fmt.Println(str)
}
```
Output:
```powershell
(base) PS D:\goproject\src\gostudy\11-reflect> go run .
aceld
```
# 20. Go反射reflect机制用法
**一**
```
package main

import (
	"fmt"
	"reflect"
)

func reflectNum(arg interface{}) {
	fmt.Println("type : ", reflect.TypeOf(arg))
	fmt.Println("value : ", reflect.ValueOf(arg))

}

func main() {
	var num float64 = 1.23345

	reflectNum(num)
}
```
Output:
```powershell
(base) PS D:\goproject\src\gostudy> go run . 
type :  float64
value :  1.23345
```

**二**
```
package main

import (
	"fmt"
	"reflect"
)

type User struct {
	Id   int
	Name string
	Age  int
}

func (this User) Call() {
	fmt.Println("User is called ..")
	fmt.Printf("%v\n", this)
}

func main() {
	user := User{1, "Aceld", 18}

	DoFileAndMethod(user)
}

func DoFileAndMethod(input interface{}) {
	// 获取input的type
	inputType := reflect.TypeOf(input)
	fmt.Println("inputType is : ", inputType.Name())

	// 获取input的value
	inputValue := reflect.ValueOf(input)
	fmt.Println("inputValue is :", inputValue)

	// 通过type获取里面的字段
	// 1.获取interface的reflect.Type，通过Type得到NumField,进行遍历
	// 2.得到每个Field，数据类型
	// 3.通过field有一个Interface()方法等到对应的value
	for i := 0; i < inputType.NumField(); i++ {
		field := inputType.Field(i)
		value := inputValue.Field(i).Interface()
		fmt.Printf("%s: %v = %v\n", field.Name, field.Type, value)
	}

	// 通过type获取里面的方法，调用
	for i := 0; i < inputType.NumMethod(); i++ {
		m := inputType.Method(i)
		fmt.Printf("%s: %v\n", m.Name, m.Type)
	}
}
```
Output:
```powershell
(base) PS D:\goproject\src\gostudy> go run .
inputType is :  User
inputValue is : {1 Aceld 18}
Id: int = 1
Name: string = Aceld
Age: int = 18
Call: func(main.User)
```

# 21. Go反射解析结构体标签Tag
```
package main

import (
	"fmt"
	"reflect"
)

type resume struct {
	Name string `info:"name" doc:"我的名字"`
	Sex  string `info:"sex"`
}

func findTag(str interface{}) {
	t := reflect.TypeOf(str).Elem()

	for i := 0; i < t.NumField(); i++ {
		taginfo := t.Field(i).Tag.Get("info")
		tagdoc := t.Field(i).Tag.Get("doc")
		fmt.Println("info: ", taginfo, " doc: ", tagdoc)
	}
}

func main() {
	var re resume

	findTag(&re)

}
```
Output:
```powershell
(base) PS D:\goproject\src\gostudy> go run .
info:  name  doc:  我的名字
info:  sex  doc: 
```
# 22. 结构体标签在JSON中的应用
![结构体标签在JSON中的应用](/PostImages/Pasted%20image%2020260320160711.webp)
```
package main

import (
	"encoding/json"
	"fmt"
)

type Movie struct {
	Title  string   `json:"title"`
	Year   int      `json:"year"`
	Price  int      `json:"rmb"`
	Actors []string `json:"actors"`
}

func main() {
	movie := Movie{"喜剧之王", 2000, 10, []string{"xingye", "zhangbozhi"}}

	// 编码 结构体==>json
	jsonStr, err := json.Marshal(movie)
	if err != nil {
		fmt.Println("json marshal error", err)
		return
	}
	
	fmt.Printf("jsonStr = %s\n", jsonStr)
	
	// 解码 jsonStr ==> 结构体
	myMovie := Movie{}
	err = json.Unmarshal(jsonStr, &myMovie)
	if err != nil {
		fmt.Println("json Unmarshal error", err)
		return
	}

	fmt.Printf("%v\n", myMovie)
}
```
Output：
```powershell
(base) PS D:\goproject\src\gostudy> go run .
jsonStr = {"title":"喜剧之王","year":2000,"rmb":10,"actors":["xingye","zhangbozhi"]}
{喜剧之王 2000 10 [xingye zhangbozhi]}
```
# 23. Goroutine基本模型和调度设计策略
**单进程时代的两个问题**
1. 单一执行流程、计算机只能一个任务一个任务处理
2. 进程阻塞所带来的CPU浪费时间的问题
**宏观执行多任务**
![多线程操作系统基于时间片的并发执行](/PostImages/Pasted%20image%2020260320162147.webp)
多进程/多线程解决了阻塞问题，但是又面临着新问题
![多线程切换线程时成本巨大](/PostImages/Pasted%20image%2020260320162316.webp)
进程/线程的数量越多，切换成本越大，越浪费
多线程也伴随着同步竞争（如 锁🔒、竞争资源冲突...etc）使得开发设计变得越来越复杂
![多进程，多线程的壁垒](/PostImages/Pasted%20image%2020260320162640.webp)
![将一个线程分成两个部分，CPU只负责内核空间的线程，减小了切换成本；而用户空间更好区分故改名为协程](/PostImages/Pasted%20image%2020260320162817.webp)
N:1协程对应关系，因为轮询若一个协程阻塞会出现问题
![N:1对应关系轮询易导致阻塞浪费时间成本](/PostImages/Pasted%20image%2020260320162947.webp)
1:1协程对应关系，回到线程问题，高切换成本高
![1:1则重新回到线程切换问题](/PostImages/Pasted%20image%2020260320163122.webp)
M:N关系 把所有问题集中到优化协程调度器上
![通过M:N将问题集中](/PostImages/Pasted%20image%2020260320163232.webp)
---

 那么Go语言如何对协程进行处理
![co-routine在Go中为Goroutine](/PostImages/Pasted%20image%2020260320163501.webp)
**老调度器**，M0获取全局go协程队列时会先**执行**获取协程G，执行时后续协程G前进，执行后**放回**锁且协程G回到队列末尾
那么这样的调度策略存在了几个缺点：
1. 创建、销毁、调度G都需要每个M获取锁，这就形成了激烈的锁竞争。
2. M转移G会造成延迟和额外的系统负载。
3. 系统调用（CPU在M之间的切换）导致频繁的线程阻塞和取消阻塞操作增加了系统开销
![老调度器只有加锁的全局GO协程队列](/PostImages/Pasted%20image%2020260320165014.webp)

**新调度器**：GMP
>[! What is GMP?]
>GMP——G(goroutine, 协程)，P(processor, 处理器)，M(thread, 线程)

新调度器的设计策略
![新调度器的设计哲学](/PostImages/Pasted%20image%2020260320171103.webp)

![在G和M的基础上增加P](/PostImages/Pasted%20image%2020260320170350.webp)

**复用线程**
M2空闲会从M1偷取协程
![空闲则偷取协程](/PostImages/Pasted%20image%2020260320170632.webp)

分离机制：G1阻塞时会将M1的P队列分离到空闲线程(如M3)上
![阻塞则分离协程](/PostImages/Pasted%20image%2020260320171028.webp)
![M1阻塞时将对应的P队列分离到M3，M1后续睡眠或销毁](/PostImages/Pasted%20image%2020260320171043.webp)

**利用并行**：GOMAXPROCS限定P的个数

**抢占**：并发特点，超过10ms被其他G协程抢占，无优先度
![并发无优先度抢占](/PostImages/Pasted%20image%2020260320171714.webp)

**全局G队列**：work stealing机制的补充，从全局偷取。一旦M2本地队列无任何协程，若M1本地队列也无其他协程，则从全局队列取出协程，但是要经历解锁和加锁的过程
![全局偷取但要经历加解锁](/PostImages/Pasted%20image%2020260320172225.webp)
# 24. 创建gorountine
![利用Gorountine实现简易并发](/PostImages/Pasted%20image%2020260322144111.webp)
```
package main

import (
	"fmt"
	"time"
)

// 从goroutine
func newTask() {
	i := 0
	for {
		i++
		fmt.Printf("new Goroutine : i = %d\n", i)
		time.Sleep(1 * time.Second)
	}
}

// 主goroutine
func main() {
	// 创建一个go程，去执行newTask()流程
	go newTask()

	i := 0

	for {
		i++
		fmt.Printf("main Goroutine : i = %d\n", i)
		time.Sleep(1 * time.Second)
	}
}
```
Output:
```powershell
new Goroutine : i = 1
main Goroutine : i = 1
main Goroutine : i = 2
new Goroutine : i = 2
new Goroutine : i = 3
main Goroutine : i = 3
main Goroutine : i = 4
new Goroutine : i = 4
new Goroutine : i = 5
main Goroutine : i = 5
main Goroutine : i = 6
new Goroutine : i = 6
new Goroutine : i = 7
main Goroutine : i = 7
main Goroutine : i = 8
new Goroutine : i = 8
new Goroutine : i = 9
main Goroutine : i = 9
main Goroutine : i = 10
new Goroutine : i = 10
...etc
```
可看出在主goroutine进行时子进程newTask()也一并进行

```
package main

import (
	"fmt"
	"runtime"
	"time"
)

func main() {
	// 用go创建承载一个形参为空，返回值为空的一个函数
	go func() {
		defer fmt.Println("A.defer")

		func() {
			defer fmt.Println("B.defer")
			// 退出当前goroutine
			runtime.Goexit()

			fmt.Println("B")
		}()

		fmt.Println("A")

	}()

	for {
		time.Sleep(1 * time.Second)
	}
}
```
Output:
```powershell
(base) PS D:\goproject\src\gostudy> go run .
B.defer
A.defer
```
# 25. channel的基本定义与使用
![channel 通道是可以让一个 goroutine 协程发送特定值到另一个 goroutine 协程的通信机制](/PostImages/Pasted%20image%2020260322144411.webp)
```
package main

import "fmt"

func main() {
	c := make(chan int)

	go func() {
		defer fmt.Println("goroutine结束")
		fmt.Println("goroutine 正在运行...")

		c <- 666
	}()

	num := <-c

	fmt.Println("num =", num)
	fmt.Println("main goroutine 结束...")
}
```
Output:
```powershell
(base) PS D:\goproject\src\gostudy\13-channel> go run channel.go
goroutine 正在运行...
goroutine结束
num = 666
main goroutine 结束...
```
**为何会出现这种情况？**
![channel利用阻塞实现进程同步](/PostImages/Pasted%20image%2020260322145334.webp)
channel具备**同步**的机制，在main go或者sub go执行到数据读取阶段时，若main go先执行到num := <-c，此时sub go未能将666数据填入channel c管道，main go会发生阻塞已等待接收；若main go先将666填入channel c，因main go未进行数据读取则channel c和sub go发生阻塞。
# 26. channel有缓冲与无缓冲同步问题
### 无缓冲的channel
![无缓冲channel示意](/PostImages/Pasted%20image%2020260322150021.webp)
> 代码详情请看25.channel基本定义及使用，示例即为无缓冲channel实现方式
### 有缓存的channel
![有缓冲channel示意](/PostImages/Pasted%20image%2020260322150232.webp)```
```
package main

import (
	"fmt"
	"time"
)

func main() {
	c := make(chan int, 3) // 带有缓冲的channel，3为缓冲容量

	fmt.Println("len(c) =", len(c), ", cap(c) =", cap(c))

	go func() {
		defer fmt.Println("子goroutine结束")

		for i := 0; i < 4; i++ {
			c <- i
			fmt.Println("子goroutine正在运行，发送的元素=", i, "len(c) =", len(c), ", cap(c) =", cap(c))
		}
	}()

	time.Sleep(2 * time.Second)

	for i := 0; i < 4; i++ {
		num := <-c
		fmt.Println("num = ", num)
	}

	fmt.Println("main 结束")
}
```
Output:
```powershell
(base) PS D:\goproject\src\gostudy\13-channel> go run .
len(c) = 0 , cap(c) = 3
子goroutine正在运行，发送的元素= 0 len(c) = 1 , cap(c) = 3
子goroutine正在运行，发送的元素= 1 len(c) = 2 , cap(c) = 3
子goroutine正在运行，发送的元素= 2 len(c) = 3 , cap(c) = 3
num =  0
num =  1
num =  2
num =  3
main 结束
子goroutine正在运行，发送的元素= 3 len(c) = 3 , cap(c) = 3
```
# 27. channel的关闭特点
![channel关闭后无法向channel发送数据，可以从channel接收数据](/PostImages/Pasted%20image%2020260322152659.webp)
```
package main

import "fmt"

func main() {
	c := make(chan int)

	go func() {
		for i := 0; i < 5; i++ {
			c <- i
		}
		close(c)
	}()

	for {
		// ok若为true则channel没有关闭，如果为false则表示channel已关闭
		if data, ok := <-c; ok {
			fmt.Println(data)
		} else {
			break
		}
	}

	fmt.Println("Main Finished...")

}
```
Output:
```powershell
(base) PS D:\goproject\src\gostudy\13-channel> go run .
0
1
2
3
4
Main Finished...
```
# 28. channel与range
```
package main

import "fmt"

func main() {
	c := make(chan int)

	go func() {
		for i := 0; i < 5; i++ {
			c <- i
		}
		close(c)
	}()

	/* for {
		// ok若为true则channel没有关闭，如果为false则表示channel已关闭
		if data, ok := <-c; ok {
			fmt.Println(data)
		} else {
			break
		}
	} */

	// 可以使用range来迭代不断操作channel
	for data := range c {
		fmt.Println(data)
	}

	fmt.Println("Main Finished...")

}
```
Output:
```powershell
(base) PS D:\goproject\src\gostudy\13-channel> go run .
0
1
2
3
4
Main Finished...
```

# 29. channel与select
![select可监控多个channel](/PostImages/Pasted%20image%2020260322153423.webp)
```
package main

import "fmt"

func fibonacii(c, quit chan int) {
	x, y := 1, 1

	for {
		select {
		case c <- x: // 若c可写则该case执行
			x = y
			y = x + y
		case <- quit:
			fmt.Println("quit")
			return
		}
	}
}

func main() {
	c := make(chan int)
	quit := make(chan int)

	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println(<-c)
		}
		quit <- 0
	}()
	
	// main go
	fibonacii(c, quit)
}
```
Output:
```powershell
(base) PS D:\goproject\src\gostudy\13-channel> go run .
1
1
2
4
8
16
32
64
128
256
quit
```
# 30. GOPATH工作模式的弊端
[4、Go Modules文档](https://www.yuque.com/aceld/mo95lb/ovib08)
>详细说明请看刘丹冰老师的8小时转职Golang工程师系列

Gemini的回复：

在 Go 语言的发展史上，依赖管理经历了一次重大的范式转移。简单来说，**GOPATH** 是“老旧的包工厂”，而 **Go Modules** 是“现代化的集装箱”。

---

## 1. 什么是 GOPATH？

**GOPATH** 是 Go 早期版本（1.11 之前）唯一的工程组织方式。它本质上是一个**全局的环境变量**，指向你电脑上的一个特定目录。

在这个模式下，所有的 Go 代码（包括你写的和你下载的第三方库）都必须存放在 `$GOPATH/src` 目录下。

### GOPATH 的工作模式弊端

1. **无版本管理概念**：`go get` 永远只拉取远程仓库的最新代码（通常是 master 分支）。如果第三方库升级导致 API 变动，你的代码可能直接报错，无法实现“可重复构建”。
    
2. **依赖冲突**：如果你有两个项目，A 项目依赖库 `v1`，B 项目依赖同一个库的 `v2`，在 GOPATH 下它们必须共用同一个源码目录，这会导致你无法同时运行这两个项目。
    
3. **路径限制**：代码必须死板地放在 `$GOPATH/src` 下，不能放在电脑的任意位置（比如桌面或文档文件夹）。
    

---

## 2. 什么是 Go Modules？

**Go Modules** 是 Go 官方从 1.11 版本引入（1.13 默认开启）的现代化依赖管理系统。它是以**项目（模块）**为单位来管理依赖的。

- **go.mod**：记录项目依赖的所有库及其具体的版本号。
    
- **go.sum**：记录依赖包的哈希值，确保下载的代码没有被篡改。
    

### 为什么选用 Go Modules？

- **版本控制**：支持语义化版本（Semantic Versioning），可以锁定特定的版本（如 `v1.2.3`）。
    
- **项目独立**：每个项目拥有独立的 `go.mod`，互不干扰。
    
- **随处安家**：你的代码可以放在硬盘的任何地方。
    
- **自动下载**：只需在代码里 `import`，执行 `go build` 时系统会自动处理下载。
    

---

## 3. 具体示例说明

让我们通过一个简单的对比，看看两者的区别。

### 场景：你需要使用一个第三方库 `logrus` (日志库)

#### 在 GOPATH 模式下：

1. 你必须确保你的项目在 `$GOPATH/src/my_project`。
    
2. 运行 `go get github.com/sirupsen/logrus`。
    
3. 如果此时 `logrus` 的作者发布了一个破坏性的更新，你的代码可能瞬间“崩塌”，因为你的本地代码总是跟着远程库的最新版走。
    

#### 在 Go Modules 模式下：

1. 你可以在任何地方创建文件夹：`mkdir ~/Desktop/my_app && cd ~/Desktop/my_app`。
    
2. 初始化模块：`go mod init my_app`。此时会生成一个 `go.mod` 文件。
    
3. 编写代码：
    
    Go
    
    ```
    package main
    import "github.com/sirupsen/logrus"
    
    func main() {
        logrus.Info("Hello Modules!")
    }
    ```
    
4. 运行 `go run main.go`。Go 会自动下载依赖，并更新 `go.mod`：
    
    Plaintext
    
    ```
    // go.mod 内容示例
    module my_app
    
    go 1.22
    
    require github.com/sirupsen/logrus v1.9.3 // 锁定了具体版本
    ```
    
5. **结果**：无论 `logrus` 以后怎么更新，你的项目永远只会使用 `v1.9.3`，保证了项目的稳定性。
    

---

### 总结对比

| **特性**    | **GOPATH 模式**     | **Go Modules 模式 (推荐)** |
| --------- | ----------------- | ---------------------- |
| **存放位置**  | 必须在 `$GOPATH/src` | 任意位置                   |
| **版本切换**  | 困难（需手动删改源码）       | 简单（修改 `go.mod` 即可）     |
| **离线构建**  | 依赖本地全局源码          | 依赖本地缓存（GOMODCACHE）     |
| **多版本共存** | 不支持               | 支持                     |


# 项目案例-即时通信系统

![系统架构图](/PostImages/Pasted%20image%2020260324170809.webp)
### V0.1基础server构建
![创建服务器对象并启动服务](/PostImages/Pasted%20image%2020260324164448.webp)
项目架构：
```powershell
(base) PS D:\goproject\src\gostudy\IM-System> tree /f
卷 Data 的文件夹 PATH 列表
卷序列号为 DEAF-7D9D
D:.
    main.go
    server.exe
    server.go
```
server.go:
```
package main

import (
	"fmt"
	"net"
)

type Server struct {
	Ip   string
	Port int
}

// 创建一个Server的接口
func NewServer(ip string, port int) *Server {
	server := &Server{
		Ip:   ip,
		Port: port,
	}
	return server
}

func (this *Server) Handler(conn net.Conn) {
	// 当前链接的业务
	fmt.Println("链接建立成功")
}

// 启动服务器的接口
func (this *Server) Start() {
	// socket listen
	listener, err := net.Listen("tcp", fmt.Sprintf("%s:%d", this.Ip, this.Port))
	if err != nil {
		fmt.Println("net.Listen err:", err)
		return
	}
	//close listen socket
	defer listener.Close()

	for {
		// accept
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("listener accept err:", err)
			continue
		}

		// do handler
		go this.Handler(conn)

	}

}
```
main.go:
```
package main

func main() {
	server := NewServer("127.0.0.1", 8888)
	server.Start()
}
```
Output:
server1启动server.exe
```
(base) PS D:\goproject\src\gostudy\IM-System> ./server.exe
```
server2进行服务器链接
```
(base) PS D:\goproject\src\gostudy\IM-System> telnet 127.0.0.1 8888
```
server1返回
```
(base) PS D:\goproject\src\gostudy\IM-System> ./server.exe
链接建立成功
```
### V0.2用户上线及广播功能
![创建User对象监听channel信息](/PostImages/Pasted%20image%2020260325135740.webp)
![实现OnlineMap模块](/PostImages/Pasted%20image%2020260325135838.webp)
server.go:
```
package main

import (
	"fmt"
	"net"
	"sync"
)

type Server struct {
	Ip   string
	Port int

	// 在线用户列表
	OnlineMap map[string]*User
	mapLock   sync.RWMutex

	// 消息广播的channel
	Message chan string
}

// 创建一个Server的接口
func NewServer(ip string, port int) *Server {
	server := &Server{
		Ip:        ip,
		Port:      port,
		OnlineMap: make(map[string]*User),
		Message:   make(chan string),
	}
	return server
}

// 监听Message广播消息channel的goroutine，一旦有消息就发送全部的在线User
func (this *Server) ListenMessage() {
	for {
		msg := <-this.Message

		// 将msg发送给全部的在线User
		this.mapLock.Lock()
		for _, cli := range this.OnlineMap {
			cli.C <- msg
		}
		this.mapLock.Unlock()
	}
}

// 广播消息的方法
func (this *Server) BroadCast(user *User, msg string) {
	sendMsg := "[" + user.Addr + "]" +user.Name + ":" + msg
	this.Message <- sendMsg
}

func (this *Server) Handler(conn net.Conn) {
	// 当前链接的业务
	// fmt.Println("链接建立成功")

	user := NewUser(conn)
	// 用户上线，加入至OnlineMap
	this.mapLock.Lock()
	this.OnlineMap[user.Name] = user
	this.mapLock.Unlock()

	// 广播当前用户上线消息
	this.BroadCast(user, "已上线")

	// 当前handler阻塞
	select {}
}

// 启动服务器的接口
func (this *Server) Start() {
	// socket listen
	listener, err := net.Listen("tcp", fmt.Sprintf("%s:%d", this.Ip, this.Port))
	if err != nil {
		fmt.Println("net.Listen err:", err)
		return
	}
	//close listen socket
	defer listener.Close()

	// 启动监听Message的goroutine
	go this.ListenMessage()

	for {
		// accept
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("listener accept err:", err)
			continue
		}

		// do handler
		go this.Handler(conn)

	}

}
```
user.go:
```
package main

import "net"

type User struct {
	Name string
	Addr string
	C    chan string
	conn net.Conn
}

//创建一个用户的API
func NewUser(conn net.Conn) *User {
	userAddr := conn.RemoteAddr().String()

	user := &User{
		Name: userAddr,
		Addr: userAddr,
		C:    make(chan string),
		conn: conn,
	}
	//启动监听当前user channel消息的goroutine
	go user.ListenMessage()
	return user
}

//监听当前User channel的方法，有消息则发送给对端客户端
func (this *User) ListenMessage() {
	for {
		msg := <-this.C
		this.conn.Write([]byte(msg + "\n"))
	}
}
```
main.go:
```
package main

func main() {
	server := NewServer("127.0.0.1", 8888)
	server.Start()
}
```
Output：
![在线用户可接收新用户上线广播](/PostImages/Pasted%20image%2020260325140329.webp)
### V0.3用户消息及广播
![增加群聊功能](/PostImages/Pasted%20image%2020260325143234.webp)
server.go:  仅在server.go Handle函数中增加了广播业务
```
package main

import (
	"bufio"
	"fmt"
	"net"
	"sync"
)

type Server struct {
	Ip   string
	Port int

	// 在线用户列表
	OnlineMap map[string]*User
	mapLock   sync.RWMutex

	// 消息广播的channel
	Message chan string
}

// 创建一个Server的接口
func NewServer(ip string, port int) *Server {
	server := &Server{
		Ip:        ip,
		Port:      port,
		OnlineMap: make(map[string]*User),
		Message:   make(chan string),
	}
	return server
}

// 监听Message广播消息channel的goroutine，一旦有消息就发送全部的在线User
func (this *Server) ListenMessage() {
	for {
		msg := <-this.Message

		// 将msg发送给全部的在线User
		this.mapLock.Lock()
		for _, cli := range this.OnlineMap {
			cli.C <- msg
		}
		this.mapLock.Unlock()
	}
}

// 广播消息的方法
func (this *Server) BroadCast(user *User, msg string) {
	sendMsg := "[" + user.Addr + "]" + user.Name + ":" + msg
	this.Message <- sendMsg
}

func (this *Server) Handler(conn net.Conn) {
	// 当前链接的业务
	// fmt.Println("链接建立成功")

	user := NewUser(conn)
	// 用户上线，加入至OnlineMap
	this.mapLock.Lock()
	this.OnlineMap[user.Name] = user
	this.mapLock.Unlock()

	// 广播当前用户上线消息
	this.BroadCast(user, "已上线")

	// 接受客户端发送的消息
	go func() {
		scanner := bufio.NewScanner(conn)
		for scanner.Scan() {
			//提取用户的消息(去除'\n')
			msg := scanner.Text()

			//当消息不为空时将得到的消息进行广播
			if len(msg) > 0 {
				this.BroadCast(user, msg)
			}
		}

		// 连接断开
		this.mapLock.Lock()
		delete(this.OnlineMap, user.Name)
		this.mapLock.Unlock()

		this.BroadCast(user, "下线")
		conn.Close()
	}()

	// 当前handler阻塞
	select {}
}

// 启动服务器的接口
func (this *Server) Start() {
	// socket listen
	listener, err := net.Listen("tcp", fmt.Sprintf("%s:%d", this.Ip, this.Port))
	if err != nil {
		fmt.Println("net.Listen err:", err)
		return
	}
	//close listen socket
	defer listener.Close()

	// 启动监听Message的goroutine
	go this.ListenMessage()

	for {
		// accept
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("listener accept err:", err)
			continue
		}

		// do handler
		go this.Handler(conn)

	}

}
```
Output：
![启动服务器后用户间可以进行通信(此时为群聊)](/PostImages/Pasted%20image%2020260325143134.webp)

### v0.4用户业务封装
![进行业务分离归并，将用户业务从server中转移至user](/PostImages/Pasted%20image%2020260325145149.webp)
将原先用户业务从server.go封装至user.go中
server.go:
```
package main

import (
	"bufio"
	"fmt"
	"net"
	"sync"
)

type Server struct {
	Ip   string
	Port int

	// 在线用户列表
	OnlineMap map[string]*User
	mapLock   sync.RWMutex

	// 消息广播的channel
	Message chan string
}

// 创建一个Server的接口
func NewServer(ip string, port int) *Server {
	server := &Server{
		Ip:        ip,
		Port:      port,
		OnlineMap: make(map[string]*User),
		Message:   make(chan string),
	}
	return server
}

// 监听Message广播消息channel的goroutine，一旦有消息就发送全部的在线User
func (this *Server) ListenMessage() {
	for {
		msg := <-this.Message

		// 将msg发送给全部的在线User
		this.mapLock.Lock()
		for _, cli := range this.OnlineMap {
			cli.C <- msg
		}
		this.mapLock.Unlock()
	}
}

// 广播消息的方法
func (this *Server) BroadCast(user *User, msg string) {
	sendMsg := "[" + user.Addr + "]" + user.Name + ":" + msg
	this.Message <- sendMsg
}

func (this *Server) Handler(conn net.Conn) {
	// 当前链接的业务
	// fmt.Println("链接建立成功")

	user := NewUser(conn, this)

	user.Online()

	// 接受客户端发送的消息
	go func() {
		scanner := bufio.NewScanner(conn)
		for scanner.Scan() {
			//提取用户的消息(去除'\n')
			msg := scanner.Text()

			//当消息不为空时将得到的消息进行广播
			if len(msg) > 0 {
				this.BroadCast(user, msg)
			}

			//用户针对msg进行消息处理
			user.DoMessage(msg)
		}

		// 连接断开
		user.Offline()
		conn.Close()
	}()

	// 当前handler阻塞
	select {}
}

// 启动服务器的接口
func (this *Server) Start() {
	// socket listen
	listener, err := net.Listen("tcp", fmt.Sprintf("%s:%d", this.Ip, this.Port))
	if err != nil {
		fmt.Println("net.Listen err:", err)
		return
	}
	//close listen socket
	defer listener.Close()

	// 启动监听Message的goroutine
	go this.ListenMessage()

	for {
		// accept
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("listener accept err:", err)
			continue
		}

		// do handler
		go this.Handler(conn)

	}

}
```
user.go:
```
package main

import "net"

type User struct {
	Name string
	Addr string
	C    chan string
	conn net.Conn

	server *Server
}

//创建一个用户的API
func NewUser(conn net.Conn, server *Server) *User {
	userAddr := conn.RemoteAddr().String()

	user := &User{
		Name: userAddr,
		Addr: userAddr,
		C:    make(chan string),
		conn: conn,

		server: server,
	}
	//启动监听当前user channel消息的goroutine
	go user.ListenMessage()
	return user
}

//用户的上线业务
func (this *User) Online() {
	// 用户上线，加入至OnlineMap
	this.server.mapLock.Lock()
	this.server.OnlineMap[this.Name] = this
	this.server.mapLock.Unlock()

	// 广播当前用户上线消息
	this.server.BroadCast(this, "已上线")
}

//用户下线业务
func (this *User) Offline() {
	// 用户上线，加入至OnlineMap
	this.server.mapLock.Lock()
	delete(this.server.OnlineMap, this.Name)
	this.server.mapLock.Unlock()

	// 广播当前用户上线消息
	this.server.BroadCast(this, "下线")
}

//用户处理消息的业务
func (this *User) DoMessage(msg string) {
	this.server.BroadCast(this, msg)
}

//监听当前User channel的方法，有消息则发送给对端客户端
func (this *User) ListenMessage() {
	for {
		msg := <-this.C
		this.conn.Write([]byte(msg + "\n"))
	}
}
```
Output：
![测试业务迁移后的功能状态](/PostImages/Pasted%20image%2020260325145420.webp)
### v0.5在线用户查询
![新增查询用户功能](/PostImages/Pasted%20image%2020260325183538.webp)
user.go新增：
```
func (this *User) SendMsg(msg string) {
	this.conn.Write([]byte(msg))
}

//用户处理消息的业务
func (this *User) DoMessage(msg string) {
	if msg == "who" {
		//查询当前在线用户
		this.server.mapLock.Lock()
		for _, user := range this.server.OnlineMap {
			onlineMsg := "[" + user.Addr + "]" + user.Name + ":" + "在线...\n"
			this.SendMsg(onlineMsg)
		}
		this.server.mapLock.Unlock()

	} else {
		this.server.BroadCast(this, msg)
	}
}
```
Output:
![可以查询到在线的不同用户](/PostImages/Pasted%20image%2020260325184137.webp)
### v0.6修改用户名
![增加用户间备注功能](/PostImages/Pasted%20image%2020260325185004.webp)
user.go新增
```
// 用户处理消息的业务
func (this *User) DoMessage(msg string) {
	if msg == "who" {
		//查询当前在线用户
		this.server.mapLock.Lock()
		for _, user := range this.server.OnlineMap {
			onlineMsg := "[" + user.Addr + "]" + user.Name + ":" + "在线...\n"
			this.SendMsg(onlineMsg)
		}
		this.server.mapLock.Unlock()

	} else if len(msg) > 7 && msg[:7] == "rename|" {
		//消息格式：rename|张三
		newName := strings.Split(msg, "|")[1]

		//判断name是否存在
		_, ok := this.server.OnlineMap[newName]
		if ok {
			this.SendMsg("当前用户名被使用\n")
		} else {
			this.server.mapLock.Lock()
			oldName := this.Name
			delete(this.server.OnlineMap, oldName)

			this.Name = newName
			this.server.OnlineMap[newName] = this
			this.server.mapLock.Unlock()

			this.SendMsg("你已经更新用户名：" + this.Name + "\n")
		}
	} else {
		this.server.BroadCast(this, msg)
	}
}
```
Output：
![备注功能成功](/PostImages/Pasted%20image%2020260325190309.webp)
### v0.7超时强踢功能
![新增10s超时强踢功能](/PostImages/Pasted%20image%2020260325191501.webp)
server.go func handler()新增
```
func (this *Server) Handler(conn net.Conn) {
	// 当前链接的业务
	// fmt.Println("链接建立成功")

	user := NewUser(conn, this)

	user.Online()

	//监听用户是否活跃的channel
	isLive := make(chan bool)

	// 接受客户端发送的消息
	go func() {
		scanner := bufio.NewScanner(conn)
		for scanner.Scan() {
			//提取用户的消息(去除'\n')
			msg := scanner.Text()

			//当消息不为空时将得到的消息进行广播
			if len(msg) > 0 {
				user.DoMessage(msg)
			}

			//用户的任意消息，代表当前用户是一个活跃的
			isLive <- true
		}

		// 连接断开
		user.Offline()
		conn.Close()
	}()

	// 当前handler阻塞
	for {
		select {
		case <-isLive:
			//当前用户活跃，应重置定时器
			//不做任何事情，未来激活select，更新定时器

		case <-time.After(time.Second * 10):
			//已经超时
			//将当前的User强制关闭

			user.SendMsg("你被踢了")
			close(user.C)
			conn.Close()
			return
		}
	}

}
```
Output：
![超时强踢功能成功](/PostImages/Pasted%20image%2020260325191258.webp)
### v0.8私聊功能
![新增私聊功能](/PostImages/Pasted%20image%2020260325193651.webp)
user.go func DoMessage() 新增
```
func (this *User) DoMessage(msg string) {
	if msg == "who" {
		//查询当前在线用户
		this.server.mapLock.Lock()
		for _, user := range this.server.OnlineMap {
			onlineMsg := "[" + user.Addr + "]" + user.Name + ":" + "在线...\n"
			this.SendMsg(onlineMsg)
		}
		this.server.mapLock.Unlock()

	} else if len(msg) > 7 && msg[:7] == "rename|" {
		//消息格式：rename|张三
		newName := strings.Split(msg, "|")[1]

		//判断name是否存在
		_, ok := this.server.OnlineMap[newName]
		if ok {
			this.SendMsg("当前用户名被使用\n")
		} else {
			this.server.mapLock.Lock()
			oldName := this.Name
			delete(this.server.OnlineMap, oldName)

			this.Name = newName
			this.server.OnlineMap[newName] = this
			this.server.mapLock.Unlock()

			this.SendMsg("你已经更新用户名：" + this.Name + "\n")
		}
	} else if len(msg) > 4 && msg[:3] == "to|" {
		//消息格式： to|zhangsan|消息内容

		//1 获取对方用户名
		remoteName := strings.Split(msg, "|")[1]
		if remoteName == ""{
			this.SendMsg("消息格式不正确，请使用 \"to|zhangsan|hello\"格式。\n")
			return
		}

		//2 根据用户名，得到对方user对象
		remoteUser, ok := this.server.OnlineMap[remoteName]
		if !ok {
			this.SendMsg("该用户名不存在\n")
			return
		}

		//3 获取消息内容，通过对方的User对象将消息内容发送过去
		content := strings.Split(msg, "|")[2]
		if content == "" {
			this.SendMsg("无消息内容，请重发\n")
			return
		}
		remoteUser.SendMsg(this.Name + "对您说:" + content)

	}else {
		this.server.BroadCast(this, msg)
	}
}
```
Output：
![指定用户进行私聊](/PostImages/Pasted%20image%2020260325193508.webp)

### v0.9客户端实现
新建client.go文件，实现server.go和user.go提供的方法
```
package main

import (
	"flag"
	"fmt"
	"io"
	"net"
	"os"
)

type Client struct {
	ServerIp   string
	ServerPort int
	Name       string
	conn       net.Conn
	flag       int //当前client的模式
}

func NewClient(serverIp string, serverPort int) *Client {
	//创建客户端对象
	client := &Client{
		ServerIp:   serverIp,
		ServerPort: serverPort,
		flag:       999,
	}

	//链接server
	conn, err := net.Dial("tcp", fmt.Sprintf("%s:%d", serverIp, serverPort))
	if err != nil {
		fmt.Println("net.Dial error:", err)
		return nil
	}
	client.conn = conn

	return client
}

func (client *Client) DealResponse() {
	//一旦有数据直接copy到stdout标准输出上
	io.Copy(os.Stdout, client.conn)
}

func (client *Client) menu() bool {
	var flag int

	fmt.Println("1.公聊模式")
	fmt.Println("2.私聊模式")
	fmt.Println("3.更新用户名")
	fmt.Println("0.退出")

	fmt.Scanln(&flag)

	if flag >= 0 && flag <= 3 {
		client.flag = flag
		return true
	} else {
		fmt.Println(">>>>请输入合法范围内的数字<<<<")
		return false
	}
}

func (client *Client) PublicChat() {
	var chatMsg string

	fmt.Println(">>>>请输入聊天内容，exit退出")
	fmt.Scanln(&chatMsg)

	for chatMsg != "exit" {
		if len(chatMsg) != 0 {
			sendMsg := chatMsg + "\n"
			_, err := client.conn.Write([]byte(sendMsg))
			if err != nil {
				fmt.Println("conn Write err:", err)
				break
			}
		}

		chatMsg = ""
		fmt.Println(">>>>请输入聊天内容，exit退出")
		fmt.Scanln(&chatMsg)
	}
}

func (client *Client) PrivateChat() {
	var remoteName string
	var chatMsg string

	client.SelectUsers()
	fmt.Println(">>>>请输入聊天对象[用户名]，exit退出")
	fmt.Scanln(&remoteName)

	for remoteName != "exit" {
		fmt.Println(">>>>请输入消息内容，exit退出")
		fmt.Scanln(&chatMsg)

		for chatMsg != "exit" {
			if len(chatMsg) != 0 {
				sendMsg := "to|" + remoteName + "|" + chatMsg + "\n\n"
				_, err := client.conn.Write([]byte(sendMsg))
				if err != nil {
					fmt.Println("conn Write err:", err)
					break
				}
			}
			chatMsg = ""
			fmt.Println(">>>>请输入聊天内容，exit退出")
			fmt.Scanln(&chatMsg)
		}

		client.SelectUsers()
		fmt.Println(">>>>请输入聊天对象[用户名]，exit退出")
		fmt.Scanln(&remoteName)
	}
}

func (client *Client) SelectUsers() {
	sendMsg := "who\n"
	_, err := client.conn.Write([]byte(sendMsg))
	if err != nil {
		fmt.Println("conn.Write err:", err)
		return
	}
}

func (client *Client) UpdateName() bool {
	fmt.Println(">>>>请输入用户名：")
	fmt.Scanln(&client.Name)

	sendMsg := "rename|" + client.Name + "\n"
	_, err := client.conn.Write([]byte(sendMsg))
	if err != nil {
		fmt.Println("conn.Write err:", err)
		return false
	}
	return true
}

func (client *Client) Run() {
	for client.flag != 0 {
		for client.menu() != true {

		}

		//根据不同模式处理不同业务
		switch client.flag {
		case 1:
			//公聊模式
			client.PublicChat()
			break
		case 2:
			//私聊模式
			client.PrivateChat()
			break
		case 3:
			//更新用户名
			client.UpdateName()
			break
		}
	}
}

var serverIp string
var serverPort int

func init() {
	flag.StringVar(&serverIp, "ip", "127.0.0.1", "设置服务器IP地址(默认为127.0.0.1)")
	flag.IntVar(&serverPort, "port", 8888, "设置服务器端口(默认为8888)")
}

func main() {
	//命令行解析
	flag.Parse()

	client := NewClient(serverIp, serverPort)
	if client == nil {
		fmt.Println(">>>>>> 链接服务器失败...")
		return
	}
	fmt.Println(">>>>>> 链接服务器成功...")

	// 【关键】：启动一个单独的 goroutine 来监听服务器回传的消息
	go client.DealResponse()

	// 启动客户端业务
	client.Run()
}
```
```shell
(base) PS D:\goproject\src\gostudy\IM-System> go build -o client.exe client.go
(base) PS D:\goproject\src\gostudy\IM-System> ./server
(base) PS D:\goproject\src\gostudy\IM-System> 
```
Output：
![实现用户client端功能](/PostImages/Pasted%20image%2020260326123204.webp)

# 我们GO语言的愉快学习之路就到此为止，在此特别感谢**刘丹冰**老师的8h转职Golang教程。
