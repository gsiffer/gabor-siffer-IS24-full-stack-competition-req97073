import Footer from "./Footer";
import Navbar from "./Navbar";
/* Layout component 
props:
 - children: automatically passed to every component, 
    that can be used to render the content included between 
    the opening and closing tags when invoking a component.
*/
export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-10">{children}</main>
      <Footer />
    </div>
  );
}
