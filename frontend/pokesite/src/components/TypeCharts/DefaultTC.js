import React from "react";
import typeNums from "./TypeNums.json";

const DefaultTC = () => {
  const getTypeTag = (type, damage) => {
    console.log("Type: ", type, "Damage:", damage)
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
      default:
        className = "normaldmg";
    }

    return <td className={className}>x{damage}</td>;
  };
  const TYPE_CHART = typeNums;
  //Dual types
  var effectiveness = TYPE_CHART["normal"].normal * TYPE_CHART["normal"].rock;
  var normalEffectiveness = TYPE_CHART["normal"].bug;

  console.log(effectiveness, "bug effectiveness:", normalEffectiveness);

  return (
    <div>
      <table>
      <thead style={{position:"sticky", top: "0px", padding: "10px 0px"}}>
          <tr className={"dropShadow normal"}>
            <th style={{backgroundColor: "white", color:"black"}}>
              Defending →
              <br />
              Attacking ↓
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
          <tr>
            <td className={`pokemonMoveType normal`}>
              <p className={`pokemonMoveType`}>Normal</p>
            </td>
            {Object.entries(TYPE_CHART["normal"]).map(([type, damage]) =>
              getTypeTag(type, damage)
            )}
          </tr>
          <tr>
            <td className={`pokemonMoveType fire`}>
              <p className={`pokemonMoveType`}>Fire</p>
            </td>
            {Object.entries(TYPE_CHART["fire"]).map(([type, damage]) =>
              getTypeTag(type, damage)
            )}
          </tr>
          <tr>
            <td className={`pokemonMoveType water`}>
              <p className={`pokemonMoveType `}>Water</p>
            </td>
            {Object.entries(TYPE_CHART["water"]).map(([type, damage]) =>
              getTypeTag(type, damage)
            )}
          </tr>
          <tr>
            <td className={`pokemonMoveType electric`}>
              <p className={`pokemonMoveType `}>Electric</p>
            </td>
            {Object.entries(TYPE_CHART["electric"]).map(([type, damage]) =>
              getTypeTag(type, damage)
            )}
          </tr>
          <tr>
            <td className={`pokemonMoveType grass`}>
              <p className={`pokemonMoveType `}>Grass</p>
            </td>
            {Object.entries(TYPE_CHART["grass"]).map(([type, damage]) =>
              getTypeTag(type, damage)
            )}
          </tr>
          <tr>
            <td className={`pokemonMoveType ice`}>
              <p className={`pokemonMoveType `}>Ice</p>
            </td>
            {Object.entries(TYPE_CHART["ice"]).map(([type, damage]) =>
              getTypeTag(type, damage)
            )}
          </tr>
          <tr>
            <td className={`pokemonMoveType fighting`}>
              <p className={`pokemonMoveType `}>Fighting</p>
            </td>
            {Object.entries(TYPE_CHART["fighting"]).map(([type, damage]) =>
              getTypeTag(type, damage)
            )}
          </tr>
          <tr>
            <td className={`pokemonMoveType poison`}>
              <p className={`pokemonMoveType `}>Poison</p>
            </td>
            {Object.entries(TYPE_CHART["poison"]).map(([type, damage]) =>
              getTypeTag(type, damage)
            )}
          </tr>
          <tr>
            <td className={`pokemonMoveType ground`}>
              <p className={`pokemonMoveType `}>Ground</p>
            </td>
            {Object.entries(TYPE_CHART["ground"]).map(([type, damage]) =>
              getTypeTag(type, damage)
            )}
          </tr>
          <tr>
            <td className={`pokemonMoveType flying`}>
              <p className={`pokemonMoveType `}>Flying</p>
            </td>
            {Object.entries(TYPE_CHART["flying"]).map(([type, damage]) =>
              getTypeTag(type, damage)
            )}
          </tr>
          <tr>
            <td className={`pokemonMoveType psychic`}>
              <p className={`pokemonMoveType `}>Psychic</p>
            </td>
            {Object.entries(TYPE_CHART["psychic"]).map(([type, damage]) =>
              getTypeTag(type, damage)
            )}
          </tr>
          <tr>
            <td className={`pokemonMoveType bug`}>
              <p className={`pokemonMoveType `}>Bug</p>
            </td>
            {Object.entries(TYPE_CHART["bug"]).map(([type, damage]) =>
              getTypeTag(type, damage)
            )}
          </tr>
          <tr>
            <td className={`pokemonMoveType rock`}>
              <p className={`pokemonMoveType `}>Rock</p>
            </td>
            {Object.entries(TYPE_CHART["rock"]).map(([type, damage]) =>
              getTypeTag(type, damage)
            )}
          </tr>
          <tr>
            <td className={`pokemonMoveType ghost`}>
              <p className={`pokemonMoveType `}>Ghost</p>
            </td>
            {Object.entries(TYPE_CHART["ghost"]).map(([type, damage]) =>
              getTypeTag(type, damage)
            )}
          </tr>
          <tr>
            <td className={`pokemonMoveType dragon`}>
              <p className={`pokemonMoveType `}>Dragon</p>
            </td>
            {Object.entries(TYPE_CHART["dragon"]).map(([type, damage]) =>
              getTypeTag(type, damage)
            )}
          </tr>
          <tr>
            <td className={`pokemonMoveType dark`}>
              <p className={`pokemonMoveType `}>Dark</p>
            </td>
            {Object.entries(TYPE_CHART["dark"]).map(([type, damage]) =>
              getTypeTag(type, damage)
            )}
          </tr>
          <tr>
            <td className={`pokemonMoveType steel`}>
              <p className={`pokemonMoveType `}>Steel</p>
            </td>
            {Object.entries(TYPE_CHART["steel"]).map(([type, damage]) =>
              getTypeTag(type, damage)
            )}
          </tr>
          <tr>
            <td className={`pokemonMoveType fairy`}>
              <p className={`pokemonMoveType `}>Fairy</p>
            </td>
            {Object.entries(TYPE_CHART["fairy"]).map(([type, damage]) =>
              getTypeTag(type, damage)
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DefaultTC;
