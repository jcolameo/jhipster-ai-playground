# Experimente

Stand: 2026-10-01

E0 ist durchgeführt (2026-10-01). Alle weiteren Experimente sind **geplant**. Reihenfolge und Zuschnitt sind ein Vorschlag (V-01 bis V-04) und können sich ändern.

Status-Werte: `geplant` · `läuft` · `abgeschlossen` · `abgebrochen`

## Übersicht

| ID | Experiment | Prüft | Leitfragen | Timebox | Status |
|---|---|---|---|---|---|
| E0 | Baseline, erste Entität `Project`, Ownership-Karte | H-01, H-02, H-09, V-02 | 1, 2, 4 | 1 Session | abgeschlossen (nicht committet) |
| E1 | Regeneration und erste Custom-Erweiterung (neu zuzuschneiden, siehe E0) | H-02, H-03, H-04, H-06 | 2, 4, 5 | 1–2 Sessions | geplant |
| E2 | Relationen und Medien | H-07 | 3 | 1–2 Sessions | geplant |
| E3 | Modelländerung mit bestehenden Daten | H-06, H-08 | 4, 5 | 1–2 Sessions | geplant |
| E4 | Absichtlicher Konflikt beim Neu-Generieren | H-03, H-04 | 3, 4 | 1–2 Sessions | geplant |
| E5 | Vergleich: Fachlogik in drei Varianten | H-02, H-03 | 2, 4, 5 | 1–2 Sessions | geplant |
| E6 | Individuell gestaltete öffentliche Website | H-05, H-06 | 3, 4 | 2 Sessions | geplant |
| E7 | Vergleich mit AI allein und bestehendem CMS | H-10, H-11 | 6 | 2 Sessions | geplant |

---

## E0 Baseline, erste Entität und Ownership-Karte

**Status:** abgeschlossen am 2026-10-01, Dauer etwa eine Session. Der Stand ist **nicht committet**. Der Commit ist Sache des Menschen (D-05).

### Ausgangslage

| Komponente | Version / Zustand |
|---|---|
| macOS | 13.4.1, Apple M2 (arm64) |
| Java | Temurin 21.0.12.1 (systemweit, vom Menschen vor E0 installiert) |
| Node / npm | 24.15.0 / 11.12.1 |
| JHipster | 9.4.0, global in `~/.npm-global` (vom Menschen vor E0 installiert) |
| Git | 2.39.2. Repo ohne Commit, alle Docs untracked. `user.name`/`user.email` in dieser Shell nicht gesetzt |
| Docker / Colima | nicht vorhanden, für E0 bewusst nicht installiert |
| Port 8080 | belegt durch eine VS-Code-Extension („Code Helper (Plugin)“) |

Vorgaben des Menschen für E0: JHipster 9.4.0, Java 21, Monolith, einfaches Frontend, Entity `Project` (`name`, `description`), keine Relationen, Medien, Rollen, externen Dienste oder unnötigen Dependencies, kein Docker.

### Hypothese

E0 sollte vor allem beobachten, nicht beweisen. Im Blick waren:
- **H-01:** JHipster nimmt bei Entitäten, CRUD, Admin-UI, Auth und Gerüst viel Arbeit ab.
- **H-02:** Claude ist an den Rändern nützlich (Konfiguration verstehen, Diff und Code analysieren).
- **H-09:** Der Mensch wird an den Übergängen gebraucht.
- **V-02:** Lässt sich das generierte Projekt sinnvoll in Ownership-Zonen aufteilen?

### Versuch

1. JHipster-Quellcode (9.4.0) gelesen: Prompts, Defaults, Git-Verhalten, Test-Profile.
2. JDL [`app.jdl`](../../app.jdl) geschrieben. Grundsatz: Default, außer es gibt einen E0-Grund für eine Abweichung.
3. **Probelauf** im Scratchpad (außerhalb des Projekts, `--skip-install`), um Dateiliste, Konflikte und Git-Verhalten vorab zu sehen.
4. Prüfsummen aller vorhandenen Projektdateien festgehalten. Das ersetzt den „sauberen Working Tree“, weil es noch keinen Commit gibt.
5. Generiert mit: `jhipster jdl app.jdl --skip-git --skip-commit-hook --no-insight` (ohne `--force`).
6. Geprüft: Prüfsummen, Git-Status, Struktur, Entity, Security, Liquibase, Tests.
7. Tests: `npm test` (Frontend) und `./mvnw -ntp -Dskip.installnodenpm -Dskip.npm verify` (Backend).
8. App gestartet (`SERVER_PORT=8081 ./mvnw -ntp`). CRUD per HTTP/`curl` getestet, Neustart, Persistenz geprüft.

