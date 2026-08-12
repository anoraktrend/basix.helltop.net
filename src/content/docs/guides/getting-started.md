---
title: Getting Started
description: "Set up FrankenBasix on a basix system: configure repositories, pull them, and build and install your first package."
---

This guide walks through the FrankenBasix workflow on a basix system.
`frankenbasix/` is a **community extension repository** — in basix's decentralized
model it sits above `core` in `/etc/bpm/repos.conf`, providing extended functionality
by shadowing or extending upstream packages and adding new ones.

## Configure repositories

Start with `/etc/bpm/repos.conf` — highest priority first:

```
core https://github.com/kkrruumm/basix-packages.git main
frankenbasix https://github.com/anoraktrend/frankenbasix.git main
```

Any number of community extension repositories can be layered the same way — basix is
decentralized, and extended functionality comes from community repos alongside `core`.
Then pull the repositories and update everything:

```
bpm pull && bpm update
```

`bpm update` rebuilds and reinstalls whatever changed (version or use flags).

## Add a new package

1. Copy a skeleton from `templates/` (one per build style, so you never have to remember
   what a style expects).
2. Fill in `pkg_name`, `version`, `revision`, `dist_files`, and `checksum`.
3. Build and install the package directory:

```
bpm build <pkgdir>
bpm install <pkgdir>
```

## Maintain a local repository

To serve packages without pushing upstream:

1. `bpm build` everything you want to ship.
2. Copy the archives from `out/` into the repo directory.
3. Point `repos.conf` at the local repo and run `bpm sync`.

## Start from a prebuilt rootfs

Instead of building a system from scratch, you can start from a published rootfs
image — see the [downloads on the overview page](/). Verify the tarball against its
[`.b3` checksum](https://cdn.helltop.net/basix-rootfs-latest.tar.gz.b3) with
`b3sum -c basix-rootfs-latest.tar.gz.b3`.

## Authoring templates

Templates are authored and committed in `frankenbasix/`; the actual
`bpm build`/`bpm install` runs on a basix system — bpm is not installed on the dev box.

USE-flag templates are verified locally by sourcing them with copies of the
`use`/`use_if`/`use_bool` helpers and evaluating `configure_args`, including under the
global defaults.

## Further reading

- [Template format](/reference/templates/) — what a `template` file can contain
- [Use flags](/reference/use-flags/) — declaring and resolving flags
- [FrankenBasix reference](/reference/frankenbasix/) — what the spin adds and its conventions
- [FrankenUTB reference](/reference/frankenutb/) — the untested sibling overlay