import { mount } from '@vue/test-utils';
import CountryList from './CountryList.vue';
import { describe, it, expect } from 'vitest';
import { CountryListProps } from './CountryList.vue';

function countryListMount(props: CountryListProps) {
  return mount(CountryList, {
    props,
  });
}
function getCountryText({
  name,
  code,
}: {
  name: string;
  code: string;
}): string {
  return `Country: ${name}, code: ${code}`;
}

describe('CountryList.vue', () => {
  it('Should not render any li if countries are empty array', () => {
    const wrapper = countryListMount({ countries: [] });
    const li = wrapper.find('ul > li');
    expect(li.exists()).toBe(false);
  });

  it('should render if props value is correct', () => {
    const countries = [
      { code: 'ru', name: 'Russia' },
      { code: 'us', name: 'USA' },
    ];

    const props: CountryListProps = { countries };
    const wrapper = countryListMount(props);
    const liWrapper = wrapper.findAll('li');
    expect(liWrapper.length).toBe(2);
    expect(liWrapper[0].text()).toBe(getCountryText(countries[0]));
    expect(liWrapper[1].text()).toBe(getCountryText(countries[1]));
  });
});
