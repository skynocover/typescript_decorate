////////////////////////////////////////////////////////////////

///////////////////////    class 1    /////////////////////////

////////////////////////////////////////////////////////////////

export const registeredClasses = [];

export function Router(path: string, options?: object) {
  return (constructor: Function) => {
    registeredClasses.push({
      constructor,
      path,
      options,
    });
  };
}

// @Router('/')
// class HomePageRouter {
//   // routing functions
// }

// @Router('/blog', {
//   rss: '/blog/rss.xml',
// })
// class BlogRouter {
//   // routing functions
// }

// console.log(registeredClasses);

////////////////////////////////////////////////////////////////

///////////////////////    class 2    //////////////////////////

////////////////////////////////////////////////////////////////

export function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

export function logConstructor(constructor: Function) {
  const ret = {
    constructor,
    extensible: Object.isExtensible(constructor),
    frozen: Object.isFrozen(constructor),
    sealed: Object.isSealed(constructor),
    values: Object.values(constructor),
    properties: Object.getOwnPropertyDescriptors(constructor),
    members: {},
  };
  for (const key of Object.getOwnPropertyNames(constructor.prototype)) {
    ret.members[key] = constructor.prototype[key];
  }

  console.log(`ClassDecoratorExample `, ret);
}

// @sealed
// @logConstructor
// class ClassDecoratorExample {
//   constructor(x: number, y: number) {
//     console.log(`ClassDecoratorExample(${x}, ${y})`);
//   }
//   method() {
//     console.log(`method called`);
//   }
// }

// new ClassDecoratorExample(3, 4).method();

////////////////////////////////////////////////////////////////

///////////////////////    class 3     /////////////////////////

////////////////////////////////////////////////////////////////

export function BankCard(constructor: Function) {
  constructor.prototype.cardId = Math.floor(Math.random() * 1000);
}

// @BankCard
// class HSBCBankCard {
//   name: string;

//   constructor(name: string) {
//     this.name = name;
//   }
// }

// const card = new HSBCBankCard('Dennis');
// console.log(card.name);
// // @ts-ignore
// console.log(card.cardId);

////////////////////////////////////////////////////////////////

///////////////////////    class 4     /////////////////////////

////////////////////////////////////////////////////////////////

export function Override<T extends { new (...args: any[]): {} }>(target: T) {
  return class extends target {
    area(w: number, h: number) {
      return {
        w,
        h,
        area: w * h,
      };
    }
  };
}

// @Override
// class Overridden {
//   area(w: number, h: number) {
//     return w * h;
//   }
// }

// console.log(new Overridden().area(5, 6));
// console.log(new Overridden().area(6, 7));
