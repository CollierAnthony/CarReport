import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Navbar } from "flowbite-react";
import Image from "next/image";

function MainNav() {
  const { isSignedIn } = useUser();

  return (
    <Navbar fluid={true} rounded={true}>
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
  );
}

function AuthNav() {
  const { user } = useUser();
  return (
    <>
      <Navbar.Link href="/garage">My garage</Navbar.Link>
      <SignOutButton />
    </>
  );
}

function UnauthNav() {
  return (
    <>
      <SignInButton />
    </>
  );
}

export default MainNav;
