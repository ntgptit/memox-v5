/* @ds-bundle: {"format":4,"namespace":"MxDesignKitMemoXV5_9f1387","components":[{"name":"MxActionButton","sourcePath":"components/core/MxActionButton.jsx"},{"name":"MxBadge","sourcePath":"components/core/MxBadge.jsx"},{"name":"MxCard","sourcePath":"components/core/MxCard.jsx"},{"name":"MxEmptyState","sourcePath":"components/core/MxEmptyState.jsx"},{"name":"MxErrorState","sourcePath":"components/core/MxErrorState.jsx"},{"name":"MxIconButton","sourcePath":"components/core/MxIconButton.jsx"},{"name":"MxListRow","sourcePath":"components/core/MxListRow.jsx"},{"name":"MxModalSheet","sourcePath":"components/core/MxModalSheet.jsx"},{"name":"MxSegmentedControl","sourcePath":"components/core/MxSegmentedControl.jsx"},{"name":"MxTopBar","sourcePath":"components/core/MxTopBar.jsx"},{"name":"MxMetricCard","sourcePath":"components/data/MxMetricCard.jsx"},{"name":"MxStatsChartPanel","sourcePath":"components/data/MxStatsChartPanel.jsx"},{"name":"MxCallout","sourcePath":"components/feedback/MxCallout.jsx"},{"name":"MxConfirmDialog","sourcePath":"components/feedback/MxConfirmDialog.jsx"},{"name":"MxSnackbar","sourcePath":"components/feedback/MxSnackbar.jsx"},{"name":"MxAnswerOption","sourcePath":"components/learning/MxAnswerOption.jsx"},{"name":"MxFillInputPanel","sourcePath":"components/learning/MxFillInputPanel.jsx"},{"name":"MxMatchTile","sourcePath":"components/learning/MxMatchTile.jsx"},{"name":"MxRecallPanel","sourcePath":"components/learning/MxRecallPanel.jsx"},{"name":"MxSessionResultSummary","sourcePath":"components/learning/MxSessionResultSummary.jsx"},{"name":"MxStudyCard","sourcePath":"components/learning/MxStudyCard.jsx"},{"name":"MxStudyProgressBar","sourcePath":"components/learning/MxStudyProgressBar.jsx"},{"name":"MxAvatar","sourcePath":"components/navigation/MxAvatar.jsx"},{"name":"MxBottomNav","sourcePath":"components/navigation/MxBottomNav.jsx"},{"name":"MxSectionHeader","sourcePath":"components/navigation/MxSectionHeader.jsx"},{"name":"MxTabs","sourcePath":"components/navigation/MxTabs.jsx"},{"name":"MxLanguageRow","sourcePath":"components/settings/MxLanguageRow.jsx"},{"name":"MxReminderRow","sourcePath":"components/settings/MxReminderRow.jsx"},{"name":"MxSettingsRow","sourcePath":"components/settings/MxSettingsRow.jsx"},{"name":"MxSettingsSection","sourcePath":"components/settings/MxSettingsSection.jsx"},{"name":"MxSwitch","sourcePath":"components/settings/MxSwitch.jsx"},{"name":"MxThemePresetTile","sourcePath":"components/settings/MxThemePresetTile.jsx"},{"name":"MxWeekdayChip","sourcePath":"components/settings/MxWeekdayChip.jsx"}],"sourceHashes":{"components/core/MxActionButton.jsx":"370dadd346aa","components/core/MxBadge.jsx":"fce7a43d0a1e","components/core/MxCard.jsx":"e4a150e25d0b","components/core/MxEmptyState.jsx":"080855c94195","components/core/MxErrorState.jsx":"2df0f864a780","components/core/MxIconButton.jsx":"08e481737b39","components/core/MxListRow.jsx":"5f77ca227755","components/core/MxModalSheet.jsx":"e125db0f18b4","components/core/MxSegmentedControl.jsx":"7e8185d9f7f0","components/core/MxTopBar.jsx":"dffa7bce1d27","components/data/MxMetricCard.jsx":"3f1176c6eb8e","components/data/MxStatsChartPanel.jsx":"6e2262d4f268","components/feedback/MxCallout.jsx":"390e3190f08b","components/feedback/MxConfirmDialog.jsx":"947f53d09bd4","components/feedback/MxSnackbar.jsx":"78e47a360676","components/learning/MxAnswerOption.jsx":"475eea600a7b","components/learning/MxFillInputPanel.jsx":"1229d52b3d61","components/learning/MxMatchTile.jsx":"f88d93002ad5","components/learning/MxRecallPanel.jsx":"4747396f4a82","components/learning/MxSessionResultSummary.jsx":"2584166056da","components/learning/MxStudyCard.jsx":"1d232b4fa92a","components/learning/MxStudyProgressBar.jsx":"97fac3a09f54","components/navigation/MxAvatar.jsx":"119e93dc6065","components/navigation/MxBottomNav.jsx":"74fed993a4c5","components/navigation/MxSectionHeader.jsx":"76516f2017ff","components/navigation/MxTabs.jsx":"7d2ec3e1feaf","components/settings/MxLanguageRow.jsx":"a9d06d4d8b9e","components/settings/MxReminderRow.jsx":"d2538611c6c1","components/settings/MxSettingsRow.jsx":"5809e65d780c","components/settings/MxSettingsSection.jsx":"8d3d1db4bf50","components/settings/MxSwitch.jsx":"1bd2881203d5","components/settings/MxThemePresetTile.jsx":"abab2b092ed8","components/settings/MxWeekdayChip.jsx":"e531bc143250","guidelines/state-gallery.jsx":"d1e2b55053b4"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MxDesignKitMemoXV5_9f1387 = window.MxDesignKitMemoXV5_9f1387 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/MxActionButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MxActionButton — the single button primitive for MemoX. Every tappable
 * text action in the app is an MxActionButton variant; screens never hand-roll
 * a button style. Consumes only Mx tokens, so it is correct in dark + light.
 */
