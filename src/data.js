class Section {
  constructor(name, start, end, subsections = []) {
    this.name = name;
    this.start = start;
    this.end = end;
    this.subsections = subsections;
  }
}

let sections = {
  it: [
    new Section("A", 1, 108, [
      new Section("1", 1, 36),
      new Section("2", 37, 72),
      new Section("3", 73, 108),
    ]),
    new Section("B", 109, 216, [
      new Section("1", 109, 144),
      new Section("2", 145, 180),
      new Section("3", 181, 216),
    ]),
    new Section("C", 217, 269, [
      new Section("1", 217, 251),
      new Section("2", 252, 269),
    ]),
    new Section("C", 501, 505, [new Section("3", 501, 505)]),
  ],

  "it-bi": [
    new Section("C", 1, 45, [
      new Section("2", 1, 17),
      new Section("3", 18, 45),
    ]),
    new Section("C", 501, 502, [new Section("3", 501, 502)]),
  ],
};

class Entry {
  constructor(txt) {
    let res = /(\S*).*\((.*)\)(?:.*Sec (\S+))?.* \((.*)\).*/i.exec(txt);
    this.subjectShortName = res[1];
    this.classType = res[2];
    this.section = res[3];
    this.location = res[4];
  }
}
let baskets = [
  // No choice
  [{ DM: "Data Mining" }],
  // Basket 1
  [
    { DET: "Detection and Estimation Theory" },
    { TI: "Tomographic Imaging" },
    { PMLG: "Probabilistic Machine Learning and Graphical Model" },
    { AGA: "Advanced Graphics & Animation" },
    { SNA: "Social Network Analysis" },
    { RSG: "Remote Sensing & GIS" },
    { DL: "Deep Learning" },
  ],

  // Basket 2
  [
    { RMC: "Robot Motion Control" },
    { CCPM: "Cognition and Cognitive Process Modelling" },
    { DV: "Data Visualization" },
    { EB: "Engineering Biology" },
    { NLP: "Natural Language Processing" },
  ],

  // Basket 3
  [
    { "BT/BCT": "Blockchain & Cryptocurrency" },
    { DIS: "Distributed Systems" },
    { BA: "Business Analytics" },
    { ISLR: "Information Security Risk Management" },
    { CEC: "Cloud and Edge Computing" },
  ],
];

let allSubjects = {};

baskets.forEach((basket, basketNumber) => {
  basket.forEach((subject) => {
    let shortname = Object.keys(subject)[0];
    allSubjects[shortname] = [subject[shortname], basketNumber];
  });
});

