Pill-track tab switcher — Statistics tabs, filters. Controlled via `value` + `onChange`.

```jsx
<MxSegmentedControl
  options={["Words", "Time", "Quality"]}
  value={tab}
  onChange={setTab}
/>
```

Options may be objects `{value,label,disabled}`. Selected segment uses an elevated surface, never a raw colour.
