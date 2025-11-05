import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormGroupCombobox } from '../../component/forms/combobox/formCombobox';

const meta: Meta<typeof FormGroupCombobox> = {
  title: 'Forms and Transactions/Combobox',
  component: FormGroupCombobox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormGroupCombobox>;

const countryOptions = [
  { value: 'af', text: 'Afghanistan' },
  { value: 'au', text: 'Australia' },
  { value: 'at', text: 'Austria' },
  { value: 'be', text: 'Belgium' },
  { value: 'br', text: 'Brazil' },
  { value: 'ca', text: 'Canada' },
  { value: 'cn', text: 'China' },
  { value: 'dk', text: 'Denmark' },
  { value: 'fi', text: 'Finland' },
  { value: 'fr', text: 'France' },
  { value: 'de', text: 'Germany' },
  { value: 'in', text: 'India' },
  { value: 'ie', text: 'Ireland' },
  { value: 'it', text: 'Italy' },
  { value: 'jp', text: 'Japan' },
  { value: 'mx', text: 'Mexico' },
  { value: 'nl', text: 'Netherlands' },
  { value: 'nz', text: 'New Zealand' },
  { value: 'no', text: 'Norway' },
  { value: 'pl', text: 'Poland' },
  { value: 'pt', text: 'Portugal' },
  { value: 'ru', text: 'Russia' },
  { value: 'sg', text: 'Singapore' },
  { value: 'za', text: 'South Africa' },
  { value: 'es', text: 'Spain' },
  { value: 'se', text: 'Sweden' },
  { value: 'ch', text: 'Switzerland' },
  { value: 'gb', text: 'United Kingdom' },
  { value: 'us', text: 'United States' },
];

export const AsFormItem: Story = {
  args: {
    label: 'Select a country',
    helper: 'Start typing or select from the list',
    options: countryOptions,
  },
};

export const WithValue: Story = {
  args: {
    label: 'Select a country',
    helper: 'Start typing or select from the list',
    value: 'Australia',
    options: countryOptions,
  },
};

export const WithError: Story = {
  args: {
    statusText: 'Please select a country',
    status: 'invalid',
    label: 'Select a country',
    helper: 'Start typing or select from the list',
    options: countryOptions,
  },
};

export const WithSuccess: Story = {
  args: {
    statusText: 'Valid country selected',
    status: 'valid',
    label: 'Select a country',
    helper: 'Start typing or select from the list',
    value: 'Australia',
    options: countryOptions,
  },
};

export const ShortList: Story = {
  args: {
    label: 'Select a fruit',
    helper: 'Type to filter options',
    options: [
      { value: 'apple', text: 'Apple' },
      { value: 'banana', text: 'Banana' },
      { value: 'cherry', text: 'Cherry' },
      { value: 'date', text: 'Date' },
      { value: 'grape', text: 'Grape' },
    ],
  },
};
