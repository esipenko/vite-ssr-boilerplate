import { mount } from '@vue/test-utils';
import CountryList from './CountryList.vue';
import { describe, it } from 'vitest';
import { CountryListProps } from './CountryList.vue';

function countryListMount(props: CountryListProps) {
  return mount(CountryList, {
    props,
  });
}

describe('CountryList.vue', () => {
  it('should renders is page content is correct', () => {
    const wrapper = countryListMount({ countries: [] });
    console.log(wrapper.html());
    // expect(wrapper.inn()).toBe([]);
  });

  //   it('should render if props value is correct', () => {
  //     const message = 'Happy People';
  //     const testMessage = 'Happy People';
  //     const wrapper = mount(HelloWorld, {
  //       props: { message },
  //     });

  //     expect(wrapper.vm.message).toBe(testMessage);
  //   });
});
