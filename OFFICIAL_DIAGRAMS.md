# OFFICIAL PROJECT DIAGRAMS (VISUAL)

Machi, idhu dhaan correct-ana flow! "Diamond (Decision)", "Box (Process)", and "Round (Start/End)" ellam mix panni draw panni iruken. 

*(Open Preview to see shapes clearly)*

---

## 1. SYSTEM FLOWCHART (Mixed Symbols)
**(Shapes: Oval = Start/End, Box = Action, Diamond = Decision)**

```text
       ( START: Visit Website )
                 │
                 ▼
        [ View Home Page ]
                 │
                 ▼
      <  New User or Admin?  >
      /                      \ 
     /                        \
( New User )              ( Admin )
    │                         │
    ▼                         ▼
[ Register Form ]        [ Login Form ]
    │                         │
    ▼                         ▼
<  Details Valid? >      <  Password Correct? >
  │            │           │             │
  │ No         │ Yes       │ No          │ Yes
  ▼            ▼           ▼             ▼
[ Show Error ] [ Save ]  [ Show Error ] [ Dashboard ]
               │                          │
               ▼                          ▼
       ( Success Ticket )         ( Manage Data )
                                          │
                                          ▼
                                    ( Print Report )
```

---

## 2. ER DIAGRAM (Entity Relationship)
**(Shapes: Box = Entity, Oval = Attribute, Diamond = Relation)**

```text
      (Name)      (Email)      (Age)
         \          │          /
          \         │         /
       ┌───────────────────────┐
       │      PARTICIPANT      │
       └────────────┬──────────┘
                    │
                    │
              < REGISTERS >  (Relation)
                    │
                    │
       ┌────────────▼──────────┐
       │        EVENT          │
       └────────────┬──────────┘
          /         │         \
         /          │          \
     (Date)       (Name)      (Venue)
```

---

## 3. DATA FLOW (DFD)
**(Shapes: Box = User/Admin, Circle = Process, Lines = Storage)**

```text
   ┌──────────┐                           ┌──────────┐
   │   USER   │                           │  ADMIN   │
   └─────┬────┘                           └─────┬────┘
         │                                      │
         │ Input data                           │ Login
         ▼                                      ▼
    (( PROCESS ))                          (( PROCESS ))
  (( Registration ))                     ((   Login    ))
         │                                      │
         ▼                                      ▼
 ═══════════════════════════════════════════════════════
 ║             LOCAL STORAGE DATABASE                  ║
 ═══════════════════════════════════════════════════════
```

---
Idhu correct-a irukum machi! Staff-ku pidikum.
