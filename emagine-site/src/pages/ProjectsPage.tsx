
import Header from '@/components/Header';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';

const ProjectsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-18">
        <Projects />
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
