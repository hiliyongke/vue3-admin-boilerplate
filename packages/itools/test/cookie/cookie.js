import itools from '../itools';

describe('itools.cookie()', () => {
  const cookie = 'c=v; c1=v';
  const cookieName = 'name={%22foo%22:%22bar%22}';
  const object = {
    c: 'v1',
    c1: 'v',
    name: '{"foo":"bar"}'
  };
  const objectJson = {
    c: 'v1',
    c1: 'v',
    name: {
      foo: 'bar'
    }
  };

  test('itools.cookie() is a Function', () => {
    expect(itools.cookie()).toBeInstanceOf(Function);
    expect(itools.cookie().set).toBeInstanceOf(Function);
    expect(itools.cookie().get).toBeInstanceOf(Function);
    expect(itools.cookie().getJSON).toBeInstanceOf(Function);
    expect(itools.cookie().getJson).toBeInstanceOf(Function);
    expect(itools.cookie().remove).toBeInstanceOf(Function);
  });

  test('itools.cookie().set()', function () {
    itools.cookie().set('c', 'v');
    expect(document.cookie).toBe('c=v');
    itools.cookie().set('c1', 'v');
    expect(document.cookie).toBe(cookie);
  });

  test('itools.cookie().set() a object', function () {
    itools.cookie().set('name', { foo: 'bar' });
    expect(document.cookie).toBe(`${cookie}; ${cookieName}`);
  });

  test('document nil', function () {
    window.document = undefined;
    itools.cookie().set('c', 'v1');
    expect(document.cookie).toBe(`c=v1; c1=v; ${cookieName}`);
  });

  test('itools.cookie().get()', function () {
    const c = itools.cookie().get('c');
    expect(c).toBe('v1');
  });

  test('itools.cookie().get()', function () {
    const c = itools.cookie().get('c');
    const get = itools.cookie().get();
    const getJson = itools.cookie().getJSON();
    const getkey = itools.cookie().get('name');
    const getkeyJson = itools.cookie().getJson('name');

    expect(c).toBe('v1');
    expect(get).toEqual(object);
    expect(getJson).toEqual(objectJson);
    expect(getkey).toEqual(object.name);
    expect(getkeyJson).toEqual(objectJson.name);
  });

  test('itools.cookie().remove()', function () {
    itools.cookie().remove('c');
    const c = itools.cookie().get('c');
    expect(c).toBe(undefined);
  });

  test('itools.cookie() add read', function () {
    const wirte = itools.cookie().set('c1', 'v1');
    expect(wirte).toEqual('c1=v1; path=/');
    const read = itools.cookie().set('c2', 'v2');
    expect(read).toEqual('c2=v2; path=/');
    const readNew = itools.cookie().set('c2', 'v2');
    expect(readNew).toEqual('c2=v2; path=/');
  });

  test('itools.cookie().set() more', function () {
    itools.cookie().set('c3', 'v', {
      expires: 7,
      path: '/',
      domain: '.github.com',
      secure: true
    });
    expect(document.cookie).toBe(`c1=v1; ${cookieName}; c2=v2`);
  });

  test('itools.cookie() extend write decoder', function () {
    itools
      .cookie()
      .withConverter({
        write: function (value) {
          let encoded = value.replace('a', 'A');
          return itools.cookie().withConverter(encoded);
        }
      })
      .set('c', 'a;');
    expect(document.cookie).toBe(`c1=v1; ${cookieName}; c2=v2`);
  });

  test('itools.cookie() extend read decoder', function () {
    const readConverter = function (value) {
      return value.toUpperCase();
    };
    const api = itools.cookie().withConverter({
      read: readConverter
    });

    itools.cookie().withConverter(api).set('c2', 'a2;');

    expect(document.cookie).toBe(`c1=v1; ${cookieName}; c2=a2%3B`);
  });

  test('cookie error', function () {
    document.cookie = 'c1';
    itools.cookie().set('c', 'v2');

    expect(document.cookie).toBe(`c1=v1; ${cookieName}; c2=a2%3B; c1; c=v2`);
  });
});
