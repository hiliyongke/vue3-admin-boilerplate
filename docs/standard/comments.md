## 注释

写注释意味着没有注释就无法表达清楚，而最好用代码去表达。

> 不要注释坏代码，重写吧！— _Brian W. Kernighan and P. J. Plaugher_

**不需要注释**

- 不要为了注释而注释
- 不要给不好的名字加注释，而应该名字取好
- 不要为那些从代码本身就能快速推断的事实写注释

**需要写注释**

- 对于为什么代码写成这样而不是那样的内在理由（指导性批注）
- 常量背后的故事，为什么是这个值
- 给读者意料之外的行为加上注释
- 在文件/类的级别上使用“全局观”注释来解释所有的部分是如何一起工作的
- 用注释来总结代码块，使读者不致迷失在细节中
- 尽量精确地描述函数的行为
- 声明代码的高层次意图，而非明显的细节
- 在注释中使用输入/输出例子进行说明
- 代码中的缺陷，使用标记

### 代码自解释而不是用注释

代码即文档。

**:-1: 反例:**

```ts
// Check if subscription is active.
if (subscription.endDate > Date.now) {
}
```

**:+1: 正例:**

```ts
const isSubscriptionActive = subscription.endDate > Date.now;

if (isSubscriptionActive) {
  /* ... */
}
```

### 不要将注释掉的代码留在代码库中

版本控制存在的一个理由，就是让旧代码成为历史。

**:-1: 反例:**

```ts
class User {
  name: string;
  email: string;
  // age: number;
  // jobPosition: string;
}
```

**:+1: 正例:**

```ts
class User {
  name: string;
  email: string;
}
```

### 不要像写日记一样写注释

记住，使用版本控制！不需要保留无用代码、注释掉的代码，尤其像日记一样的注释。使用`git log`来获取历史。

**:-1: 反例:**

```ts
/**
 * 2016-12-20: Removed monads, didn't understand them (RM)
 * 2016-10-01: Improved using special monads (JP)
 * 2016-02-03: Added type-checking (LI)
 * 2015-03-14: Implemented combine (JR)
 */
function combine(a: number, b: number): number {
  return a + b;
}
```

**:+1: 正例:**

```ts
function combine(a: number, b: number): number {
  return a + b;
}
```

### 避免使用注释标记位置

它们常常扰乱代码。要让代码结构化，函数和变量要有合适的缩进和格式。

另外，你可以使用支持代码折叠的 IDE (看下 Visual Studio Code [代码折叠](https://code.visualstudio.com/updates/v1_17#_folding-regions)).

**:-1: 反例:**

```ts
////////////////////////////////////////////////////////////////////////////////
// Client class
////////////////////////////////////////////////////////////////////////////////
class Client {
  id: number;
  name: string;
  address: Address;
  contact: Contact;

  ////////////////////////////////////////////////////////////////////////////////
  // public methods
  ////////////////////////////////////////////////////////////////////////////////
  public describe(): string {
    // ...
  }

  ////////////////////////////////////////////////////////////////////////////////
  // private methods
  ////////////////////////////////////////////////////////////////////////////////
  private describeAddress(): string {
    // ...
  }

  private describeContact(): string {
    // ...
  }
}
```

**:+1: 正例:**

```ts
class Client {
  id: number;
  name: string;
  address: Address;
  contact: Contact;

  public describe(): string {
    // ...
  }

  private describeAddress(): string {
    // ...
  }

  private describeContact(): string {
    // ...
  }
}
```

### TODO 注释

当发现自己需要在代码中留下注释，以提醒后续改进时，使用`// TODO`注释。大多数 IDE 都对这类注释提供了特殊的支持，你可以快速浏览整个`TODO`列表。

但是，请记住**TODO**注释并不是坏代码的借口。

**:-1: 反例:**

```ts
function getActiveSubscriptions(): Promise<Subscription[]> {
  // ensure `dueDate` is indexed.
  return db.subscriptions.find({ dueDate: { $lte: new Date() } });
}
```

**:+1: 正例:**

```ts
function getActiveSubscriptions(): Promise<Subscription[]> {
  // TODO: ensure `dueDate` is indexed.
  return db.subscriptions.find({ dueDate: { $lte: new Date() } });
}
```
