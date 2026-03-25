import HeaderHome from "./_components/HeaderHome";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HeaderHome />
      {children}
    </div>
  );
}