function MxActionButton({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  disabled = false,
  loading = false,
  leadingIcon = null,
  trailingIcon = null,
  onClick,
  type = "button",
  style,
  ...rest
}) {
  const heights = {
    small: "var(--mx-size-button-height-compact)",
    medium: "var(--mx-size-button-height)",
    bottom: "var(--mx-size-button-height-bottom)"
  };
  const palette = {
    primary: {
      bg: "var(--mx-color-action-primary)",
      color: "var(--mx-color-text-onAction)",
      border: "1px solid transparent"
    },
    secondary: {
      bg: "var(--mx-color-action-secondary)",
      color: "var(--mx-color-action-primary)",
      border: "1px solid transparent"
    },
    ghost: {
      bg: "var(--mx-color-action-ghost)",
      color: "var(--mx-color-action-primary)",
      border: "1px solid transparent"
    },
    destructive: {
      bg: "var(--mx-color-destructive-surface)",
      color: "var(--mx-color-destructive-text)",
      border: "var(--mx-border-destructive)"
    }
  }[variant];
  const isDisabled = disabled || loading;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--mx-space-8)",
    height: heights[size],
    padding: size === "small" ? "0 var(--mx-space-16)" : "0 var(--mx-space-24)",
    width: fullWidth ? "100%" : "auto",
    borderRadius: "var(--mx-radius-pill)",
    fontFamily: "var(--mx-font-display)",
    fontSize: "var(--mx-text-button-size)",
    lineHeight: "var(--mx-text-button-line)",
    fontWeight: "var(--mx-text-button-weight)",
    letterSpacing: "var(--mx-text-button-tracking)",
    whiteSpace: "nowrap",
    background: isDisabled ? "var(--mx-color-action-primaryDisabled)" : palette.bg,
    color: isDisabled ? "var(--mx-color-text-disabled)" : palette.color,
    border: isDisabled ? "1px solid transparent" : palette.border,
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: loading ? 0.85 : 1,
    transition: "background var(--mx-motion-fast) var(--mx-ease-standard), transform var(--mx-motion-fast) var(--mx-ease-standard)",
    WebkitTapHighlightColor: "transparent",
    userSelect: "none",
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: isDisabled,
    onClick: onClick,
    style: base,
    "aria-busy": loading || undefined,
    onPointerDown: e => {
      if (!isDisabled) e.currentTarget.style.transform = "scale(0.98)";
    },
    onPointerUp: e => e.currentTarget.style.transform = "scale(1)",
    onPointerLeave: e => e.currentTarget.style.transform = "scale(1)"
  }, rest), loading && /*#__PURE__*/React.createElement(MxSpinner, null), !loading && leadingIcon, children, !loading && trailingIcon);
}
function MxSpinner() {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 16,
      height: 16,
      borderRadius: "50%",
      border: "2px solid currentColor",
      borderTopColor: "transparent",
      display: "inline-block",
      animation: "mx-spin 0.7s linear infinite"
    }
  });
}
Object.assign(__ds_scope, { MxActionButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MxActionButton.jsx", error: String((e && e.message) || e) }); }

// components/core/MxBadge.jsx
try { (() => {
/**
 * MxBadge — small status pill for SRS lifecycle, due workload, and generic
 * states. Uses semantic tokens so Due (amber) never reads as Wrong/Destructive
 * (red), and pre-SRS (slate) never reads as an error. Pairs colour with a text
 * label — colour is never the only signal.
 */
function MxBadge({
  children,
  tone = "neutral",
  size = "medium",
  icon = null,
  style
}) {
  const tones = {
    neutral: ["var(--mx-color-srs-preSrsSurface)", "var(--mx-color-srs-preSrs)"],
    preSrs: ["var(--mx-color-srs-preSrsSurface)", "var(--mx-color-srs-preSrs)"],
    active: ["var(--mx-color-state-selectedSurface)", "var(--mx-color-srs-active)"],
    due: ["var(--mx-color-feedback-warningSurface)", "var(--mx-color-srs-due)"],
    noDue: ["var(--mx-color-feedback-correctSurface)", "var(--mx-color-srs-noDue)"],
    mastered: ["rgba(168,143,255,0.16)", "var(--mx-color-srs-mastered)"],
    lapse: ["var(--mx-color-feedback-wrongSurface)", "var(--mx-color-srs-lapse)"],
    correct: ["var(--mx-color-feedback-correctSurface)", "var(--mx-color-feedback-correct)"],
    wrong: ["var(--mx-color-feedback-wrongSurface)", "var(--mx-color-feedback-wrong)"],
    info: ["var(--mx-color-feedback-infoSurface)", "var(--mx-color-feedback-info)"]
  };
  const [bg, fg] = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--mx-space-4)",
      background: bg,
      color: fg,
      fontFamily: "var(--mx-font-display)",
      fontSize: size === "small" ? "11px" : "var(--mx-text-label-medium-size)",
      lineHeight: 1,
      fontWeight: "var(--mx-weight-semibold)",
      padding: size === "small" ? "3px 7px" : "5px 10px",
      borderRadius: "var(--mx-radius-pill)",
      letterSpacing: "0.01em",
      whiteSpace: "nowrap",
      ...style
    }
  }, icon, children);
}
Object.assign(__ds_scope, { MxBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MxBadge.jsx", error: String((e && e.message) || e) }); }

// components/core/MxCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MxCard — the surface container primitive. Everything boxed in MemoX (deck
 * rows wrappers, panels, study surfaces, metric tiles) is an MxCard variant.
 * `state` drives learning/selection feedback outlines (selected/correct/wrong)
 * without changing the base surface — keeping selection ≠ correctness.
 */
function MxCard({
  children,
  variant = "default",
  // default | elevated | interactive
  state = "none",
  // none | selected | correct | wrong | disabled
  padding = "16",
  onClick,
  style,
  ...rest
}) {
  const bg = variant === "elevated" ? "var(--mx-color-surface-elevated)" : "var(--mx-color-surface-card)";
  const stateBorder = {
    none: "var(--mx-border-default)",
    selected: "var(--mx-border-selected)",
    correct: "var(--mx-border-correct)",
    wrong: "var(--mx-border-wrong)",
    disabled: "var(--mx-border-subtle)"
  }[state];
  const stateBg = {
    none: bg,
    selected: "var(--mx-color-state-selectedSurface)",
    correct: "var(--mx-color-feedback-correctSurface)",
    wrong: "var(--mx-color-feedback-wrongSurface)",
    disabled: "var(--mx-color-state-disabledSurface)"
  }[state];
  const interactive = variant === "interactive" || !!onClick;
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: state === "disabled" ? undefined : onClick,
    role: interactive ? "button" : undefined,
    tabIndex: interactive && state !== "disabled" ? 0 : undefined,
    style: {
      background: stateBg,
      border: stateBorder,
      borderRadius: "var(--mx-radius-lg)",
      padding: `var(--mx-space-${padding})`,
      boxShadow: variant === "elevated" ? "var(--mx-elevation-medium)" : "var(--mx-elevation-none)",
      color: "var(--mx-color-text-primary)",
      opacity: state === "disabled" ? 0.55 : 1,
      cursor: interactive && state !== "disabled" ? "pointer" : "default",
      transition: "border-color var(--mx-motion-fast) var(--mx-ease-standard), background var(--mx-motion-fast) var(--mx-ease-standard), transform var(--mx-motion-fast) var(--mx-ease-standard)",
      ...style
    },
    onPointerDown: e => {
      if (interactive && state !== "disabled") e.currentTarget.style.transform = "scale(0.99)";
    },
    onPointerUp: e => e.currentTarget.style.transform = "scale(1)",
    onPointerLeave: e => e.currentTarget.style.transform = "scale(1)"
  }, rest), children);
}
Object.assign(__ds_scope, { MxCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MxCard.jsx", error: String((e && e.message) || e) }); }

// components/core/MxEmptyState.jsx
try { (() => {
/**
 * MxEmptyState — non-error "nothing here" states: no decks, no due cards,
 * empty search, unavailable/future feature. Icon slot + title + message +
 * optional action. Deliberately calm (never styled like an error) — no-due is
 * a positive/neutral state, not a failure.
 */
function MxEmptyState({
  icon = null,
  title,
  message,
  action = null,
  tone = "neutral",
  // neutral | positive | unavailable
  style
}) {
  const iconColor = {
    neutral: "var(--mx-color-text-tertiary)",
    positive: "var(--mx-color-srs-noDue)",
    unavailable: "var(--mx-color-text-disabled)"
  }[tone];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "var(--mx-space-12)",
      padding: "var(--mx-space-40) var(--mx-space-24)",
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--mx-radius-full)",
      background: "var(--mx-color-state-loadingSurface)",
      color: iconColor
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--mx-font-display)",
      fontSize: "var(--mx-text-title-medium-size)",
      lineHeight: "var(--mx-text-title-medium-line)",
      fontWeight: "var(--mx-weight-bold)",
      color: "var(--mx-color-text-primary)"
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--mx-text-body-medium-size)",
      lineHeight: "var(--mx-text-body-medium-line)",
      color: "var(--mx-color-text-secondary)",
      maxWidth: 280,
      textWrap: "pretty"
    }
  }, message), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--mx-space-8)"
    }
  }, action));
}
Object.assign(__ds_scope, { MxEmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MxEmptyState.jsx", error: String((e && e.message) || e) }); }

// components/core/MxErrorState.jsx
try { (() => {
/**
 * MxErrorState — the failure counterpart to MxEmptyState. Load/save/finalize/
 * restore/permission failures. Uses feedback-wrong tint + a retry action.
 * Copy must reassure that user data is preserved (finalize-failed keeps data).
 */
function MxErrorState({
  icon = null,
  title = "Something went wrong",
  message,
  action = null,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "alert",
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "var(--mx-space-12)",
      padding: "var(--mx-space-40) var(--mx-space-24)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--mx-radius-full)",
      background: "var(--mx-color-feedback-wrongSurface)",
      color: "var(--mx-color-feedback-wrong)",
      fontSize: 26,
      fontWeight: 700
    }
  }, icon || "!"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--mx-font-display)",
      fontSize: "var(--mx-text-title-medium-size)",
      lineHeight: "var(--mx-text-title-medium-line)",
      fontWeight: "var(--mx-weight-bold)",
      color: "var(--mx-color-text-primary)"
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--mx-text-body-medium-size)",
      lineHeight: "var(--mx-text-body-medium-line)",
      color: "var(--mx-color-text-secondary)",
      maxWidth: 300,
      textWrap: "pretty"
    }
  }, message), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--mx-space-8)"
    }
  }, action));
}
Object.assign(__ds_scope, { MxErrorState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MxErrorState.jsx", error: String((e && e.message) || e) }); }

// components/core/MxIconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MxIconButton — a square, icon-only tap target (≥44px). Used for top-bar
 * actions, audio, close, more, delete. Because icon-only actions lose meaning,
 * `label` is REQUIRED and applied as aria-label (accessibility rule).
 */
function MxIconButton({
  icon,
  label,
  variant = "ghost",
  size = "medium",
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const dim = size === "small" ? 36 : "var(--mx-size-touch-target)";
  const palette = {
    ghost: {
      bg: "transparent",
      color: "var(--mx-color-text-secondary)"
    },
    surface: {
      bg: "var(--mx-color-surface-elevated)",
      color: "var(--mx-color-text-primary)"
    },
    destructive: {
      bg: "transparent",
      color: "var(--mx-color-destructive-text)"
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: dim,
      height: dim,
      flex: "0 0 auto",
      borderRadius: "var(--mx-radius-full)",
      border: "none",
      background: palette.bg,
      color: disabled ? "var(--mx-color-text-disabled)" : palette.color,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background var(--mx-motion-fast) var(--mx-ease-standard)",
      WebkitTapHighlightColor: "transparent",
      ...style
    },
    onPointerEnter: e => {
      if (!disabled && variant === "ghost") e.currentTarget.style.background = "var(--mx-color-state-loadingSurface)";
    },
    onPointerLeave: e => {
      if (variant === "ghost") e.currentTarget.style.background = "transparent";
    }
  }, rest), icon);
}
Object.assign(__ds_scope, { MxIconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MxIconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/MxListRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MxListRow — the deck/content list-row primitive. Leading slot (icon/avatar/
 * progress), title + optional subtitle, trailing slot (value, badge, chevron,
 * or play action). Supports disabled + error variants. One row model for Deck
 * Management, Flashcard List, and generic lists.
 */
function MxListRow({
  title,
  subtitle,
  leading = null,
  trailing = null,
  variant = "default",
  // default | error
  disabled = false,
  onClick,
  showChevron = false,
  style,
  ...rest
}) {
  const interactive = !!onClick && !disabled;
  const titleColor = variant === "error" ? "var(--mx-color-feedback-wrong)" : disabled ? "var(--mx-color-text-disabled)" : "var(--mx-color-text-primary)";
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: interactive ? onClick : undefined,
    role: interactive ? "button" : undefined,
    tabIndex: interactive ? 0 : undefined,
    "aria-disabled": disabled || undefined,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--mx-space-12)",
      minHeight: subtitle ? "var(--mx-size-list-row-height-two-line)" : "var(--mx-size-list-row-height)",
      padding: "var(--mx-space-12) var(--mx-space-16)",
      background: "transparent",
      borderRadius: "var(--mx-radius-md)",
      cursor: interactive ? "pointer" : "default",
      opacity: disabled ? 0.55 : 1,
      transition: "background var(--mx-motion-fast) var(--mx-ease-standard)",
      ...style
    },
    onPointerEnter: e => {
      if (interactive) e.currentTarget.style.background = "var(--mx-color-state-loadingSurface)";
    },
    onPointerLeave: e => e.currentTarget.style.background = "transparent"
  }, rest), leading && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 auto",
      display: "flex"
    }
  }, leading), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 auto",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--mx-font-display)",
      fontSize: "var(--mx-text-body-large-size)",
      lineHeight: "var(--mx-text-body-large-line)",
      fontWeight: "var(--mx-weight-semibold)",
      color: titleColor,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--mx-text-body-small-size)",
      lineHeight: "var(--mx-text-body-small-line)",
      color: "var(--mx-color-text-tertiary)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      marginTop: "1px"
    }
  }, subtitle)), trailing && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 auto",
      display: "flex",
      alignItems: "center",
      gap: "var(--mx-space-8)"
    }
  }, trailing), showChevron && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: "var(--mx-color-text-tertiary)",
      flex: "0 0 auto",
      fontSize: 18
    }
  }, "\u203A"));
}
Object.assign(__ds_scope, { MxListRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MxListRow.jsx", error: String((e && e.message) || e) }); }

// components/core/MxModalSheet.jsx
try { (() => {
/**
 * MxModalSheet — bottom sheet primitive (Play Menu, Repeat Mode Menu, Sort
 * Menu, pickers). Rounded top, grab handle, title + close, scrollable content,
 * optional sticky action row. Scrim closes on tap. `destructive` tints the
 * action row for confirm-style sheets. Overlay + sheet sit at the modal layer.
 */
function MxModalSheet({
  open = true,
  title,
  onClose,
  children,
  actions = null,
  style
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      zIndex: "var(--mx-layer-modal)",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      background: "var(--mx-color-overlay-scrim)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    role: "dialog",
    "aria-modal": "true",
    style: {
      width: "100%",
      maxHeight: "var(--mx-size-sheet-max-height)",
      display: "flex",
      flexDirection: "column",
      background: "var(--mx-color-surface-modal)",
      borderTopLeftRadius: "var(--mx-radius-xl)",
      borderTopRightRadius: "var(--mx-radius-xl)",
      borderTop: "var(--mx-border-subtle)",
      boxShadow: "var(--mx-elevation-sheet)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "var(--mx-space-8) 0 var(--mx-space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 36,
      height: 4,
      borderRadius: 999,
      background: "var(--mx-color-border-strong)"
    }
  })), title && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "var(--mx-space-8) var(--mx-space-20) var(--mx-space-12)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--mx-font-display)",
      fontSize: "var(--mx-text-title-medium-size)",
      lineHeight: "var(--mx-text-title-medium-line)",
      fontWeight: "var(--mx-weight-bold)",
      color: "var(--mx-color-text-primary)"
    }
  }, title), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Close",
    onClick: onClose,
    style: {
      width: "var(--mx-size-touch-target)",
      height: "var(--mx-size-touch-target)",
      marginRight: "calc(-1 * var(--mx-space-8))",
      border: "none",
      background: "transparent",
      color: "var(--mx-color-text-secondary)",
      fontSize: 22,
      cursor: "pointer",
      borderRadius: "var(--mx-radius-full)"
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: "auto",
      padding: "0 var(--mx-space-20) var(--mx-space-16)"
    }
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--mx-space-12)",
      padding: "var(--mx-space-12) var(--mx-space-20)",
      paddingBottom: "calc(var(--mx-space-20) + env(safe-area-inset-bottom, 0px))",
      borderTop: "var(--mx-divider-default)"
    }
  }, actions)));
}
Object.assign(__ds_scope, { MxModalSheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MxModalSheet.jsx", error: String((e && e.message) || e) }); }

// components/core/MxSegmentedControl.jsx
try { (() => {
/**
 * MxSegmentedControl — a pill-track tab switcher (Statistics tabs Words/Time/
 * Quality, filter toggles). Controlled: pass `value` + `onChange`. Options
 * can be disabled. Selected segment uses an elevated surface, never a raw hue.
 */
function MxSegmentedControl({
  options,
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: "flex",
      gap: "var(--mx-space-2)",
      padding: "var(--mx-space-4)",
      background: "var(--mx-color-surface-base)",
      border: "var(--mx-border-subtle)",
      borderRadius: "var(--mx-radius-pill)",
      ...style
    }
  }, options.map(opt => {
    const key = typeof opt === "string" ? opt : opt.value;
    const label = typeof opt === "string" ? opt : opt.label;
    const disabled = typeof opt === "object" && opt.disabled;
    const selected = key === value;
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      role: "tab",
      "aria-selected": selected,
      disabled: disabled,
      onClick: () => !disabled && onChange && onChange(key),
      style: {
        flex: 1,
        height: 34,
        border: "none",
        borderRadius: "var(--mx-radius-pill)",
        background: selected ? "var(--mx-color-surface-elevated)" : "transparent",
        boxShadow: selected ? "var(--mx-elevation-low)" : "none",
        color: disabled ? "var(--mx-color-text-disabled)" : selected ? "var(--mx-color-text-primary)" : "var(--mx-color-text-secondary)",
        fontFamily: "var(--mx-font-display)",
        fontSize: "var(--mx-text-label-large-size)",
        fontWeight: selected ? "var(--mx-weight-semibold)" : "var(--mx-weight-medium)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background var(--mx-motion-fast) var(--mx-ease-standard)",
        whiteSpace: "nowrap",
        padding: "0 var(--mx-space-12)"
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { MxSegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MxSegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/core/MxTopBar.jsx
try { (() => {
/**
 * MxTopBar — the screen header primitive. Leading (back/close) + title (with
 * long-title truncation) + trailing actions. `variant` tunes it for standard,
 * study (compact, centred title), and settings screens. Sticky by default at
 * the sticky layer.
 */
function MxTopBar({
  title,
  subtitle,
  leading = null,
  actions = null,
  variant = "default",
  // default | study | settings
  sticky = true,
  style
}) {
  const centred = variant === "study";
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--mx-space-8)",
      height: 56,
      padding: "0 var(--mx-space-8) 0 var(--mx-space-4)",
      background: variant === "settings" ? "var(--mx-color-surface-base)" : "var(--mx-color-background-app)",
      borderBottom: variant === "study" ? "none" : "var(--mx-border-subtle)",
      position: sticky ? "sticky" : "relative",
      top: 0,
      zIndex: "var(--mx-layer-sticky)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 auto",
      display: "flex"
    }
  }, leading), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 auto",
      minWidth: 0,
      textAlign: centred ? "center" : "left",
      paddingLeft: centred ? 0 : "var(--mx-space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--mx-font-display)",
      fontSize: "var(--mx-text-title-medium-size)",
      lineHeight: "var(--mx-text-title-medium-line)",
      fontWeight: "var(--mx-weight-bold)",
      letterSpacing: "var(--mx-text-title-medium-tracking)",
      color: "var(--mx-color-text-primary)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--mx-text-caption-size)",
      lineHeight: "var(--mx-text-caption-line)",
      color: "var(--mx-color-text-tertiary)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 auto",
      display: "flex",
      alignItems: "center",
      gap: "var(--mx-space-2)"
    }
  }, actions));
}
Object.assign(__ds_scope, { MxTopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MxTopBar.jsx", error: String((e && e.message) || e) }); }

// components/data/MxMetricCard.jsx
try { (() => {
/**
 * MxMetricCard — a labelled stat tile (Statistics, Activity summary, Session
 * Result). Value uses the tabular stat.number role; optional delta shows a
 * signed change with correct/wrong tone. Numbers here are always real,
 * finalized data — never fabricated placeholders.
 */
function MxMetricCard({
  label,
  value,
  unit = null,
  delta = null,
  tone = "neutral",
  style
}) {
  const accent = {
    neutral: "var(--mx-color-text-primary)",
    word: "var(--mx-color-chart-wordMetric)",
    time: "var(--mx-color-chart-timeMetric)",
    correct: "var(--mx-color-chart-qualityCorrect)",
    wrong: "var(--mx-color-chart-qualityWrong)"
  }[tone];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--mx-space-4)",
      padding: "var(--mx-space-16)",
      background: "var(--mx-color-surface-card)",
      border: "var(--mx-border-default)",
      borderRadius: "var(--mx-radius-md)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--mx-text-body-small-size)",
      color: "var(--mx-color-text-secondary)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--mx-space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mx-tabular",
    style: {
      fontSize: "var(--mx-text-stat-number-size)",
      lineHeight: "var(--mx-text-stat-number-line)",
      fontWeight: 700,
      color: accent,
      letterSpacing: "var(--mx-text-stat-number-tracking)"
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--mx-text-body-small-size)",
      color: "var(--mx-color-text-tertiary)"
    }
  }, unit)), delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--mx-text-caption-size)",
      fontWeight: 600,
      color: delta >= 0 ? "var(--mx-color-feedback-correct)" : "var(--mx-color-feedback-wrong)"
    }
  }, delta >= 0 ? "▲" : "▼", " ", Math.abs(delta)));
}
Object.assign(__ds_scope, { MxMetricCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MxMetricCard.jsx", error: String((e && e.message) || e) }); }

// components/data/MxStatsChartPanel.jsx
try { (() => {
/**
 * MxStatsChartPanel — the long-term Statistics chart container (per-day trend).
 * Renders a lightweight multi-series line chart from real, finalized data. When
 * there is NO data it shows a friendly empty state — never fake numbers or a
 * placeholder line. Read-only: opening it never mutates learning data.
 *
 * `series`: [{ name, tone, points:[y…] }]  · `xLabels`: string[] (days)
 * tone maps to chart tokens (word/time/correct/wrong/neutral).
 */
function MxStatsChartPanel({
  title = null,
  legend = true,
  series = [],
  xLabels = [],
  height = 180,
  empty = false,
  style
}) {
  const toneColor = t => ({
    word: "var(--mx-color-chart-wordMetric)",
    time: "var(--mx-color-chart-timeMetric)",
    correct: "var(--mx-color-chart-qualityCorrect)",
    wrong: "var(--mx-color-chart-qualityWrong)",
    neutral: "var(--mx-color-chart-neutralTotal)"
  })[t] || "var(--mx-color-chart-neutralTotal)";
  const allPoints = series.flatMap(s => s.points);
  const max = Math.max(1, ...allPoints);
  const W = 320;
  const H = height;
  const pad = 8;
  const toX = (i, n) => pad + i * (W - pad * 2) / Math.max(1, n - 1);
  const toY = v => H - pad - v / max * (H - pad * 2);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--mx-space-12)",
      padding: "var(--mx-space-16)",
      background: "var(--mx-color-surface-card)",
      border: "var(--mx-border-default)",
      borderRadius: "var(--mx-radius-lg)",
      ...style
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--mx-font-display)",
      fontSize: "var(--mx-text-label-large-size)",
      fontWeight: 600,
      color: "var(--mx-color-text-primary)"
    }
  }, title), empty || series.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: H,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--mx-space-8)",
      color: "var(--mx-color-text-tertiary)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "bar-chart-3",
    style: {
      width: 26,
      height: 26
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--mx-text-body-small-size)"
    }
  }, "No statistics data yet")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    width: "100%",
    height: H,
    role: "img",
    "aria-label": "Bi\u1EC3u \u0111\u1ED3 th\u1ED1ng k\xEA theo ng\xE0y",
    preserveAspectRatio: "none"
  }, [0.25, 0.5, 0.75, 1].map(g => /*#__PURE__*/React.createElement("line", {
    key: g,
    x1: pad,
    x2: W - pad,
    y1: toY(max * g),
    y2: toY(max * g),
    stroke: "var(--mx-color-chart-grid)",
    strokeWidth: "1"
  })), series.map((s, si) => {
    const d = s.points.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i, s.points.length)} ${toY(v)}`).join(" ");
    return /*#__PURE__*/React.createElement("g", {
      key: si
    }, /*#__PURE__*/React.createElement("path", {
      d: d,
      fill: "none",
      stroke: toneColor(s.tone),
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), s.points.map((v, i) => /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: toX(i, s.points.length),
      cy: toY(v),
      r: "2.5",
      fill: toneColor(s.tone)
    })));
  })), xLabels.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "var(--mx-text-caption-size)",
      color: "var(--mx-color-chart-axis)"
    }
  }, xLabels.map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, l))), legend && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--mx-space-16)",
      paddingTop: "var(--mx-space-4)"
    }
  }, series.map((s, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--mx-space-6)",
      fontSize: "var(--mx-text-body-small-size)",
      color: "var(--mx-color-text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 3,
      background: toneColor(s.tone)
    }
  }), s.name)))));
}
Object.assign(__ds_scope, { MxStatsChartPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MxStatsChartPanel.jsx", error: String((e && e.message) || e) }); }

// components/feedback/MxCallout.jsx
try { (() => {
/**
 * MxCallout — an inline banner for context messages: info, warning,
 * destructive, no-due, unavailable. Icon + colour + text (never colour alone).
 * No-due is styled calm/positive — it is NOT an error.
 */
function MxCallout({
  tone = "info",
  title = null,
  children,
  icon = null,
  style
}) {
  const map = {
    info: ["var(--mx-color-feedback-infoSurface)", "var(--mx-color-feedback-info)", "info"],
    warning: ["var(--mx-color-feedback-warningSurface)", "var(--mx-color-feedback-warning)", "alert-triangle"],
    destructive: ["var(--mx-color-destructive-surface)", "var(--mx-color-destructive-text)", "alert-octagon"],
    noDue: ["var(--mx-color-feedback-correctSurface)", "var(--mx-color-srs-noDue)", "check-circle-2"],
    unavailable: ["var(--mx-color-state-unavailableSurface)", "var(--mx-color-text-tertiary)", "clock"]
  };
  const [bg, fg, defIcon] = map[tone] || map.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "note",
    style: {
      display: "flex",
      gap: "var(--mx-space-12)",
      padding: "var(--mx-space-12) var(--mx-space-16)",
      background: bg,
      border: `1px solid ${fg}`,
      borderRadius: "var(--mx-radius-md)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "0 0 auto",
      color: fg,
      display: "flex",
      marginTop: 1
    }
  }, icon || /*#__PURE__*/React.createElement("i", {
    "data-lucide": defIcon,
    style: {
      width: 18,
      height: 18
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 auto",
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--mx-font-display)",
      fontSize: "var(--mx-text-label-large-size)",
      fontWeight: 600,
      color: "var(--mx-color-text-primary)",
      marginBottom: 2
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--mx-text-body-small-size)",
      lineHeight: "var(--mx-text-body-small-line)",
      color: "var(--mx-color-text-secondary)",
      textWrap: "pretty"
    }
  }, children)));
}
Object.assign(__ds_scope, { MxCallout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/MxCallout.jsx", error: String((e && e.message) || e) }); }

// components/feedback/MxConfirmDialog.jsx
try { (() => {
/**
 * MxConfirmDialog — centred confirmation dialog. `variant` scales the risk
 * signal: normal, destructive (delete), high-risk (restore/cloud-sync — extra
 * warning callout). High-risk actions must never look like a normal confirm.
 * Sits at the dialog layer, above sheets.
 */
function MxConfirmDialog({
  open = true,
  variant = "normal",
  // normal | destructive | highRisk
  title,
  message,
  warning = null,
  // extra warning line for high-risk
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  style
}) {
  if (!open) return null;
  const isDestructive = variant === "destructive" || variant === "highRisk";
  return /*#__PURE__*/React.createElement("div", {
    onClick: onCancel,
    style: {
      position: "absolute",
      inset: 0,
      zIndex: "var(--mx-layer-dialog)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "var(--mx-space-24)",
      background: "var(--mx-color-overlay-scrim)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    role: "alertdialog",
    "aria-modal": "true",
    style: {
      width: "100%",
      maxWidth: "var(--mx-size-modal-width)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--mx-space-16)",
      padding: "var(--mx-space-24)",
      background: "var(--mx-color-surface-modal)",
      border: "var(--mx-border-default)",
      borderRadius: "var(--mx-radius-xl)",
      boxShadow: "var(--mx-elevation-modal)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--mx-space-8)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--mx-space-8)"
    }
  }, isDestructive && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      color: "var(--mx-color-destructive-text)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": variant === "highRisk" ? "shield-alert" : "alert-triangle",
    style: {
      width: 22,
      height: 22
    }
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--mx-font-display)",
      fontSize: "var(--mx-text-title-medium-size)",
      lineHeight: "var(--mx-text-title-medium-line)",
      fontWeight: 700,
      color: "var(--mx-color-text-primary)"
    }
  }, title)), message && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--mx-text-body-medium-size)",
      lineHeight: "var(--mx-text-body-medium-line)",
      color: "var(--mx-color-text-secondary)",
      textWrap: "pretty"
    }
  }, message)), (warning || variant === "highRisk") && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--mx-space-8)",
      padding: "var(--mx-space-12)",
      background: "var(--mx-color-feedback-warningSurface)",
      border: "1px solid var(--mx-color-feedback-warning)",
      borderRadius: "var(--mx-radius-md)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "0 0 auto",
      color: "var(--mx-color-feedback-warning)",
      display: "flex",
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "alert-triangle",
    style: {
      width: 16,
      height: 16
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--mx-text-body-small-size)",
      lineHeight: "var(--mx-text-body-small-line)",
      color: "var(--mx-color-text-secondary)",
      textWrap: "pretty"
    }
  }, warning || "This is a high-risk action that may overwrite your data. Make sure you have a backup.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--mx-space-12)",
      marginTop: "var(--mx-space-4)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onCancel,
    style: dlgBtn("cancel")
  }, cancelLabel), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onConfirm,
    style: dlgBtn(isDestructive ? "destructive" : "primary")
  }, confirmLabel))));
}
function dlgBtn(kind) {
  const base = {
    flex: 1,
    height: "var(--mx-size-button-height)",
    borderRadius: "var(--mx-radius-md)",
    font: "var(--mx-weight-semibold) var(--mx-text-button-size)/1 var(--mx-font-display)",
    cursor: "pointer"
  };
  if (kind === "cancel") return {
    ...base,
    background: "var(--mx-color-action-secondary)",
    color: "var(--mx-color-text-primary)",
    border: "var(--mx-border-default)"
  };
  if (kind === "destructive") return {
    ...base,
    background: "var(--mx-color-destructive-text)",
    color: "var(--mx-color-text-onDestructive)",
    border: "none"
  };
  return {
    ...base,
    background: "var(--mx-color-action-primary)",
    color: "var(--mx-color-text-onAction)",
    border: "none"
  };
}
Object.assign(__ds_scope, { MxConfirmDialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/MxConfirmDialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/MxSnackbar.jsx
try { (() => {
/**
 * MxSnackbar — transient bottom toast: success, error, warning, info. Sits at
 * the toast layer. Optional single action (e.g. Hoàn tác). Colour is paired
 * with a leading glyph.
 */
function MxSnackbar({
  tone = "info",
  children,
  action = null,
  onAction = null,
  style
}) {
  const map = {
    success: ["var(--mx-color-feedback-correct)", "check-circle-2"],
    error: ["var(--mx-color-feedback-wrong)", "alert-octagon"],
    warning: ["var(--mx-color-feedback-warning)", "alert-triangle"],
    info: ["var(--mx-color-feedback-info)", "info"]
  };
  const [accent, icon] = map[tone] || map.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--mx-space-12)",
      padding: "var(--mx-space-12) var(--mx-space-16)",
      background: "var(--mx-color-surface-elevated)",
      border: "var(--mx-border-default)",
      borderRadius: "var(--mx-radius-md)",
      boxShadow: "var(--mx-elevation-high)",
      maxWidth: 440,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "0 0 auto",
      color: accent,
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 20,
      height: 20
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "1 1 auto",
      fontSize: "var(--mx-text-body-medium-size)",
      color: "var(--mx-color-text-primary)",
      textWrap: "pretty"
    }
  }, children), action && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAction,
    style: {
      flex: "0 0 auto",
      border: "none",
      background: "transparent",
      color: "var(--mx-color-action-primary)",
      font: "600 var(--mx-text-label-large-size)/1 var(--mx-font-display)",
      cursor: "pointer",
      padding: "var(--mx-space-4) var(--mx-space-8)"
    }
  }, action));
}
Object.assign(__ds_scope, { MxSnackbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/MxSnackbar.jsx", error: String((e && e.message) || e) }); }

// components/learning/MxAnswerOption.jsx
try { (() => {
/**
 * MxAnswerOption — a single choice in guessMode (multiple choice). States:
 * default, selected, correct, wrong, disabled. Correct/wrong pair colour with
 * a leading status glyph so the signal is never colour-only. Feedback here is
 * pre-SRS learning in New Learning, SRS grading in Repeat — same visual.
 */
function MxAnswerOption({
  children,
  state = "default",
  // default | selected | correct | wrong | disabled
  onClick,
  style
}) {
  const map = {
    default: {
      bg: "var(--mx-color-surface-card)",
      border: "var(--mx-border-default)",
      color: "var(--mx-color-text-primary)",
      glyph: null
    },
    selected: {
      bg: "var(--mx-color-state-selectedSurface)",
      border: "var(--mx-border-selected)",
      color: "var(--mx-color-text-primary)",
      glyph: null
    },
    correct: {
      bg: "var(--mx-color-feedback-correctSurface)",
      border: "var(--mx-border-correct)",
      color: "var(--mx-color-feedback-correct)",
      glyph: "check"
    },
    wrong: {
      bg: "var(--mx-color-feedback-wrongSurface)",
      border: "var(--mx-border-wrong)",
      color: "var(--mx-color-feedback-wrong)",
      glyph: "x"
    },
    disabled: {
      bg: "var(--mx-color-state-disabledSurface)",
      border: "var(--mx-border-subtle)",
      color: "var(--mx-color-text-disabled)",
      glyph: null
    }
  };
  const s = map[state];
  const interactive = state === "default" || state === "selected";
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: !interactive,
    onClick: interactive ? onClick : undefined,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--mx-space-12)",
      width: "100%",
      minHeight: "var(--mx-size-touch-target)",
      padding: "var(--mx-space-12) var(--mx-space-16)",
      background: s.bg,
      border: s.border,
      borderRadius: "var(--mx-radius-md)",
      color: s.color,
      font: "var(--mx-weight-medium) var(--mx-text-body-large-size)/var(--mx-text-body-large-line) var(--mx-font-body)",
      textAlign: "left",
      cursor: interactive ? "pointer" : "default",
      transition: "border-color var(--mx-motion-fast) var(--mx-ease-standard), background var(--mx-motion-fast) var(--mx-ease-standard)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "1 1 auto",
      overflowWrap: "anywhere"
    }
  }, children), s.glyph && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "0 0 auto",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": s.glyph,
    style: {
      width: 20,
      height: 20
    }
  })));
}
Object.assign(__ds_scope, { MxAnswerOption });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/learning/MxAnswerOption.jsx", error: String((e && e.message) || e) }); }

// components/learning/MxFillInputPanel.jsx
try { (() => {
/**
 * MxFillInputPanel — fillMode (mode 5, the SRS activation gate). Shows the
 * meaning; the learner types the prompt/front. Hint (never
 * auto-completes) + Check. States: idle, correct, wrong (retry).
 * Presentational — owner controls `value`, `state`, and the handlers.
 */
function MxFillInputPanel({
  value = "",
  onChange,
  state = "idle",
  // idle | correct | wrong
  expected = null,
  // shown on wrong to explain the difference
  onHint,
  onCheck,
  onRetry,
  style
}) {
  const border = {
    idle: "var(--mx-border-default)",
    correct: "var(--mx-border-correct)",
    wrong: "var(--mx-border-wrong)"
  }[state];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--mx-space-12)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: e => onChange && onChange(e.target.value),
    readOnly: state !== "idle",
    placeholder: "Type your answer\u2026",
    className: "mx-korean",
    style: {
      height: "var(--mx-size-input-height)",
      padding: "0 var(--mx-space-16)",
      background: "var(--mx-color-surface-card)",
      border,
      borderRadius: "var(--mx-radius-md)",
      color: "var(--mx-color-text-primary)",
      fontFamily: "var(--mx-font-korean)",
      fontSize: "var(--mx-text-body-large-size)",
      outline: "none",
      transition: "border-color var(--mx-motion-fast) var(--mx-ease-standard)"
    }
  }), state === "wrong" && expected && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--mx-text-body-small-size)",
      color: "var(--mx-color-feedback-wrong)"
    }
  }, "Correct answer: ", /*#__PURE__*/React.createElement("span", {
    className: "mx-korean",
    style: {
      fontWeight: 600
    }
  }, expected)), state === "correct" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--mx-space-6)",
      fontSize: "var(--mx-text-body-small-size)",
      color: "var(--mx-color-feedback-correct)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check",
    style: {
      width: 16,
      height: 16
    }
  }), " Correct"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--mx-space-12)"
    }
  }, state === "idle" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onHint,
    style: fillBtn("ghost")
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "lightbulb",
    style: {
      width: 16,
      height: 16
    }
  }), " Hint"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onCheck,
    style: fillBtn("primary")
  }, "Check")), state === "wrong" && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRetry,
    style: fillBtn("primary")
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "rotate-cw",
    style: {
      width: 16,
      height: 16
    }
  }), " Retry"), state === "correct" && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onCheck,
    style: fillBtn("primary")
  }, "Continue")));
}
function fillBtn(kind) {
  const base = {
    flex: 1,
    height: "var(--mx-size-button-height)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--mx-space-8)",
    borderRadius: "var(--mx-radius-md)",
    font: "var(--mx-weight-semibold) var(--mx-text-button-size)/1 var(--mx-font-display)",
    cursor: "pointer"
  };
  if (kind === "ghost") return {
    ...base,
    flex: "0 0 auto",
    padding: "0 var(--mx-space-16)",
    background: "transparent",
    color: "var(--mx-color-text-secondary)",
    border: "var(--mx-border-default)"
  };
  return {
    ...base,
    background: "var(--mx-color-action-primary)",
    color: "var(--mx-color-text-onAction)",
    border: "none"
  };
}
Object.assign(__ds_scope, { MxFillInputPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/learning/MxFillInputPanel.jsx", error: String((e && e.message) || e) }); }

// components/learning/MxMatchTile.jsx
try { (() => {
/**
 * MxMatchTile — a tile in matchMode (pair prompt ↔ meaning). A pair is only
 * graded once two tiles are selected: correct = green, wrong = red, then reset
 * or lock as completed. States: default, selected, correct, wrong, completed.
 * `side` picks the Korean font for prompt tiles.
 */
function MxMatchTile({
  children,
  side = "prompt",
  // prompt | meaning
  state = "default",
  // default | selected | correct | wrong | completed
  onClick,
  style
}) {
  const map = {
    default: {
      bg: "var(--mx-color-surface-card)",
      border: "var(--mx-border-default)",
      color: "var(--mx-color-text-primary)",
      op: 1
    },
    selected: {
      bg: "var(--mx-color-state-selectedSurface)",
      border: "var(--mx-border-selected)",
      color: "var(--mx-color-text-primary)",
      op: 1
    },
    correct: {
      bg: "var(--mx-color-feedback-correctSurface)",
      border: "var(--mx-border-correct)",
      color: "var(--mx-color-feedback-correct)",
      op: 1
    },
    wrong: {
      bg: "var(--mx-color-feedback-wrongSurface)",
      border: "var(--mx-border-wrong)",
      color: "var(--mx-color-feedback-wrong)",
      op: 1
    },
    completed: {
      bg: "var(--mx-color-state-disabledSurface)",
      border: "var(--mx-border-subtle)",
      color: "var(--mx-color-text-disabled)",
      op: 0.5
    }
  };
  const s = map[state];
  const interactive = state === "default" || state === "selected";
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: !interactive,
    onClick: interactive ? onClick : undefined,
    className: side === "prompt" ? "mx-korean" : undefined,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 64,
      padding: "var(--mx-space-12) var(--mx-space-16)",
      background: s.bg,
      border: s.border,
      borderRadius: "var(--mx-radius-md)",
      color: s.color,
      opacity: s.op,
      fontFamily: side === "prompt" ? "var(--mx-font-korean)" : "var(--mx-font-body)",
      fontSize: side === "prompt" ? "20px" : "var(--mx-text-body-medium-size)",
      fontWeight: side === "prompt" ? 700 : 500,
      lineHeight: 1.3,
      textAlign: "center",
      cursor: interactive ? "pointer" : "default",
      transition: "border-color var(--mx-motion-fast) var(--mx-ease-standard), background var(--mx-motion-fast) var(--mx-ease-standard), opacity var(--mx-motion-normal) var(--mx-ease-standard)",
      overflowWrap: "anywhere",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { MxMatchTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/learning/MxMatchTile.jsx", error: String((e && e.message) || e) }); }

// components/learning/MxRecallPanel.jsx
try { (() => {
/**
 * MxRecallPanel — recallMode (mode 4). Prompt shown, answer hidden. A "Reveal"
 * button carries a 20s countdown; timing out counts as "Forgot". After
 * reveal, self-grade Forgot / Remembered. States: hidden (counting), revealed.
 * This component is presentational — pass the live `seconds` + handlers.
 */
function MxRecallPanel({
  phase = "hidden",
  // hidden | revealed
  seconds = 20,
  meaning,
  onReveal,
  onForgot,
  onRemembered,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--mx-space-16)",
      ...style
    }
  }, phase === "hidden" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 96,
      borderRadius: "var(--mx-radius-lg)",
      border: "1.5px dashed var(--mx-color-border-strong)",
      background: "var(--mx-color-state-loadingSurface)",
      color: "var(--mx-color-text-tertiary)",
      fontSize: "var(--mx-text-body-medium-size)"
    }
  }, "Answer hidden \u2014 recall it"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onReveal,
    style: {
      position: "relative",
      overflow: "hidden",
      height: "var(--mx-size-button-height)",
      border: "none",
      borderRadius: "var(--mx-radius-md)",
      background: "var(--mx-color-action-primary)",
      color: "var(--mx-color-text-onAction)",
      font: "var(--mx-text-button-weight) var(--mx-text-button-size)/1 var(--mx-font-display)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--mx-space-8)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "eye",
    style: {
      width: 18,
      height: 18
    }
  }), "Reveal", /*#__PURE__*/React.createElement("span", {
    className: "mx-tabular",
    style: {
      opacity: 0.85,
      fontSize: 14
    }
  }, seconds, "s"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 96,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "var(--mx-space-16)",
      borderRadius: "var(--mx-radius-lg)",
      background: "var(--mx-color-surface-card)",
      border: "var(--mx-border-default)",
      color: "var(--mx-color-text-primary)",
      fontSize: "var(--mx-text-study-explanation-size)",
      lineHeight: "var(--mx-text-study-explanation-line)",
      textAlign: "center",
      textWrap: "pretty"
    }
  }, meaning), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--mx-space-12)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onForgot,
    style: selfGrade("wrong")
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "rotate-ccw",
    style: {
      width: 18,
      height: 18
    }
  }), " Forgot"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRemembered,
    style: selfGrade("correct")
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check",
    style: {
      width: 18,
      height: 18
    }
  }), " Remembered"))));
}
function selfGrade(kind) {
  const map = {
    wrong: ["var(--mx-color-feedback-wrongSurface)", "var(--mx-color-feedback-wrong)", "var(--mx-color-feedback-wrongBorder)"],
    correct: ["var(--mx-color-feedback-correctSurface)", "var(--mx-color-feedback-correct)", "var(--mx-color-feedback-correctBorder)"]
  }[kind];
  return {
    flex: 1,
    height: "var(--mx-size-button-height)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--mx-space-8)",
    background: map[0],
    color: map[1],
    border: `1.5px solid ${map[2]}`,
    borderRadius: "var(--mx-radius-md)",
    font: "var(--mx-weight-semibold) var(--mx-text-button-size)/1 var(--mx-font-display)",
    cursor: "pointer"
  };
}
Object.assign(__ds_scope, { MxRecallPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/learning/MxRecallPanel.jsx", error: String((e && e.message) || e) }); }

// components/learning/MxSessionResultSummary.jsx
try { (() => {
/**
 * MxSessionResultSummary — end-of-session summary. Distinguishes New Learning
 * (cards activated into Box 1, per-mode failures) from SRS Repeat (remembered/
 * forgotten, box promotion/demotion). Read-only: it never activates cards or
 * schedules SRS — it reflects already-finalized data. Pass a `stats` list.
 */
function MxSessionResultSummary({
  type = "newLearning",
  // newLearning | srsRepeat
  headline,
  subhead = null,
  stats = [],
  // [{ label, value, tone? }]
  style
}) {
  const accent = type === "srsRepeat" ? "var(--mx-color-srs-active)" : "var(--mx-color-srs-noDue)";
  const badge = type === "srsRepeat" ? "SRS Repeat" : "New Learning";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--mx-space-20)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--mx-space-8)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      padding: "5px 12px",
      borderRadius: "var(--mx-radius-pill)",
      background: type === "srsRepeat" ? "var(--mx-color-state-selectedSurface)" : "var(--mx-color-feedback-correctSurface)",
      color: accent,
      font: "600 var(--mx-text-label-medium-size)/1 var(--mx-font-display)",
      letterSpacing: "0.02em"
    }
  }, badge), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--mx-font-display)",
      fontSize: "var(--mx-text-title-large-size)",
      lineHeight: "var(--mx-text-title-large-line)",
      fontWeight: 700,
      color: "var(--mx-color-text-primary)",
      textWrap: "balance"
    }
  }, headline), subhead && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--mx-text-body-medium-size)",
      color: "var(--mx-color-text-secondary)",
      textWrap: "pretty"
    }
  }, subhead)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--mx-space-12)"
    }
  }, stats.map((s, i) => {
    const toneColor = {
      correct: "var(--mx-color-feedback-correct)",
      wrong: "var(--mx-color-feedback-wrong)",
      active: "var(--mx-color-srs-active)",
      due: "var(--mx-color-srs-due)"
    }[s.tone] || "var(--mx-color-text-primary)";
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--mx-space-4)",
        padding: "var(--mx-space-16)",
        background: "var(--mx-color-surface-card)",
        border: "var(--mx-border-default)",
        borderRadius: "var(--mx-radius-md)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mx-tabular",
      style: {
        fontSize: "var(--mx-text-stat-number-size)",
        lineHeight: "var(--mx-text-stat-number-line)",
        fontWeight: 700,
        color: toneColor
      }
    }, s.value), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--mx-text-body-small-size)",
        color: "var(--mx-color-text-secondary)"
      }
    }, s.label));
  })));
}
Object.assign(__ds_scope, { MxSessionResultSummary });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/learning/MxSessionResultSummary.jsx", error: String((e && e.message) || e) }); }

// components/learning/MxStudyCard.jsx
try { (() => {
/**
 * MxStudyCard — the big prompt/answer surface at the centre of a study screen.
 * Korean prompt uses the large centred study.korean role; Vietnamese meaning
 * uses study.explanation with comfortable wrapping for long content. Variants:
 * prompt (front only), answer (meaning only), both (reviewMode — front+back).
 * Optional audio action (semantic label required).
 */
function MxStudyCard({
  prompt,
  meaning,
  note = null,
  variant = "both",
  // prompt | answer | both
  onAudio = null,
  style
}) {
  const showPrompt = variant === "prompt" || variant === "both";
  const showMeaning = variant === "answer" || variant === "both";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--mx-space-16)",
      minHeight: "var(--mx-size-study-card-min-height)",
      padding: "var(--mx-space-32) var(--mx-space-24)",
      background: "var(--mx-color-surface-card)",
      border: "var(--mx-border-default)",
      borderRadius: "var(--mx-radius-xl)",
      textAlign: "center",
      overflowWrap: "anywhere",
      ...style
    }
  }, onAudio && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Ph\xE1t \xE2m",
    onClick: onAudio,
    style: {
      position: "absolute",
      top: "var(--mx-space-12)",
      right: "var(--mx-space-12)",
      width: "var(--mx-size-touch-target)",
      height: "var(--mx-size-touch-target)",
      border: "none",
      borderRadius: "var(--mx-radius-full)",
      background: "var(--mx-color-state-selectedSurface)",
      color: "var(--mx-color-action-primary)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "volume-2",
    style: {
      width: 20,
      height: 20
    }
  })), showPrompt && /*#__PURE__*/React.createElement("div", {
    className: "mx-korean",
    style: {
      fontSize: "var(--mx-text-study-korean-size)",
      lineHeight: "var(--mx-text-study-korean-line)",
      fontWeight: "var(--mx-text-study-korean-weight)",
      letterSpacing: "var(--mx-text-study-korean-tracking)",
      color: "var(--mx-color-text-primary)",
      textWrap: "balance"
    }
  }, prompt), showPrompt && showMeaning && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 1,
      background: "var(--mx-color-divider-default)"
    }
  }), showMeaning && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--mx-text-study-explanation-size)",
      lineHeight: "var(--mx-text-study-explanation-line)",
      fontWeight: "var(--mx-text-study-explanation-weight)",
      color: variant === "answer" ? "var(--mx-color-text-primary)" : "var(--mx-color-text-secondary)",
      maxWidth: 420,
      textWrap: "pretty"
    }
  }, meaning), note && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--mx-text-body-small-size)",
      lineHeight: "var(--mx-text-body-small-line)",
      color: "var(--mx-color-text-tertiary)",
      maxWidth: 420,
      textWrap: "pretty"
    }
  }, note));
}
Object.assign(__ds_scope, { MxStudyCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/learning/MxStudyCard.jsx", error: String((e && e.message) || e) }); }

// components/learning/MxStudyProgressBar.jsx
try { (() => {
/**
 * MxStudyProgressBar — progress within a study session/mode (New Learning Flow
 * or SRS Repeat). Deliberately labelled as MODE progress, never SRS mastery —
 * SRS box state is shown by MxBadge, not this bar. Optional step counter.
 */
function MxStudyProgressBar({
  percent = 0,
  stepLabel = null,
  // e.g. "3 / 12"
  modeLabel = null,
  // e.g. "Fill"
  style
}) {
  const p = Math.max(0, Math.min(100, percent));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--mx-space-6)",
      ...style
    }
  }, (modeLabel || stepLabel) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline"
    }
  }, modeLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--mx-font-display)",
      fontSize: "var(--mx-text-label-medium-size)",
      fontWeight: "var(--mx-weight-semibold)",
      color: "var(--mx-color-text-secondary)",
      letterSpacing: "0.02em",
      textTransform: "uppercase"
    }
  }, modeLabel), stepLabel && /*#__PURE__*/React.createElement("span", {
    className: "mx-tabular",
    style: {
      fontSize: "var(--mx-text-caption-size)",
      color: "var(--mx-color-text-tertiary)"
    }
  }, stepLabel)), /*#__PURE__*/React.createElement("div", {
    role: "progressbar",
    "aria-valuenow": p,
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    style: {
      height: 6,
      borderRadius: "var(--mx-radius-pill)",
      background: "var(--mx-color-state-loadingSurface)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${p}%`,
      height: "100%",
      borderRadius: "var(--mx-radius-pill)",
      background: "var(--mx-color-action-primary)",
      transition: "width var(--mx-motion-normal) var(--mx-ease-standard)"
    }
  })));
}
Object.assign(__ds_scope, { MxStudyProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/learning/MxStudyProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/MxAvatar.jsx
try { (() => {
/**
 * MxAvatar — circular avatar for author/person rows and carousels. Shows an
 * image when `src` is given, else initials from `name` on a lavender tint.
 */
function MxAvatar({
  src = null,
  name = "",
  size = 44,
  style
}) {
  const initials = name.split(" ").filter(Boolean).map(w => w[0]).slice(0, 2).join("").toUpperCase();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      flex: "0 0 auto",
      borderRadius: "50%",
      overflow: "hidden",
      background: "var(--mx-color-state-selectedSurface)",
      color: "var(--mx-color-action-primary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--mx-font-display)",
      fontWeight: 700,
      fontSize: Math.round(size * 0.36),
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials);
}
Object.assign(__ds_scope, { MxAvatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/MxAvatar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/MxBottomNav.jsx
try { (() => {
/**
 * MxBottomNav — the fixed bottom tab bar (Bazar's Home / Category / Cart /
 * Profile). Each item is an icon + label; the active item is purple. Icons are
 * Lucide glyph names rendered via <i data-lucide>. Controlled via `value` +
 * `onChange`. Respects the Android gesture / safe-area inset.
 */
function MxBottomNav({
  items,
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "stretch",
      background: "var(--mx-color-surface-base)",
      borderTop: "var(--mx-border-subtle)",
      paddingBottom: "env(safe-area-inset-bottom, 0px)",
      ...style
    }
  }, items.map(it => {
    const active = it.key === value;
    const color = active ? "var(--mx-color-action-primary)" : "var(--mx-color-text-tertiary)";
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      type: "button",
      "aria-current": active ? "page" : undefined,
      onClick: () => onChange && onChange(it.key),
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        padding: "var(--mx-space-8) 0 var(--mx-space-6)",
        minHeight: "var(--mx-size-touch-target)",
        border: "none",
        background: "transparent",
        color,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": it.icon,
      style: {
        width: 22,
        height: 22
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--mx-font-display)",
        fontSize: 11,
        fontWeight: active ? 700 : 500,
        color
      }
    }, it.label));
  }));
}
Object.assign(__ds_scope, { MxBottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/MxBottomNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/MxSectionHeader.jsx
try { (() => {
/**
 * MxSectionHeader — the Bazar-style section/screen header. Two patterns in one:
 * a "hero" screen intro (small grey eyebrow + large purple heading) and a
 * standard section header (bold title + a purple "See all" action on the right).
 */
function MxSectionHeader({
  eyebrow = null,
  title,
  actionLabel = null,
  onAction,
  size = "default",
  // default | hero
  style
}) {
  const hero = size === "hero";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: hero ? "flex-end" : "baseline",
      justifyContent: "space-between",
      gap: "var(--mx-space-12)",
      padding: "0 var(--mx-space-4)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 var(--mx-text-body-small-size)/1.2 var(--mx-font-body)",
      color: "var(--mx-color-text-tertiary)",
      marginBottom: 3
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--mx-font-display)",
      fontSize: hero ? "var(--mx-text-title-large-size)" : "var(--mx-text-title-medium-size)",
      lineHeight: 1.15,
      fontWeight: 700,
      letterSpacing: "-0.01em",
      color: hero ? "var(--mx-color-action-primary)" : "var(--mx-color-text-primary)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, title)), actionLabel && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAction,
    style: {
      flex: "0 0 auto",
      border: "none",
      background: "transparent",
      padding: 0,
      cursor: "pointer",
      font: "600 var(--mx-text-label-large-size) var(--mx-font-display)",
      color: "var(--mx-color-action-primary)"
    }
  }, actionLabel));
}
Object.assign(__ds_scope, { MxSectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/MxSectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/MxTabs.jsx
try { (() => {
/**
 * MxTabs — underline filter tabs (Bazar's All / Books / Poems pattern). Active
 * tab is bold with a purple underline; inactive is grey. Controlled via `value`
 * + `onChange`. Horizontally scrollable when the set overflows. This is the
 * flat-content filter counterpart to MxSegmentedControl (which is a pill track).
 */
function MxTabs({
  options,
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: "flex",
      gap: "var(--mx-space-24)",
      borderBottom: "var(--mx-border-subtle)",
      overflowX: "auto",
      scrollbarWidth: "none",
      ...style
    }
  }, options.map(o => {
    const key = typeof o === "string" ? o : o.value;
    const label = typeof o === "string" ? o : o.label;
    const selected = key === value;
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      role: "tab",
      "aria-selected": selected,
      onClick: () => onChange && onChange(key),
      style: {
        position: "relative",
        flex: "0 0 auto",
        border: "none",
        background: "transparent",
        padding: "0 0 var(--mx-space-8)",
        cursor: "pointer",
        fontFamily: "var(--mx-font-display)",
        fontSize: "var(--mx-text-label-large-size)",
        fontWeight: selected ? 700 : 500,
        color: selected ? "var(--mx-color-text-primary)" : "var(--mx-color-text-tertiary)",
        whiteSpace: "nowrap",
        transition: "color var(--mx-motion-fast) var(--mx-ease-standard)"
      }
    }, label, selected && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -1,
        height: 2.5,
        borderRadius: 3,
        background: "var(--mx-color-action-primary)"
      }
    }));
  }));
}
Object.assign(__ds_scope, { MxTabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/MxTabs.jsx", error: String((e && e.message) || e) }); }

// components/settings/MxLanguageRow.jsx
try { (() => {
/**
 * MxLanguageRow — a row in the Native Language Picker. Optional flag/icon
 * (visual hint ONLY, never the identifier — text always shows), native name +
 * secondary/script name, and a clear selected state. Text-only fallback when
 * no icon is available.
 */
function MxLanguageRow({
  nativeName,
  secondaryName = null,
  icon = null,
  // visual hint only
  selected = false,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    role: "button",
    tabIndex: 0,
    "aria-pressed": selected,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--mx-space-12)",
      minHeight: "var(--mx-size-list-row-height-two-line)",
      padding: "var(--mx-space-10, 10px) var(--mx-space-16)",
      cursor: "pointer",
      transition: "background var(--mx-motion-fast) var(--mx-ease-standard)",
      ...style
    },
    onPointerEnter: e => e.currentTarget.style.background = "var(--mx-color-state-loadingSurface)",
    onPointerLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 34,
      height: 34,
      flex: "0 0 auto",
      borderRadius: "var(--mx-radius-full)",
      background: "var(--mx-color-state-loadingSurface)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      color: "var(--mx-color-text-secondary)"
    }
  }, icon || nativeName?.[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 auto",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--mx-font-display)",
      fontSize: "var(--mx-text-body-large-size)",
      fontWeight: "var(--mx-weight-medium)",
      color: "var(--mx-color-text-primary)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, nativeName), secondaryName && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--mx-text-body-small-size)",
      color: "var(--mx-color-text-tertiary)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, secondaryName)), selected && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "0 0 auto",
      display: "flex",
      color: "var(--mx-color-action-primary)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check",
    style: {
      width: 22,
      height: 22
    }
  })));
}
Object.assign(__ds_scope, { MxLanguageRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/settings/MxLanguageRow.jsx", error: String((e && e.message) || e) }); }

// components/settings/MxSettingsRow.jsx
try { (() => {
/**
 * MxSettingsRow — the settings-line primitive. Title + optional subtitle, a
 * trailing value/control (text value, chevron, switch, or custom), and
 * disabled/unavailable states. Opening settings never mutates data — this row
 * only reflects and navigates. Use `tone="destructive"` for high-risk actions.
 */
function MxSettingsRow({
  title,
  subtitle = null,
  leading = null,
  value = null,
  // trailing text value
  control = null,
  // trailing custom control (switch, chevron)
  tone = "default",
  // default | destructive
  disabled = false,
  unavailable = false,
  // shows an "unavailable/future" affordance
  onClick,
  style
}) {
  const interactive = !!onClick && !disabled && !unavailable;
  const titleColor = tone === "destructive" ? "var(--mx-color-destructive-text)" : disabled || unavailable ? "var(--mx-color-text-disabled)" : "var(--mx-color-text-primary)";
  return /*#__PURE__*/React.createElement("div", {
    onClick: interactive ? onClick : undefined,
    role: interactive ? "button" : undefined,
    tabIndex: interactive ? 0 : undefined,
    "aria-disabled": disabled || unavailable || undefined,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--mx-space-12)",
      minHeight: "var(--mx-size-settings-row-height)",
      padding: "var(--mx-space-12) var(--mx-space-16)",
      cursor: interactive ? "pointer" : "default",
      opacity: disabled ? 0.5 : 1,
      transition: "background var(--mx-motion-fast) var(--mx-ease-standard)",
      ...style
    },
    onPointerEnter: e => {
      if (interactive) e.currentTarget.style.background = "var(--mx-color-state-loadingSurface)";
    },
    onPointerLeave: e => e.currentTarget.style.background = "transparent"
  }, leading && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "0 0 auto",
      display: "flex",
      color: "var(--mx-color-text-secondary)"
    }
  }, leading), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 auto",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--mx-font-display)",
      fontSize: "var(--mx-text-body-large-size)",
      fontWeight: "var(--mx-weight-medium)",
      color: titleColor,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--mx-text-body-small-size)",
      lineHeight: "var(--mx-text-body-small-line)",
      color: "var(--mx-color-text-tertiary)",
      textWrap: "pretty"
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 auto",
      display: "flex",
      alignItems: "center",
      gap: "var(--mx-space-8)"
    }
  }, unavailable && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--mx-text-caption-size)",
      color: "var(--mx-color-text-tertiary)",
      padding: "3px 8px",
      borderRadius: "var(--mx-radius-pill)",
      background: "var(--mx-color-state-unavailableSurface)"
    }
  }, "Soon"), value != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--mx-text-body-medium-size)",
      color: "var(--mx-color-text-secondary)",
      maxWidth: 160,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, value), control, interactive && !control && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: "var(--mx-color-text-tertiary)",
      fontSize: 18
    }
  }, "\u203A")));
}
Object.assign(__ds_scope, { MxSettingsRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/settings/MxSettingsRow.jsx", error: String((e && e.message) || e) }); }

// components/settings/MxSettingsSection.jsx
try { (() => {
/**
 * MxSettingsSection — a titled group of settings rows with an optional
 * description. Wrap MxSettingsRow children in a card-like grouped container.
 */
function MxSettingsSection({
  title,
  description = null,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      marginBottom: "var(--mx-layout-section-gap)",
      ...style
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 var(--mx-space-4) var(--mx-space-8)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--mx-font-display)",
      fontSize: "var(--mx-text-label-medium-size)",
      fontWeight: "var(--mx-weight-semibold)",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "var(--mx-color-text-tertiary)"
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--mx-space-4)",
      fontSize: "var(--mx-text-body-small-size)",
      lineHeight: "var(--mx-text-body-small-line)",
      color: "var(--mx-color-text-tertiary)"
    }
  }, description)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--mx-color-surface-card)",
      border: "var(--mx-border-default)",
      borderRadius: "var(--mx-radius-lg)",
      overflow: "hidden"
    }
  }, React.Children.toArray(children).map((child, i, arr) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, child, i < arr.length - 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--mx-color-divider-default)",
      margin: "0 var(--mx-space-16)"
    }
  })))));
}
Object.assign(__ds_scope, { MxSettingsSection });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/settings/MxSettingsSection.jsx", error: String((e && e.message) || e) }); }

