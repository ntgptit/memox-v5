One reminder: tappable time, weekday chips, enable switch, delete. Never starts a session or mutates learning data.

```jsx
<MxReminderRow time="13:00" enabled
  weekdays={[{key:'mon',label:'T.2',selected:true}, {key:'tue',label:'T.3'}]}
  onToggleWeekday={tw} onDelete={del} invalid={false} />
```

`invalid` (no weekday selected) shows an inline warning outline.
