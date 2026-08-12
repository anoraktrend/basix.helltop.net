---
title: FrankenBasix
description: What the FrankenBasix spin adds — skeletons for every build style, bpm extensions, key packages — and its conventions.
---

`frankenbasix/` is the active repo here (branch `main`, commit + push straight to main
per batch). It is a **community extension repository** in basix's decentralized model:
added to `/etc/bpm/repos.conf` above `core`, it provides extended functionality
alongside the base system, shadowing or extending upstream packages and adding new
ones. See [getting started](/guides/getting-started/) for setup and workflow.

## What the spin adds

### Skeleton set

`templates/` ships one skeleton for every bpm build style (`<style>.template`), so any
package can be started without remembering what a style expects (basix-packages itself
only uses seven styles).

### bpm extensions

Two packages that patch bpm itself:

- `bpm-use-depends` — adds `use_depends`/`use_make_depends`/`use_host_make_depends`
  (entries `flag:pkg` or bare `pkg`) which fold enabled flags' packages into the
  matching dependency lists; a post-install hook patches `tmpl_load`.
- `bpm-sccache` — optional sccache wrapping for builds behind `bpm_sccache=1`.

### Key packages

- `meta-frankenbasix` (metapackage tying the spin together; pulls in b3sum, bpm,
  busybox, curl, git, xz).
- `chimerautils` (Chimera Linux core userland, built with clang/compiler-rt/lld, needs
  acl, attr, libedit, libxo).
- `systemd` 261.2 (musl upstream, 48 USE flags, libucontext, forced `-Dlz4=false`,
  docbook-xsl for man/doc).
- The full `llvm` monorepo merged into one package.
- `linux-cachyos`, `rust-bootstrap` (rust itself is now packaged upstream).
- `gnutls`/`libressl` TLS stack bits.
- PAM stack (`linux-pam`, `pam-config`, `sudo`).
- Session bits (`seatd`, `greetd`, `libfido2`, `libseccomp`).
- `fish`, `gettext-tiny`, `uutils-sed`, `ca-certificates`.
- Assorted overlay-only libraries (libgcrypt, tpm2-tss, lz4, libbpf, …); gmp, nettle,
  and more are packaged upstream now.

## Conventions

- **USE flags**: never name a flag `man`/`doc`/`ssl`/`zlib` — the user's global
  defaults are `zlib ssl man doc -x11 -wayland -pulseaudio -bluetooth -nls`, and
  `+man`/`+doc` force doc builds that fail without texinfo/help2man/doxygen (not in
  basix). Packages that can't build docs keep hard `--disable-doc`/`-Dmanpages=false`
  and get no such flag (linux-pam's `docs` is a hard fail). Docs that do work:
  systemd `man`/`doc` (xsltproc + docbook-xsl catalog hook), kmod `man` (scdoc).
- **Checksums**: BLAKE3, 64 chars (bpm truncation compares only the shorter string —
  full length matters).
- **Mirrors**: `mirrors.edge.kernel.org/gnu/…`, `www.gnupg.org/ftp/gcrypt/…` are
  reliable; `ftp.gnu.org` intermittently serves HTML instead of tarballs — `file`-check
  downloads.
- **Patches**: `diff -u` against a clean extract, dry-run with
  `patch -p1 --fuzz=0 --dry-run` (busybox patch, strict hunk counts).
- **Dependency nodes**: fill-in templates for things basix lacked, e.g. `libelf`
  (elfutils 0.195 minus tools), `libudev-zero`, `scdoc`, `docbook-xsl`. Several of
  these landed upstream (gmp, cryptsetup, libelf, libudev-zero, scdoc, docbook-xsl),
  so today most remaining nodes are overlay-only packages like libbpf and tpm2-tss.

## Related

[FrankenUTB](/reference/frankenutb/) is the untested sibling overlay: Gardenhouse
systemd replacements and libudev-garden package ports, none of it built or verified.