**JDL-Entscheidungen (nur für E0, keine Architekturentscheidungen):**

| Option | Wert | Default? | Grund |
|---|---|---|---|
| applicationType | monolith | ja | Vorgabe |
| authenticationType | jwt | ja | Default bewusst übernommen. Sicherheitsrelevant, nicht bewertet |
| clientFramework | angular | ja | „einfaches Frontend“; Default als Baseline (F-14 bleibt offen) |
| buildTool | maven | ja | – |
| prodDatabaseType | postgresql | ja | – |
| devDatabaseType | h2Disk | **nein** (Default: wie Prod = PostgreSQL) | kein Docker. Dadurch laufen Tests im Profil `testdev` gegen H2 |
| cacheProvider / enableHibernateCache | no / false | **nein** (Default: Ehcache + 2nd-Level-Cache) | in E0 nicht nötig, weniger Dependencies |
| enableTranslation | false | **nein** (Default: an) | in E0 nicht nötig |
| testFrameworks | [] | ja | kein Cypress/Gatling |
| Entity `Project` | `name String required`, `description TextBlob` | – | `TextBlob` statt `String`, weil `String` als `varchar(255)` angelegt wird |
| Entity-Optionen | kein DTO, kein Service, keine Pagination | ja | minimal |
| CLI | `--skip-git` | **nein** | siehe Beobachtung B1 |
| CLI | `--skip-commit-hook` | **nein** | Husky würde Git-Hooks/`core.hooksPath` setzen und Dependencies hinzufügen |

### Beobachtungen

**Generator-Verhalten**
- **B1 – JHipster committet selbst.** Ohne `--skip-git` führt JHipster nach der Generierung `git add .` und `git commit --no-verify` aus, solange `.yo-rc.json` noch nicht im Git-Verlauf liegt (`generators/git/generator.js`). Das hätte alle Docs mitcommittet. Mit `--skip-git` gab es nachweislich keinen Commit, keine Hooks und keine Änderung der lokalen Git-Config.
- **B2 – Implizites `--force` beim ersten JDL-Lauf.** `jhipster jdl` setzt für eine neue Anwendung intern `force: true` und `reproducible: true` (`generators/jdl/generator.js`). Vorhandene Dateien mit gleichem Namen würden ohne Nachfrage überschrieben, z. B. eine eigene `README.md`. Unsere Dateien blieben unverändert (Prüfsummen). Bei späteren Läufen ist die App nicht mehr neu, `force` bleibt dann unset.
- **B3 – Zeitstempel aus 2023.** Durch `reproducible` ist `creationTimestamp` aus `baseName` abgeleitet (2023-12-19). Deshalb heißt der Changelog `20231219041529_added_entity_Project.xml`.
- **B4 – JWT-Secret im Generator-Input.** `jwtSecretKey` steht im Klartext in `.yo-rc.json`. Derselbe Wert steht auch in `application-secret-samples.yml`, `src/test/resources/config/application.yml` und `src/main/docker/jhipster-control-center.yml`. Das Profil `dev` aktiviert `secret-samples` automatisch (Profilgruppe in `application.yml`).
- **B5 – Docker-Artefakte trotz „kein Docker“.** Generiert wurden `src/main/docker/*` (PostgreSQL, Prometheus, Grafana, Sonar, Jib), `.devcontainer/` und das Maven-Profil `docker-compose` (`activeByDefault`). Im Profil `dev` ist die Compose-Integration aus (`application-dev.yml`). Für E0 war deshalb keine Anpassung nötig.
- **B6 – npm 11 blockiert Install-Skripte** von 7 Paketen (u. a. `esbuild`, `fsevents`, `@scarf/scarf`). Build und Tests liefen trotzdem.
- **B7 – Maven installiert eigenes Node/npm** (v24.21.0 / npm 12.0.2) unter `target/node`. Das System hat Node 24.15.0 / npm 11.12.1.
- **B8 – Keine Markierung generierter Dateien.** `@GeneratedByJHipster` wird zwar als Annotation erzeugt, aber an keiner Klasse angebracht (Option `--with-generated-flag` nicht gesetzt). Was generiert ist, lässt sich nur über Wissen, Git-Historie oder einen Vergleich mit einer Neugenerierung erkennen.

