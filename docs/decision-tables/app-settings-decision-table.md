# App Settings Decision Table

Quick-reference rules for **App Settings** and its child flows (**Native Language Picker**, **Reminder
Settings**, **Spaced Repetition Settings**). Authoritative specs:
[app-settings](../design/screens/app-settings.md),
[native-language-picker](../design/screens/native-language-picker.md),
[reminder-settings](../design/screens/reminder-settings.md),
[spaced-repetition-settings](../design/screens/spaced-repetition-settings.md).

## App Settings

| Action / condition | Result |
|--------------------|--------|
| user taps **Cài đặt** | open **App Settings** screen |
| App Settings opened | **no learning-data mutation** |
| user changes **native language** | update preference **only**; do **not** delete learning data |
| user configures **reminder** | save reminder **schedule preference** |
| notification permission missing | show **permission/unavailable** state |
| user changes **word display** setting | update **display preference** only |
| user opens **SRS settings** | **validate against SRS docs** before implementation |
| SRS setting **conflicts with 8-box** | **report drift / open question**; do **not** implement ambiguous behavior |
| user changes **game batch size** | update **game preference** only |
| user enables **random game words** | update **game selection preference** only |
| user triggers **backup** | create backup **without mutating** learning data |
| user triggers **restore** | require **confirmation** and **validate backup** before apply |
| restore **fails** | keep current database **safe** |
| user opens **cloud sync** | require **sync/provider/conflict policy** before implementation |
| cloud sync **fails** | **do not lose** local data |

## Native Language Picker

| Action / condition | Result |
|--------------------|--------|
| user taps **Tiếng mẹ đẻ** | open **Native Language Picker** |
| language list loading | show **loading** state |
| user searches language | **filter visible list only** |
| search has no result | show **search empty** state |
| user selects language | **persist** native language preference |
| save succeeds | update **App Settings summary** |
| save fails | show error and **keep previous preference** |
| native language changed | do **not** mutate deck/card/SRS/session |
| native language changed | do **not** auto-translate existing cards |
| flag/icon missing | show **text-only** language row |
| study direction exists | native language does **not** auto-change study direction |

## Reminder Settings

| Action / condition | Result |
|--------------------|--------|
| user taps **Lời nhắc** | open **Reminder Settings** |
| Reminder Settings opened | **no learning-data mutation** |
| reminder list loading | show **loading** state |
| no reminders exist | show **empty/no-reminder** state |
| user adds reminder | create **reminder draft/default** |
| user changes reminder time | update **reminder preference** |
| user selects weekday | update **reminder weekdays** |
| user unselects **all** weekdays | show **invalid/disabled** state per implementation rule |
| user deletes reminder | remove **reminder preference** |
| notification permission missing | show **permission** state |
| platform notification unavailable | show **unavailable** state |
| save reminder succeeds | App Settings summary updates |
| save reminder fails | show error and **keep previous stable** reminder settings |
| reminder notification fires | does **not** auto-start session unless user opens it |
| OS notification schedule fails | show error/unavailable; **keep local settings stable** |

## Spaced Repetition Settings

| Action / condition | Result |
|--------------------|--------|
| user taps **Lặp lại giãn cách** | open **Spaced Repetition Settings** |
| Spaced Repetition Settings opened | **no learning-data mutation** |
| docs use 8-box and mock shows **"Ô: 7"** | mark **open question/drift**; do **not** implement 7-box behavior |
| user changes **repeat box order** | persist **repeat ordering** preference only |
| repeat box order changed | do **not** mutate card box/due |
| user enables **SRS notification** | persist SRS notification preference |
| SRS notification enabled and **due cards exist** | notification **may** be scheduled per platform support |
| notification permission missing | show **permission** state |
| platform notification unavailable | show **unavailable** state |
| user sets **forgotten → previous box** | future SRS Repeat failures may move a **Box 2+** card to the previous box |
| SRS-active **Box 1** card forgotten | do **not** move below Box 1 (no lower active box) |
| **pre-SRS New Learning** card forgotten | do **not** apply SRS lapse policy |
| user sets **game word source → SRS repeat** | game pool may use **Box 1+ due** cards |
| game word source changed | do **not** create session; do **not** mutate SRS data |
| save SRS setting fails | show error and **keep previous stable** preference |
