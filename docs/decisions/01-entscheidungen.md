# Entscheidungen

Stand: 2026-10-01

Nur hier stehende Punkte gelten als festgelegt. Änderungen nur durch den Menschen.

---

## D-01 Lernexperiment, kein Produktionssystem

- **Status:** entschieden
- **Inhalt:** Das Projekt dient dem Verständnis von AI-assisted Software Engineering. Es wird kein Kundenprodukt entwickelt.
- **Konsequenz:** Entscheidungen dürfen zugunsten des Lerneffekts getroffen werden. Ein Einsatz bei Kunden erfordert eine vollständige Neubewertung, besonders bei Security, Betrieb und Wartung.

## D-02 Experimentziel

- **Status:** entschieden
- **Inhalt:** Herausfinden, ob und wie man mit einem klassischen Codegenerator wie JHipster und einem AI-Coding-Agent wie Claude Code eine vollständige, individuell anpassbare Website inklusive eigener CMS-Funktionalität entwickeln kann, im Zusammenspiel von Mensch, Generator und AI-Agent. Leitfragen: siehe [00-ziel-und-rahmen.md](00-ziel-und-rahmen.md).

## D-03 JHipster ist Untersuchungsgegenstand, nicht gesetzte Technologie

- **Status:** entschieden
- **Inhalt:** JHipster wird als Werkzeug eingesetzt und gleichzeitig untersucht. Daraus folgt keine Festlegung auf JHipster, Spring Boot oder eine bestimmte Architektur für ein späteres CMS.
- **Konsequenz:** Experiment-Konfigurationen (z. B. Monolith, ein Frontend) sind keine Architekturentscheidungen.

## D-04 0 € laufende Kosten, lokale Arbeitsumgebung

- **Status:** entschieden
- **Inhalt:** Während des Experiments läuft alles lokal. Kostenpflichtige Cloud-Dienste kommen nicht in Frage, und ein Free Tier darf keine Voraussetzung sein.
- **Abgrenzung:** Das betrifft die Arbeitsumgebung des Experiments. Deployment und Hosting für ein mögliches späteres Produkt bleiben offen (F-06, F-07).

## D-05 Git-Hoheit beim Menschen

- **Status:** entschieden
- **Inhalt:** Claude Code darf Dateien lesen, erstellen und ändern sowie Tests und Builds ausführen. Commits, Pushes, Merges, Rebases und andere History-Änderungen macht ausschließlich der Mensch. Die Git-Identität bleibt die des Menschen.

## D-06 Arbeitsweise

- **Status:** entschieden
- **Inhalt:**
  - Kommunikation auf Deutsch
  - kleine, nachvollziehbare Schritte
  - vor Änderungen analysieren, vor größeren Änderungen erklären (was und warum)
  - keine Dependencies und Installationen ohne Begründung
  - kritisch hinterfragen statt bestätigen
- **Umsetzung:** [CLAUDE.md](../../CLAUDE.md)

## D-07 Eigenes Projektverzeichnis

- **Status:** entschieden
- **Inhalt:** Das Experiment liegt in `~/Development/vibecoding/jhipster-ai-playground` mit eigenem Git-Repository. Keine Vermischung mit `arcware/prototype`. Änderungen außerhalb dieses Verzeichnisses nur auf ausdrückliche Anweisung.
- **Bekannter Nebeneffekt:** `~/Development` liegt im Home-Git-Repo (`/Users/jcolam`) und ist dort nicht ignoriert. Siehe V-09.

## D-08 Umgang mit dem generierten JWT-Secret (nur für E0)

- **Status:** entschieden, ausdrücklich **begrenzt auf das lokale E0-Experiment**
- **Datum:** 2026-10-01
- **Ausgangslage:** JHipster hat beim Generieren von E0 ein JWT-Secret erzeugt und im Klartext in drei Dateien abgelegt (`.yo-rc.json`, `application-secret-samples.yml`, `src/test/resources/config/application.yml`). Details und die geprüften Optionen stehen in [05-experimente.md](05-experimente.md) (E0) und waren Gegenstand einer eigenen Prüfung (F-23).
- **Inhalt der Entscheidung:**
  - Das Secret bleibt für E0 unverändert in der generierten Konfiguration (Option C aus der Prüfung).
  - Geltungsbereich ist ausschließlich das **lokale** E0-Experiment.
  - Es gibt **keinen Remote** und **kein Deployment** für diesen Stand. Das Repository bleibt lokal.
  - Das Secret darf **nicht in anderen Umgebungen wiederverwendet werden** (kein anderes Projekt, kein Server, kein späteres Deployment dieses Projekts).
  - **Bevor** dieses Repository einen Remote bekommt oder irgendeine Form von Deployment stattfindet, muss die Secret-Konfiguration bereinigt bzw. ersetzt werden (z. B. Secret rotieren und über eine Umgebungsvariable statt im Repository setzen, siehe Option B in der Prüfung).
  - Die **Fundstellen** (Dateien, Konfigurationspfade) dürfen dokumentiert werden. Der **Secret-Wert selbst** wird nie dokumentiert, geloggt oder im Terminal ausgegeben.
- **Konsequenz für Commits:** `.yo-rc.json` und `application-secret-samples.yml` dürfen aufgrund dieser Entscheidung in den E0-Commit aufgenommen werden, nicht weil Secrets grundsätzlich unproblematisch wären.
- **Siehe auch:** F-23 (offene Fragen), H-04 (unmarkierter generierter Code).
