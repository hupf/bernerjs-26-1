---
theme: "@puzzleitc/slidev-theme-puzzle"
title: Moderne TypeScript-Backends mit Nitro & Clean Architecture
info: |
  ## Moderne TypeScript-Backends mit Nitro & Clean Architecture

  Mathis zeigt, wie Backendentwicklung mit einem TypeScript-Framework der nächsten Generation aussehen kann und teilt Erkenntnisse aus einem Kundenprojekt. Ein Talk für alle, die erfahren möchten, weshalb sie ev. bereits Nitro verwenden, ohne es zu wissen, weshalb Nitro nicht so schnell wieder verschwinden wird und für alle, die TypeScript auch jenseits des Frontends lieben.

  [Bärner JS Talks #26-1]/(https://www.meetup.com/barner-js-talks/events/312500742/)
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
# duration of the presentation
duration: 35min
---

# Moderne TypeScript-Backends <span class="highlight">mit Nitro & Clean Architecture</span>

Bärner JS Talks #26-1, 03.03.2026 \
Mathis Hofer, hofer@puzzle.ch

---
layout: center
transition: slide-up
---

<img src="./images/Wappen_Aargau_matt.svg" alt="Wappen Aargau" style="width: 400px; height: 400px;">

<!--
- Wer ist vom Kanton Aargau und hat an einer Uni studiert?
- Excel-File mit allen Uni-Studenten seit den 1990er Jahren
-->

---
transition: slide-up
level: 3
---

<img src="./images/edk.svg" class="mx-auto mt-20 mb-12" style="height: 110px;">

```mermaid
flowchart TD
    iuv["<strong>IUV</strong><br><span style='margin-top: 0.5rem; font-size: 0.8em; line-height: 1.3; display: block'>Interkantonale Universitätsvereinbarung</span>"]
    fhv["<strong>FHV</strong><br><span style='margin-top: 0.5rem; font-size: 0.8em; line-height: 1.3; display: block'>Interkantonale Fachhochschulvereinbarung</span>"]
    hfsv["<strong>HFSV</strong><br><span style='margin-top: 0.5rem; font-size: 0.8em; line-height: 1.3; display: block'>Interkantonale Vereinbarung über Beiträge an die Bildungsgänge der höheren Fachschulen</span>"]
```

<!--
- Bildung in der Schweiz Kantonal geregelt (ausser ETH/EPFL)
- Drei interkantonale Vereinbarungen unter dem Dach der EDK
- Regelung welcher Kanton ist Zahlungspflichtig wenn Student:innen ausserhalb ihres Kantons studieren
-->

---
transition: slide-up
level: 3
---

<img src="./images/schulabkommen-aktuell.png" class="mx-auto" style="max-height: 100%">

<!--
Aktuelle Situation:

- Uneinheitliche Formate von Schulen (Excel-Files, PDFs, Papier)
- Zeitintensive manuelle Verarbeitung
- Keine zentrale Datenbank
-->

---
transition: slide-up
level: 3
---

# Applikation: CORDEX

→ **C**ontrolling, **R**eporting, **D**ata, **Ex**change

TODO: Screenshots der Applikation

<!--
Applikation für Kanton Aargau entwickelt:

- Automatisierung der Kontrollen zur Zahlungspflicht
- Manuelle Prüfungen in schönem UI
- Zentrale Datenbank für Auswertungen & Prognosen
-->

---
layout: center
transition: slide-up
level: 3
---

<img src="./images/pmpc_logo_horizontal.jpg" alt="Public Money Public Code">

<!--
- Veröffentlichung unter Open Source Lizenz
- CORDEX-Community: Nutzung durch weitere Kantone
- Beteiligung an Weiterentwicklungen, neue Features stehen allen zur Verfügung
- Aufteilung der Kosten anteilig
-->

---
layout: end
---

# Merci!

Fragen? Anregungen? \
[github.com/hupf/bernerjs-26-1](https://github.com/hupf/bernerjs-26-1)

<PoweredBySlidev mt-10 />
