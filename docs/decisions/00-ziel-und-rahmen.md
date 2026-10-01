# Ziel und Rahmen des Experiments

Stand: 2026-10-01

## Zentrales Experimentziel

> Herausfinden, ob und wie man mit einem klassischen Codegenerator wie **JHipster** und einem AI-Coding-Agent wie **Claude Code** eine vollständige, individuell anpassbare Website inklusive eigener CMS-Funktionalität entwickeln kann.

Im Mittelpunkt steht die Zusammenarbeit von **Mensch + Codegenerator + AI-Coding-Agent**.

## Leitfragen

Wir prüfen nicht nur, ob es technisch möglich ist, sondern auch:

1. Welche Aufgaben übernimmt **JHipster** sinnvoll?
2. Welche Aufgaben übernimmt **Claude Code** sinnvoll?
3. Wo liegen die **Grenzen** beider Werkzeuge?
4. Wie gut lassen sich **generierter und individuell entwickelter Code** kombinieren?
5. Wie **wartbar und erweiterbar** bleibt das Ergebnis?
6. Ist der Ansatz gegenüber **AI allein** oder einem **bestehenden CMS** sinnvoll?

Jedes Experiment in [05-experimente.md](05-experimente.md) soll mindestens eine dieser Leitfragen bedienen.

## Rolle von JHipster

JHipster ist zunächst **Untersuchungsgegenstand und Werkzeug**, nicht die gewählte Technologie für ein späteres CMS. Wenn wir JHipster für ein Experiment konfigurieren, ist das eine Experiment-Konfiguration und keine Architekturentscheidung.

## Rahmenbedingungen

Diese Punkte sind festgelegt, Details stehen in [01-entscheidungen.md](01-entscheidungen.md):

- Lernexperiment, kein Produktionssystem (D-01)
- 0 € laufende Kosten, lokale Arbeitsumgebung (D-04)
- Git-Hoheit beim Menschen (D-05)
- Arbeitsweise: Deutsch, kleine Schritte, erst erklären, dann implementieren (D-06)

## Bewusst nicht festgelegt

Diese Punkte bleiben offen, bis Experimente eine Grundlage liefern (siehe [04-offene-fragen.md](04-offene-fragen.md)):

- endgültiger Tech-Stack des CMS
- endgültige JHipster-Architektur
- Content-Type-System
- Multi-Tenancy (dass die Experimente Single-Tenant laufen, ist keine Produktentscheidung)
- Media-Storage
- Deployment
- Cloud- und Hosting-Architektur
- Build vs. Buy
