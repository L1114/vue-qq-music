export default function es6lx() {
  // padStart方法: 当字符长度不为2时,在字符前面加个0
  console.log('1'.padStart(2, '0'))
  console.log('1'.padEnd(2, '0'))

  let user = {
    name: 'list',
    info: 'hello world'
  }
  abc`i am ${user.name},${user.info}`
  function abc(s, v1, v2) {
    console.log(s, v1, v2)
  }

  //* String.raw会在 \前面再加个\转义 导致\n换行失效
  console.log(String.raw`Hi\n${1 + 2}`)
  console.log(`Hi\n${1 + 2}`)

  //-9007199254740991 9007199254740991 js的精度范围在这2个数之间 即+-2的53次方;
  console.log(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)

  // 前者为false 后者true
  Number.isInteger('1')
  Number.isSafeInteger('1')


  //*********************
  //*
  //*数组的扩展
  //********************
  let arr1 = Array.of(1, 3, 5) //Array.of设置一个数组
  console.log(arr1)  // [1, 3, 5]
  console.log(Array.of())  // []
  let a = '我是类数组'
  let arr = Array.from(a) //把类数组a转换为真正的数组
  //并且遍历a数组,item为数组的每一项
  Array.from(a, function (item) {
    return item + '-'
  })

  // Array.fill(newItem,start,end)  把数组的第start项到第end项换成newItem(数组项数从1开始)
  console.log([1, 'sdf', undefined].fill(9)) //[9, 9, 9]
  console.log([1, 'sdf', undefined].fill(9, 1, 3)) //[1, 9, 9]


  //*********************
  //*
  //*函数的扩展
  //********************
  // ...set把传进来的所有参数转化为一个数组类似于arguments,不同的是arguments的第一个索引0的值不同, (...set后面不能再加参数)
  function test(...set) {
    for (let v of set) {
      console.log(v);//1,2,3,
    }
  }

  test(1, 2, 3)


  console.log(...[1, 2, 3]) //1 2 3//把数组[1,2,3]拆分成单个离散的值

  {
    let fn = v => v * 2
    console.log(fn(3)) //6
  }
  {
    let fn = () => 5
    console.log(fn()) //5
  }

  //*********************
  //*
  //*函数的扩展
  //********************
  {
    //简洁表达式
    let o = 1
    let k = 2
    // es5写法
    let es5 = {
      o: o,
      k: k
    }
    let es5_method = {
      hello: function () {
      }
    }
    // es6写法
    let es6 = {
      o,
      k
    }
    let es6_method = {
      hello(){

      }
    }
    console.log(es5 === es6)//true
    console.log(es5_method === es6_method) // true
  }
  {
    // 属性表达式
    let a = 'b'
    let es6_obj = {
      [a]: 'c' //[]里面可以是一个变量,表示'b'
    }
    console.log(es6_obj.b) // 'c'
  }

  {
    // 新增api
    console.log(Object.is('abc', 'abc'), 'abc' === 'abc')// true true   Object.is()方法相当于===全等方法
    console.log(Object.assign({a: 'a'}, {b: 'b'}))
    // Object{a:'a',b:'b'} ,assign() 把2个对象拷贝成一个  注意:1这是浅拷贝,2不能拷贝继承的属性和对象中不可枚举的属性

    let obj = {a: 1, b: 2}
    for(let [key,value] of Object.entries(obj)){
      console.log([key, value])
      //['a',1]
      //['b',2]
    }

  }
}
