# Hypothesen

Stand: 2026-10-01

Annahmen, die wir durch Experimente bestätigen oder widerlegen wollen. Keine davon ist bewiesen.

Status-Werte: `offen` · `gestützt` · `widerlegt` · `unklar`

| ID | Hypothese | Leitfrage | Geprüft in | Status |
|---|---|---|---|---|
| H-01 | JHipster nimmt bei Entitäten, CRUD-API, Admin-UI, Auth und Projektgerüst so viel Arbeit ab, dass sich die Einarbeitung lohnt. | 1 | E0, E1 | offen |
| H-02 | Claude Code ist besonders nützlich an den Rändern des Generators: JDL entwerfen, generierten Code erklären, Diffs nach einer Generierung analysieren, Custom-Logik schreiben. | 2 | E1–E4 | offen |
| H-03 | Generierter und eigener Code lassen sich über klare Ownership-Zonen und das Side-by-Side-Muster so kombinieren, dass erneutes Generieren (Round-Trip) beherrschbar bleibt. | 4, 5 | E1–E4 | offen |
| H-04 | Ohne klare Regeln überschreibt oder „repariert“ ein AI-Agent generierten Code so, dass die nächste Generierung zu Konflikten führt. | 3, 4 | E4 | offen |
| H-05 | Eine individuell gestaltete öffentliche Website lässt sich nicht sinnvoll aus dem generierten JHipster-Frontend ableiten und wird weitgehend Custom-Code. | 3, 4 | E6 | offen |
| H-06 | Für die Referenzfälle reichen Content Types, die explizit im Code (über JDL) definiert sind. Laufzeit-definierte Typen sind nicht nötig. | 3, 5 | E1, E3, E6 | offen |
| H-07 | Medien als BLOB-Felder in der Datenbank (JHipster-Standard für Bilder) sind für eine Website mit vielen Bildern ungeeignet. | 3 | E2 | offen |
| H-08 | Die von JHipster generierten Liquibase-Changelogs passen schlecht zur schrittweisen Weiterentwicklung eines Datenmodells mit bestehenden Daten. | 4, 5 | E3 | offen |
| H-09 | Der Mensch wird an den Übergängen unverzichtbar: Generator-Läufe, Review von Diffs, Security-Entscheidungen, Commits. | 1–3 | alle | offen |
| H-10 | Mit AI allein (ohne Generator) kommt man am Anfang schneller voran, erhält aber eine weniger einheitliche Struktur. | 6 | E7 | offen |
| H-11 | Für reale Kunden wäre ein bestehendes CMS (z. B. Payload oder ein statischer/git-basierter Ansatz) wirtschaftlich sinnvoller als ein eigenes CMS auf JHipster-Basis. | 6 | E7 | offen |

## Erste Hinweise aus E0

E0 war eine Baseline und hat keine Hypothese abschließend geprüft. Die Status bleiben deshalb `offen`. Details stehen in [05-experimente.md](05-experimente.md#e0-baseline-erste-entität-und-ownership-karte).

- **H-01:** Hinweise dafür. Gerüst, Auth, Benutzerverwaltung, Entity-CRUD und 508 Tests entstanden ohne Nacharbeit. Einarbeitung und Zeitvergleich wurden nicht gemessen.
- **H-02:** Hinweise dafür. Die Analyse des Generator-Quellcodes durch Claude hat zwei Regelverstöße verhindert (Auto-Commit, implizites `force`). Claude hat aber auch einen eigenen Fehler verursacht (`-Dskip.npm` → Frontend nicht gebaut).
- **H-04:** Indirekter Hinweis. Ohne Markierung ist generierter Code nicht als solcher erkennbar. Das Risiko unbemerkter Änderungen besteht also. Geprüft wird das in E4.
- **H-09:** Hinweise dafür. Commit, Umgang mit dem Secret und die UI-Prüfung bleiben beim Menschen.

## Hinweise

- H-06 war früher als Entscheidung (alt: D2) geführt. Weil das Content-Type-System bewusst offen bleibt, ist es jetzt eine Hypothese.
- H-11 war früher eine Einschätzung von Claude. Sie greift der Build-vs-Buy-Frage (F-08) nicht vor.