// components/settings/MxSwitch.jsx
try { (() => {
/**
 * MxSwitch — the on/off toggle used inside settings rows. Token-driven so the
 * "on" state reads as the primary action colour in both themes.
 */
function MxSwitch({
  checked = false,
  disabled = false,
  onChange,
  label,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-checked": checked,
    "aria-label": label,
    disabled: disabled,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: 46,
      height: 28,
      flex: "0 0 auto",
      borderRadius: "var(--mx-radius-pill)",
      border: "none",
      padding: 3,
      background: checked ? "var(--mx-color-action-primary)" : "var(--mx-color-border-strong)",
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background var(--mx-motion-fast) var(--mx-ease-standard)",
      display: "flex",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      background: "#ffffff",
      boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
      transform: checked ? "translateX(18px)" : "translateX(0)",
      transition: "transform var(--mx-motion-fast) var(--mx-ease-standard)"
    }
  }));
}
Object.assign(__ds_scope, { MxSwitch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/settings/MxSwitch.jsx", error: String((e && e.message) || e) }); }

// components/settings/MxThemePresetTile.jsx
try { (() => {
/**
 * MxThemePresetTile — a selectable appearance preset (day/night theme, or an
 * app-icon variant). Shows a mini preview swatch, a name, and a clear selected
 * ring. `unavailable` covers app-icon variants the platform can't switch to.
 */
function MxThemePresetTile({
  name,
  preview,
  // { bg, surface, accent } colours OR a node
  selected = false,
  unavailable = false,
  onClick,
  style
}) {
  const swatch = preview && typeof preview === "object" && preview.bg ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 76,
      borderRadius: "var(--mx-radius-md)",
      background: preview.bg,
      overflow: "hidden",
      border: "1px solid rgba(128,128,128,0.15)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 10,
      right: 10,
      top: 12,
      height: 10,
      borderRadius: 6,
      background: preview.surface
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 10,
      top: 28,
      width: 34,
      height: 10,
      borderRadius: 6,
      background: preview.surface
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 10,
      bottom: 10,
      width: 46,
      height: 14,
      borderRadius: 7,
      background: preview.accent
    }
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      height: 76,
      borderRadius: "var(--mx-radius-md)",
      overflow: "hidden"
    }
  }, preview);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-pressed": selected,
    disabled: unavailable,
    onClick: () => !unavailable && onClick && onClick(),
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "var(--mx-space-8)",
      padding: "var(--mx-space-8)",
      background: "var(--mx-color-surface-card)",
      border: selected ? "var(--mx-border-selected)" : "var(--mx-border-default)",
      borderRadius: "var(--mx-radius-lg)",
      cursor: unavailable ? "not-allowed" : "pointer",
      opacity: unavailable ? 0.5 : 1,
      textAlign: "left",
      ...style
    }
  }, swatch, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 var(--mx-space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--mx-font-display)",
      fontSize: "var(--mx-text-label-large-size)",
      fontWeight: "var(--mx-weight-semibold)",
      color: "var(--mx-color-text-primary)"
    }
  }, name), selected && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      color: "var(--mx-color-action-primary)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check-circle-2",
    style: {
      width: 18,
      height: 18
    }
  })), unavailable && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--mx-text-caption-size)",
      color: "var(--mx-color-text-tertiary)"
    }
  }, "Soon")));
}
Object.assign(__ds_scope, { MxThemePresetTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/settings/MxThemePresetTile.jsx", error: String((e && e.message) || e) }); }

// components/settings/MxWeekdayChip.jsx
try { (() => {
/**
 * MxWeekdayChip — a selectable weekday pill for Reminder Settings. Selected /
 * unselected / disabled. Selection is shown by fill + weight, not colour alone.
 */
function MxWeekdayChip({
  label,
  selected = false,
  disabled = false,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-pressed": selected,
    disabled: disabled,
    onClick: () => !disabled && onClick && onClick(),
    style: {
      minWidth: 40,
      height: "var(--mx-size-chip-height)",
      padding: "0 var(--mx-space-8)",
      borderRadius: "var(--mx-radius-pill)",
      border: selected ? "1.5px solid transparent" : "var(--mx-border-default)",
      background: selected ? "var(--mx-color-action-primary)" : "transparent",
      color: selected ? "var(--mx-color-text-onAction)" : disabled ? "var(--mx-color-text-disabled)" : "var(--mx-color-text-secondary)",
      font: `${selected ? "var(--mx-weight-semibold)" : "var(--mx-weight-medium)"} var(--mx-text-label-medium-size)/1 var(--mx-font-display)`,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "background var(--mx-motion-fast) var(--mx-ease-standard)",
      ...style
    }
  }, label);
}
Object.assign(__ds_scope, { MxWeekdayChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/settings/MxWeekdayChip.jsx", error: String((e && e.message) || e) }); }

// components/settings/MxReminderRow.jsx
try { (() => {
/**
 * MxReminderRow — one reminder in Reminder Settings: a time, a row of weekday
 * chips, an enable switch, and a delete action. Invalid state (no weekday
 * selected) is surfaced inline. Reminders never start a session or mutate data.
 */
function MxReminderRow({
  time = "13:00",
  weekdays = [],
  // array of { label, key, selected }
  enabled = true,
  invalid = false,
  onToggleWeekday,
  onToggleEnabled,
  onDelete,
  onEditTime,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--mx-space-12)",
      padding: "var(--mx-space-16)",
      background: "var(--mx-color-surface-card)",
      border: invalid ? "var(--mx-border-wrong)" : "var(--mx-border-default)",
      borderRadius: "var(--mx-radius-lg)",
      opacity: enabled ? 1 : 0.6,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--mx-space-12)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onEditTime,
    "aria-label": "Edit reminder time",
    className: "mx-tabular",
    style: {
      border: "none",
      background: "transparent",
      padding: 0,
      cursor: "pointer",
      fontFamily: "var(--mx-font-display)",
      fontSize: "var(--mx-text-title-large-size)",
      fontWeight: 700,
      color: "var(--mx-color-text-primary)",
      letterSpacing: "-0.01em"
    }
  }, time), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-checked": enabled,
    "aria-label": "Toggle reminder",
    onClick: () => onToggleEnabled && onToggleEnabled(!enabled),
    style: {
      width: 46,
      height: 28,
      borderRadius: 999,
      border: "none",
      padding: 3,
      background: enabled ? "var(--mx-color-action-primary)" : "var(--mx-color-border-strong)",
      cursor: "pointer",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      background: "#fff",
      transform: enabled ? "translateX(18px)" : "translateX(0)",
      transition: "transform var(--mx-motion-fast) var(--mx-ease-standard)"
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Delete reminder",
    onClick: onDelete,
    style: {
      width: "var(--mx-size-touch-target)",
      height: "var(--mx-size-touch-target)",
      border: "none",
      background: "transparent",
      color: "var(--mx-color-destructive-text)",
      cursor: "pointer",
      borderRadius: "var(--mx-radius-full)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "calc(-1 * var(--mx-space-8))"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "trash-2",
    style: {
      width: 20,
      height: 20
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--mx-space-6)"
    }
  }, weekdays.map(d => /*#__PURE__*/React.createElement(__ds_scope.MxWeekdayChip, {
    key: d.key,
    label: d.label,
    selected: d.selected,
    disabled: !enabled,
    onClick: () => onToggleWeekday && onToggleWeekday(d.key)
  }))), invalid && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--mx-space-6)",
      fontSize: "var(--mx-text-body-small-size)",
      color: "var(--mx-color-feedback-wrong)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "alert-circle",
    style: {
      width: 15,
      height: 15
    }
  }), "Select at least one weekday."));
}
Object.assign(__ds_scope, { MxReminderRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/settings/MxReminderRow.jsx", error: String((e && e.message) || e) }); }

// guidelines/state-gallery.jsx
try { (() => {
// Shared State Gallery for the Mx kit. Exposes window.MxStateGallery({theme}).
// Renders every documented interaction + learning + SRS state so dark/light
// parity is auditable at a glance. Loaded by state-gallery-{dark,light}.card.html.
const K = window.MxDesignKitMemoXV5_9f1387;
const {
  MxActionButton,
  MxIconButton,
  MxCard,
  MxBadge,
  MxListRow,
  MxAnswerOption,
  MxMatchTile,
  MxCallout,
  MxEmptyState,
  MxErrorState
} = K;
function Ic({
  n,
  s = 18
}) {
  return /*#__PURE__*/React.createElement("i", {
    "data-lucide": n,
    style: {
      width: s,
      height: s
    }
  });
}
function Sec({
  title,
  children,
  cols = null
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: "600 11px/1 var(--mx-font-display)",
      letterSpacing: ".12em",
      textTransform: "uppercase",
      color: "var(--mx-color-text-tertiary)",
      margin: "0 0 10px"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: cols ? "grid" : "flex",
      gridTemplateColumns: cols ? `repeat(${cols},1fr)` : undefined,
      flexWrap: "wrap",
      gap: 10,
      alignItems: "center"
    }
  }, children));
}
window.MxStateGallery = function MxStateGallery({
  theme
}) {
  const body = /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--mx-color-background-app)",
      borderRadius: 20,
      padding: 24,
      border: "1px solid var(--mx-color-border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(Sec, {
    title: "Action button \u2014 variants & states"
  }, /*#__PURE__*/React.createElement(MxActionButton, null, "Primary"), /*#__PURE__*/React.createElement(MxActionButton, {
    variant: "secondary"
  }, "Secondary"), /*#__PURE__*/React.createElement(MxActionButton, {
    variant: "ghost"
  }, "Ghost"), /*#__PURE__*/React.createElement(MxActionButton, {
    variant: "destructive"
  }, "Destructive"), /*#__PURE__*/React.createElement(MxActionButton, {
    disabled: true
  }, "Disabled"), /*#__PURE__*/React.createElement(MxActionButton, {
    loading: true
  }, "Loading")), /*#__PURE__*/React.createElement(Sec, {
    title: "Card \u2014 surface & feedback states",
    cols: 5
  }, /*#__PURE__*/React.createElement(MxCard, {
    style: {
      fontSize: 13
    }
  }, "default"), /*#__PURE__*/React.createElement(MxCard, {
    variant: "elevated",
    style: {
      fontSize: 13
    }
  }, "elevated"), /*#__PURE__*/React.createElement(MxCard, {
    state: "selected",
    style: {
      fontSize: 13
    }
  }, "selected"), /*#__PURE__*/React.createElement(MxCard, {
    state: "correct",
    style: {
      fontSize: 13,
      color: "var(--mx-color-feedback-correct)"
    }
  }, "correct"), /*#__PURE__*/React.createElement(MxCard, {
    state: "wrong",
    style: {
      fontSize: 13,
      color: "var(--mx-color-feedback-wrong)"
    }
  }, "wrong")), /*#__PURE__*/React.createElement(Sec, {
    title: "Answer option \u2014 learning states"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(MxAnswerOption, {
    state: "default"
  }, "unanswered"), /*#__PURE__*/React.createElement(MxAnswerOption, {
    state: "selected"
  }, "selected"), /*#__PURE__*/React.createElement(MxAnswerOption, {
    state: "correct"
  }, "correct"), /*#__PURE__*/React.createElement(MxAnswerOption, {
    state: "wrong"
  }, "wrong"), /*#__PURE__*/React.createElement(MxAnswerOption, {
    state: "disabled"
  }, "disabled"))), /*#__PURE__*/React.createElement(Sec, {
    title: "Match tile \u2014 states",
    cols: 5
  }, /*#__PURE__*/React.createElement(MxMatchTile, {
    side: "meaning",
    state: "default"
  }, "default"), /*#__PURE__*/React.createElement(MxMatchTile, {
    side: "meaning",
    state: "selected"
  }, "selected"), /*#__PURE__*/React.createElement(MxMatchTile, {
    side: "meaning",
    state: "correct"
  }, "correct"), /*#__PURE__*/React.createElement(MxMatchTile, {
    side: "meaning",
    state: "wrong"
  }, "wrong"), /*#__PURE__*/React.createElement(MxMatchTile, {
    side: "meaning",
    state: "completed"
  }, "completed")), /*#__PURE__*/React.createElement(Sec, {
    title: "SRS lifecycle \u2014 badges"
  }, /*#__PURE__*/React.createElement(MxBadge, {
    tone: "preSrs"
  }, "Box 0 \xB7 pre-SRS"), /*#__PURE__*/React.createElement(MxBadge, {
    tone: "active"
  }, "active"), /*#__PURE__*/React.createElement(MxBadge, {
    tone: "due"
  }, "due"), /*#__PURE__*/React.createElement(MxBadge, {
    tone: "noDue"
  }, "no-due"), /*#__PURE__*/React.createElement(MxBadge, {
    tone: "mastered"
  }, "mastered"), /*#__PURE__*/React.createElement(MxBadge, {
    tone: "lapse"
  }, "lapse")), /*#__PURE__*/React.createElement(Sec, {
    title: "List row \u2014 default / disabled / error"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      background: "var(--mx-color-surface-card)",
      border: "var(--mx-border-default)",
      borderRadius: 16,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(MxListRow, {
    title: "Normal deck",
    subtitle: "120 words",
    trailing: /*#__PURE__*/React.createElement(MxBadge, {
      tone: "due"
    }, "83"),
    showChevron: true,
    onClick: () => {}
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--mx-color-divider-default)",
      margin: "0 16px"
    }
  }), /*#__PURE__*/React.createElement(MxListRow, {
    title: "Unavailable deck",
    subtitle: "No content yet",
    disabled: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--mx-color-divider-default)",
      margin: "0 16px"
    }
  }), /*#__PURE__*/React.createElement(MxListRow, {
    title: "Failed deck",
    subtitle: "Couldn\u2019t load",
    variant: "error",
    trailing: /*#__PURE__*/React.createElement(MxIconButton, {
      icon: /*#__PURE__*/React.createElement(Ic, {
        n: "rotate-cw",
        s: 16
      }),
      label: "Retry"
    })
  }))), /*#__PURE__*/React.createElement(Sec, {
    title: "Feedback callouts \u2014 info / warning / destructive / no-due / unavailable"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(MxCallout, {
    tone: "noDue",
    title: "Nothing due"
  }, "no-due is calm, not an error."), /*#__PURE__*/React.createElement(MxCallout, {
    tone: "warning"
  }, "Changing the app icon may remove shortcuts."), /*#__PURE__*/React.createElement(MxCallout, {
    tone: "unavailable"
  }, "Cloud sync \u2014 coming soon."))), /*#__PURE__*/React.createElement(Sec, {
    title: "Empty vs error \u2014 never confused",
    cols: 2
  }, /*#__PURE__*/React.createElement(MxCard, {
    padding: "4",
    style: {
      padding: 4
    }
  }, /*#__PURE__*/React.createElement(MxEmptyState, {
    tone: "positive",
    icon: /*#__PURE__*/React.createElement(Ic, {
      n: "check",
      s: 22
    }),
    title: "All caught up",
    message: "You\u2019ve reviewed everything today.",
    style: {
      padding: 18
    }
  })), /*#__PURE__*/React.createElement(MxCard, {
    padding: "4",
    style: {
      padding: 4
    }
  }, /*#__PURE__*/React.createElement(MxErrorState, {
    title: "Couldn\u2019t save session",
    message: "Your learning data is safe.",
    style: {
      padding: 18
    }
  }))));
  return theme === "light" ? /*#__PURE__*/React.createElement("div", {
    "data-theme": "light"
  }, body) : body;
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "guidelines/state-gallery.jsx", error: String((e && e.message) || e) }); }

