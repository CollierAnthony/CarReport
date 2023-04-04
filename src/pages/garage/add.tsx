import { Card } from "flowbite-react";
import { type NextPage } from "next";
import NewCarForm from "~/components/garage/newCarForm";

const AddNewCar: NextPage = () => {
  return (
    <Card className="mx-auto  max-w-2xl ">
      <NewCarForm />
    </Card>
  );
};

export default AddNewCar;
