Confirmation dialog. `variant` scales the risk signal so destructive/high-risk never look like a normal confirm.

```jsx
<MxConfirmDialog variant="destructive" title="Delete this deck?"
  message="All cards in the deck will be deleted." confirmLabel="Delete" onConfirm={del} onCancel={close} />
<MxConfirmDialog variant="highRisk" title="Restore data?"
  message="This backup will overwrite current data." confirmLabel="Restore" />
```

Use for every destructive/high-risk (restore, cloud overwrite) action.
