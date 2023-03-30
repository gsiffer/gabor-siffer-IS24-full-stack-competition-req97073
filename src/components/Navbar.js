import Link from "next/link";
// Navbar component
const Navbar = () => {
  return (
    <nav>
      <div>
        <Link href="/" passHref>
          Home
        </Link>
        <Link href="/products" passHref>
          Products
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
