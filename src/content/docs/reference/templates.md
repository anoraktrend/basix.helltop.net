---
title: Template Format
description: How a bpm template works — variables, build styles, phases, dist_files forms, patches, and accounts.
---

A `template` is POSIX shell sourced by bpm. Recognized variables and functions are
listed in `TMPL_VARS`/`TMPL_FUNCS` in `lib/common.sh`.

```sh
pkg_name=b3sum
version=1.3.1
revision=1
build_style=gnu-makefile
short_desc="BLAKE3 checksum utility"
home_page="https://git.sr.ht/~mcf/b3sum"
license="CC0-1.0"
dist_files="https://git.sr.ht/~mcf/b3sum/archive/….tar.gz"
checksum="3a78d3bbb0e553359035da0c5ce9a2eaadcc658d412dc12f9075caa1bbd74c5e2a"
wrk_src="b3sum-cb4111ccc8061039b014fbb657c72f78984f1069"
use_flags="static"
use_default="+static"

pre_build() {
    use static && LDFLAGS="$LDFLAGS -static"
    export LDFLAGS
}
```

## Mandatory fields

- Mandatory: `pkg_name`, `version`, `dist_files`, `checksum`. Defaults (`revision=1`,
  `build_style=gnu-configure`, `wrk_src=$pkg_name-$version`) are applied if missing.
- A template's `pkg_name` must match the directory name.

## Build styles

`build_style` selects a choreography file from `/usr/lib/bpm/style/`; 23 styles exist:
`gnu-configure`, `configure`, `gnu-makefile`, `custom`, `meson`, `cmake`,
`python3-pep517`, `python3-module`, `perl-module`, `perl-ModuleBuild`, `ruby-module`,
`gemspec`, `cargo`, `go`, `haskell-stack`, `qmake`, `scons`, `waf`, `waf3`, `R-cran`,
`zig-build`, `fetch`, `meta`. `custom` = you write `do_build()`/`do_install()`
yourself.

## Phases

Phase precedence, everywhere: **template `do_*` > style `style_*` > bpm default**;
`pre_*`/`post_*` hooks always run. Phases: `fetch` (outside the sandbox, so it can
have network), `extract`, `patch`, `configure`, `build`, `check` (only when
`BPM_CHECK=1`), `install`, plus post-processing (`.la` removal unless
`keep_libtool=yes`, optional strip unless `no_strip=yes`).

## dist_files forms

- Plain URL (checksummed tarball).
- `URL>name.tar.gz` (renamed on disk).
- `git+https://…repo.git#tag` (git checkout, checksum skipped).
- `file://` (local file).

`skip_extract` and `bextract` handle multi-archive/src layouts.

## Patches

Patches in `patches/` are applied with GNU `patch -p1` (strict hunk counts; a patch
that applies under `git apply` may still be rejected) — `patch_args` overrides `-p1`.

## Accounts, conflicts, network

- `system_accounts`/`system_groups` declare users/groups (`$name_uid`,
  `$name_homedir`, …), allocated from `BPM_SYSID_MIN..MAX` when no uid/gid is given.
- `conflicts`/`provides` exist; `allow_network=yes` opts a build out of the network
  namespace.

## Further reading

- [Use flags](/reference/use-flags/) — toggles declared in the template
- [Package state](/reference/package-state/) — checksums, installation, and state