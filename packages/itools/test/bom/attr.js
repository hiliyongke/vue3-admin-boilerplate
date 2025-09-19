import itools from '../itools';

describe('attr', () => {
  test('set attributes', function () {
    const button = document.createElement('button');
    button.innerText = 'click me';
    itools.attr(button, 'sid', 'btn');
    document.body.appendChild(button);
    const buttons = document.querySelectorAll('button');
    expect(buttons[0].innerText).toBe('click me'); // true

    const output = {};
    const attrs = buttons[0].attributes;
    if (buttons[0].hasAttributes()) {
      for (let i = attrs.length - 1; i >= 0; i--) {
        const { name } = attrs[i];
        output[name] = attrs[i].value;
      }
      expect(output['sid']).toBe('btn'); // true
    }
  });
});
