---
title: GoStudy - "Bangdream is myGO!!!!!"
category: Learn
description: "笔者学习Go语言时的一些记录"
author: Wm1NlkN
date: 2026-03-20
cover: /PostImages/Go.webp
readtime: 30 min read
---

![Go的吉祥物！](/PostImages/Go.webp)
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
```
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
```
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
```
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
```
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
```
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
```
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
```
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
```
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
```
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
```
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
```
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
```
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
```
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
```
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
```
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
```
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
```
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
![1:1则重新回到对应问题](/PostImages/Pasted%20image%2020260320163122.webp)
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
