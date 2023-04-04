import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Button, Navbar } from "flowbite-react";
import Image from "next/image";

function MainNav() {
  const { isSignedIn } = useUser();

  return (
    <div className="bg-green-200">
      <Navbar
        fluid={true}
        className="mx-auto mb-8 max-w-screen-2xl !bg-green-200"
      >
        <Navbar.Brand href="/">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
            width={64}
            height={64}
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Car Report
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {isSignedIn ? <AuthNav /> : <UnauthNav />}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

function AuthNav() {
  return (
    <>
      <Button color="gray">
        <Navbar.Link href="/garage">My garage</Navbar.Link>
      </Button>
      <Button color="yellow">
        <SignOutButton />
      </Button>
    </>
  );
}

function UnauthNav() {
  return (
    <>
      <Button color="green">
        <SignInButton />
      </Button>
    </>
  );
}

export default MainNav;
