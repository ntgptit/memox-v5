Primary button primitive — every text action in MemoX is an MxActionButton. Use for CTAs, form submits, sheet actions.

```jsx
<MxActionButton variant="primary" size="bottom" fullWidth onClick={start}>Start studying</MxActionButton>
<MxActionButton variant="secondary">Cancel</MxActionButton>
<MxActionButton variant="destructive" leadingIcon={<TrashIcon/>}>Delete deck</MxActionButton>
```

Variants: `primary` (filled purple), `secondary` (lavender surface, readable purple text via `action-onSecondary`), `ghost` (transparent with a subtle border + readable purple text, so it still reads as a button in dark), `destructive` (red tint + border). Sizes: `small`, `medium`, `bottom` (54px sticky CTA). `loading` shows a spinner; `disabled` mutes to the disabled token. Destructive actions still require a confirm pattern (see MxConfirmDialog).
