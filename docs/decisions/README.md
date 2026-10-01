# Entscheidungsdokumentation

Stand: 2026-10-01

Dieses Verzeichnis hält fest, was in diesem Experiment entschieden, vermutet, vorgeschlagen und offen ist. Es ist die Grundlage für jede neue Session (Mensch oder Claude Code).

## Dateien

| Datei | Inhalt |
|---|---|
| [00-ziel-und-rahmen.md](00-ziel-und-rahmen.md) | Experimentziel, Leitfragen, Rahmenbedingungen |
| [01-entscheidungen.md](01-entscheidungen.md) | Bewusst festgelegte Punkte (`D-xx`) |
| [02-hypothesen.md](02-hypothesen.md) | Annahmen, die wir prüfen wollen (`H-xx`) |
| [03-vorschlaege.md](03-vorschlaege.md) | Vorschläge, noch nicht entschieden (`V-xx`) |
| [04-offene-fragen.md](04-offene-fragen.md) | Offene Fragen (`F-xx`) |
| [05-experimente.md](05-experimente.md) | Geplante Experimente (`E0`–`E7`) |

## Status-Kategorien

| Kategorie | Bedeutung | Wer ändert den Status? |
|---|---|---|
| **Entscheidung** | Bewusst vom Menschen festgelegt. Gilt, bis sie ausdrücklich revidiert wird. | nur der Mensch |
| **Hypothese** | Annahme, die durch ein Experiment bestätigt oder widerlegt werden soll. | Ergebnis eines Experiments |
| **Vorschlag** | Idee (meist von Claude), die noch nicht angenommen ist. Darf nicht als Entscheidung behandelt werden. | nur der Mensch |
| **Offene Frage** | Muss beantwortet werden; teils bewusst aufgeschoben. | Mensch oder Experiment |
| **Experiment** | Zeitlich begrenzter Versuch, der Hypothesen prüft oder Fragen beantwortet. | – |

## Regeln

- Ein Vorschlag wird erst zur Entscheidung, wenn der Mensch ihn ausdrücklich bestätigt. Claude verschiebt nichts eigenmächtig nach `01-entscheidungen.md`.
- Revidierte Entscheidungen werden nicht gelöscht, sondern als `revidiert` markiert, mit Datum und Begründung.
- IDs werden nicht wiederverwendet.
- Wird eine Entscheidung groß genug (z. B. Liquibase-Strategie), bekommt sie später ein eigenes Dokument im ADR-Stil.

## Herkunft

Der erste Stand wurde aus einer Zusammenfassung der Vorgespräche übernommen. Die alten Bezeichnungen D1–D6 sind wie folgt zugeordnet:

| Alt | Neu | Bemerkung |
|---|---|---|
| D1 Lernprojekt ≠ Kundenprodukt | D-01 | unverändert Entscheidung |
| D2 Content Types explizit im Code | H-06, F-03 | jetzt bewusst offen |
| D3 Content Types von Hand / aus JDL | F-10 | Anpassung nie bestätigt |
| D4 Single-Tenant | F-04 | jetzt bewusst offen |
| D5 Alles lokal | D-04 (für das Experiment), F-06/F-07 (Deployment, Hosting) | aufgeteilt |
| D6 Keine externen Dienste | V-08 | nie explizit bestätigt |
