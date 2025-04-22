import { Link } from 'react-router-dom';
import { BookOpen, Award, Users, Zap } from 'lucide-react';
import CourseCard, { CourseProps } from '../components/CourseCard';

const Home = () => {
  // Sample featured courses data
  const featuredCourses: CourseProps[] = [
    {
      id: '1',
      title: 'Web Development Bootcamp',
      instructor: 'John Doe',
      level: 'Beginner',
      rating: 4.8,
      students: 15300,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600',
      price: 49.99,
      category: 'Development',
      description: 'Complete web development bootcamp covering HTML, CSS, JavaScript, React and more.'
    },
    {
      id: '2',
      title: 'UX/UI Design Masterclass',
      instructor: 'Jane Smith',
      level: 'Intermediate',
      rating: 4.7,
      students: 8200,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600',
      price: 59.99,
      category: 'Design',
      description: 'Learn to create stunning user interfaces and improve user experiences.'
    },
    {
      id: '3',
      title: 'Data Science Fundamentals',
      instructor: 'Robert Johnson',
      level: 'Advanced',
      rating: 4.9,
      students: 12100,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600',
      price: 69.99,
      category: 'Data Science',
      description: 'Master data science skills from statistical analysis to machine learning.'
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero min-h-[70vh] bg-gradient-to-r from-primary to-secondary">
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md md:max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">Learn Without Limits</h1>
            <p className="mb-8 text-lg">
              Access over 10,000 courses taught by industry experts. Learn at your own pace and achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/courses" className="btn btn-primary text-white rounded-lg">
                Explore Courses
              </Link>
              <Link to="/signup" className="btn rounded-lg">
                Join for Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-base-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Learnify</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen size={32} className="text-primary" />
                </div>
                <h3 className="card-title">Quality Content</h3>
                <p>Expert-led courses designed for real-world skills</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Award size={32} className="text-secondary" />
                </div>
                <h3 className="card-title">Certification</h3>
                <p>Earn certificates recognized by top employers</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Users size={32} className="text-accent" />
                </div>
                <h3 className="card-title">Community</h3>
                <p>Join a global community of lifelong learners</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap size={32} className="text-primary" />
                </div>
                <h3 className="card-title">Flexible Learning</h3>
                <p>Learn at your own pace, anytime and anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 px-4 bg-base-200">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Courses</h2>
            <Link to="/courses" className="btn btn-outline btn-primary">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-content">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="mb-8 max-w-md mx-auto">Join thousands of students who have already taken the first step toward a brighter future.</p>
          <Link to="/signup" className="btn rounded-xl">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;