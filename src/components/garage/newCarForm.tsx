import {
  Button,
  Card,
  FileInput,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import dayjs from "dayjs";
function NewCarForm() {
  return (
    <form className="flex  flex-col gap-4 ">
      <h2 className="mx-auto text-2xl font-bold">
        Ajouter une voiture à mon garage
      </h2>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="make" value="Marque" />
        </div>
        <TextInput id="make" type="text" placeholder="Marque" required={true} />
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
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="year" value="Année" />
        </div>
        <TextInput
          id="year"
          type="number"
          placeholder="Année"
          required={true}
          min={1900}
          max={dayjs().year()}
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
        />
      </div>

      <div id="fileUpload">
        <div className="mb-2 block">
          <Label htmlFor="file" value="Ajoutez une photo de votre voiture" />
        </div>
        <FileInput
          id="file"
          helperText="On veut voir votre voiture, ajoutez une photo d'elle 🚗!"
        />
      </div>

      <Button type="submit">En route !</Button>
    </form>
  );
}

export default NewCarForm;
