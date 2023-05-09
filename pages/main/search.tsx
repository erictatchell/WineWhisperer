import { useState } from "react";

export default function Search() {
  const [wineTypes, setWineTypes] = useState<string[]>([]);
  const [grapeVarieties, setGrapeVarieties] = useState<string[]>([]);
  const [wineTaste, setWineTaste] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleWineTypeChange = (event: any) => {
    const wineType = event.target.value;
    const isChecked = event.target.checked;

    if (wineType === "all") {
      if (isChecked) {
        setWineTypes(['red', "white", "rosé", "sparkling"]);
      } else {
        setWineTypes([]);
      }
    } else {
      if (isChecked) {
        setWineTypes([...wineTypes, wineType]);
      } else {
        setWineTypes(wineTypes.filter((t : any) => t !== wineType));
        setSelectAll(false);
      }
    }
  };

  const handleGrapeVarietyChange = (event : any) => {
    const grapeVariety = event.target.value;
    const isChecked = event.target.checked;

    if (grapeVariety === "all") {
        if (isChecked) {
            setGrapeVarieties(["cabernet_sauvignon", "merlot", "pinot_noir", "chardonnay", "sauvignon_blanc", "riesling"]);
          } else {
            setGrapeVarieties([]);
          }
        } else {
          if (isChecked) {
            setGrapeVarieties([...grapeVarieties, grapeVariety]);
          } else {
            setGrapeVarieties(grapeVarieties.filter((g : any) => g !== grapeVariety));
            setSelectAll(false);
          }
        }
    };

    const handleWineTasteChange = (event : any) => {
        const wineTaste = event.target.value;
        const isChecked = event.target.checked;
    
        if (wineTaste === "all") {
          if (isChecked) {
            setWineTaste(["dry", "crisp", "full-bodied", "sweet", "fruity", "tannic", "acidic", "herbal"]);
          } else {
            setWineTaste([]);
          }
        } else {
          if (isChecked) {
            setWineTaste([...wineTaste, wineTaste]);
          } else {
            setWineTaste(wineTaste.filter((t: any) => t !== wineTaste));
            setSelectAll(false);
          }
        }
      };

  const handleSubmit = (event : any) => {
    event.preventDefault();
    console.log("Wine types:", wineTypes);
    console.log("Grape varieties:", grapeVarieties);
    console.log("Wine taste:", wineTaste);
  };

  return (
    <div>
      <h1>Search page</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Wine Types:
        </label>
        <br />
        
        <label>
          <input
            type="checkbox"
            value="red"
            checked={wineTypes.includes("red")}
            onChange={handleWineTypeChange}
          />
          Red
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="white"
            checked={wineTypes.includes("white")}
            onChange={handleWineTypeChange}
          />
          White
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="rosé"
            checked={wineTypes.includes("rosé")}
            onChange={handleWineTypeChange}
          />
          Rosé
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="sparkling"
            checked={wineTypes.includes("sparkling")}
            onChange={handleWineTypeChange}
          />
          Sparkling
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="all"
            checked={selectAll}
            onChange={handleWineTypeChange}
          />
          Select all
        </label>
        <br />
        <br />

        <label>Grape Varieties:</label>
        <br />
        <label>
          <input
            type="checkbox"
            value="cabernet_sauvignon"
            checked={grapeVarieties.includes("cabernet_sauvignon")}
            onChange={handleGrapeVarietyChange}
          />
          Cabernet Sauvignon
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="merlot"
            checked={grapeVarieties.includes("merlot")}
            onChange={handleGrapeVarietyChange}
          />
          Merlot
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="pinot_noir"
            checked={grapeVarieties.includes("pinot_noir")}
            onChange={handleGrapeVarietyChange}
          />
          Pinot Noir
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="chardonnay"
            checked={grapeVarieties.includes("chardonnay")}
            onChange={handleGrapeVarietyChange}
          />
          Chardonnay
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="sauvignon_blanc"
            checked={grapeVarieties.includes("sauvignon_blanc")}
            onChange={handleGrapeVarietyChange}
          />
          Sauvignon Blanc
        </label>
        <br />
    <label>
      <input
        type="checkbox"
        value="riesling"
        checked={grapeVarieties.includes("riesling")}
        onChange={handleGrapeVarietyChange}
      />
      Riesling
    </label>
    <br />
    <label>
      <input
        type="checkbox"
        value="all"
        checked={selectAll}
        onChange={handleGrapeVarietyChange}
      />
      Select all
    </label>
    <br />
    <br />

    <label>
          Wine Taste:
        </label>
        <br />
        
        <label>
          <input
            type="checkbox"
            value="dry"
            checked={wineTaste.includes("dry")}
            onChange={handleWineTasteChange}
          />
          Dry
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="crisp"
            checked={wineTaste.includes("crisp")}
            onChange={handleWineTasteChange}
          />
          Crisp
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="full-bodied"
            checked={wineTaste.includes("full-bodied")}
            onChange={handleWineTasteChange}
          />
          Full-bodied
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="sweet"
            checked={wineTaste.includes("sweet")}
            onChange={handleWineTasteChange}
          />
          Sweet
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="fruity"
            checked={wineTaste.includes("fruity")}
            onChange={handleWineTasteChange}
          />
          Fruity
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="tannic"
            checked={wineTaste.includes("tannic")}
            onChange={handleWineTasteChange}
          />
          Tannic
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="acidic"
            checked={wineTaste.includes("acidic")}
            onChange={handleWineTasteChange}
          />
          Acidic
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="herbal"
            checked={wineTaste.includes("herbal")}
            onChange={handleWineTasteChange}
          />
          Herbal
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="all"
            checked={selectAll}
            onChange={handleWineTasteChange}
          />
          Select all
        </label>

    <br />
    <button type="submit">Search</button>
  </form>
</div>
    );
}
