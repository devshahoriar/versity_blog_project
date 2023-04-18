import Image from 'next/image'
import Link from 'next/link'

const BlogCard = ({ width }: { width: string }) => {
  const type: String[] = ['laptop', 'man', 'woman', 'android', 'iphone', 'windows']
  return (
    <div
      className={`${
        width === 'two' ? 'w-[95%]' : 'w-[45%] md:w-[30%]'
      } m-2 md:m-4 rounded-2xl overflow-hidden border-b border-primary-focus hover:shadow-lg hover:shadow-black bg-stone-800`}
    >
      <Link href="blog/abc">
        <div className="card bg-base-100 shadow-xl rounded-none">
          <figure>
            <div
              className={`relative w-full h-28 ${
                width === 'two' ? 'md:h-80' : 'md:h-44'
              }`}
            >
              <Image
                fill={true}
                className={`h-28 w-full object-cover ${
                  width === 'two' ? 'md:h-80' : 'md:h-44'
                }`}
                src={
                  `https://source.unsplash.com/random?` +
                  type[Math.floor(Math.random() * type.length)]
                }
                alt="Shoes"
              />
            </div>
          </figure>
          <div
            className={`card-body gap-0 p-2 pb-2 my-2 ${
              width === 'two' ? 'md:p-4' : 'md:p-2'
            }`}
          >
            <h2
              className={`${
                width === 'two' ? 'md:text-3xl' : 'md:text-lg'
              } font-bold line-clamp-2`}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum ipsum a magnam amet tenetur quam voluptatem expedita porro, laudantium asperiores.
            </h2>
            <p className="line-clamp-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem totam alias soluta doloribus odit magnam excepturi!
              Ipsam placeat tempora aliquid laboriosam cupiditate rerum sed
              soluta exercitationem. Aut aperiam porro nulla, sint molestiae cum
              repellendus sed rem. Quam harum optio quo nesciunt saepe,
              voluptatibus, maxime unde sint ducimus, similique facilis
              laudantium rerum laboriosam non eum deserunt omnis quasi explicabo
              illum repellendus! Eveniet atque voluptatum nemo necessitatibus
              enim doloribus sit earum quae modi. Veritatis vel cumque deleniti
              voluptate ex. Consectetur enim id, qui ipsum nemo praesentium ad
              iusto minima nihil maiores consequatur ratione. Nesciunt iusto
              odit beatae! Labore rem inventore atque officia?
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BlogCard
