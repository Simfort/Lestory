import Footer from "./_components/Footer";
import NavigationContainer from "./_components/NavigationContainer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {" "}
      <NavigationContainer>{children}</NavigationContainer>
    </div>
  );
}
