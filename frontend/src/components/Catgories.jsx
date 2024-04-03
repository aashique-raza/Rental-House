// import { cat} from "../data";
import "../styles/Catgories.scss"
import { Link } from "react-router-dom";
import { BiWorld } from "react-icons/bi";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiWindmill, GiIsland, GiBoatFishing, GiCastle, GiCaveEntrance, GiForestCamp, GiCactus, GiBarn } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";


const Categories = () => {

     const cat = [
        {
          label: "All",
          icon: <BiWorld/>
        },
        {
          img: "assets/beach_cat.jpg",
          label: "Beachfront",
          icon: <TbBeach />,
          description: "This property is close to the beach!",
        },
        {
          img: "assets/windmill_cat.webp",
          label: "Windmills",
          icon: <GiWindmill />,
          description: "This property is has windmills!",
        },
        {
          img: "assets/modern_cat.webp",
          label: "Iconic cities",
          icon: <MdOutlineVilla />,
          description: "This property is modern!",
        },
        {
          img: "assets/countryside_cat.webp",
          label: "Countryside",
          icon: <TbMountain />,
          description: "This property is in the countryside!",
        },
        {
          img: "assets/pool_cat.jpg",
          label: "Amazing Pools",
          icon: <TbPool />,
          description: "This is property has a beautiful pool!",
        },
        {
          img: "assets/island_cat.webp",
          label: "Islands",
          icon: <GiIsland />,
          description: "This property is on an island!",
        },
        {
          img: "assets/lake_cat.webp",
          label: "Lakefront",
          icon: <GiBoatFishing />,
          description: "This property is near a lake!",
        },
        {
          img: "assets/skiing_cat.jpg",
          label: "Ski-in/out",
          icon: <FaSkiing />,
          description: "This property has skiing activies!",
        },
        {
          img: "assets/castle_cat.webp",
          label: "Castles",
          icon: <GiCastle />,
          description: "This property is an ancient castle!",
        },
        {
          img: "assets/cave_cat.jpg",
          label: "Caves",
          icon: <GiCaveEntrance />,
          description: "This property is in a spooky cave!",
        },
        {
          img: "assets/camping_cat.jpg",
          label: "Camping",
          icon: <GiForestCamp />,
          description: "This property offers camping activities!",
        },
        {
          img: "assets/arctic_cat.webp",
          label: "Arctic",
          icon: <BsSnow />,
          description: "This property is in arctic environment!",
        },
        {
          img: "assets/desert_cat.webp",
          label: "Desert",
          icon: <GiCactus />,
          description: "This property is in the desert!",
        },
        {
          img: "assets/barn_cat.jpg",
          label: "Barns",
          icon: <GiBarn />,
          description: "This property is in a barn!",
        },
        {
          img: "assets/lux_cat.jpg",
          label: "Luxury",
          icon: <IoDiamond  />, 
          description: "This property is brand new and luxurious!",
        },
      ];

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
                <div className="category_text_icon">{cat.icon}</div>
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