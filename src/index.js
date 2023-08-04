import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { baskets, timeTable, sections, allSubjects } from "./data.js";

let basketColor = ["secondary", "primary", "success", "danger"];
let classType = {
  L: "Lecture",
  P: "Practical",
  T: "Tutorial",
};

class TimeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branch: "it",
      rollNumber: 47,
      section: "A2",
      selected: ["","DMMSN", "BDA", "TSDA"],
    };
  }
  handleChoice(basketNumber, subjectShortName) {
    let newSelected = this.state.selected.slice();
    newSelected[basketNumber] = subjectShortName;
    this.setState({
      selected: newSelected,
    });
  }
  handleBranch(newBranch) {
    let rollNumber = 1;
    let newSection = this.getSection(sections[newBranch], rollNumber);
    if (newSection.length == 0) newSection = "Invalid";

    this.setState({
      branch: newBranch,
      section: newSection,
      rollNumber: rollNumber,
      selected: baskets[newBranch].map((baskets) => {
        return baskets.length > 0 ? Object.keys(baskets[0])[0] : "";
      }),
    });
  }
  handleRollNumber(newRollNumber) {
    let newSection = this.getSection(
      sections[this.state.branch],
      newRollNumber
    );
    if (newSection.length == 0) {
      newSection = "Invalid";
    }
    this.setState({
      rollNumber: newRollNumber,
      section: newSection,
    });
  }
  getSection(sections, roll) {
    for (let section of sections) {
      if (section.start <= roll && roll <= section.end)
        return section.name + this.getSection(section.subsections, roll);
    }
    return "";
  }
  render() {
    return (
      <div className="container-md">
        <div className="row mb-4 text-center">
          <h1 className="display-1">Time Table</h1>
        </div>
        <div className="row mb-3 justify-content-md-center">
          {[
            ["it", "Information Technology"],
            ["it-bi", "Information Technology - Business Informatics"],
          ].map((branch) => {
            return (
              <div
                key={branch[0]}
                className="col btn-group col-md-4 col-lg-3 col-sm-6 mb-3"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="branch"
                  id={branch[0]}
                  autoComplete="off"
                  onClick={() => this.handleBranch(branch[0])}
                  defaultChecked={branch[0] == "it"}
                />
                <label className="btn btn-outline-info" htmlFor={branch[0]}>
                  {branch[1]}
                </label>
              </div>
            );
          })}
        </div>
        {/* <div className="row">
          <div className="col-6 ">
            <p className="lead text-center">Roll Number</p>
          </div>
          <div className="col-6 ">
            <input
              className="w-100"
              type="number"
              defaultValue={this.state.rollNumber}
              onChange={(event) => this.handleRollNumber(event.target.value)}
            />
          </div>
        </div> */}
        {/* <div className="row">
          <div className="col-6">
            <p className="lead text-center">Section</p>
          </div>
          <div className="col-6">
            <p className="text-start">{this.state.section}</p>
          </div>
        </div> */}
        <div className="row mb-3">
          {baskets[this.state.branch].map((basket, basketNumber) => {
            // skip basket0, no choice
            if (basketNumber == 0) return;
            let buttonClass = basketColor[basketNumber];
            return (
              <div
                className="col btn-group-vertical col-md-4 col-sm-6 mb-3"
                key={basketNumber}
              >
                {basket.map((subject) => {
                  let shortname = Object.keys(subject)[0];
                  let fullname = subject[shortname];
                  return (
                    <div key={shortname}>
                      <input
                        type="radio"
                        className="btn-check"
                        name={basketNumber}
                        id={shortname}
                        autoComplete="off"
                        onClick={() =>
                          this.handleChoice(basketNumber, shortname)
                        }
                        defaultChecked={this.state.selected.includes(shortname)}
                      />
                      <label
                        className={"btn btn-outline-" + buttonClass}
                        htmlFor={shortname}
                      >
                        {fullname}
                      </label>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <table className="table table-bordered ">
          <thead>
            <tr className="table-warning">
              {timeTable[0].map((cell, colIndex) => {
                return (
                  <th scope="col" key={colIndex}>
                    {cell}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {timeTable.map((row, rowIndex) => {
              if (rowIndex == 0) return;
              return (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => {
                    // first column
                    if (colIndex == 0)
                      return (
                        <th
                          scope="col"
                          key={colIndex}
                          className="table-warning"
                        >
                          {cell}
                        </th>
                      );

                    // add all valid slots to list
                    let slots = [];
                    for (let slot of cell) {
                      let res =
                        allSubjects[this.state.branch][slot.subjectShortName];
                      if (!res) continue;
                      let fullname = res[0];
                      let basketNumber = res[1];
                      if (
                        (!slot.section ||
                          this.state.section.startsWith(slot.section)) && // section is valid for slot
                        (basketNumber == 0 /* no choice basket  */ ||
                          this.state.selected.some(
                            (sub) => sub == slot.subjectShortName
                          )) // subject is selected
                      ) {
                        slots.push({
                          fullname: fullname,
                          basketNumber: basketNumber,
                          classType: slot.classType,
                          location: slot.location,
                        });
                      }
                    }

                    if (slots.length == 1) {
                      let subject = slots[0];
                      return (
                        <th
                          scope="col"
                          key={colIndex}
                          className={
                            "table-" + basketColor[subject.basketNumber]
                          }
                        >{`${classType[subject.classType]} of ${
                          subject.fullname
                        } at ${subject.location}`}</th>
                      );
                    } else if (slots.length == 0) {
                      return (
                        <th scope="col" key={colIndex} className="table-light">
                          -
                        </th>
                      );
                    } else {
                      return (
                        <th scope="col" key={colIndex} className="table-dark">
                          {"Clash between\n" +
                            slots
                              .map((subject) => {
                                return `${classType[subject.classType]} of ${
                                  subject.fullname
                                } at ${subject.location}`;
                              })
                              .join(" and ")}
                        </th>
                      );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="row mb-4 text-center">
          <p className="text-muted"> Made with Lobe by Raghav Agarwal</p>
        </div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<TimeTable />);