let rawTimeTable = `
 |-----------+---------------------------------------------------------+-------------------------------------------------------+---------------------------------------------------------+---------------------------------------------------------|
 | Day       | 9 - 11                                                  | 11 - 1                                                | 3 - 5                                                   | 5 - 7                                                   |
 |-----------+---------------------------------------------------------+-------------------------------------------------------+---------------------------------------------------------+---------------------------------------------------------|
 | Monday    | PMLG (L) - BTech, MLIS, DE (CC3-5206) - Basket1         | BDA (L) - DE, MLIS, SE (CC3-5255)                     | RMC (T) - Btech, RMI (CC3-5207) - Basket2               | DL (T) - BTech, MLIS, RMI, HCI, DE (CC3-5206) - Basket1 |
 |           | AGA (L) - Btech, HCI (CC3-5207) - Basket1               | ISRM (T) - Btech, CLIS (CC3-5207) - Basket3           | CCPM (T) - Btech, HCI, MLIS (CC3-5255)-Basket2          | RSG (T) - BTech (CC3-5207) - Basket1                    |
 |           | SNA (L) - Btech, DE, SE (CC3-5255) - Basket1            | IBO (L) - Btech-BI (CC3-5206)                         | DV (L) - Btech, DE, SE (CC3-5206) - Basket2             | SDA (T) - SE (CC3-5255)                                 |
 |           | PWC (L) - WCC (CC3-5254)                                |                                                       |                                                         | ESS (P) - WCC, CLIS (CC3-5241)                          |
 |           |                                                         |                                                       |                                                         | EHWSN (P) - WCC (CC2-5242)                              |
 |-----------+---------------------------------------------------------+-------------------------------------------------------+---------------------------------------------------------+---------------------------------------------------------|
 | Tuesday   | RMC (L) - Btech, RMI (CC3-5207) - Basket2               | DM (L) - BTech Sec A (CC3-5206)                       | DM (L) - BTech Sec B (CC3-5207)                         | NLP (T) - Btech, MLIS, DE, SE (CC3-5206) - Basket2      |
 |           | CCPM (L) - Btech, HCI, MLIS (CC3-5255)-Basket2          | DM (T) - BTech Sec B1 (CC3-5207)                      | DM (T) - BTech Sec C1 (CC3-5206)                        | EB (T) - Btech (CC3-5207) - Basket2                     |
 |           | DV (T) - Btech, DE, SE (CC3-5206) - Basket2             | DM (T) - BTech Sec B2 (CC3-5255)                      | DM (T) - BTech Sec C2 (CC3-5255)                        | NS (T) - CLIS (CC3-5255)                                |
 |           | ISLR (L) - CLIS (CC1-2121)                              | DM (T) - BTech Sec B3 (CC3-5107)                      | DM (T) - BTech Sec C3 (CC2-4105)                        |                                                         |
 |           |                                                         | DM (P) - BTech Sec C (CC3-5119)                       | DM (P) - BTech Sec A (CC3-5241)                         |                                                         |
 |           |                                                         | FoR (L) - RMI (CC1-2205)                              | ISLR (T) - CLIS (CC1-2121)                              |                                                         |
 |           |                                                         | SRE (L) - SE (CC3-5106)                               | BDA (P) - DE, MLIS, SE (CC3-5403)                       |                                                         |
 |           |                                                         |                                                       |                                                         |                                                         |
 |-----------+---------------------------------------------------------+-------------------------------------------------------+---------------------------------------------------------+---------------------------------------------------------|
 | Wednesday | DL (L) - BTech, MLIS, RMI, HCI, DE (CC3-5206) - Basket1 | CEC (L) - BTech, WCC (CC3-5206) - Basket 3            | DL (P) - BTech, MLIS, RMI, HCI, DE (CC3-5241) - Basket1 | PMLG (T) - BTech, MLIS, DE (CC2-4105) - Basket1         |
 |           | RSG (L) - BTech (CC3-5207) - Basket1                    | BA (L) - Btech, BTech-BI, DE, SE (CC3-5207) - Basket3 | RSG (P) - BTech (CC3-5242) - Basket1                    | AGA (T) - Btech, HCI (CC3-5207) - Basket1               |
 |           | SDA (L) - SE (CC2-4105)                                 | BT/BCT (L) - BTech, DE, CLIS (CC3-5255) - Basket3     | SDA (P) - SE (CC3-5119)                                 | SNA (T) - Btech, DE, SE (CC3-5255) - Basket1            |
 |           | NS (L) - CLIS (CC3-5255)                                | ISRM (L) - Btech, CLIS (CC3-5106) - Basket3           | NS (P) - CLIS (CC3-5403)                                | PWC (T) - WCC (CC3-5254)                                |
 |           |                                                         | DIS (T) - Btech (CC3-5107) - Basket3                  | IBO (T) - Btech-BI (CC2-4105)                           |                                                         |
 |           |                                                         |                                                       |                                                         |                                                         |
 |-----------+---------------------------------------------------------+-------------------------------------------------------+---------------------------------------------------------+---------------------------------------------------------|
 | Thursday  | NLP (L) - Btech, MLIS, DE, SE (CC3-5206) - Basket2      | ESS (L) - WCC, CLIS (CC3-5255)                        | RMC (P) - Btech, RMI (CC3-5119) - Basket2               | PMLG (P) - BTech, MLIS, DE (CC3-5241) - Basket1         |
 |           | EB (L) - Btech (CC3-5207) - Basket2                     | EHWSN (L) - WCC (CC3-5207)                            | CCPM (P) - Btech, HCI, MLIS (CC3-5241)-Basket2          | AGA (P) - Btech, HCI (CC3-5242) - Basket1               |
 |           | SRE (P) - SE (CC3-5241)                                 | BA (P) - Btech, BTech-BI, DE, SE (CC3-5241) - Basket3 | DV (P) - Btech, DE, SE (CC3-5242) - Basket2             | SNA (P) - Btech, DE, SE (CC3-5119) - Basket1            |
 |           |                                                         | BT/BCT (P) - BTech, DE, CLIS (CC3-5242) - Basket3     | ESS (T) - WCC, CLIS (CC2-4105)                          | PWC (P) - WCC (CC3-5254)                                |
 |           |                                                         |                                                       | EHWSN (T) - WCC (LT-3113)                               |                                                         |
 |           |                                                         |                                                       |                                                         |                                                         |
 |-----------+---------------------------------------------------------+-------------------------------------------------------+---------------------------------------------------------+---------------------------------------------------------|
 | Friday    | CEC (T) - BTech, WCC (CC3-5206) - Basket 3              | BDA (T) - DE, MLIS, SE (CC3-5255)                     | DM (L) - BTech Sec C (CC3-5255)                         | NLP (P) - Btech, MLIS, DE, SE (CC3-5241) - Basket2      |
 |           | BA (T) - Btech, BTech-BI, DE, SE (CC3-5207) - Basket3   | CEC (P) - BTech, WCC (CC3-5241) - Basket 3            | DM (T) - BTech Sec A1 (CC3-5206)                        | EB (P) - Btech (CC3-5242) - Basket2                     |
 |           | BT/BCT (T) - BTech, DE, CLIS (CC3-5255) - Basket3       | ISRM (P) - Btech, CLIS (CC3-5242) - Basket3           | DM (T) - BTech Sec A2 (CC3-5207)                        | FoR (P)-RMI (CC1-2205)                                  |
 |           | DIS (P) - Btech (CC3-5241) - Basket3                    | DIS (L) - Btech (CC3-5206) - Basket3                  | DM (T) - BTech Sec A3 (CC3-5107)                        |                                                         |
 |           |                                                         |                                                       | DM (P) - BTech Sec B (CC3-5242)                         |                                                         |
 |           |                                                         |                                                       | FoR (T)-RMI (CC1-2205)                                  |                                                         |
 |           |                                                         |                                                       | SRE (T)-SE (CC3-5106)                                   |                                                         |
 |           |                                                         |                                                       | ISLR (P) - CLIS (CC3-5241)                              |                                                         |
 |           |                                                         |                                                       |                                                         |                                                         |
 |-----------+---------------------------------------------------------+-------------------------------------------------------+---------------------------------------------------------+---------------------------------------------------------|
`;

function generateTimeTable() {
  let row = -1;
  let timeTable = new Array(6)
    .fill(0)
    .map(() => new Array(5).fill(0).map(() => new Array()));
  for (let line of rawTimeTable.split("\n")) {
    if (line.length < 3) continue;
    if (line[2] == "-") {
      row++;
    } else {
      let col = -1;
      for (let cell of line.split("|")) {
        cell = cell.trim();
        if (cell.length > 0) {
          if (row > 0 && col > 0) timeTable[row][col].push(new Entry(cell));
          else timeTable[row][col].push(cell);
        }
        col++;
      }
    }
  }
  return timeTable;
}

let timeTable = generateTimeTable();

export { baskets, timeTable, sections, allSubjects};
