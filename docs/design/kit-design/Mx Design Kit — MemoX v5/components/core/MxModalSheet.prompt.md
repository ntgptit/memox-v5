Bottom sheet — Play Menu, Repeat Mode Menu, Sort Menu, pickers. Grab handle + title + close + scroll body + optional sticky action row.

```jsx
<MxModalSheet open={open} title="Study what?" onClose={close}
  actions={<MxActionButton fullWidth>Start</MxActionButton>}>
  <MxListRow title="Learn" subtitle="120 new words" onClick={learn}/>
  <MxListRow title="Repeat" subtitle="83 words due" onClick={repeat}/>
</MxModalSheet>
```

Scrim closes on tap. Sheet + overlay render at the modal layer; the mount needs a `position: relative` ancestor (the app shell).
