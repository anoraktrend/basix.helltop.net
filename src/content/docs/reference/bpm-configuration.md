---
title: bpm Configuration
description: /etc/bpm/bpm.conf and the environment variables that override every bpm setting.
---

`/etc/bpm/bpm.conf` is sourced by bpm. Everything is overridable by environment
variables, e.g. `BPM_JOBS=8 bpm build xyz`.

## Settings

- `BPM_ROOT` (`/`) — where packages install; set to a directory to build a rootfs.
- `BPM_CACHE` (`/var/cache/bpm`) — sources, build trees, destdirs, built archives,
  logs. Must be writable by whoever runs `bpm build`.
- `BPM_REPODIR`/`BPM_REPOCONF` (`/var/db/bpm/repos`, `/etc/bpm/repos.conf`) — cloned
  repos and the repo list.
- `BPM_USECONF` (`/etc/bpm/package.use`) — per-package use-flag overrides.
- `BPM_JOBS` — parallelism, one job per CPU by default.
- `BPM_SANDBOX=1` — run every build inside private mount/pid/ipc/uts (+net unless the
  template sets `allow_network=yes`) namespaces; unprivileged users also get a user
  namespace with `--map-root-user`.
- `BPM_BUILDROOT` (`/var/cache/bpm/buildroot`) — assemble a throwaway build root
  containing `BPM_BASEPKGS` (musl, busybox, gcc, binutils, linux-headers, …) plus the
  package's make_depends, chroot into it, and overlay the per-build layer
  (`BPM_BROOT_OVERLAY=1`). Undeclared makedepends become hard build failures. Empty
  value = build against the host.
- `BPM_STRIP=1`, `BPM_CHECK=0` (check phase off unless enabled), `BPM_FORCE=0`.
- `BPM_COMPRESS` (installed config pinned to `xz`) — archive compression
  zst/xz/gz/bz2.
- `BPM_USE` — global use flags (see [use flags](/reference/use-flags/)).
- `BPM_SU` — privilege escalation for install/remove (`doas`, `sudo`, or `su`).

## Further reading

- [bpm commands](/reference/bpm-commands/) — what these settings drive