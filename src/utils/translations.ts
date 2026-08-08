type MessageValue = string | number;

export type CountForms = {
  one: string;
  other: string;
};

export function formatMessage(
  template: string,
  values: Record<string, MessageValue>,
) {
  return template.replace(/\{(\w+)\}/g, (placeholder, key: string) => {
    const value = values[key];
    return value === undefined ? placeholder : String(value);
  });
}

export function formatCount(count: number, forms: CountForms) {
  return `${count} ${count === 1 ? forms.one : forms.other}`;
}