**Laufzeit und Tests**
- Generierung inklusive `npm install`: ca. 80 s. 499 neue Dateien ohne `node_modules`/`target` (ca. 3,4 MB). `node_modules` 463 MB, `target` 133 MB direkt nach der Generierung.
- Frontend: 66 Testdateien, **330 Tests grün** (Vitest). Nur Sass-Deprecation-Warnungen.
- Backend: **47 Unit-Tests und 131 Integrationstests grün** im Profil `test,testdev` gegen H2. Docker wurde nicht gebraucht. `~/.m2` wuchs von 73 auf 278 MB.
- Erster Start scheiterte: **Port 8080 belegt** (VS-Code-Extension). Ursache war die lokale Umgebung, kein Generatorfehler. Gelöst durch `SERVER_PORT=8081` für den Start, ohne Dateiänderung.
- **Frontend zunächst nicht gebaut (falsch positiver Test).** `GET /` lieferte 200, aber nur eine statische Hülle ohne Angular-Bundle. Ursache war ein Bedienfehler von Claude: Der `verify`-Lauf mit `-Dskip.npm` schrieb die Frontend-Prüfsummen (`target/checksums.csv(.old)`), ohne das Bundle zu bauen. Danach überspringt `./mvnw` den Frontend-Build dauerhaft. Gelöst mit `npm run webapp:build`, danach wurden `main.js` und `polyfills.js` ausgeliefert.
- **Die Oberfläche wurde nicht im Browser geprüft.** Ein Versuch mit Chrome headless hing und wurde nach der Timebox abgebrochen. Die CRUD-Tests liefen ausschließlich über die REST-API.

**API-Tests (curl, Port 8081)**

| Test | Ergebnis |
|---|---|
| `GET /management/health` | `UP` |
| `GET /api/projects` ohne Token | 401 |
| Login `admin`/`admin` (Default-User aus `liquibase/data/user.csv`) | Token erhalten |
| Liste | 30 Fake-Einträge (Liquibase-Kontext `faker`) |
| Create / Update / Read | 201 / 200 / 200 |
| Create ohne `name` | 400 (Validierung greift) |
| Delete, danach Read | 204, danach 404 |
| Neustart der App, danach Read des geänderten Datensatzes | Daten vorhanden (H2-Datei `target/h2db/db/playground.mv.db`) |
| Login `user`/`user` (ROLE_USER) → Project anlegen | **201** (jeder angemeldete Benutzer darf Projekte ändern) |
| ROLE_USER → `/api/admin/users` | 403 |
| `/h2-console/` ohne Login (Profil dev) | 200 |

### Ergebnisse: Was JHipster erzeugt hat

- **Backend (Spring Boot 4.1.1):** 57 Java-Klassen plus 14 `package-info.java` (zusammen 4.332 Zeilen), Pakete `config`, `domain`, `repository`, `service`, `web/rest`, `security`, `aop`, `management`. Dazu User-, Account- und Authority-Verwaltung, JWT-Auth, Mail-Service, Fehlerbehandlung (Problem Details), Logging, OpenAPI.
- **Für `Project` (31 Dateien, ca. 2.500 Zeilen):** Entity, Repository, REST-Resource (POST/PUT/PATCH/GET/GET by id/DELETE). Die Resource greift **direkt auf das Repository zu**, ohne Service-Schicht. Dazu kommen Liquibase-Changelog, Fake-Daten, Angular-Feature (Liste, Detail, Formular, Löschdialog, Service, Routing) sowie Unit- und Integrationstests für Backend und Frontend. Eingetragen wurde `Project` außerdem per „Needle“ in `master.xml`, `entity.routes.ts` und `navbar.html`.
- **Frontend (Angular 22.1.6):** Login, Registrierung, Passwort-Reset, Account-Seiten, Admin-UI (Benutzer, Authorities, Health, Metrics, Logs, Konfiguration, API-Docs), Bootstrap-Layout.
- **Tests:** 5.018 Zeilen Java-Tests, 66 Frontend-Testdateien.
- **Build:** `pom.xml` (1.173 Zeilen) mit Checkstyle, Spotless, JaCoCo, Sonar, Jib, Frontend-Plugin. `package.json` mit 56 Skripten, Maven- und npm-Wrapper.
- **Infrastruktur, die E0 nicht braucht:** Docker-Compose-Dateien, Devcontainer, Sonar-Konfiguration.

