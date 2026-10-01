# CLAUDE.md

Arbeitsregeln für Claude Code in diesem Projekt.

## Projekt

Lernexperiment: Wir untersuchen, ob und wie man mit **JHipster + Claude Code** eine individuell gestaltete Website mit eigener CMS-Funktionalität entwickeln kann. Im Mittelpunkt steht die Zusammenarbeit von **Mensch + Codegenerator + AI-Coding-Agent**.

- Das ist **kein Produktionssystem**. Ein Einsatz bei Kunden ist nicht geplant.
- JHipster ist **Untersuchungsgegenstand und Werkzeug**, nicht die festgelegte Technologie.
- Ziel, Entscheidungen, Hypothesen, Vorschläge, offene Fragen und Experimente stehen in [`docs/decisions/`](docs/decisions/README.md). Lies das vor größeren Schritten.
- Behandle Vorschläge (`V-xx`) und Hypothesen (`H-xx`) nicht als Entscheidungen. Nur `D-xx` ist festgelegt.

## Kommunikation

- Antworten und Erklärungen auf **Deutsch**.
- Kritisch hinterfragen statt bestätigen. Widersprüche und Risiken offen ansprechen.
- Unsicherheit benennen statt raten, besonders bei JHipster-Versionen und -Verhalten. Im Zweifel nachsehen.

## Vorgehen

- **Kleine, nachvollziehbare Schritte.** Ein Schritt soll für sich verständlich und prüfbar sein.
- **Vor Änderungen zuerst analysieren:** Bestehenden Code und Kontext lesen, bevor du etwas änderst.
- **Vor größeren Änderungen erst erklären**, was geändert werden soll und warum, und auf Freigabe warten. Als „größer“ gilt: mehr als eine Handvoll Dateien, neue Struktur, Generator-Läufe, Security, Datenbank-Migrationen, Dependencies.
- Nach Änderungen kurz zusammenfassen: welche Dateien, was, warum, was ungeprüft ist.

## Dependencies und Installationen

- **Keine unnötigen Dependencies.** Jede neue Dependency braucht eine Begründung: wofür, welche Alternative es gibt, was sie kostet.
- **Keine Installationen ohne Begründung und Freigabe.** Das gilt für `brew`, globale `npm`-Pakete, JDKs, Container-Laufzeiten und Ähnliches.
- 0 € laufende Kosten: keine Cloud-Dienste, keine Konten bei Drittanbietern als Voraussetzung.

## Git

- **Keine Commits, Pushes, Merges, Rebases, Resets oder anderen History-Änderungen.** Das macht ausschließlich der Mensch.
- **Die Git-Identität bleibt die des Menschen.** `git config` nicht ändern, keine Autor-Angaben setzen.
- Lesende Git-Befehle (`status`, `diff`, `log`, `show`) sind erlaubt und erwünscht.
- Wenn ein Commit sinnvoll wäre (z. B. nach einem Generator-Lauf), schlage ihn vor: welche Dateien, welche Nachricht.

## Grenzen des Projekts

- **Keine Änderungen außerhalb dieses Projektverzeichnisses.** Ausnahmen nur auf ausdrückliche Anweisung. Das schließt das Home-Git-Repo, globale Konfigurationen und Shell-Profile ein.
- Temporäre Dateien gehören nicht ins Projekt.

## Security

- **Sicherheitsrelevante Entscheidungen nicht ungeprüft übernehmen**, weder von JHipster noch aus eigenem Vorschlag. Dazu zählen Authentifizierung, Autorisierung und Rollen, Security-Konfiguration, CORS, Secrets, Passwort-Handling, Datei-Uploads und öffentliche Endpunkte.
- Solche Änderungen ausdrücklich als sicherheitsrelevant kennzeichnen und vom Menschen prüfen lassen.
- Keine Secrets ins Repository. Generierte Standard-Secrets (z. B. JWT-Keys) als „nur lokal“ kennzeichnen.

## Generierter Code und eigener Code

- **Generator-Code und Custom-Code bewusst unterscheiden.** Vor jeder Änderung klären: Ist diese Datei generiert oder selbst geschrieben?
- **Generator-owned Code wird nicht ungeprüft verändert.** Änderungen daran sind nur als bewusstes Experiment und nach expliziter Freigabe zulässig. Solche Änderungen markieren, damit sie bei der nächsten Generierung auffallen.
- Generierten Code nicht nebenbei „reparieren“ oder aufräumen. Anpassungen möglichst daneben (eigene Klassen, Erweiterungen) statt darin.
- Das Ownership-Modell (`V-02`) ist noch ein Vorschlag. Bis es entschieden ist, im Zweifel nachfragen.

## JHipster

- **JHipster-Generierung nicht blind erneut ausführen.** Jeder Generator-Lauf (`jhipster`, `jhipster jdl`, `jhipster entity` usw.) braucht vorher Freigabe.
- Vor einem Lauf: Working Tree muss sauber sein. Sagen, was der Lauf voraussichtlich ändert.
- **Generator-Läufe niemals blind und niemals mit `--force`.**
- **Immer mit `--skip-git`.** Ohne diese Option führt JHipster beim ersten Lauf selbst `git add .` und `git commit --no-verify` aus (beobachtet im Quellcode von 9.4.0, `generators/git/generator.js`). Das verletzt die Git-Regeln.
- Nach einem Lauf: Diff analysieren und zusammenfassen, besonders Überschreibungen von Custom-Code, Liquibase-Änderungen und Security-Dateien.
- Generator-Input (`.yo-rc.json`, `.jhipster/`, `*.jdl`) ist die Quelle der Wahrheit für generierte Teile.
- Achtung: `jhipster jdl` setzt bei einer **neuen** Anwendung intern `force: true` (E0, B2). Vor einem solchen Lauf vorhandene Dateien sichern bzw. prüfen.
- Generierter Code ist nicht markiert. Generator-owned Bereiche siehe Ownership-Karte in `docs/decisions/05-experimente.md` (E0).

## Lokale Entwicklung (Stand E0)

- Start: `SERVER_PORT=8081 ./mvnw -ntp`. Port 8080 ist lokal durch eine VS-Code-Extension belegt.
- Frontend-Build: `npm run webapp:build`. **`-Dskip.npm` nicht** mit Maven-Zielen kombinieren, die danach starten sollen. Sonst merkt sich der Checksum-Cache in `target/` ein „unverändertes“ Frontend, und das Bundle fehlt.
- Tests: `npm test` (Frontend), `./mvnw -ntp -Dskip.installnodenpm -Dskip.npm verify` (Backend, H2, ohne Docker).
- Dev-DB: H2-Datei unter `target/h2db/`. **`./mvnw clean` löscht sie.**
- Default-Logins `admin/admin`, `user/user` gibt es nur lokal.
- Nach jedem App-Start prüfen, ob das Angular-Bundle (`main.js`) wirklich ausgeliefert wird. HTTP 200 auf `/` allein reicht nicht.
