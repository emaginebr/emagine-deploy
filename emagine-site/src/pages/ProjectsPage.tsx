
import Header from '@/components/Header';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const ProjectsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-18">
        <Projects />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProjectsPage;
