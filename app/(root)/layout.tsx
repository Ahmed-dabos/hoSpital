import Header from "@/components/ui/shared/Header";
import Footer from "@/components/ui/shared/Footer";
export default function Layout({children}: { children: React.ReactNode}) {
    return (
        <>
        <Header />
        {children}
        <Footer />
        </>
    )
}