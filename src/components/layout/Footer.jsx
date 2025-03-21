import Navigation from "./Navigation";

function Footer() {
  return (
    <>
      <footer className="sm:hidden fixed bottom-0 left-0 right-0 w-full flex justify-center p-4 text-white z-50">
        <Navigation />
      </footer>
    </>
  );
}

export default Footer;
