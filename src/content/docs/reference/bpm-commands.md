---
title: bpm Commands
description: The full bpm command reference — build, install, update, search, checksum, and more.
---

`bpm` (version 0.5 packaged in basix, MIT licensed) is a shell script and a library
installed to `/usr/lib/bpm` (`lib/common.sh`, `lib/pkg.sh`, `lib/build.sh`,
`lib/account.sh`, `lib/sandbox.sh`, `lib/style/*.sh`). The author describes it as "the
result of ~3 years of intermittent effort", with ideas "borderline stolen from xbps-src
and kiss". There are no docs outside the code; the fact it works at all is a feature.

## Commands

| Command | Alias | Purpose |
|---|---|---|
| `build pkg...` | `b` | Build packages and missing dependencies in dependency order |
| `install pkg...` | `i` | Build if needed, then install into `$BPM_ROOT` (escalates via `$BPM_SU`: doas/sudo/su) |
| `remove pkg...` | `r` | Remove installed packages |
| `update` | `u` | Pull repositories, rebuild + reinstall whatever changed (version or use flags) |
| `pull` | `p` | Clone/pull repositories from `repos.conf` |
| `search pattern` | `s` | Search repositories (globs allowed) |
| `query pkg` | `q` | Show resolved template metadata and use flags |
| `alternatives [pkg path]` | `a` | List alternatives, or swap a package's path |
| `list [pkg]` | `l` | List installed packages |
| `files pkg` | `f` | List files owned by an installed package |
| `owns path` | `o` | Show which package owns a path |
| `checksum [-w] pkg` | `c` | Print BLAKE3 sums of the dist_files (`-w` rewrites the template) |
| `download pkg...` | `d` | Fetch dist_files only |
| `log [pkg]` | | List or page through build logs |
| `clean [all]` | | Remove build trees/staged destdirs; `all` also wipes the build root base |

## Global options

`-v`/`-q` toggle live build output. Build output normally goes to
`$BPM_LOGDIR/<pkg>.log`, readable later with `bpm log`.

## Further reading

- [bpm configuration](/reference/bpm-configuration/) — every knobs bpm sources at startup
- [Template format](/reference/templates/) — what `bpm build` interprets