### Ownership-Karte (konkret für dieses Projekt)

Das ist eine **Arbeitshypothese**. Welche Dateien eine erneute Generierung tatsächlich ändert, ist noch nicht beobachtet. Das soll E1 prüfen.

| Zone | Pfade | Beobachtung / Regel |
|---|---|---|
| **1 Generator-Input** | `app.jdl`, `.yo-rc.json`, `.jhipster/Project.json` | `.yo-rc.json` ist zugleich Output: JHipster schreibt Zeitstempel und `jwtSecretKey` hinein (B3, B4). |
| **2 Generator-owned** (pro Entity) | `domain/Project.java`, `repository/ProjectRepository.java`, `web/rest/ProjectResource.java`, `webapp/app/entities/project/**`, `src/test/**/Project*`, `liquibase/fake-data/project.csv` | Wird bei Änderung der Entity voraussichtlich neu geschrieben. Ändern nur als bewusstes Experiment nach Freigabe. |
| **2b Needle-Dateien** (gemischt) | `liquibase/master.xml`, `webapp/app/entities/entity.routes.ts`, `webapp/app/layouts/navbar/navbar.html` | JHipster fügt an `jhipster-needle-*`-Kommentaren ein (15 Dateien enthalten Needles). Ob eigene Änderungen außerhalb der Needles erhalten bleiben, ist offen. |
| **3 Generated once / Project-owned** | `config/**` (außer Security), `PlaygroundApp.java`, `aop`, `management`, `webapp/app/{home,layouts,shared,core,config}`, `pom.xml`, `package.json`, `angular.json`, `application*.yml`, `README.md`, `.gitignore`, `src/main/docker/**`, `.devcontainer/**` | Nur „einmalig“, solange keine App-Level-Regeneration läuft. Ändert sich `config` in `app.jdl`, schreibt JHipster diese Dateien vermutlich neu. Unbestätigt. |
| **4 Custom** | noch keiner | Kandidaten (Vorschlag, nicht entschieden): eigenes Java-Paket neben den generierten (z. B. `com.example.playground.<feature>`), eigene Angular-Ordner außerhalb von `entities/`, eigene Liquibase-Changelogs, `docs/`. |
| **5 Migrationen** | `liquibase/changelog/00000000000000_initial_schema.xml`, `20231219041529_added_entity_Project.xml`, `liquibase/data/*.csv`, `liquibase/fake-data/**` | Der Project-Changelog ist **zugleich generator-owned**. Ändert eine Regeneration einen bereits angewendeten Changeset, droht ein Liquibase-Checksum-Konflikt (H-08, E3). Die Dev-DB liegt in `target/` und wird von `./mvnw clean` gelöscht. |
| **6 Security** | `config/SecurityConfiguration.java`, `config/SecurityJwtConfiguration.java`, `security/**`, `web/rest/{AuthenticateController,AccountResource,UserResource,PublicUserResource,AuthorityResource}.java`, `domain/{User,Authority}.java`, `service/UserService.java`, `liquibase/data/user*.csv`, JWT/CORS-Abschnitte in `application*.yml`, `application-secret-samples.yml`, `.yo-rc.json` (`jwtSecretKey`), `src/test/resources/config/application.yml`, `src/main/docker/jhipster-control-center.yml`, `webapp/app/core/{auth,interceptor}/**`, `webapp/app/account/**` | Beobachtet, **nicht bewertet oder geändert**: Default-Benutzer `admin/admin` und `user/user`; offene Registrierung (`/api/register`); jeder angemeldete Benutzer darf `Project` ändern (keine Rollenprüfung pro Entity); CSRF aus (stateless JWT); JWT im Browser in `localStorage`/`sessionStorage`; `/h2-console` und `/management/prometheus` ohne Login. |

### Generator-Effekt

