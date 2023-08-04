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
    let res = /(\S*).*\((.*)\)(?:.*Sec (\S+))?.*\s*\((.*)\).*/i.exec(txt);
    this.subjectShortName = res[1];
    this.classType = res[2];
    this.section = res[3];
    this.location = res[4];
  }
}
let baskets = {
  it: [
    // no choice
    [],

    // Basket 1
    [
      // { course: "Radar and Satellite Communication" },
      // { course: "RFIC Design" },
      { VR: "Virtual Reality" },
      { VRN: "Visual Recognition" },
      { DMMSN: "Data Management in Mobile and Sensor Networks" },
      { ESIOT: "Embedded Systems and IoT " },
    ],

    // Basket 2
    [
      // { Course: "MIMO Communication" },
      // { Course: "Microwave Remote Sensing" },
      { IR: "Information Retrieval" },
      { BDA: "Big Data Analytics" },
      { CO: "Convex Optimization" },
      { CSDF: "Cyber Security and Digital Forensic" },
    ],

    // Basket 3
    [
      // { Course: "Speech Signal Processing" },
      // { Course: "Micro Electromechanical Systems" },
      { BIO: "Bioinformatics" },
      { NGS: "Next Generation Sequencing" },
      { TSDA: "Time Series Data Analytics" },
      { PDC: "Parallel and Distributed Computing" },
    ],
  ],
};

let allSubjects = {};

Object.keys(baskets).forEach((branch) => {
  allSubjects[branch] = {};
  baskets[branch].forEach((basket, basketNumber) => {
    basket.forEach((subject) => {
      let shortname = Object.keys(subject)[0];
      allSubjects[branch][shortname] = [subject[shortname], basketNumber];
    });
  });
});

let rawTimeTable = `
+-----------+-------------------------------------------+-----------------------------------------+-----------------------------------------+-----------------------------------------+
|    Day    |                    9-11                   |                   11-1                  |                   3-5                   |                   5-7                   |
+-----------+-------------------------------------------+-----------------------------------------+-----------------------------------------+-----------------------------------------+
|   Monday  |          IML (P) - WCC (CC3-5241)         |   CO (L) - BTech (CC2-4205) - Basket 2  |  CSDF (L) - BTech (CC3-5254) - Basket 2 |  TSDA (T) - BTech (CC3-5206) - Basket 3 |
|           |     IR(L)- BTech(CC3-5155) - Basket 2     |         RMP (L) - RMI (CC1-2205)        |   IR (P) - BTech (CC3-5403) - Basket 2  |  BIO (T) - BTech (CC3-5207) - Basket 3  |
|           |   BDA (L) - BTech (CC3-5206) - Basket 2   |                                         |                                         |                                         |
|           |          RMP (L) - RMI (CC1-2205)         |                                         |                                         |                                         |
+-----------+-------------------------------------------+-----------------------------------------+-----------------------------------------+-----------------------------------------+
|  Tuesday  |   DMMSN (L) - BTech (CC3-5106) - Basket 1 |   CO (T) - BTech (CC2-4205) - Basket 2  |        IML (T) - WCC (CC3-5206)         |  PDC (P) - BTech (CC3-5403) - Basket 3  |
|           | VR (L) - BTech (CC3-5206) - Basket 1      |                                         |   CO (P) - BTech (CC3-5403) - Basket 2  |                                         |
|           |                                           |                                         |  BDA (P) - BTech (CC3-5404) - Basket 2  |                                         |
|           |                                           |                                         |  CSDF (P) - BTech (CC3-5403) - Basket 2 |                                         |
|           |                                           |                                         |         RMP (T) - RMI (CC1-2205)        |                                         |
+-----------+-------------------------------------------+-----------------------------------------+-----------------------------------------+-----------------------------------------+
| Wednesday |         IML (L) - WCC (CC3-5206)          | ESIOT (T) - BTech (CC2-4105) - Basket 1 |  TSDA (P) - BTech (CC3-5403) - Basket 3 | ESIOT (P) - BTech (CC3-5403) - Basket 1 |
|           |     TSDA(L) BTech (CC3-5206) - Basket3    |  VRN (T) - BTech (CC3-5206) - Basket 1  |  BIO (P) - BTech (CC3-5404) - Basket 3  |                                         |
|           |   BIO (L) - BTech (CC3-5207) - Basket 3   |                                         |  NGS (L) - BTech (CC3-5155) - Basket 3  |                                         |
|           |    NGS (P)- BTech (CC3-5404) - Basket 3   |                                         |                                         |                                         |
+-----------+-------------------------------------------+-----------------------------------------+-----------------------------------------+-----------------------------------------+
|  Thursday |   VRN (L) - BTech (CC3-5206) - Basket 1   |  PDC (L) - BTech (CC2-4205) - Basket 3  |  VRN (P) - BTech (CC3-5403) - Basket 1  |   VR (T) - BTech (CC3-5206) - Basket 1  |
|           |  ESIOT (L) - BTech (CC3-5207) - Basket 1  |                                         | DMMSN (P) - BTech (CC3-5404) - Basket 1 |                                         |
+-----------+-------------------------------------------+-----------------------------------------+-----------------------------------------+-----------------------------------------+
|   Friday  |   PDC (T) - BTech (CC3-5206) - Basket 3   |   VR (P) - BTech (CC3-5403) - Basket 1  |  BDA (T) - BTech (CC3-5106) - Basket 2  |  CSDF (T) - BTech (CC3-5207) - Basket 2 |
|           |   NGS (T) - BTech (LT - 3113) - Basket 3  | DMMSN (T) - BTech (CC2-4205) - Basket 1 |  IR (T) - BTech (CC3-5155) - Basket 2   |                                         |
|           |                                           |                                         |                                         |                                         |
+-----------+-------------------------------------------+-----------------------------------------+-----------------------------------------+-----------------------------------------+
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
console.log(timeTable);

export { baskets, timeTable, sections, allSubjects };
