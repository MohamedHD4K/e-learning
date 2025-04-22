import { Link } from 'react-router-dom';

export interface CourseProps {
  id: string;
  title: string;
  instructor: string;
  level: string;
  rating: number;
  students: number;
  image: string;
  price: number;
  category: string;
  description?: string;
}

const CourseCard = ({ id, title, instructor, level, rating, students, image, price }: CourseProps) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure>
        <img src={image} alt={title} className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm text-gray-600">By {instructor}</p>
        <div className="flex items-center mt-2">
          <div className="badge badge-secondary mr-2">{level}</div>
          <div className="flex items-center">
            <div className="rating rating-sm mr-1">
              {[...Array(5)].map((_, i) => (
                <input 
                  key={i}
                  type="radio" 
                  name={`rating-${id}`} 
                  className={`mask mask-star-2 ${i < Math.floor(rating) ? 'bg-orange-400' : 'bg-gray-300'}`} 
                  disabled
                />
              ))}
            </div>
            <span className="text-sm">({rating.toFixed(1)})</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{students.toLocaleString()} students</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-lg font-bold">${price.toFixed(2)}</span>
          <Link to={`/course/${id}`} className="btn btn-primary btn-sm">View Course</Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;