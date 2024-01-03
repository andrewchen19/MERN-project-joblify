import { Outlet, useNavigation } from "react-router-dom/dist";
import { Loading, Navbar, SmallSidebar, BigSidebar } from "../components";

const Layout = () => {
  const navigation = useNavigation();
  // console.log(navigation);
  const isLoading = navigation.state === "loading";

  return (
    <main className="grid lg:grid-cols-[auto,1fr]">
      <BigSidebar />
      <SmallSidebar />

      <section>
        <Navbar />
        <div className="align-element py-12">
          {isLoading ? <Loading /> : <Outlet />}
        </div>
      </section>
    </main>
  );
};

export default Layout;