__ds_ns.MxActionButton = __ds_scope.MxActionButton;

__ds_ns.MxBadge = __ds_scope.MxBadge;

__ds_ns.MxCard = __ds_scope.MxCard;

__ds_ns.MxEmptyState = __ds_scope.MxEmptyState;

__ds_ns.MxErrorState = __ds_scope.MxErrorState;

__ds_ns.MxIconButton = __ds_scope.MxIconButton;

__ds_ns.MxListRow = __ds_scope.MxListRow;

__ds_ns.MxModalSheet = __ds_scope.MxModalSheet;

__ds_ns.MxSegmentedControl = __ds_scope.MxSegmentedControl;

__ds_ns.MxTopBar = __ds_scope.MxTopBar;

__ds_ns.MxMetricCard = __ds_scope.MxMetricCard;

__ds_ns.MxStatsChartPanel = __ds_scope.MxStatsChartPanel;

__ds_ns.MxCallout = __ds_scope.MxCallout;

__ds_ns.MxConfirmDialog = __ds_scope.MxConfirmDialog;

__ds_ns.MxSnackbar = __ds_scope.MxSnackbar;

__ds_ns.MxAnswerOption = __ds_scope.MxAnswerOption;

__ds_ns.MxFillInputPanel = __ds_scope.MxFillInputPanel;

