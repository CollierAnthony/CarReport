import { Card } from "flowbite-react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import NewCarForm from "~/components/garage/newCarForm";
import { api } from "~/utils/api";

const Garage: NextPage = () => {
  return (
    <>
      <Head>
        <title>My Garage</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-4xl font-bold">This is your garage!</h1>
      <CarsInGarage />
    </>
  );
};

function CarsInGarage() {
  const { data: cars, isLoading } = api.garage.getUserGarage.useQuery();
  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!cars || cars.length === 0)
    return (
      <Card className="mx-auto  max-w-2xl ">
        <NewCarForm />
      </Card>
    );

  return (
    <div className="flex flex-col gap-4">
      <h2>Vos voitures</h2>
      <Link href="garage/add"> add a new car</Link>
      {cars.map((car) => (
        <Card key={car.id} className="mx-auto  max-w-2xl ">
          <h3>{car.make}</h3>
          <p>{car.model}</p>
          <p>{car.year}</p>
          <p>{car.mileage}</p>
        </Card>
      ))}
    </div>
  );
}

//Modals are not working for the moment because of a bug in flowbite-react and NextJS SSR.

// function ModalNewCar() {
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     setShow(false);
//   }, []);

//   const onClick = () => setShow(true);
//   const onClose = () => setShow(false);

//   return (
//     <>
//       <Button>Toggle modal</Button>
//       <Modal size="xl" popup={true}>
//         <Modal.Header />
//         <Modal.Body>
//           <NewCarForm />
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

export default Garage;
