import { useState } from 'react';
import { Search } from 'lucide-react';
import CourseCard, { CourseProps } from '../components/CourseCard';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  // Sample courses data
  const coursesData: CourseProps[] = [
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
    {
      id: '4',
      title: 'Mobile App Development with Flutter',
      instructor: 'Michael Brown',
      level: 'Intermediate',
      rating: 4.6,
      students: 9400,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600',
      price: 54.99,
      category: 'Development',
      description: 'Build cross-platform mobile apps with Flutter and Dart.'
    },
    {
      id: '5',
      title: 'Digital Marketing Strategy',
      instructor: 'Sarah Wilson',
      level: 'Beginner',
      rating: 4.5,
      students: 7800,
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600',
      price: 44.99,
      category: 'Marketing',
      description: 'Learn modern digital marketing strategies to grow your business.'
    },
    {
      id: '6',
      title: 'Advanced JavaScript Patterns',
      instructor: 'David Clark',
      level: 'Advanced',
      rating: 4.9,
      students: 5600,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600',
      price: 79.99,
      category: 'Development',
      description: 'Master advanced JavaScript patterns and techniques for professional development.'
    },
  ];

  const categories = ['All', 'Development', 'Design', 'Marketing', 'Business', 'Data Science'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filter courses based on search term, category and level
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="py-12 px-4 bg-base-200 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-2">Explore Courses</h1>
        <p className="text-gray-600 mb-8">Discover our wide range of courses to boost your skills</p>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            className="select select-bordered"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select 
            className="select select-bordered"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <CourseCard key={course.id} {...course} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-600">No courses found matching your criteria.</p>
              <button 
                className="btn btn-outline btn-primary mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedLevel('All');
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
