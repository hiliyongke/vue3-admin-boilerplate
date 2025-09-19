import itools from '../itools';

describe('construct', () => {
  class Dog {
    constructor(name) {
      this.name = name;
    }
  }
  class Cat {
    constructor(name) {
      this.name = name;
    }
  }

  class Goose {
    constructor(name) {
      this.name = name;
    }
  }

  class Elephant {
    constructor(name) {
      this.name = name;
    }
  }
  test('base example', () => {
    const classs = [Dog, Cat, Goose, Elephant];
    const randomClass = itools.random(classs);
    const animal = itools.construct(randomClass, 'animal', 300);
    expect(animal.name).toBe('animal');
  });
});
