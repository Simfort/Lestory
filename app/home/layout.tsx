import FooterPhoneHome from "./_components/FooterPhoneHome";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}

      <FooterPhoneHome />
    </div>
  );
}
