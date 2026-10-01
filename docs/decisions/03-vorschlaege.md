# Vorschläge

Stand: 2026-10-01

Die meisten Vorschläge stammen von Claude. **Keiner ist entschieden.** Sie werden erst nach ausdrücklicher Bestätigung nach [01-entscheidungen.md](01-entscheidungen.md) übernommen.

Status-Werte: `vorgeschlagen` · `angenommen` (→ D-xx) · `abgelehnt` · `zurückgestellt`

---

## V-01 Arbeitsteilung „AI an den Rändern“ (Workflow D)

- **Status:** vorgeschlagen
- **Inhalt:** Der Generator erzeugt den Kern (Entitäten, CRUD, Admin). Claude Code arbeitet an den Rändern: JDL entwerfen, Custom-Zonen implementieren, Diffs nach einer Generierung analysieren. Der Mensch entscheidet an den Übergängen: JDL freigeben, Generator starten, Diff prüfen, committen.
- **Prüft:** H-02, H-09

## V-02 Ownership-Modell mit sechs Zonen

- **Status:** vorgeschlagen
- **Inhalt:**

  | Zone | Beispiele | Wer ändert? |
  |---|---|---|
  | Generator-Input | `.jhipster/`, `*.jdl`, `.yo-rc.json` | Mensch/Claude, danach Generator |
  | generator-owned | generierte Entitäten, Repositories, DTOs, CRUD-UI | Generator; von Hand nur als bewusstes Experiment nach expliziter Freigabe |
  | einmaliges Scaffold | Grundgerüst, das nach dem ersten Lauf übernommen wird | Mensch/Claude |
  | Custom | eigene Services, Controller, Website-Frontend | Mensch/Claude |
  | Migrationen (append-only) | Liquibase-Changelogs | nur ergänzen, nie ändern |
  | Security-Querschnitt | Security-Config, Auth, Rollen | nur nach Review durch den Menschen |

- **Regel für generator-owned Code:** Generator-owned Code wird nicht ungeprüft verändert. Änderungen daran sind nur als bewusstes Experiment und nach expliziter Freigabe zulässig. Generator-Läufe dürfen niemals blind oder mit `--force` erfolgen. Diese Regel ist bereits in `CLAUDE.md` verankert. Offen bleibt die Zonen-Einteilung insgesamt.
- **Durchsetzung (Vorschlag):** zuerst über `CLAUDE.md`, später ergänzend über Claude-Code-Permissions und Hooks.
- **Offen:** Welche konkreten Pfade zu welcher Zone gehören, klärt E0.

## V-03 Regeln für Generator-Läufe

- **Status:** vorgeschlagen
- **Inhalt:**
  - Der Generator läuft nur auf einem sauberen Working Tree.
  - Jeder Generator-Lauf wird ein eigener Commit (durch den Menschen).
  - Kein `--force`.
  - Anpassungen nach dem Side-by-Side-Muster: eigene Klassen neben den generierten statt Änderungen im generierten Code.
  - Drift-Check: regelmäßig prüfen, ob generierter Code von Hand verändert wurde.

## V-04 Abbruchkriterium für Round-Trip

- **Status:** vorgeschlagen
- **Inhalt:** Wir versuchen, mehrfach zu generieren (Round-Trip). Kostet die Konfliktvermeidung mehr Zeit als die eigentliche Entwicklung, wechseln wir auf „einmal generieren, danach selbst besitzen“ (Scaffolding) und dokumentieren das als Ergebnis.

## V-05 Minimale JHipster-Konfiguration für die Experimente

- **Status:** vorgeschlagen
- **Inhalt:** Monolith, ein Frontend, Session- oder JWT-Auth, kein Keycloak, keine i18n.
- **Abgrenzung:** Experiment-Konfiguration, keine Architekturentscheidung (siehe D-03).

## V-06 JHipster lokal im Projekt statt global

- **Status:** vorgeschlagen
- **Inhalt:** JHipster als Dev-Dependency im Projekt bzw. per `npx` mit fester Version. Dann ist die Generator-Version im Repository festgehalten und reproduzierbar.

## V-07 Referenzfälle A und B als Übungsdomäne

- **Status:** vorgeschlagen (früher gesetzt, nach der Zieländerung nicht erneut bestätigt)
- **Inhalt:**
  - **A Architekturbüro:** Projekte, Bilder, Team
  - **B Musikschule:** Events, Kurse/Lehrkräfte, Rollen mit Freigabe
- **Siehe:** F-09

## V-08 Keine externen Dienste für Auth, Storage, Mail

- **Status:** vorgeschlagen
- **Inhalt:** Während des Experiments werden Auth, Dateispeicher und Mail lokal gelöst (z. B. Mail nur geloggt oder lokaler Mail-Catcher).
- **Bemerkung:** Folgt praktisch aus D-04, wurde aber nie ausdrücklich bestätigt. Das langfristige Media-Storage bleibt offen (F-05).

## V-09 Projektverzeichnis im Home-Repo ignorieren

- **Status:** vorgeschlagen
- **Inhalt:** In der `.gitignore` des Home-Repos (`/Users/jcolam`) `Development/` oder `Development/vibecoding/` eintragen. Sonst sieht das Home-Repo später `node_modules/` und Build-Artefakte, und ein `git add -A` dort würde das Projekt als eingebettetes Repository aufnehmen.
- **Bemerkung:** Änderung außerhalb des Projekts. Nur auf ausdrückliche Anweisung (D-07).

## V-10 Einheitliche Bewertungskriterien für Experimente

- **Status:** vorgeschlagen
- **Inhalt:** Jedes Experiment wird nach denselben Kriterien ausgewertet, damit sich die Leitfragen am Ende beantworten lassen. Entwurf in [05-experimente.md](05-experimente.md#bewertungskriterien).
