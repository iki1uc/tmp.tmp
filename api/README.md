# Erweiterung: D-Q-F, XyX, AIR/AIV

Das System erweitert RIR um dynamische Zustände (243.js), die über D-Q-F
beschrieben werden. Zusätzlich existiert ein Sondermodus XyX, der bei
Auftreten einer 9 aktiviert wird.

## D-Q-F
D = Dimension
Q = Quantenfaktor
F = Flavor/Faktor

## XyX-Modus
XyX wird aktiv, wenn x, y oder z den Wert 9 haben.

### AIR
AIR = Auftrieb (Lift)
Wird aktiv, wenn (x+y+z) gerade ist.

### AIV
AIV = Abtrieb (Downforce)
Wird aktiv, wenn (x+y+z) ungerade ist.

## Dateien
- 3.js → Basis-DQF
- 81.js → Erweiterte 9×9-DQF
- XyX.js → Sondermodus AIR/AIV
- 243.js → Proxy + Routing + DQF + XyX
## RIR.Core

Der RIR-Core ist die Reinheitsinstanz des Systems. Er prüft:

1. Existenz
2. Struktur
3. Reinheit

Nur Impulse, die alle drei Prüfungen bestehen, werden akzeptiert.

### Funktionen
- exist(input)
- structure(input)
- purity(input)
- filter(input)
- return(input)

RIR ist Station 1 und bleibt vorläufig fertig.