__ds_ns.MxMatchTile = __ds_scope.MxMatchTile;

__ds_ns.MxRecallPanel = __ds_scope.MxRecallPanel;

__ds_ns.MxSessionResultSummary = __ds_scope.MxSessionResultSummary;

__ds_ns.MxStudyCard = __ds_scope.MxStudyCard;

__ds_ns.MxStudyProgressBar = __ds_scope.MxStudyProgressBar;

__ds_ns.MxAvatar = __ds_scope.MxAvatar;

__ds_ns.MxBottomNav = __ds_scope.MxBottomNav;

__ds_ns.MxSectionHeader = __ds_scope.MxSectionHeader;

__ds_ns.MxTabs = __ds_scope.MxTabs;

__ds_ns.MxLanguageRow = __ds_scope.MxLanguageRow;

__ds_ns.MxReminderRow = __ds_scope.MxReminderRow;

__ds_ns.MxSettingsRow = __ds_scope.MxSettingsRow;

__ds_ns.MxSettingsSection = __ds_scope.MxSettingsSection;

__ds_ns.MxSwitch = __ds_scope.MxSwitch;

__ds_ns.MxThemePresetTile = __ds_scope.MxThemePresetTile;

__ds_ns.MxWeekdayChip = __ds_scope.MxWeekdayChip;

})();
