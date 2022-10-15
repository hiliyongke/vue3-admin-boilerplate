import itools from '../itools';

describe('stopPropagation', () => {
  it('should pass example', () => {
    const button = document.createElement('button');
    button.innerText = 'click me';
    document.body.appendChild(button);
    const buttons = document.querySelectorAll('button');

    expect(buttons[0].innerText).toBe('click me'); // true

    buttons[0].addEventListener('touchmove', e => {
      e.target.innerText = 'touchmoved';
    });

    itools.stopPropagation(buttons);

    const touchmove = new Event('touchmove');
    buttons[0].dispatchEvent(touchmove);

    expect(buttons[0].innerText).toBe('touchmoved');
  });
});
