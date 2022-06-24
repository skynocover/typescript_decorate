////////////////////////////////////////////////////////////////

///////////////////////    Method 1    /////////////////////////

////////////////////////////////////////////////////////////////

export const minAmmo =
  (ammo: number) => (target: Object, prop: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;

    descriptor.value = function (...args) {
      if (this.ammo >= ammo) {
        this.ammo -= ammo;
        original.apply(this);
      } else console.log('Not enough ammo!');
    };

    return descriptor;
  };

// class Gun {
//   ammo = 1;

//   @minAmmo(2)
//   fireTwice() {
//     console.log('Firing in 3... 2... 1... 🔫');
//   }

//   @minAmmo(1)
//   fireOnce() {
//     console.log('Firing once in 3... 2... 1... 🔫');
//   }
// }

// new Gun().fireTwice();
// new Gun().fireOnce();

////////////////////////////////////////////////////////////////

///////////////////////    Method 2    /////////////////////////

////////////////////////////////////////////////////////////////

const methodToKeyMap = {
  withdrawFromAccountA: 'accountA',
  withdrawFromAccountB: 'accountB',
};

export const minimumAmount = (amount: number) => {
  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalFn = descriptor.value;

    descriptor.value = function (...args: any) {
      if (this[methodToKeyMap[propertyKey]] - args[0] > amount) {
        originalFn.call(this, args);
      } else {
        console.log(`${methodToKeyMap[propertyKey]}: Not enough money`);
      }
    };
    return descriptor;
  };
};

class BankMethodDecorator {
  accountA: number = 200;
  accountB: number = 1000;

  @minimumAmount(100)
  withdrawFromAccountA(amount: number) {
    this.accountA = this.accountA - amount;
  }

  @minimumAmount(200)
  withdrawFromAccountB(amount: number) {
    this.accountB = this.accountB - amount;
  }
}

const bankMethodDecorator = new BankMethodDecorator();
// bankMethodDecorator.withdrawFromAccountA(200);
// bankMethodDecorator.withdrawFromAccountB(200);
// console.log(bankMethodDecorator.accountA);
// console.log(bankMethodDecorator.accountB);
