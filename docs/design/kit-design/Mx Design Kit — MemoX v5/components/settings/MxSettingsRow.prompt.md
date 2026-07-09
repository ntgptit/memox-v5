The settings-line primitive. Title + subtitle + trailing value/control. Opening settings never mutates data.

```jsx
<MxSettingsRow title="Native language" value="English" onClick={pick} />
<MxSettingsRow title="Auto backup" control={<MxSwitch checked onChange={t} />} />
<MxSettingsRow title="Cloud sync" unavailable />
<MxSettingsRow title="Restore data" tone="destructive" onClick={confirmRestore} />
```

`tone="destructive"` for high-risk; pair with MxConfirmDialog. `unavailable` shows "Soon".
