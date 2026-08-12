---
title: Use Flags
description: Declaring use flags in templates, the helper functions, and how the resolved flag set is computed.
---

`use_flags="a b"` declares toggles; `use_default="+a -b"` sets template defaults.

## Helpers

- `use F`, `usev`, `use_if F yes no`.
- `use_enable F [opt]`, `use_with F [opt]`.
- `use_bool F [opt]` (`-Dopt=true/false`, booleans only), `use_cmake F [opt]`.
- Meson `type: feature` options want `$(use_if F -Dopt=enabled -Dopt=disabled)`
  instead of `use_bool`.

## Resolution order

Resolution order, **last wins**: template `use_default` → global `BPM_USE` →
per-package `package.use` (globs allowed). A flag absent from all lists is off.

The resolved set is recorded with the installed package, so changing a flag triggers a
rebuild — the archive is only reused when its recorded flags match `use_effective`.

## Further reading

- [Template format](/reference/templates/) — where flags live in a template