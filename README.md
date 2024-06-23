# DNDSpells

Das Ziel dieses Repository ist es, die Zauber der deutschen Version des "D&D-Spielerhandbuchs" zu digitalisieren und eine Möglichkeit zum Ausdrucken von Zauber-Karteikarten zu erschaffen.

## Kontributionen

Ich würde mich über Hilfe beim Eintippen der Zauber freuen :).

## Tools

Zum Validieren der `TOML`-dateien benutze ich das Projekt [taplo](https://taplo.tamasfe.dev/).

## Syntax

Momentan enthält die `spells.toml` Datei lediglich eine liste von Zaubern in dem folgenden format:

```toml
[[zauber]]
name = # string
schule = # Bannmagie | Beschwörung | Erkenntnis | Verzauberung | Hervorrufung | Illusion | Nekromantie | Verwandlung
grad = # zwischen 0 und 9
ritual = # boolean (optional)
zeitaufwand = # string
reichweite = # string
verbal = # boolean (optional)
gestik = # boolean (optional)
material = # string (optional)
konzentration = #boolean (optional)
wirkungsdauer = # string

# liste der klassen, die diesn Zauber ausführen können
klassen = [] # Kleriker | Druide | Paladin | Waldläufer | Zauberer | Hexenmeister | Magier
# liste von paragraphen als string
beschreibung = []
```
