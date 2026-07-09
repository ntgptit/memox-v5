Failure state with retry — load/save/finalize/restore/permission errors. Copy must reassure the user their data is safe.

```jsx
<MxErrorState
  title="Couldn’t save session"
  message="Your learning data is safe. Retry?"
  action={<MxActionButton variant="secondary">Retry</MxActionButton>} />
```

Finalize-failed must preserve learning data — say so in the message.
