---
title: basix
description: "The basix Linux distribution: a small musl-based, source-based distro built around bpm."
---

basix is a from-scratch Linux distribution built around `bpm`. It is source-based —
every package is described by a `template` file that `bpm` interprets — musl-oriented,
and ships no autoconf/automake/libtool/gettext toolchain. It is also
**decentralized**: the `core` repository ships the base system, and community
repositories provide extended functionality alongside it (FrankenBasix is one of
these extension repositories).

## Key characteristics

- **Recipe-per-directory layout**: `basix-packages/` is flat, one directory per package,
  each containing a `template` file plus optional `files/` (installed verbatim) and
  `patches/` (applied at build time).
- **Declarative templates**: a package is mostly variables (`pkg_name`, `version`,
  `revision`, `build_style`, `dist_files`, `checksum`, `depends`, …) plus optional hook
  functions. The build choreography lives in bpm, not the recipe.
- **Verification-first**: mandatory BLAKE3 checksums verify downloaded sources — `b3sum`
  is used as a fast hashing utility, not for reproducibility — plus a
  `version`/`revision` pair on every package and per-build use-flag resolution that
  invalidates cached binaries when flags change.
- **No subpackages**: one template = one binary package. Dependencies are plain
  whitespace-separated lists of hard requirements (`depends` runtime,
  `make_depends` build-time headers, `host_make_depends` build tools).
- **Decentralized and overlay-friendly**: the distro is `core` plus community
  extension repositories for extended functionality. Repositories are listed in
  `/etc/bpm/repos.conf`, highest priority first; the first repository providing a
  template wins, so any extension repository can shadow a core package (this is how
  the FrankenBasix and FrankenUTB overlays work).
- About 124 packages upstream (b3sum, baselayout, baseinit, bash, binutils, busybox,
  cryptsetup, curl, gmp, linux, musl, systemd, util-linux, …), licensed BSD-3-Clause,
  with no README or CI.

## Output artifacts

Builds produce `bpm` archives (tar + `gz`/`xz`/`zst`/`bz2`), tracked in
`/var/db/bpm/installed/`. basix shares no package format with iglunix/frankensrc.