Wo JHipster konkret Arbeit abgenommen hat. Das sind Beobachtungen, ein Zeitvergleich ohne Generator wurde nicht gemessen:
- **Gerüst und Build:** lauffähiges Maven/Angular-Projekt mit Wrappern, Profilen (dev/prod/test), Codequalitäts-Plugins, Frontend-Integration in Maven. Funktionierte ohne Anpassung.
- **Auth und Benutzerverwaltung komplett:** Login, Registrierung, Passwort-Reset, Rollen, Admin-UI. Das ist der größte Block, den man sonst selbst entwerfen und absichern müsste.
- **Entity end-to-end aus 4 JDL-Zeilen:** DB-Schema, JPA, REST, Validierung, Angular-CRUD, Tests und Testdaten, alles in sich konsistent benannt.
- **Tests, die sofort grün sind:** 178 Backend- und 330 Frontend-Tests als Ausgangsbasis.
- **Konsistenz:** Jede weitere Entity folgt voraussichtlich demselben Muster. Das ist ein Vorteil für Wartbarkeit und für Claude, weil das Muster vorhersehbar ist.

### AI-Effekt

Wo Claude Code in E0 beigetragen hat:
- **Generator-Verhalten aus dem Quellcode belegt statt geraten:** Auto-Commit (B1), implizites `force` (B2), Defaults pro Anwendungstyp, Testcontainers nur im Profil `testprod`. Ohne diese Analyse hätte der erste Lauf gegen D-05 verstoßen.
- **Probelauf außerhalb des Projekts** als Absicherung, bevor das echte Verzeichnis berührt wurde.
- **Konfiguration begründet** und Abweichungen vom Default dokumentiert.
- **Fehler eingeordnet statt repariert:** Port 8080 als Umgebungsproblem erkannt und ohne Dateiänderung gelöst.
- **Analyse:** Ownership-Karte, Security-Beobachtungen, Kennzahlen.
- **Fehler von Claude:** Der eigene `-Dskip.npm`-Lauf verursachte den falsch positiven Frontend-Test. Er fiel erst bei der Nachprüfung der ausgelieferten Assets auf. Ein Browser-Test der Oberfläche gelang Claude nicht.

### Probleme

| Problem | Art | Lösung |
|---|---|---|
| Auto-Commit durch JHipster | Generator-Verhalten (Default) | `--skip-git` |
| Implizites `force` beim ersten Lauf | Generator-Verhalten | keine Lösung nötig, unsere Dateien waren nicht betroffen; Regel ergänzt |
| Port 8080 belegt | lokale Umgebung | `SERVER_PORT=8081` beim Start |
| Frontend nicht gebaut | Bedienfehler (Claude), verstärkt durch Checksum-Cache | `npm run webapp:build` |
| Chrome headless hängt | Werkzeug/Umgebung, Ursache nicht untersucht | abgebrochen; UI-Test durch Menschen offen |
| Working Tree nicht „sauber“ prüfbar | Projektzustand (kein Commit) | Prüfsummen als Ersatz |

### Learning

1. **Ein Generator hat eigene Annahmen über Git.** Die Regel „Claude committet nicht“ reicht nicht, wenn das Werkzeug selbst committet. Regeln müssen auch für die Werkzeuge gelten, die Claude startet.
2. **„Kein `--force`“ schützt beim ersten Lauf nicht.** Der Schutz liegt in Probelauf und Prüfsummen bzw. später einem sauberen Commit vor jedem Lauf.
3. **„Generiert“ ist nicht sichtbar.** Ohne Markierung (B8) hängt die Unterscheidung von Generator- und Custom-Code an Disziplin und Git-Historie. Deshalb ist ein Commit direkt nach der Generierung wichtig.
4. **JHipster liefert mehr als bestellt.** Docker, Monitoring, Sonar, Devcontainer, offene Registrierung, Default-Benutzer. Für ein CMS ist das teils nützlich, teils Ballast oder Risiko, und es muss bewusst bewertet werden.
5. **Das Berechtigungsmodell für Inhalte fehlt.** Jeder angemeldete Benutzer kann alles ändern. Für ein CMS mit Rollen (Referenzfall B) ist das genau die Stelle, an der Custom-Code nötig wird.
6. **Grüne Tests und HTTP 200 beweisen nicht, dass die App funktioniert.** Prüfen, was tatsächlich ausgeliefert wird.

### Offene Fragen nach E0

- Was ändert eine **erneute** Generierung (z. B. neues Feld) tatsächlich, und bleiben Änderungen in Needle-Dateien erhalten?
- Soll `--with-generated-flag` aktiviert werden, um generierte Java-Klassen zu markieren?
- Wie wird mit dem JWT-Secret in `.yo-rc.json` und den Beispiel-Konfigurationen vor dem ersten Commit umgegangen? (siehe F-23)
- Wo genau soll Custom-Code liegen (Zone 4)?
- Soll die Service-Schicht für Entities aktiviert werden (`service Project with serviceClass`), damit Custom-Logik einen Platz hat?
- Wie wird die Oberfläche getestet: manuell durch den Menschen oder mit einem Werkzeug (z. B. Playwright → neue Dependency)?

