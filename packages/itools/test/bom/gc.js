import itools from '../itools';

describe('gc', () => {
  test('return getElementsByClassName', function () {
    const button = document.createElement('button');
    button.innerText = 'click me';
    button.setAttribute('class', 'className');
    document.body.appendChild(button);
    const buttons = document.querySelectorAll('button');
    expect(buttons[0].innerText).toBe('click me');

    expect(buttons[0].className).toBe('className');
    expect(itools.gc('className')[0]).toEqual(buttons[0]);
  });
});
