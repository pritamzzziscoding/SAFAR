import { useState } from "react";
import { MdEdit, MdLocationPin } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";

export const BlogCard = () => {
    const [full, setFull] = useState(false)

    const handleClick = () =>{
        console.log(full)
        setFull((prev) => !prev)
    }

    return <li>
        <div className="bg-stone-200 blog-card rounded place-self-center">
            <img className="w-[100%] rounded-t" src="https://images.pexels.com/photos/815880/pexels-photo-815880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Add a Valid Image" />
            <div className="blog-card-content">
                <p className="text-xl text-stone-800 font-medium">Lorem ipsum dolor sit amet.</p>
                <p className="text-stone-600 flex items-center gap-2"><MdLocationPin /> Location</p>
                <div className="flex items-center justify-between">
                    <button onClick={handleClick} className="rounded text-green-500">Read more</button>
                    <button className="flex items-center justify-center gap-2"><FaRegHeart />100</button>
                    <button><MdEdit /></button>
                </div>
            </div>
            <BlogContent handleClick={handleClick} full={full}/>
        </div>
    </li>
}


const BlogContent = ({handleClick, full}) => {
    return <div className={`${full === false ? "hidden" : ""} z-20 blog-content-desc fixed top-0 left-0 bg-teal-100/90 h-[100vh] w-full`}>
        <div className="fixed top-5 right-5">
            <button onClick={handleClick} className="text-3xl md:text-5xl text-stone-700"><MdClose /></button>
        </div>
        <div className="w-[90%] blog-desc h-[90%] bg-teal-700 overflow-auto rounded-lg custom-scrollbar">
            <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold italic text-stone-50">Lorem ipsum dolor sit amet.</h1>
            <p className="blog-para text-center text-sm sm:text-md md:text-lg italic text-stone-100">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque quae laborum quo nisi quidem illo alias dignissimos consectetur minima distinctio maiores dolorum dolorem autem delectus, officiis sunt? Quibusdam, doloremque laudantium autem saepe voluptates inventore hic! Minima, amet fugiat consequuntur veritatis est tempora a placeat vitae dolorum quia deleniti. Optio, exercitationem, perspiciatis fuga unde quas accusamus itaque ducimus quibusdam qui nulla eum dolore recusandae accusantium odio magni non totam hic iste? A liquam, voluptatem ut consectetur porro dolore ipsam harum veniam in aspernatur necessitatibus ipsa laboriosam officia accusantium ex eligendi saepe nesciunt totam, maxime nemo ad amet repellendus, suscipit quae architecto. Veritatis libero amet, enim ea quo illo iste temporibus, aperiam sequi, aut ipsam? Obcaecati accusamus dicta corrupti soluta fugit provident ipsa asperiores porro magni. Nobis, facilis! Architecto omnis enim tenetur nisi voluptatem illum minima doloremque numquam, quas laudantium officiis, laborum mollitia consequatur? Omnis assumenda soluta ea illum odit eaque ut reprehenderit dolorum, modi blanditiis, voluptatem repudiandae fuga! Aliquid voluptatibus, fuga vel accusamus reiciendis accusantium alias neque nostrum unde dolorem voluptate veritatis labore consequuntur ea! Tempora, reprehenderit magnam. Laudantium reiciendis quam, ipsa vitae voluptatem vel incidunt sit tempora delectus voluptatibus dignissimos officiis maiores culpa labore molestias dolores, fuga quas excepturi dolor minus. Iure provident eius aspernatur aperiam ullam inventore magni, cum reprehenderit commodi maxime necessitatibus omnis consectetur perspiciatis consequuntur distinctio sed laudantium repudiandae dignissimos, vel velit quam cumque. Quae alias molestias deserunt sapiente, expedita consequuntur beatae explicabo incidunt earum consectetur architecto aperiam eveniet velit modi qui, assumenda repudiandae fugit inventore! Est voluptates voluptas placeat maxime accusantium minus eius saepe dolore porro odit omnis neque ea, laborum ut aperiam deserunt perspiciatis nobis quidem dignissimos officia, quisquam excepturi velit accusamus. Placeat delectus, asperiores temporibus aut earum in consequuntur. Rerum commodi, voluptas, at dolor iste beatae repudiandae eius quisquam illo nihil qui! Illum quasi autem assumenda. Accusantium suscipit cum illum soluta ullam cumque repellat consectetur debitis, natus magnam temporibus repudiandae quas voluptatum ab saepe consequuntur nulla. Ea, assumenda, placeat in quam porro maiores, vel tempora id perspiciatis nulla earum. Quia molestiae numquam tempore odit quod minima dicta non ipsum! Iusto, repellendus corrupti sit, ad culpa ducimus modi distinctio repellat dolorum officia voluptas itaque praesentium architecto? Eaque dolor consectetur nobis sapiente, nulla sunt distinctio praesentium eos quo illo porro amet enim commodi in suscipit sint eius quidem minima aliquid maxime cumque esse? Voluptatum molestias quis dolor soluta adipisci autem amet quia beatae veniam. Veritatis, esse laboriosam provident nesciunt culpa animi, enim eaque sit recusandae pariatur consectetur eveniet ab voluptate rerum id odio, vel voluptatum tenetur in? Delectus veritatis molestiae recusandae velit earum impedit nihil dolore, quas error. Veniam sequi, animi ratione, beatae nostrum aliquid dolores quae, sit ut temporibus doloribus quam vitae eos porro est voluptate illo! Dolorem, eligendi placeat ex sint tenetur minima ipsam esse rem voluptatum beatae fugit necessitatibus doloribus, voluptates architecto error repellat perspiciatis. Unde possimus minus similique esse culpa! Doloribus, soluta? Quisquam, perspiciatis iste facere eveniet accusamus, minus tempore, sapiente ad harum neque totam recusandae molestiae doloremque! Culpa voluptatum provident corporis quod?</p>
        </div>
    </div>
}