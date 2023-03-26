import Link from "next/link";

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
