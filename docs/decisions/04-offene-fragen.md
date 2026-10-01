# Offene Fragen

Stand: 2026-10-01

## A. Bewusst offen gehalten

Diese Punkte werden absichtlich **nicht** jetzt entschieden. Die Experimente sollen dafür eine Grundlage liefern.

| ID | Frage | Hinweise aus Experimenten |
|---|---|---|
| F-01 | Endgültiger Tech-Stack des CMS | alle |
| F-02 | Endgültige JHipster-Architektur (Monolith, Microservices, Gateway; Frontend) | E0, E6 |
| F-03 | Content-Type-System: im Code/JDL definiert, zur Laufzeit definierbar oder Mischform? | E1, E3, E6 (H-06) |
| F-04 | Multi-Tenancy: eine Instanz pro Kunde oder mehrere Kunden in einer Instanz? | – (noch kein Experiment) |
| F-05 | Media-Storage: Datenbank, Dateisystem, Object Storage? | E2 (H-07) |
| F-06 | Deployment | – |
| F-07 | Cloud- und Hosting-Architektur | – |
| F-08 | Build vs. Buy: eigenes CMS oder bestehendes CMS? | E7 (H-11) |

## B. Vor der Installation zu klären

| ID | Frage | Blockiert |
|---|---|---|
| F-09 | Bleiben die Referenzfälle A (Architekturbüro) und B (Musikschule) die Übungsdomäne, oder wählen wir eine neue? Mit welchem Fall beginnen wir? | E1 |
| F-10 | Ist es für dich in Ordnung, dass sich das Lernziel von „Schichten selbst schreiben“ zu „generierten Code verstehen und besitzen“ verschiebt? (alt: D3) | Ausrichtung der Erklärungen |
| F-11 | JDK: welche Version und welche Distribution? **Für E0 beantwortet:** Java 21, Temurin 21.0.12.1 ist systemweit installiert. | – |
| F-12 | Container-Laufzeit: Colima o. Ä. installieren oder ohne Container arbeiten? **Für E0 beantwortet:** ohne Docker/Colima. Langfristig offen, spätestens relevant für Tests gegen PostgreSQL (Profil `testprod`). | später |
| F-13 | JHipster lokal im Projekt oder global installieren? (siehe V-06) **Ist-Zustand:** 9.4.0 ist global installiert (`~/.npm-global`). Die generierte `package.json` hält die Version zusätzlich als Dev-Dependency fest. Ob das reicht, ist offen. | E1 |

## C. Vor bzw. während der Experimente zu klären

| ID | Frage | Spätestens vor |
|---|---|---|
| F-14 | Frontend-Framework für das generierte Admin-UI: Angular, React oder Vue? **Für E0:** JHipster-Default (Angular) als Baseline. Keine Festlegung darüber hinaus. | E6 |
| F-15 | Datenbank in der Entwicklung: PostgreSQL (Container) oder H2? **Für E0:** H2 (Datei), weil kein Docker. Prod-Konfiguration bleibt PostgreSQL (Default). | später |
| F-16 | Liquibase-Strategie: Standard-Changelogs von JHipster oder eigene inkrementelle Changelogs? | E3 |
| F-17 | Wie wird die individuell gestaltete öffentliche Website umgesetzt: im JHipster-Frontend, als separates Frontend oder serverseitig gerendert? | E6 |
| F-18 | Headless oder integriert? Block-basierte Seiten ja oder nein? | E6 |
| F-19 | Wie würden Updates eines CMS-Kerns bei mehreren Kundenprojekten funktionieren? | – (nach den Experimenten) |
| F-20 | Wie messen wir „sinnvoll“ im Vergleich zu AI allein oder einem bestehenden CMS? (siehe V-10) | E7 |

## C2. Neu aus E0

| ID | Frage | Spätestens vor |
|---|---|---|
| F-23 | Wie gehen wir vor dem ersten Commit mit dem generierten JWT-Secret um? **Für E0 entschieden (2026-10-01), siehe [D-08](01-entscheidungen.md#d-08-umgang-mit-dem-generierten-jwt-secret-nur-für-e0):** Secret bleibt vorerst unverändert in der generierten Konfiguration, ausschließlich für das lokale E0-Experiment ohne Remote und ohne Deployment, keine Wiederverwendung in anderen Umgebungen. Vor einem Remote oder Deployment muss die Secret-Konfiguration bereinigt bzw. ersetzt werden. Für ein späteres, nicht mehr rein lokales Setup bleibt die Frage offen. | vor Remote/Deployment erneut |
| F-24 | Berechtigungsmodell für Inhalte: Wer darf Inhalte anlegen, ändern, veröffentlichen? Heute darf jeder angemeldete Benutzer alles, und die Registrierung ist offen. | E5 |
| F-25 | Generierten Code markieren (`--with-generated-flag`), ja oder nein? | E1 |
| F-26 | Service-Schicht für Entities aktivieren, damit Custom-Logik einen Platz hat? | E1 |
| F-27 | Wie wird die Oberfläche getestet: manuell oder mit Werkzeug (Playwright/Cypress wären neue Dependencies)? | E1 |
| F-28 | Sollen nicht benötigte Generator-Artefakte (Docker-Compose, Devcontainer, Sonar) bleiben oder entfernt werden? | – |

## D. Zum Menschen

| ID | Frage |
|---|---|
| F-21 | Wie viel Erfahrung hast du mit Java/Spring, SQL und Datenbank-Migrationen? |
| F-22 | Wie viel Zeit pro Woche steht für das Experiment zur Verfügung? |

F-21 und F-22 bestimmen, wie ausführlich Claude erklärt und wie groß die Timeboxen der Experimente sind.
