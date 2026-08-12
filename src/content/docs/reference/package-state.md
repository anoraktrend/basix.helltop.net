---
title: Package State
description: Checksums, archives, installed state, install helpers, and the build environment.
---

## Checksums

- `checksum` is **BLAKE3 hex**, positional, one value per `dist_files` entry (`SKIP`
  skips one).
- bpm verifies with `b3sum`/`rhash` and compares a truncated prefix — full 64-char
  values keep that comparison honest. `bpm checksum -w` fills it in.

## Archives

Archives are `$BPM_CACHE/bin/<pkg>@<version>-<revision>.tar.<$BPM_COMPRESS>` and embed
their own package DB: `./var/db/bpm/installed/<pkg>/{template,version,use,depends,
accounts,manifest}`.

## Installed state

Installed state lives in `$BPM_ROOT/var/db/bpm/installed/<pkg>/` (manifest reverse
sorted so removal deletes files before directories); choices/alternatives in
`var/db/bpm/choices`; hooks in `/etc/bpm/hooks/{pre-install,post-install,pre-remove,
post-remove}/` (basix ships `post-install/00-ldconfig`).

## Install helpers (for `do_install()` bodies)

`bmkdir [-m mode] dir...`, `binstall file mode targetdir [newname]`, and the
convenience wrappers `bbin`, `blib`, `blibexec`, `binclude`, `bpkgconfig`, `bconf`,
`blicense`, `bdoc`, `bdata`, `bman` (section from extension), `bcompletion`,
`bcopy`, `bmove`, `bln`, `bsed` (portable in-place edit), `brm` — all relative to
`$DESTDIR`. `FILESDIR`/`PATCHESDIR`/`SOURCEDIR` are exported for templates.

## Build environment

Inside a build: `DESTDIR`, `MAKEFLAGS=-j$BPM_JOBS`, `CC`/`CXX`/`CFLAGS`/`CXXFLAGS`/
`LDFLAGS`, `LC_ALL=C`, `TMPDIR=/tmp` (a private tmpfs when sandboxed), plus
`pkg_name`/`version`/`revision`. Build roots scrub the environment (`BPM_BROOT_PATH`,
`BPM_ENV_KEEP`).

Missing `./configure` in a GNU package's release tarball is fatal (basix ships no
autotools), so tag archives usually don't work — prefer release assets.

## Further reading

- [Template format](/reference/templates/) — the template side of packaging