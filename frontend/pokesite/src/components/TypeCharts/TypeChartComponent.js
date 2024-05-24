import React from "react";
import typeNums from "./TypeNums.json";
const TypeChartComponent = (props) => {
  const getTypeTag = (type, damage) => {
    let className = "";
    switch (damage) {
      case 0.25:
        className = "quarter";
        break;
      case 0.5:
        className = "half";
        break;
      case 0:
        className = "none";
        break;
      case 2:
        className = "double";
        break;
      case 4:
        className = "quadruple";
        break;
      default:
        className = "normaldmg";
    }

    return <td className={className}>x{damage}</td>;
  };
  const calculateEffectiveness = (type1, type2) => {
    console.log("Type 1: ", type1, "Type2: ", type2);
    return (TYPE_CHART[type2][props.type] * TYPE_CHART[type2][type1]);
  };
  const TYPE_CHART = typeNums;

  return (
    <div>
      <table>
      <thead style={{position:"sticky", top: "0px", padding: "10px 0px"}}>
          <tr className={`dropShadow ${props.type}`}>
            <th colSpan={2} style={{backgroundColor: "white", color:"black"}}>
              Attacking →
              <br />
              Defending ↓
            </th>

            <th className={"pokemonMoveType normal"}>NOR</th>
            <th className={"pokemonMoveType fire"}>FIR</th>
            <th className={"pokemonMoveType water"}>WAT</th>
            <th className={"pokemonMoveType electric"}>ELE</th>
            <th className={"pokemonMoveType grass"}>GRA</th>
            <th className={"pokemonMoveType ice"}>ICE</th>
            <th className={"pokemonMoveType fighting"}>FIG</th>
            <th className={"pokemonMoveType poison"}>POI</th>
            <th className={"pokemonMoveType ground"}>GRO</th>
            <th className={"pokemonMoveType flying"}>FLY</th>
            <th className={"pokemonMoveType psychic"}>PSY</th>
            <th className={"pokemonMoveType bug"}>BUG</th>
            <th className={"pokemonMoveType rock"}>ROC</th>
            <th className={"pokemonMoveType ground"}>GHO</th>
            <th className={"pokemonMoveType dragon"}>DRA</th>
            <th className={"pokemonMoveType dark"}>DAR</th>
            <th className={"pokemonMoveType steel"}>STE</th>
            <th className={"pokemonMoveType fairy"}>FAI</th>
          </tr>
        </thead>
        <tbody>
        {Object.keys(TYPE_CHART).map((type1) => (
            <tr key={type1}>
              <td className={`pokemonMoveType ${props.type}`}>
                <p className={`pokemonMoveType`}>{props.type}</p>
              </td>
              <td className={`pokemonMoveType ${type1}`}>
                <p className={`pokemonMoveType`}>{type1}</p>
              </td>
              {Object.keys(TYPE_CHART).map((type2) => (
                <React.Fragment key={type2}>
                  {getTypeTag(
                    type2,
                    calculateEffectiveness(type1, type2)
                  )}
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TypeChartComponent;
