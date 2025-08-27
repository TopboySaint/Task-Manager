import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {

    useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [])

  const featuresData = [
  "Intuitive drag-and-drop interface",
  "Smart prioritization algorithms",
  "Seamless team collaboration",
  "Time tracking and productivity analytics",
  "Cross-platform synchronization",
  "Customizable workflows and categories"
];

  return (
  <div className="min-h-screen bg-surface font-sans text-text">
      {/* Header */}
  <header className="fixed w-full bg-surface border-b border-default z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <span className="text-2xl font-bold">TaskMint</span>
            </div>
            <Link to="/signin"><button className="btn btn-neutral btn-md">
              Sign in
            </button></Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
  <section className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-3xl flex flex-col items-center justify-center min-h-[40vh]">
          <div className="text-center">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
              Task Management for Individuals
            </h1>
      <p className="text-lg md:text-xl text-muted max-w-xl mx-auto mb-8">
              TaskMint empowers you to streamline workflows, enhance collaboration, and achieve your goals with clarity and confidence. Experience seamless organization and take control of your productivity with our intuitive, business-ready platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link to="/signup">
        <button className="btn btn-primary btn-lg">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
  </section>

  {/* Features Section */}
  <section className="pt-8 pb-20 bg-surface-2">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="TaskMint Features" 
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Powerful Features for Ultimate Productivity</h2>
              <p className="text-lg text-muted mb-8">
                TaskMint is designed with cutting-edge features to streamline your workflow and maximize efficiency.
              </p>
              <ul className="space-y-4 mb-10">
                {featuresData.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary btn-md">
                Explore All Features
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-brand text-brand-contrast text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Productivity?</h2>
        <p className="text-lg text-brand-contrast opacity-80 mb-10 max-w-2xl mx-auto">
          Join thousands of professionals who use TaskMint to manage their tasks and achieve their goals efficiently.
        </p>
        <Link to="/signup">
          <button className="btn btn-contrast btn-lg">
            Get Started
          </button>
        </Link>
      </section>

      {/* Footer */}
  <footer className="bg-brand text-brand-contrast pt-8 pb-8">
    <div className="text-center text-brand-contrast opacity-70">
      <p>&copy; 2025 TaskMint. All rights reserved.</p>
    </div>
  </footer>
    </div>
  );
};


export default Welcome