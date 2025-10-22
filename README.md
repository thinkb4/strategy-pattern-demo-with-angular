# Strategy Pattern Demo (Pure Angular)

Two screens to compare approaches:

- **Without Strategy** (default route): a component branches on an input `kind` and mixes orchestration with UI state.
- **With Strategy** : the same UI delegates all orchestration to pluggable strategies resolved via a registry and DI. The component can still accept a `kind` string, or a **concrete strategy instance** (great for unit tests).

## Run

```bash
npm install
npm start
```

Then open http://localhost:4200

## Add a new flow (Strategy version)

1. Create `new-flow.strategy.ts` implementing `RecordingStrategy`.
2. Bind it in `app.config.ts`:

```ts
provideRecordingStrategyBindings([
  // ...
  { kind: DemoKind.YourNewKind, strategy: YourNewStrategy }
]);
```

3. Use it in the page:

```html
<app-recorder-with title="Your New Flow" [strategy]="DemoKind.YourNewKind"></app-recorder-with>
```

No component churn required.
