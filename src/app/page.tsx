import ContactForm from "@/my_components/contactForm";
import FullCardScrollBanner from "@/my_components/fullCardScrollBanner";

export default function Home() {
  return (
    <main className="min-h-screen">
      <FullCardScrollBanner />
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
