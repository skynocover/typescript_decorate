import { upperCase } from './src/accessor';
import { registeredClasses, Router, sealed, logConstructor, BankCard, Override } from './src/class';
import { propertyInformation } from './src/property';
import { minAmmo } from './src/method';

@Router('/') // 將資料塞入一個外部的變數內
@sealed // 讓內部結構封裝不被刪除
// @logConstructor // 查看內部結構
@BankCard // 添加特定 property
@Override // 複寫特定 function
class BankHolder {
  ammo = 1;
  name: string;
  account: number = 200;

  @propertyInformation // 修改特定property的內容
  pin: string;

  constructor(name: string, pin: string) {
    this.name = name;
    this.pin = pin;
  }

  @upperCase // 複寫function
  get accountName(): string {
    return this.name;
  }

  area(w: number, h: number) {
    return w * h;
  }

  @minAmmo(1) // 取得內部的property並作判斷
  fireOnce() {
    console.log('Firing once in 3... 2... 1... 🔫');
  }
}

const kenny = new BankHolder('Kenny', '123456');
console.log(kenny.accountName);
console.log(kenny.area(5, 6));
// @ts-ignore
console.log(kenny.cardId);

console.log(registeredClasses);
kenny.pin;
kenny.pin = '654312';

kenny.fireOnce();
kenny.fireOnce();
