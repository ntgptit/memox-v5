Long-term Statistics chart panel (per-day trend). Renders only real finalized data; with none, shows a friendly empty state (never a fake line). Read-only.

```jsx
<MxStatsChartPanel title="Quality by day"
  xLabels={["Mon","Tue","Wed","Thu","Fri"]}
  series={[
    { name:"Correct", tone:"correct", points:[12,18,15,22,20] },
    { name:"Wrong", tone:"wrong", points:[4,3,6,2,3] },
  ]} />
<MxStatsChartPanel empty />
```
