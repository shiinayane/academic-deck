# AcademicDeck Keynote Theme Source

This directory contains Keynote-compatible theme source files generated from the AcademicDeck visual system.

## Build

```bash
npm run build:keynote-theme
```

The generated file is:

```text
themes/AcademicDeck-Keynote-Theme.pptx
```

The native Keynote source is:

```text
themes/AcademicDeck-Keynote-Theme.key
```

Use the `.key` file as the normal reusable Keynote source. If it needs to be regenerated, build the `.pptx`, open it in Keynote, then save it as `.key` or as a custom Keynote theme.

## Intended Use

Use this source when a meeting needs native Keynote editing rather than the HTML deck workflow. The layouts preserve the same quiet Academic Clean style:

- near-white slide surface
- thin borders and restrained shadows
- blue + teal identity line
- compact academic typography
- reusable media, comparison, summary, metrics, timeline, and appendix slides
