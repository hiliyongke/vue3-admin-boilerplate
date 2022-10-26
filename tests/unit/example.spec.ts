import { shallowMount } from '@vue/test-utils';

const Component = {
  props: {
    msg: String
  },
  template: '<div>{{msg}}</div>'
};

describe('Component.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(Component, {
      props: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
