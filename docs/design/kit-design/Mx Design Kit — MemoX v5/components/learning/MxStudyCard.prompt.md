Central study surface — Korean prompt + Vietnamese meaning. `variant="both"` for reviewMode (front+back), `prompt` for guess/recall/match, `answer` for fillMode.

```jsx
<MxStudyCard variant="both" prompt="결제하다" meaning="To pay" onAudio={play} />
```

Long meanings wrap comfortably; never shrink below the study.explanation size.