## E1 Regeneration und erste Custom-Erweiterung

- **Status:** geplant, Zuschnitt nach E0 angepasst. Der ursprüngliche Inhalt („Erste Entität `Project` per JDL“) ist durch E0 erledigt.
- **Ziel:** Beobachten, was eine erneute Generierung mit dem bestehenden Code macht, und erstmals Custom-Code neben generiertem Code platzieren.
- **Vorschlag:** siehe Abschlussanalyse von E0. Wird vor dem Start vom Menschen bestätigt.
- **Voraussetzungen:** E0-Stand committet (durch den Menschen); F-09; Umgang mit dem Secret (F-23).

## E2 Relationen und Medien

- **Ziel:** Relationen (z. B. Project ↔ Image, Project ↔ TeamMember) und Bildverwaltung testen.
- **Fokus:** Die „BLOB-Falle“: Was passiert, wenn Bilder als Datenbankfelder generiert werden? Wie sähe eine Alternative aus?

## E3 Modelländerung mit bestehenden Daten

- **Ziel:** Ein Feld (z. B. `category`) zu einer Entität mit vorhandenen Daten hinzufügen und neu generieren.
- **Fokus:** Was macht JHipster mit Liquibase-Changelogs? Gehen Daten verloren?
- **Voraussetzung:** F-16 muss vorher entschieden sein.

## E4 Absichtlicher Konflikt

- **Ziel:** Generierten Code bewusst von Hand ändern, dann neu generieren.
- **Fokus:** Wie sichtbar wird der Konflikt? Erkennt Claude ihn bei der Diff-Analyse? Reichen die Regeln aus V-03?

## E5 Vergleich: Fachlogik in drei Varianten

- **Ziel:** Dieselbe Anforderung auf drei Arten umsetzen und vergleichen.
- **Anforderung:** Event mit Veröffentlichungs-Berechtigung (Referenzfall B: nur bestimmte Rollen dürfen veröffentlichen).
- **Varianten (Entwurf):** (1) generierten Code direkt ändern, (2) Side-by-Side-Erweiterung, (3) ohne Generator nur mit Claude.

## E6 Individuell gestaltete öffentliche Website

- **Ziel:** Prüfen, wie aus den CMS-Daten eine frei gestaltete öffentliche Website entsteht.
- **Fokus:** Wie viel davon ist noch JHipster? Wie trennen sich Admin-Bereich und öffentliche Seite?
- **Voraussetzungen:** F-17, F-18 zumindest für das Experiment beantwortet.

## E7 Vergleich mit AI allein und bestehendem CMS

- **Ziel:** Leitfrage 6 beantworten.
- **Vorgehen (Entwurf):** Einen kleinen, klar abgegrenzten Ausschnitt (z. B. Projektliste mit Detailseite und Pflege im Admin) zusätzlich (a) nur mit Claude Code ohne Generator und (b) mit einem bestehenden CMS umsetzen. Anschließend nach den Bewertungskriterien vergleichen.
- **Voraussetzung:** F-20

---

## Bewertungskriterien

Entwurf, siehe V-10. Nach jedem Experiment kurz festhalten:

| Kriterium | Frage |
|---|---|
| Aufwand | Wie lange hat es gedauert? Wofür ging die Zeit drauf? |
| Rolle JHipster | Was hat der Generator übernommen, und war das brauchbar? |
| Rolle Claude Code | Was hat Claude übernommen? Wo war das Ergebnis falsch oder musste korrigiert werden? |
| Rolle Mensch | Wo war menschliches Eingreifen nötig, und warum? |
| Kombinierbarkeit | Gab es Konflikte zwischen generiertem und eigenem Code? |
| Wartbarkeit | Würde man diesen Stand in sechs Monaten noch verstehen und ändern können? |
| Überraschungen | Was lief anders als erwartet? |
| Hypothesen | Welche Hypothesen sind jetzt gestützt, widerlegt oder unklar? |

Die Ergebnisse gehören später in eigene Experiment-Berichte (Ort noch offen, z. B. `docs/experiments/`).
