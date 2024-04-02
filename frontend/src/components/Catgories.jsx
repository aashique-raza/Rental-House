import { cat} from "../data";
import "../styles/Catgories.scss"
import { Link } from "react-router-dom";


const Categories = () => {


    // console.log(cat)

  return (
    <div className="categories">
      <h1>Explore Top Categories</h1>
      <p>
        Explore our wide range of vacation rentals that cater to all types of
        travelers. Immerse yourself in the local culture, enjoy the comforts of
        home, and create unforgettable memories in your dream destination.
      </p>

      <div className="categories_list">
        {cat?.slice(1, 7).map((cat, index) => (
          <Link key={index} to={`/properties/category/${cat.label}`}>
            <div className="category" key={index}>
              <img src={cat.img} alt={cat.label} />
              <div className="overlay"></div>
              <div className="category_text">
                {/* <div className="category_text_icon">{cat.icon}</div> */}
                <p>{cat.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;