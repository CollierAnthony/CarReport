import { Button, Label, TextInput } from "flowbite-react";
import dayjs from "dayjs";
import { type Reducer, useReducer, useState } from "react";
import Datepicker from "tailwind-datepicker-react";
import { api } from "~/utils/api";

const DatePickerOptions = {
  title: "Date d'achat",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  maxDate: new Date(),
  minDate: new Date("1900-01-01"),
  theme: {
    background: "bg-white",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "bg-green-100",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <span>Précédent</span>,
    next: () => <span>Suivant</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date("2022-01-01"),
  language: "fr",
};

type NewCarState = {
  make: string | null;
  model: string | null;
  year: number | null;
  mileage: number | null;
};

type Car = {
  make: string;
  model: string;
  year: number;
  mileage: number;
  buyDate: Date;
};

const initialState: NewCarState = {
  make: null,
  model: null,
  year: null,
  mileage: null,
};

type CarAction =
  | { type: "setMake"; payload: string }
  | { type: "setModel"; payload: string }
  | { type: "setYear"; payload: number }
  | { type: "setMileage"; payload: number };

function reducer(state: NewCarState, action: CarAction): NewCarState {
  switch (action.type) {
    case "setMake":
      console.log(state);
      return { ...state, make: action.payload };
    case "setModel":
      return { ...state, model: action.payload };
    case "setYear":
      return { ...state, year: action.payload };
    case "setMileage":
      return { ...state, mileage: action.payload };
    default:
      return state;
  }
}
function NewCarForm() {
  const [show, setShow] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleChange = (selectedDate: Date) => {
    setSelectedDate(selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };
  const [carState, dispatch] = useReducer(reducer, initialState);

  const { mutate, isLoading: isPosting } =
    api.garage.addCarToGarage.useMutation({
      onSuccess: () => {
        console.log("success");
      },
      onError: (err) => {
        console.log("error", err);
      },
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const car = {
      make: carState.make,
      model: carState.model,
      year: carState.year,
      mileage: carState.mileage,
      buyDate: selectedDate,
    };

    mutate(car as Car);
  };

  return (
    <form className="flex  flex-col gap-4 " onSubmit={handleSubmit}>
      <h2 className="mx-auto text-2xl font-bold text-emerald-400">
        Ajouter une voiture à mon garage
      </h2>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="make" value="Marque" />
        </div>
        <TextInput
          id="make"
          type="text"
          placeholder="Marque"
          required={true}
          value={carState.make ?? ""}
          onChange={(e) =>
            dispatch({ type: "setMake", payload: e.target.value })
          }
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="model" value="Modèle" />
        </div>
        <TextInput
          id="model"
          type="text"
          placeholder="Modèle"
          required={true}
          value={carState.model ?? ""}
          onChange={(e) =>
            dispatch({ type: "setModel", payload: e.target.value })
          }
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="year" value="Année" />
        </div>
        <TextInput
          id="year"
          type="number"
          placeholder="Année de fabrication"
          required={true}
          min={1900}
          max={dayjs().year()}
          value={carState.year ?? ""}
          onChange={(e) =>
            dispatch({ type: "setYear", payload: parseInt(e.target.value) })
          }
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="buyDate" value="Date d'achat du véhicule" />
        </div>
        <Datepicker
          options={DatePickerOptions}
          onChange={handleChange}
          show={show}
          setShow={handleClose}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="mileage" value="Kilometrage" />
        </div>
        <TextInput
          id="mileage"
          type="number"
          placeholder="Kilometrage"
          required={true}
          max={1000000}
          helperText="Soyez le plus précis possible, un nombre de kilomètres exact nous permet de mieux afficher l'évolution de votre voiture au fil du temps."
          value={carState.mileage ?? ""}
          onChange={(e) =>
            dispatch({ type: "setMileage", payload: parseInt(e.target.value) })
          }
        />
      </div>

      {/* <div id="fileUpload">
        <div className="mb-2 block">
          <Label htmlFor="file" value="Ajoutez une photo de votre voiture" />
        </div>
        <FileInput
          id="file"
          helperText="On veut voir votre voiture, ajoutez une photo d'elle 🚗!"
        />
      </div> */}

      <Button type="submit" color="green">
        En route !
      </Button>
    </form>
  );
}

export default NewCarForm;
