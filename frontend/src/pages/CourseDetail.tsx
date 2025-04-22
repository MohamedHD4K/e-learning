import { useParams } from 'react-router-dom';
import { BookOpen, Clock, Award, Users, PlayCircle, Calendar, Star } from 'lucide-react';
import { CourseProps } from '../components/CourseCard';

const CourseDetail = () => {
  const { id } = useParams();
  
  // In a real application, you would fetch this data based on the ID
  const courseData: CourseProps[] = [
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
      description: 'Complete web development bootcamp covering HTML, CSS, JavaScript, React and more. This comprehensive course is designed to take you from beginner to job-ready developer.'
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
      description: 'Learn to create stunning user interfaces and improve user experiences. Master the principles of visual design, prototyping, and user testing.'
    },
  ];
  
  // Find the course with the matching ID
  const course = courseData.find(c => c.id === id);
  
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
          <p className="mb-4">The course you're looking for doesn't exist or has been removed.</p>
          <a href="/courses" className="btn btn-primary">Browse Courses</a>
        </div>
      </div>
    );
  }

  // Sample curriculum data
  const curriculum = [
    {
      title: 'Getting Started',
      lessons: [
        { title: 'Introduction', duration: '10:15', isFree: true },
        { title: 'Course Overview', duration: '08:45', isFree: true },
        { title: 'Setting Up Your Environment', duration: '15:30', isFree: false },
      ]
    },
    {
      title: 'Core Concepts',
      lessons: [
        { title: 'Basic Principles', duration: '20:10', isFree: false },
        { title: 'Advanced Techniques', duration: '25:30', isFree: false },
        { title: 'Practical Examples', duration: '18:15', isFree: false },
      ]
    },
    {
      title: 'Real-World Projects',
      lessons: [
        { title: 'Project Planning', duration: '22:45', isFree: false },
        { title: 'Implementation', duration: '45:20', isFree: false },
        { title: 'Testing and Deployment', duration: '30:10', isFree: false },
      ]
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section with course details */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/5">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg mb-6">{course.description}</p>
            
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={18}
                    className={`${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2">{course.rating.toFixed(1)}</span>
              </div>
              <span className="mx-2">•</span>
              <span>{course.students.toLocaleString()} students</span>
            </div>
            
            <div className="mb-6">
              <span className="text-sm">Created by <span className="font-medium">{course.instructor}</span></span>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" />
                <span>Last updated 1 month ago</span>
              </div>
              <div className="flex items-center">
                <BookOpen size={18} className="mr-2" />
                <span>{course.level} level</span>
              </div>
              <div className="flex items-center">
                <Clock size={18} className="mr-2" />
                <span>20 hours total</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/5">
            <div className="card bg-base-100 shadow-xl">
              <figure className="px-4 pt-4">
                <img src={course.image} alt={course.title} className="rounded-lg w-full h-48 object-cover" />
              </figure>
              <div className="card-body">
                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900">${course.price.toFixed(2)}</div>
                  <div className="flex items-center mt-1">
                    <Clock size={16} className="mr-2 text-gray-600" />
                    <span className="text-sm text-gray-600">30-day money-back guarantee</span>
                  </div>
                </div>
                <button className="btn btn-primary btn-block mb-2">Enroll Now</button>
                <button className="btn btn-outline btn-block">Try for Free</button>
                
                <div className="mt-4 text-sm text-gray-600">
                  <h4 className="font-medium mb-2">This course includes:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <PlayCircle size={16} className="mr-2" /> 42 hours on-demand video
                    </li>
                    <li className="flex items-center">
                      <BookOpen size={16} className="mr-2" /> 18 articles and resources
                    </li>
                    <li className="flex items-center">
                      <Clock size={16} className="mr-2" /> Full lifetime access
                    </li>
                    <li className="flex items-center">
                      <Award size={16} className="mr-2" /> Certificate of completion
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course content */}
      <div className="container mx-auto max-w-6xl py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* What you'll learn */}
            <div className="card bg-base-100 shadow-sm mb-8">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">What you'll learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex">
                    <div className="mr-2 mt-1">✓</div>
                    <div>Create professional web applications using modern technologies</div>
                  </div>
                  <div className="flex">
                    <div className="mr-2 mt-1">✓</div>
                    <div>Understand core programming concepts and patterns</div>
                  </div>
                  <div className="flex">
                    <div className="mr-2 mt-1">✓</div>
                    <div>Build responsive and accessible user interfaces</div>
                  </div>
                  <div className="flex">
                    <div className="mr-2 mt-1">✓</div>
                    <div>Deploy applications to production environments</div>
                  </div>
                  <div className="flex">
                    <div className="mr-2 mt-1">✓</div>
                    <div>Implement best practices for code quality and architecture</div>
                  </div>
                  <div className="flex">
                    <div className="mr-2 mt-1">✓</div>
                    <div>Work with APIs and external data sources</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Curriculum */}
            <div className="card bg-base-100 shadow-sm mb-8">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-2">Course Content</h2>
                <div className="text-sm text-gray-500 mb-4">
                  15 sections • 42 lectures • 20h total length
                </div>
                
                <div className="join join-vertical w-full">
                  {curriculum.map((section, index) => (
                    <div key={index} className="collapse collapse-arrow join-item border border-base-300">
                      <input type="checkbox" name="curriculum-accordion" defaultChecked={index === 0} /> 
                      <div className="collapse-title font-medium">
                        {section.title}
                        <div className="text-sm font-normal text-gray-500">
                          {section.lessons.length} lectures • {section.lessons.reduce((total, lesson) => total + parseInt(lesson.duration.split(':')[0]), 0)} min
                        </div>
                      </div>
                      <div className="collapse-content">
                        {section.lessons.map((lesson, lIndex) => (
                          <div key={lIndex} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                            <div className="flex items-center">
                              <PlayCircle size={18} className="mr-3 text-gray-400" />
                              <span>{lesson.title}</span>
                              {lesson.isFree && <span className="badge badge-sm ml-2">Preview</span>}
                            </div>
                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Instructor */}
            <div className="card bg-base-100 shadow-sm mb-8">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Instructor</h2>
                <div className="flex items-start gap-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <img src="https://i.pravatar.cc/150?u=johndoe" alt={course.instructor} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{course.instructor}</h3>
                    <p className="text-gray-500 text-sm mb-2">Senior Web Developer & Educator</p>
                    <div className="flex items-center text-sm text-gray-700 mb-3">
                      <Star size={16} className="mr-1 text-yellow-500" />
                      <span className="mr-3">4.8 Instructor Rating</span>
                      <Users size={16} className="mr-1" />
                      <span className="mr-3">45,000+ Students</span>
                      <BookOpen size={16} className="mr-1" />
                      <span>12 Courses</span>
                    </div>
                    <p className="text-gray-700">
                      John Doe is a full-stack developer with over 10 years of experience in web development
                      and 5 years in teaching programming concepts to beginners and experienced developers alike.
                      He specializes in JavaScript frameworks and modern development practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            {/* Requirements */}
            <div className="card bg-base-100 shadow-sm mb-8">
              <div className="card-body">
                <h3 className="font-bold text-lg mb-3">Requirements</h3>
                <ul className="space-y-2 list-disc list-inside text-gray-700">
                  <li>Basic computer skills</li>
                  <li>No prior programming knowledge needed</li>
                  <li>Computer with internet connection</li>
                  <li>Desire to learn and practice</li>
                </ul>
              </div>
            </div>
            
            {/* Related courses */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="font-bold text-lg mb-3">Related Courses</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=100" alt="Related course" className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h4 className="font-medium">UX/UI Design Masterclass</h4>
                      <div className="text-sm text-gray-500">Jane Smith</div>
                      <div className="flex items-center mt-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm ml-1">4.7</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=100" alt="Related course" className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h4 className="font-medium">Data Science Fundamentals</h4>
                      <div className="text-sm text-gray-500">Robert Johnson</div>
                      <div className="flex items-center mt-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm ml-1">4.9</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=100" alt="Related course" className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h4 className="font-medium">Mobile App Development</h4>
                      <div className="text-sm text-gray-500">Michael Brown</div>
                      <div className="flex items-center mt-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm ml-1">4.6</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;