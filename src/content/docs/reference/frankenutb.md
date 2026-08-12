---
title: FrankenUTB
description: The untested sibling overlay — systemd replacements and libudev-garden package ports, none of it built or verified on a basix system.
---

`frankenutb/` is the *untested, unutilized sibling* of FrankenBasix: "a bunch of untested
basix package templates that others might like". Every template is for a package the
author does not believe they will use themselves; **none of it has been built or verified
on a basix system** — treat everything as untested (the README says so). 17 packages,
added in three commits (2026-08-04) on branch `main`.

## Package provenance

Two groups, both unmodified ports of upstream:

### Gardenhouse systemd replacements (10 pkgs)

The [Gardenhouse](https://codeberg.org/Gardenhouse) collection: simple, portable
reimplementations of systemd components that run standalone on any POSIX system, no
systemd required:

- `sysuserd` — `systemd-sysusers` reimplementation, POSIX shell (`custom` style,
  installs one script + `/usr/lib/sysusers.d` `/etc/sysusers.d`)
- `seedfiles` — portable drop-in of `systemd-tmpfiles`
- `gardenhostd` — minimal Python `systemd-hostnamed`
- `gardenerdb` — standalone `systemd-userdb`
- `gardenlock` — drop-in of `systemd-pcrextend`/`systemd-tpm2-setup`/`systemd-measure`
  (meson)
- `sysext` — `systemd-sysext` without systemd
- `gardendevd` — udev-compatible device daemon replacing `systemd-udev`
- `libudev-garden` — drop-in `libudev` replacement, works with any device manager
- `hwdb` — community mirror of the systemd hwdb with room for standalone rules
- `python-gobject` — GObject Python bindings (gardenhostd dependency)

### libudev-garden variants (7 pkgs)

Ports of basix templates whose `libudev-zero` dependency is switched to
`libudev-garden`, for systems running `gardendevd` instead of systemd-udev: `libdrm`,
`libinput`, `mesa`, `sway`, `wlroots`, `libfido2`. Everything else matches upstream
(e.g. `libfido2` keeps its cmake style, `-DBUILD_MANPAGES=OFF` etc.).

## Conventions

- **Pinning**: tagged upstream projects are pinned to the tag (`v1.7.1`, `v1.3`,
  `v1.0`); untagged ones are pinned to a commit and versioned by commit date
  (`sysuserd` is `version=20260728` at commit `045477a`).
- **`wrk_src` differs from GitHub habits**: Codeberg archives extract to the bare
  project name (`sysuserd`, `gardenlock`), so `wrk_src="sysuserd"` etc. — no
  `proj-proj-1.2.3` dance.
- Build style follows the upstream project (custom for shell/Python bits, meson, cmake,
  …), not a repo-wide default.

## Usage

Add to `/etc/bpm/repos.conf` (order relative to other repos is a choice):

```
frankenutb https://github.com/anoraktrend/frankenutb.git main
core https://github.com/kkrruumm/basix-packages.git main
```

then `bpm pull && bpm update`, and `bpm build <pkgdir>` / `bpm install <pkgdir>` per
package. Packages that depend on things basix doesn't have yet will fail install until
those deps exist — expected, since nothing here is verified against the tree.

## Further reading

- [FrankenBasix reference](/reference/frankenbasix/) — the maintained sibling overlay
- [Getting started](/guides/getting-started/) — working with extension repositories